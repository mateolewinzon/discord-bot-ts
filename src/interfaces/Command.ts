import { SlashCommandBuilder } from "discord.js";

interface Command {
  data: SlashCommandBuilder;
  cooldown: number;
  execute(...args: any): void;
}

export default Command;
