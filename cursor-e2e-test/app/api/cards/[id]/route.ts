import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const card = await prisma.card.findUnique({ where: { id } })
  if (!card) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(card)
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  await prisma.card.delete({ where: { id } })
  return new NextResponse(null, { status: 204 })
}
