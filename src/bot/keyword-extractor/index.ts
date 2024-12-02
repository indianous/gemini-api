import { requestGGAI } from "@src/utils/google-gemini";

class KeywordExtractor {
  constructor() {}
  async execute(text: string): Promise<{ prompt: string; content: string }> {
    const prompt: string =
      "Poderia extrair as palavras chaves desse texto para ser feita uma pesquisa? " +
      "\n" +
      text;
    const content: string = await requestGGAI(prompt);
    const response = { prompt, content };
    return response;
  }
}

const keywordExtractor = new KeywordExtractor();
export { keywordExtractor };
