import { env } from "../env";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const requestGGAI = async function (prompt: string) {
  const result = await model.generateContent(prompt);

  return result.response.text();
};

export { requestGGAI };
