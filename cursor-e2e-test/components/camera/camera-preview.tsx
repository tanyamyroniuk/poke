import { cn } from "@/lib/utils"

interface CameraPreviewProps {
  /** Show live video feed */
  cameraMode?: boolean
  videoRef?: React.RefObject<HTMLVideoElement | null>
  /** Captured / uploaded image data URL */
  imageSrc?: string
  className?: string
}

export function CameraPreview({
  cameraMode = false,
  videoRef,
  imageSrc,
  className,
}: CameraPreviewProps) {
  const base = cn(
    "relative w-full overflow-hidden rounded-2xl bg-black",
    "aspect-[3/4] min-h-[320px]",
    className
  )

  if (cameraMode) {
    return (
      <div className={base}>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 pointer-events-none" />
      </div>
    )
  }

  if (imageSrc) {
    return (
      <div className={base}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt="Captured card"
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>
    )
  }

  // Empty / placeholder state
  return (
    <div className={cn(base, "border-2 border-dashed border-[#d8daeb] bg-sidebar-accent")}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
        <p className="text-sm font-medium">Camera preview will appear here</p>
      </div>
    </div>
  )
}
