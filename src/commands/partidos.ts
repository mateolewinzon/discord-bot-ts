import { SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import Command from "@interfaces/Command";
import { getNextArgentinaGames } from "@services/soccer";

function createFixtureMessage({
  date,
  weekday,
  home,
  away,
}: {
  date: string;
  weekday: string;
  home: string;
  away: string;
}) {
  return `${weekday} ${date.substring(0, date.length - 3)}hs
${home} - ${away}

`;
}

const test: Command = {
  data: new SlashCommandBuilder()
    .setName("partidos")
    .setDescription(
      "Devuelve los próximos partidos de la Liga Profesional de Futbol."
    ),
  cooldown: 10,
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    const matches = await getNextArgentinaGames();

    const messages: string[] = matches.map((match: any) =>
      createFixtureMessage(match)
    );

    await interaction.editReply(messages.join(""));
  },
};

export default test;
