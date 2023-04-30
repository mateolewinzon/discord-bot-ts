import { Events } from "discord.js";
import { TOKEN } from "@config/config";
import type { Client } from "discord.js";

export class Bot {
  public constructor(public readonly client: Client) {
    this.client.login(TOKEN);

    client.once(Events.ClientReady, (c) => {
      console.log(`Server is logged as $${c.user.tag}`);
    });
    client.on("error", console.error);

    client.on("warn", console.log);
  }
}
