import { OpenAI } from "openai";
import { UserPrompt } from "../types";
import { BuildPrompt } from "../types/prompts";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const sendPrompt = async (prompt: UserPrompt) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: BuildPrompt(prompt),
      },
    ],
    response_format: { type: "json_object" },
  });
  return response;
};
