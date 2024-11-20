import { requestGGAI } from "@src/utils/google-gemini";
import { Response } from "@src/types/response";

const extractKeyWords = async function (text: string): Promise<Response> {
  const prompt: string =
    "Poderia extrair as palavras chaves desse texto para ser feita uma pesquisa? " +
    "\n" +
    text;
  const content: string = await requestGGAI(prompt);
  const response = { prompt, content };
  return response;
};

export { extractKeyWords };
