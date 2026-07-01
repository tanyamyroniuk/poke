"use client"

import { useRouter, usePathname } from "next/navigation"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  const router = useRouter()
  const pathname = usePathname()

  if (pathname === "/login") return null

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="fixed top-4 right-4 z-50 flex size-9 items-center justify-center rounded-full bg-white/80 text-slate-500 shadow-sm backdrop-blur-sm hover:bg-white hover:text-slate-700 transition-colors"
      aria-label="Sign out"
    >
      <LogOut className="size-4" strokeWidth={2} />
    </button>
  )
}
