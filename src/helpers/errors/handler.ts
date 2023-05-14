import { ChatInputCommandInteraction } from "discord.js";
import BaseError from "./BaseError";

class ErrorHandler {
  private static logError(error: Error) {
    console.error(error);
  }

  private static checkIfUnexpected(error: Error): boolean {
    if (error instanceof BaseError) {
      return error.isUnexpected;
    }
    return true;
  }

  private static crashIfUnexpected(isUnexpected: boolean): void {
    if (isUnexpected) {
      process.exit(1);
    }
  }

  private static async errorReply(
    error: Error,
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    const content =
      error instanceof BaseError
        ? error.message
        : "Hubo terrible error en el server. Lewsha anda a arreglarlo burro";

    interaction.reply({ content, ephemeral: true });
  }

  public static async handleError(
    error: Error,
    interaction?: ChatInputCommandInteraction
  ): Promise<void> {
    this.logError(error);

    if (interaction) {
      await this.errorReply(error, interaction);
    }

    const isUnexpected = this.checkIfUnexpected(error);

    // this.crashIfUnexpected(isUnexpected);
  }
}

export default ErrorHandler;
