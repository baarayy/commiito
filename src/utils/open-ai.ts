process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { OpenAI } from "openai";
import { UserPrompt } from "../types";
import { BuildPrompt } from "../types/prompts";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.GEMINI_KEY,
  baseURL:
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
});

export const sendPrompt = async (prompt: UserPrompt) => {
  const response = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
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
