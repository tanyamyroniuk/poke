import { HERO_PEACH_BLUR_H } from "@/components/card-screen/constants"

export function HeroPeachBlur() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-b from-transparent to-[#ffddc7] backdrop-blur-[3.277px]"
      style={{
        height: HERO_PEACH_BLUR_H,
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,1) 100%)",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,1) 100%)",
      }}
      aria-hidden
    />
  )
}
