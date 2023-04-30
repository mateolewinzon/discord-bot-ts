import { SlashCommandBuilder } from "discord.js";

interface Command {
  data: SlashCommandBuilder;
  execute(...args: any): void;
}

export default Command;
