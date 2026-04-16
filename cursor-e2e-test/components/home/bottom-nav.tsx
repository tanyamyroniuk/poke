"use client"

import Link from "next/link"
import { ScanLine, Folders } from "lucide-react"
import { cn } from "@/lib/utils"

export type NavTab = "scan" | "collections"

interface BottomNavProps {
  activeTab?: NavTab
}

export function BottomNav({ activeTab = "scan" }: BottomNavProps) {
  return (
    <div className="bg-zinc-100 rounded-[11px] p-1.5 w-full">
      <div className="flex gap-1 items-center w-full">
        <Link
          href="/home"
          className={cn(
            "flex flex-1 gap-2 items-center justify-center px-4 py-3 rounded-md transition-colors select-none",
            activeTab === "scan"
              ? "bg-white text-foreground shadow-sm"
              : "text-muted-foreground hover:bg-white/60 hover:text-foreground"
          )}
        >
          <ScanLine className="size-4 shrink-0" />
          <span
            className={cn(
              "font-medium whitespace-nowrap",
              activeTab === "scan" ? "text-base" : "text-sm"
            )}
          >
            Scan card
          </span>
        </Link>

        <Link
          href="/collections"
          className={cn(
            "flex flex-1 gap-2 items-center justify-center px-4 py-2 rounded-md transition-colors select-none",
            activeTab === "collections"
              ? "bg-white text-foreground shadow-sm"
              : "text-muted-foreground hover:bg-white/60 hover:text-foreground"
          )}
        >
          <Folders className="size-4 shrink-0" />
          <span
            className={cn(
              "font-medium whitespace-nowrap",
              activeTab === "collections" ? "text-base" : "text-sm"
            )}
          >
            Collections
          </span>
        </Link>
      </div>
    </div>
  )
}
