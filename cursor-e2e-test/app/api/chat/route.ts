import { NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: "OpenAI API key not configured. Add OPENAI_API_KEY to .env.local" },
      { status: 500 }
    )
  }

  const { message } = await request.json()
  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Message is required" }, { status: 400 })
  }

  const openai = new OpenAI({ apiKey })

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant for a Pokémon card authentication app. Keep responses concise.",
      },
      { role: "user", content: message },
    ],
  })

  const reply = completion.choices[0]?.message?.content ?? "No response"
  return NextResponse.json({ reply })
}
