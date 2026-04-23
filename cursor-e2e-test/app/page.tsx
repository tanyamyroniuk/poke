import Link from "next/link"

const VIEWS = [
  { href: "/login", title: "Login" },
  { href: "/home", title: "Home" },
  { href: "/collections", title: "Collections" },
  { href: "/analysis", title: "Analysis" },
  { href: "/fake-card", title: "Fake card" },
  { href: "/original-card", title: "Original card" },
  { href: "/save-to-collection", title: "Save to Collection" },
  { href: "/camera-test", title: "Camera Test" },
  { href: "/camera-screen", title: "Camera Screen" },
] as const

export default function ViewsIndexPage() {
  return (
    <main className="flex min-h-full flex-col items-center bg-muted/40 px-4 py-6">
      <div className="w-full max-w-lg">
        <header className="mb-4">
          <h1 className="text-lg font-bold tracking-tight text-foreground">Views</h1>
        </header>

        <nav aria-label="App views" className="grid grid-cols-2 gap-2">
          {VIEWS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center rounded-xl border bg-card px-4 py-3 text-sm font-medium text-card-foreground shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  )
}
