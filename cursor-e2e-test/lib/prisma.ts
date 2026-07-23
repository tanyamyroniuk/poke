import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient
  prismaKeepAlive?: ReturnType<typeof setInterval>
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// Neon suspends its compute after ~5 minutes of inactivity, so the next query
// stalls for several seconds while it wakes. Ping every 4 minutes to keep it
// warm while the server is running. unref() lets short-lived processes
// (build, seed scripts) exit normally.
if (!globalForPrisma.prismaKeepAlive) {
  globalForPrisma.prismaKeepAlive = setInterval(() => {
    prisma.$queryRaw`SELECT 1`.catch(() => {})
  }, 4 * 60 * 1000)
  globalForPrisma.prismaKeepAlive.unref?.()
}
