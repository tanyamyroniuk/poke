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
    <div className="sticky bottom-0 z-10 px-4 pb-4 pt-2">
      <div className="bg-zinc-100 rounded-[11px] p-1.5 w-full shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
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
            <span className="text-sm font-medium whitespace-nowrap">Scan card</span>
          </Link>

          <Link
            href="/collections"
            className={cn(
              "flex flex-1 gap-2 items-center justify-center px-4 py-3 rounded-md transition-colors select-none",
              activeTab === "collections"
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:bg-white/60 hover:text-foreground"
            )}
          >
            <Folders className="size-4 shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">Collections</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
