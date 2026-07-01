import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSessionUser } from "@/lib/session"

export async function GET(req: Request) {
  const userId = await getSessionUser()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const collectionId = searchParams.get("collectionId")

  if (collectionId) {
    const col = await prisma.collection.findUnique({ where: { id: collectionId }, select: { userId: true } })
    if (!col) return NextResponse.json({ error: "Not found" }, { status: 404 })
    if (col.userId !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const cards = await prisma.card.findMany({
    where: collectionId ? { collectionId } : { collection: { userId } },
    orderBy: { scannedAt: "desc" },
  })
  return NextResponse.json(cards)
}

export async function POST(req: Request) {
  const userId = await getSessionUser()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { pokemonName, isOriginal, collectionId, imageUrl, estimatedValue, authenticityScore, analysisJson } = body

  if (collectionId) {
    const col = await prisma.collection.findUnique({ where: { id: collectionId }, select: { userId: true } })
    if (!col) return NextResponse.json({ error: "Collection not found" }, { status: 404 })
    if (col.userId !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const card = await prisma.card.create({
    data: {
      pokemonName: pokemonName ?? "Scanned Card",
      isOriginal: Boolean(isOriginal),
      collectionId: collectionId ?? null,
      imageUrl: imageUrl ?? null,
      estimatedValue: estimatedValue ?? null,
      authenticityScore: authenticityScore ?? null,
      analysisJson: analysisJson ?? null,
    },
  })
  return NextResponse.json(card, { status: 201 })
}
