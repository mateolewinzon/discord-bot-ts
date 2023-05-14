import { readdirSync } from "fs";
import { join } from "path";
import {
  Collection,
  Events,
  Interaction,
  REST,
  Routes,
  Snowflake,
} from "discord.js";
import type {
  ChatInputCommandInteraction,
  Client,
  ApplicationCommandDataResolvable,
} from "discord.js";
import type Command from "@interfaces/Command";
import ErrorHandler from "@helpers/errors/handler";

export class Bot {
  public slashCommands = new Array<ApplicationCommandDataResolvable>();
  public slashCommandsMap = new Collection<string, Command>();
  public cooldowns = new Collection<string, Collection<Snowflake, number>>();

  constructor(public readonly client: Client, private readonly token: string) {
    console.log("Initializinng bot");

    client.login(this.token);

    client.once(Events.ClientReady, (c) => {
      console.log(`Server is logged as ${c.user.tag}`);

      this.registerSlashCommands();
    });

    client.on("warn", console.log);

    this.onInteractionCreate();
  }

  private async registerSlashCommands() {
    const rest = new REST({ version: "10" }).setToken(this.token);
    const commandFiles = readdirSync(join(__dirname, "commands"));

    for (const file of commandFiles) {
      const command = await import(join(__dirname, "commands", `${file}`));

      this.slashCommands.push(command.default.data);
      this.slashCommandsMap.set(command.default.data.name, command.default);
    }

    await rest.put(Routes.applicationCommands(this.client.user!.id), {
      body: this.slashCommands,
    });
  }

  private onInteractionCreate() {
    this.client.on(
      Events.InteractionCreate,
      async (interaction: Interaction): Promise<void> => {
        try {
          await this.handleInteraction(interaction);
        } catch (error: any) {
          ErrorHandler.handleError(
            error,
            interaction as ChatInputCommandInteraction
          );
        }
      }
    );
  }

  private async handleInteraction(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = this.slashCommandsMap.get(interaction.commandName);

    if (!command) return;

    if (!this.cooldowns.has(interaction.commandName)) {
      this.cooldowns.set(interaction.commandName, new Collection());
    }

    const now = Date.now();
    const timestamps: any = this.cooldowns.get(interaction.commandName);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime =
        timestamps.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return interaction.reply({
          content: `A donde crees que vas conn ese mucho dinero pinguino? Aguanta ${timeLeft} segundos, no seas ansioso`,
          ephemeral: true,
        });
      }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    await command.execute(interaction as ChatInputCommandInteraction);
  }
}
