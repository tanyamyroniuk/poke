interface HeroSectionProps {
  title?: string
  description?: string
}

export function HeroSection({
  title = "Scan or Upload your Pokemon card",
  description = "Upload an image of your trading card to analyze and add to your collection",
}: HeroSectionProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center w-full">
      <div className="size-[60px] shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/cards-icon.svg" alt="Pokémon cards" className="size-full object-contain" />
      </div>

      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-[40px] font-semibold text-accent-foreground tracking-[-0.8px] leading-[48px] text-center">
          {title}
        </h1>
        <p className="text-base text-muted-foreground leading-6 text-center mx-auto max-w-[353px]">
          {description}
        </p>
      </div>
    </div>
  )
}
