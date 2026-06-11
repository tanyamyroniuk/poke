import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const collection = await prisma.collection.findUnique({
    where: { id },
    include: { cards: { orderBy: { scannedAt: "desc" } } },
  })
  if (!collection) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  return NextResponse.json(collection)
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  await prisma.collection.delete({ where: { id } })
  return new NextResponse(null, { status: 204 })
}
