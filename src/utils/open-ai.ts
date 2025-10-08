import { OpenAI } from "openai";
import { UserPrompt } from "../types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const sendPrompt = async(prompt: UserPrompt) {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: ``
            }
        ]
    })
}