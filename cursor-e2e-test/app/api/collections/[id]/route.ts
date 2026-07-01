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
  const collection = await prisma.collection.findUnique({
    where: { id },
    include: { cards: { orderBy: { scannedAt: "desc" } } },
  })
  if (!collection) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (collection.userId !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  return NextResponse.json(collection)
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = await getSessionUser()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const existing = await prisma.collection.findUnique({ where: { id }, select: { userId: true } })
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (existing.userId !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const body = await req.json()
  const data: { name?: string; thumbnailCardId?: string | null } = {}
  if (typeof body.name === "string" && body.name.trim()) data.name = body.name.trim()
  if ("thumbnailCardId" in body) data.thumbnailCardId = body.thumbnailCardId ?? null
  const collection = await prisma.collection.update({ where: { id }, data })
  return NextResponse.json(collection)
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = await getSessionUser()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const existing = await prisma.collection.findUnique({ where: { id }, select: { userId: true } })
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (existing.userId !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  await prisma.collection.delete({ where: { id } })
  return new NextResponse(null, { status: 204 })
}
