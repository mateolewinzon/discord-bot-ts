import { readdirSync } from "fs";
import { join } from "path";
import { Collection, Events, Interaction, REST, Routes } from "discord.js";
import type {
  ChatInputCommandInteraction,
  Client,
  ApplicationCommandDataResolvable,
} from "discord.js";
import type Command from "@interfaces/Command";

export class Bot {
  public slashCommands = new Array<ApplicationCommandDataResolvable>();
  public slashCommandsMap = new Collection<string, Command>();

  constructor(public readonly client: Client, private readonly token: string) {
    console.log("Initializinng bot");

    client.login(this.token);

    client.once(Events.ClientReady, (c) => {
      console.log(`Server is logged as ${c.user.tag}`);

      this.registerSlashCommands();
    });

    client.on("error", console.error);

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

  private async onInteractionCreate() {
    this.client.on(
      Events.InteractionCreate,
      async (interaction: Interaction): Promise<any> => {
        if (!interaction.isChatInputCommand()) return;

        const command = this.slashCommandsMap.get(interaction.commandName);

        if (!command) return;

        //TODO / optional: add cooldown or ban logic

        //TODO / optional: add permissions logic

        try {
          command.execute(interaction as ChatInputCommandInteraction);
        } catch (error: any) {
          console.error(error);
          interaction
            .reply({
              content:
                "Hubo terrible error en el server. Lewsha anda a arreglarlo burro",
              ephemeral: true,
            })
            .catch(console.error);
        }
      }
    );
  }
}
