import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const collectionId = searchParams.get("collectionId")
  const cards = await prisma.card.findMany({
    where: collectionId ? { collectionId } : undefined,
    orderBy: { scannedAt: "desc" },
  })
  return NextResponse.json(cards)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { pokemonName, isOriginal, collectionId, imageUrl, estimatedValue, authenticityScore } = body
  const card = await prisma.card.create({
    data: {
      pokemonName: pokemonName ?? "Scanned Card",
      isOriginal: Boolean(isOriginal),
      collectionId: collectionId ?? null,
      imageUrl: imageUrl ?? null,
      estimatedValue: estimatedValue ?? null,
      authenticityScore: authenticityScore ?? null,
    },
  })
  return NextResponse.json(card, { status: 201 })
}
