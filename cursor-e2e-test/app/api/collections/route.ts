import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const collections = await prisma.collection.findMany({
    include: {
      _count: { select: { cards: true } },
      cards: { select: { estimatedValue: true, isOriginal: true } },
    },
    orderBy: { createdAt: "asc" },
  })

  return NextResponse.json(
    collections.map((c) => {
      const total = c.cards.reduce((sum, card) => sum + (card.estimatedValue ?? 0), 0)
      const originalCount = c.cards.filter((card) => card.isOriginal).length
      return {
        id: c.id,
        name: c.name,
        cardCount: c._count.cards,
        totalValue: total,
        isOriginalCollection: c.cards.length === 0 ? true : originalCount >= c.cards.length / 2,
      }
    }),
  )
}

export async function POST(req: Request) {
  const { name } = await req.json()
  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 })
  }
  const collection = await prisma.collection.create({ data: { name: name.trim() } })
  return NextResponse.json(collection, { status: 201 })
}
