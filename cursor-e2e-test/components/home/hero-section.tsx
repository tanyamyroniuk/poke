// Pokemon cards icon from Figma — replace with a static asset in production
const CARDS_ICON_SRC =
  "http://localhost:3845/assets/6bbf6d41f2319566142b4144554170475efc2b9e.svg"

interface HeroSectionProps {
  title?: string
  description?: string
  iconSrc?: string
}

export function HeroSection({
  title = "Scan or Upload your Pokemon card",
  description = "Upload an image of your trading card to analyze and add to your collection",
  iconSrc = CARDS_ICON_SRC,
}: HeroSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="size-[60px] shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconSrc} alt="Pokémon cards" className="size-full object-contain" />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-[40px] font-semibold text-accent-foreground tracking-[-0.8px] leading-[48px]">
          {title}
        </h1>
        <p className="text-base text-muted-foreground leading-6 max-w-[353px]">
          {description}
        </p>
      </div>
    </div>
  )
}
