import { SlashCommandBuilder } from "discord.js";
import type { CommandInteraction } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("Test")
    .setDescription("Testing command"),
  async execute(interaction: CommandInteraction) {
    await interaction.reply("kochen");
  },
};
