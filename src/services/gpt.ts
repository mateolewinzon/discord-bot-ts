import { OpenAIApi, Configuration, CreateChatCompletionRequest } from "openai";

class GPTChat {
  private openai: OpenAIApi;

  constructor(apiKey: string) {
    const configuration = new Configuration({
      apiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async createSimpleChatCompletion(
    messages: CreateChatCompletionRequest["messages"]
  ): Promise<string> {
    const completionRequest: CreateChatCompletionRequest = {
      model: "gpt-3.5-turbo",
      temperature: 1,
      messages,
    };

    try {
      const completion = await this.openai.createChatCompletion(
        completionRequest
      );
      console.log(completion);
      return completion.data.choices[0].message?.content!;
    } catch (error) {
      console.error("Error creating chat completion:", error);
      throw error;
    }
  }
}

const gptChat = new GPTChat(process.env.OPENAI_API_KEY as string);

export async function createStory(text: string) {
  const story = await gptChat.createSimpleChatCompletion([
    {
      role: "user",
      content: `Genera una breve historia acerca de esto: ${text}`,
    },
  ]);

  console.log(story);
  return story;
}
