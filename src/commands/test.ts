import { SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import Command from "@interfaces/Command";

const test: Command = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Testing command"),
  cooldown: 10,
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply("kochen");
  },
};

export default test;
