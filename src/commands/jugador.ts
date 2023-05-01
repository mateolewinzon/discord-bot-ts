import { SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import Command from "@interfaces/Command";
import { getRandomArgentinaPlayer } from "@services/soccer";

function createPlayerMessage({
  firstname,
  lastname,
  birthdate,
  birthplace,
  country,
  height,
  weight,
  photo,
  teamLogo,
  appearences,
  goals,
  position,
}: {
  firstname: string;
  lastname: string;
  birthdate: string;
  birthplace: string;
  country: string;
  height: string;
  weight: string;
  photo: string;
  teamLogo: string;
  appearences: string;
  goals: string;
  position: string;
}) {
  return `${firstname} ${lastname} 
Nacimiento: ${birthdate} ${birthplace ? `:round_pushpin: ${birthplace}` : ""}
Nacionalidad: ${country}
Altura: ${height || "-"}
Peso: ${weight || "-"}
Posición: ${position}
Partidos jugados: ${appearences || 0}
Goles: ${goals || 0}
${photo} ${teamLogo} 
`;
}

const test: Command = {
  data: new SlashCommandBuilder()
    .setName("jugador")
    .setDescription(
      "Devuelve un jugador random de la Liga Profesional de Futbol."
    ),
  cooldown: 10,
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    const {
      player: {
        firstname,
        lastname,
        birth,
        nationality,
        height,
        weight,
        photo,
      },
      statistics: {
        0: { team, games, goals },
      },
    } = await getRandomArgentinaPlayer();

    await interaction.editReply(
      createPlayerMessage({
        firstname,
        lastname,
        birthdate: birth.date,
        birthplace: birth.place,
        country: nationality,
        height,
        weight,
        photo,
        teamLogo: team.logo,
        appearences: games.appearences,
        goals: goals.total,
        position: games.position,
      })
    );
  },
};

export default test;
