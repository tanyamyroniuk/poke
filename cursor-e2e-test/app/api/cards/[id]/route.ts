import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSessionUser } from "@/lib/session"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = await getSessionUser()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const card = await prisma.card.findUnique({
    where: { id },
    include: { collection: { select: { userId: true } } },
  })
  if (!card) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (card.collection && card.collection.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  return NextResponse.json(card)
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = await getSessionUser()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const card = await prisma.card.findUnique({
    where: { id },
    include: { collection: { select: { userId: true } } },
  })
  if (!card) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (card.collection && card.collection.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  await prisma.card.delete({ where: { id } })
  return new NextResponse(null, { status: 204 })
}
