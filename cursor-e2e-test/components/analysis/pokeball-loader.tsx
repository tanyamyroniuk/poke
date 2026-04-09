import { cn } from "@/lib/utils"

/** Compact Pokéball used as the analysis loading mark (Figma loader). */
export function PokeballLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn("size-9 shrink-0 animate-spin text-foreground", className)}
      role="status"
      aria-label="Loading"
    >
      <svg
        viewBox="0 0 36 36"
        fill="none"
        className="size-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="18"
          r="15.25"
          className="fill-white stroke-neutral-800"
          strokeWidth="1.5"
        />
        <path
          d="M18 2.75a15.25 15.25 0 0 1 15.25 15.25H2.75A15.25 15.25 0 0 1 18 2.75Z"
          className="fill-red-600"
        />
        <path
          d="M2.75 18h30.5"
          className="stroke-neutral-800"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle
          cx="18"
          cy="18"
          r="5"
          className="fill-white stroke-neutral-800"
          strokeWidth="1.5"
        />
        <circle cx="18" cy="18" r="2" className="fill-neutral-800" />
      </svg>
    </div>
  )
}
