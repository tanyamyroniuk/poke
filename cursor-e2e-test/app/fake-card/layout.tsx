import type { ReactNode } from "react"

/**
 * Same viewport lock as analysis so hero + sheet stay fixed while inner content scrolls.
 */
export default function FakeCardLayout({ children }: { children: ReactNode }) {
  return <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
}
