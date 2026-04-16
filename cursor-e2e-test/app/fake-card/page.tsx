import { FakeCardScreen } from "@/components/fake-card/fake-card-screen"

export default function FakeCardPage() {
  return (
    <main className="mx-auto flex h-[min(956px,100dvh)] min-h-0 w-full max-w-[440px] shrink-0 flex-col overflow-hidden bg-white">
      <FakeCardScreen />
    </main>
  )
}
