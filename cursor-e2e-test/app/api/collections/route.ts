import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cardNumericValue } from "@/lib/card-value"
import { getSessionUser } from "@/lib/session"

export async function GET() {
  const userId = await getSessionUser()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const collections = await prisma.collection.findMany({
    where: { userId },
    include: {
      _count: { select: { cards: true } },
      cards: {
        select: { id: true, imageUrl: true, estimatedValue: true, analysisJson: true, isOriginal: true },
        orderBy: { scannedAt: "asc" },
      },
    },
    orderBy: { createdAt: "asc" },
  })

  return NextResponse.json(
    collections.map((c) => {
      const total = c.cards.reduce((sum, card) => sum + cardNumericValue(card.estimatedValue, card.analysisJson), 0)
      const originalCount = c.cards.filter((card) => card.isOriginal).length
      const chosen = c.thumbnailCardId ? c.cards.find((card) => card.id === c.thumbnailCardId) : null
      const coverImageUrl =
        chosen?.imageUrl ?? c.cards.find((card) => card.imageUrl)?.imageUrl ?? null
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
