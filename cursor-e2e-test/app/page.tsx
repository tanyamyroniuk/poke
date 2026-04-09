import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const VIEWS = [
  {
    href: "/login",
    title: "Login",
    description: "Sign in with email and password (demo routes to Home).",
  },
  {
    href: "/home",
    title: "Home",
    description: "Scan or upload a Pokémon card, file uploader, and camera entry.",
  },
  {
    href: "/analysis",
    title: "Analysis",
    description: "Processing screen with steps, mock card image, and actions.",
  },
] as const

export default function ViewsIndexPage() {
  return (
    <main className="flex min-h-full flex-col items-center bg-muted/40 px-4 py-10">
      <div className="w-full max-w-lg">
        <header className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Views</h1>
          <p className="mt-1 text-sm text-muted-foreground">Jump to any screen in the app</p>
        </header>

        <nav aria-label="App views" className="grid gap-4 sm:grid-cols-1">
          {VIEWS.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </nav>
      </div>
    </main>
  )
}
