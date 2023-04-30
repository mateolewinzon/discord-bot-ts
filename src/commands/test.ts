import { SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import Command from "@interfaces/Command";

const hola: Command = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Testing command"),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply("kochen");
  },
};

export default hola;
