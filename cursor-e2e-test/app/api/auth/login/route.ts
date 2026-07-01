import { NextResponse } from "next/server"
import { findUser } from "@/lib/users"
import { setSessionCookie } from "@/lib/session"

export async function POST(req: Request) {
  const { username, password } = await req.json()
  if (!username || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 })
  }
  const user = findUser(username.trim().toLowerCase(), password)
  if (!user) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
  }
  await setSessionCookie(user.username)
  return NextResponse.json({ username: user.username })
}
