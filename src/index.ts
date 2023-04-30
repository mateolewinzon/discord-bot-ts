import { Client, GatewayIntentBits } from "discord.js";
import { Bot } from "./bot";

console.log("Initializinng bot");

new Bot(
  new Client({
    intents: [GatewayIntentBits.Guilds],
  })
);
