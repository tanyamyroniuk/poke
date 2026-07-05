export default function Loading() {
  return (
    <div className="flex h-[100dvh] w-full items-center justify-center bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/loader.svg" alt="" className="size-14 animate-spin" />
    </div>
  )
}
