import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import OpenAI from "openai"
import type { CardAnalysisResult } from "@/lib/types/card-analysis"
import { FALLBACK_RESULT } from "@/lib/types/card-analysis"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  const { imageData } = await req.json()

  if (!imageData || typeof imageData !== "string") {
    return NextResponse.json({ error: "imageData is required" }, { status: 400 })
  }

  const promptPath = path.join(process.cwd(), "prompts", "pokemon-card-analysis.md")
  const prompt = fs.readFileSync(promptPath, "utf-8")

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: imageData, detail: "high" } },
          ],
        },
      ],
    })

    const raw = completion.choices[0]?.message?.content ?? ""
    console.log("[analyze-card] resultType:", JSON.parse(raw)?.resultType ?? "parse-error")

    const result: CardAnalysisResult = JSON.parse(raw)
    return NextResponse.json(result)
  } catch (err) {
    console.error("[analyze-card] error:", err instanceof Error ? err.message : "unknown")
    return NextResponse.json(FALLBACK_RESULT)
  }
}
