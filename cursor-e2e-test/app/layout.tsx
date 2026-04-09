import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AppShell } from "@/components/layout/app-shell"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-app",
})

export const metadata: Metadata = {
  title: "cursor-e2e-test",
  description: "An end-to-end learning playground built step by step.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} h-dvh`}>
      <body
        className={`${inter.className} flex h-dvh min-h-0 flex-col overflow-hidden bg-background font-sans antialiased`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
