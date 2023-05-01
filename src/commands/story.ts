import { SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import { createStory } from "@services/gpt";

const story = {
  data: new SlashCommandBuilder()
    .setName("story")
    .setDescription("Generá una historia bien falopa")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription(
          "Describí la historia que querés generar. No te zarpes mucho pq no te lo toma"
        )
        .setRequired(true)
    ),
  cooldown: 20,
  async execute(interaction: ChatInputCommandInteraction) {
    const prompt = interaction.options.getString("input");

    if (!prompt) {
      return interaction.reply("Ingresá un texto para generar la historia");
    }

    await interaction.deferReply();

    const story = await createStory(prompt);

    if (story.length > 2000) {
      return interaction.editReply(
        "El texto generado supera los 2000 caracteres. Discord no me deja mandartelo. No le pidas que lo haga largo, no seas travieso, me vas a romper el bot"
      );
    }

    await interaction.editReply(story);
  },
};

export default story;
