import { Client, GatewayIntentBits } from "discord.js";
import { Bot } from "./bot";
import { TOKEN } from "@config/config";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

export const bot = new Bot(client, TOKEN);
