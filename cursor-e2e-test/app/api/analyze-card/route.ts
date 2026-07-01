import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import OpenAI from "openai"
import type { CardAnalysisResult } from "@/lib/types/card-analysis"
import { FALLBACK_RESULT } from "@/lib/types/card-analysis"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// The model may wrap its JSON in markdown code fences or add stray prose.
// Strip fences and isolate the outermost JSON object before parsing.
function extractJson(raw: string): string {
  let text = raw.trim()
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
  if (fenced) text = fenced[1].trim()
  const first = text.indexOf("{")
  const last = text.lastIndexOf("}")
  if (first !== -1 && last !== -1 && last > first) {
    text = text.slice(first, last + 1)
  }
  return text
}

export async function POST(req: Request) {
  const { imageData } = await req.json()

  if (!imageData || typeof imageData !== "string") {
    return NextResponse.json({ error: "imageData is required" }, { status: 400 })
  }

  const promptPath = path.join(process.cwd(), "prompts", "pokemon-card-analysis.md")
  const prompt = fs.readFileSync(promptPath, "utf-8")

  try {
    // NOTE: Web search and JSON mode (text.format: json_object) are mutually
    // exclusive in the Responses API, so we rely on the prompt to enforce JSON
    // and strip any stray markdown fences before parsing.
    const response = await openai.responses.create({
      model: "gpt-4o",
      tools: [{ type: "web_search_preview" }],
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: prompt },
            { type: "input_image", image_url: imageData, detail: "high" },
          ],
        },
      ],
    })

    const raw = response.output_text ?? ""
    console.log("[analyze-card] raw output:", raw.slice(0, 200))

    const result: CardAnalysisResult = JSON.parse(extractJson(raw))
    console.log("[analyze-card] resultType:", result.resultType)
    return NextResponse.json(result)
  } catch (err) {
    console.error("[analyze-card] error:", err instanceof Error ? err.message : String(err))
    return NextResponse.json(FALLBACK_RESULT)
  }
}
