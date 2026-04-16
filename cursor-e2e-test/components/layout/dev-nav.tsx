// DEV-ONLY: floating nav button — remove before shipping
import Link from "next/link"

export function DevNav() {
  return (
    <Link
      href="/"
      className="fixed bottom-4 left-4 z-[9999] flex h-10 items-center gap-1.5 rounded-full bg-black/80 px-4 text-xs font-medium text-white shadow-lg backdrop-blur-sm transition-opacity hover:opacity-80"
    >
      ← Views
    </Link>
  )
}
