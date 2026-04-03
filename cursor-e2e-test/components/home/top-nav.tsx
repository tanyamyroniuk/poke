"use client"

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

export type NavTab = "home" | "collections" | "directory"

interface TopNavProps {
  activeTab?: NavTab
}

export function TopNav({ activeTab = "home" }: TopNavProps) {
  const linkClass = (tab: NavTab) =>
    cn(
      "flex h-9 items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors select-none cursor-pointer",
      activeTab === tab
        ? "bg-white text-foreground shadow-sm"
        : "bg-transparent text-muted-foreground hover:bg-white/60 hover:text-foreground"
    )

  return (
    <div className="bg-zinc-100 rounded-[11px] p-1.5 w-full">
      <NavigationMenu className="max-w-none w-full">
        <NavigationMenuList className="justify-start space-x-0 gap-0 w-full">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/home" className={linkClass("home")}>
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                "h-9 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                activeTab === "collections"
                  ? "bg-white text-foreground shadow-sm"
                  : "bg-transparent text-muted-foreground hover:bg-white/60 hover:text-foreground data-[state=open]:bg-white/60 data-[state=open]:text-foreground"
              )}
            >
              My Collections
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-1 p-2 w-[180px]">
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/collections/all"
                      className="block text-sm text-foreground rounded-md px-3 py-2 hover:bg-accent transition-colors"
                    >
                      All Cards
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/collections/favorites"
                      className="block text-sm text-foreground rounded-md px-3 py-2 hover:bg-accent transition-colors"
                    >
                      Favorites
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/directory" className={linkClass("directory")}>
                Card Directory
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
