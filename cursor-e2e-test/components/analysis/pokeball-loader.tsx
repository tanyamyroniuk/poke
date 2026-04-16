import { cn } from "@/lib/utils"

/** Pokéball loader built from Figma layers — counter-clockwise spin. */
export function PokeballLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn("size-9 shrink-0 animate-spin", className)}
      style={{ animationDirection: "reverse" }}
      role="status"
      aria-label="Loading"
    >
      <svg
        viewBox="0 0 92 92"
        fill="none"
        className="size-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* White lower half with outer border */}
        <path
          d="M46 89C69.7482 89 89 69.7482 89 46H3C3 69.7482 22.2518 89 46 89Z"
          fill="white"
          stroke="#020617"
          strokeWidth="6"
        />
        {/* Inner shadow in the lower white area */}
        <g transform="translate(11.7, 49)">
          <path
            d="M74.3438 0C73.0437 20.8693 55.7095 37.3935 34.5127 37.3936C19.7808 37.3936 6.91527 29.4107 0 17.5361C7.27227 25.1929 17.5498 29.9678 28.9434 29.9678C47.5531 29.9677 63.1882 17.2315 67.6074 0H74.3438Z"
            fill="#E8E8E8"
          />
        </g>
        {/* Red upper half with outer border + centre dividing line */}
        <path
          d="M46 3C22.2518 3 3 22.2518 3 46H89C89 22.2518 69.7482 3 46 3Z"
          fill="#DC2626"
          stroke="#020617"
          strokeWidth="6"
        />
        {/* Right-edge sheen on the red half */}
        <g transform="translate(75.15, 19)">
          <path
            d="M0 0C6.04873 6.36863 10.0155 14.7311 10.8164 24H5.20605C5.33337 22.7024 5.40037 21.3867 5.40039 20.0557C5.40039 12.7444 3.43191 5.8932 0 0Z"
            fill="#DC2626"
          />
        </g>
        {/* Centre button */}
        <circle cx="46" cy="46" r="14" fill="white" stroke="#020617" strokeWidth="6" />
      </svg>
    </div>
  )
}
