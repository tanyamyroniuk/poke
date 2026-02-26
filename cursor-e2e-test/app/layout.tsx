import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "cursor-e2e-test",
  description: "An end-to-end learning playground built step by step.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
