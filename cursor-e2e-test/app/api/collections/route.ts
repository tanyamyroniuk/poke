import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cardNumericValue } from "@/lib/card-value"
import { getSessionUser } from "@/lib/session"

export async function GET() {
  const userId = await getSessionUser()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // Card images are stored as base64 data URLs, so pulling every card's
  // imageUrl here made this response megabytes large. Fetch card metadata
  // without images, then resolve just one cover image per collection.
  const collections = await prisma.collection.findMany({
    where: { userId },
    include: {
      _count: { select: { cards: true } },
      cards: {
        select: { id: true, estimatedValue: true, analysisJson: true, isOriginal: true },
        orderBy: { scannedAt: "asc" },
      },
    },
    orderBy: { createdAt: "asc" },
  })

  const collectionIds = collections.map((c) => c.id)
  const thumbnailIds = collections
    .map((c) => c.thumbnailCardId)
    .filter((id): id is string => Boolean(id))

  const [chosenCards, firstImageCards] = await Promise.all([
    thumbnailIds.length
      ? prisma.card.findMany({
          where: { id: { in: thumbnailIds } },
          select: { id: true, collectionId: true, imageUrl: true },
        })
      : Promise.resolve([]),
    collectionIds.length
      ? prisma.$queryRaw<{ collectionId: string; imageUrl: string }[]>`
          SELECT DISTINCT ON ("collectionId") "collectionId", "imageUrl"
          FROM "Card"
          WHERE "collectionId" = ANY(${collectionIds}::text[]) AND "imageUrl" IS NOT NULL
          ORDER BY "collectionId", "scannedAt" ASC`
      : Promise.resolve([]),
  ])

  const chosenById = new Map(chosenCards.map((card) => [card.id, card]))
  const firstImageByCollection = new Map(firstImageCards.map((row) => [row.collectionId, row.imageUrl]))

  return NextResponse.json(
    collections.map((c) => {
      const total = c.cards.reduce((sum, card) => sum + cardNumericValue(card.estimatedValue, card.analysisJson), 0)
      const originalCount = c.cards.filter((card) => card.isOriginal).length
      const chosen = c.thumbnailCardId ? chosenById.get(c.thumbnailCardId) : null
      const coverImageUrl =
        (chosen?.collectionId === c.id ? chosen.imageUrl : null) ?? firstImageByCollection.get(c.id) ?? null
      return {
        id: c.id,
        name: c.name,
        cardCount: c._count.cards,
        totalValue: total,
        isOriginalCollection: c.cards.length === 0 ? true : originalCount >= c.cards.length / 2,
        coverImageUrl,
      }
    }),
  )
}

export async function POST(req: Request) {
  const userId = await getSessionUser()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { name } = await req.json()
  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 })
  }
  const collection = await prisma.collection.create({ data: { name: name.trim(), userId } })
  return NextResponse.json(collection, { status: 201 })
}
