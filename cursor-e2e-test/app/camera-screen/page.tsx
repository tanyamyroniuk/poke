"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Info } from "lucide-react"
import { useCamera } from "@/hooks/use-camera"
import { cn } from "@/lib/utils"

// Corner marker: draws two perpendicular lines in one corner of the card frame
function CornerMarker({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}) {
  const isTop = position.startsWith("top")
  const isLeft = position.endsWith("left")

  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute w-8 h-8",
        isTop ? "top-0" : "bottom-0",
        isLeft ? "left-0" : "right-0"
      )}
    >
      {/* horizontal arm */}
      <span
        className={cn(
          "absolute h-[3px] w-8 bg-red-500 rounded-full",
          isTop ? "top-0" : "bottom-0",
          isLeft ? "left-0" : "right-0"
        )}
      />
      {/* vertical arm */}
      <span
        className={cn(
          "absolute w-[3px] h-8 bg-red-500 rounded-full",
          isTop ? "top-0" : "bottom-0",
          isLeft ? "left-0" : "right-0"
        )}
      />
    </span>
  )
}

export default function CameraScreenPage() {
  const router = useRouter()
  const camera = useCamera()
  const [capturing, setCapturing] = useState(false)

  // Auto-start camera when page mounts
  useEffect(() => {
    camera.startCamera()
    return () => {
      camera.stopCamera()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleCapture() {
    if (capturing) return
    setCapturing(true)
    const file = await camera.takePhoto()
    camera.stopCamera()

    if (file) {
      // Store file in sessionStorage as a data URL for the next screen
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === "string") {
          sessionStorage.setItem("capturedCardImage", reader.result)
        }
        router.push("/analysis")
      }
      reader.readAsDataURL(file)
    } else {
      setCapturing(false)
    }
  }

  function handleBack() {
    camera.stopCamera()
    router.back()
  }

  return (
    // Full-bleed screen — overrides the AppShell padding
    <div className="fixed inset-0 overflow-hidden bg-black">

      {/* ── Camera feed ── */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={camera.videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* ── Dark scrim with card-shaped cutout via box-shadow ── */}
      {/* The card frame sits at ~8% horizontal margin, ~20% from top, standard card aspect ratio */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute rounded-[14px]",
          // box-shadow creates the surrounding dark overlay
          "shadow-[0_0_0_9999px_rgba(0,0,0,0.55)]",
          // Responsive card frame: centered, ~84% of container width, card aspect ratio
          "left-[8%] right-[8%]",
          "top-[20%]",
          "aspect-[344/479]"  // matches Figma card frame proportions
        )}
      >
        {/* Red corner markers */}
        <CornerMarker position="top-left" />
        <CornerMarker position="top-right" />
        <CornerMarker position="bottom-left" />
        <CornerMarker position="bottom-right" />
      </div>

      {/* ── "Align card with frame" hint label ── */}
      <div className="absolute top-[14%] left-1/2 -translate-x-1/2 whitespace-nowrap">
        <div className="rounded-lg bg-black/30 px-4 py-1">
          <p className="text-sm text-white font-normal">Align card with frame</p>
        </div>
      </div>

      {/* ── Back button (top-left) ── */}
      <button
        onClick={handleBack}
        aria-label="Go back"
        className="absolute left-8 top-10 flex items-center justify-center size-16 rounded-2xl bg-black/20 shadow-sm backdrop-blur-sm transition-opacity hover:opacity-80 active:opacity-60"
      >
        <ArrowLeft className="size-6 text-white" />
      </button>

      {/* ── Info button (top-right) ── */}
      <button
        aria-label="Information"
        className="absolute right-8 top-10 flex items-center justify-center size-16 rounded-full bg-black/20 shadow-sm backdrop-blur-sm transition-opacity hover:opacity-80 active:opacity-60"
      >
        <Info className="size-6 text-white" />
      </button>

      {/* ── Shutter button (bottom center) ── */}
      <button
        onClick={handleCapture}
        disabled={!camera.isActive || capturing}
        aria-label="Take photo"
        className={cn(
          "absolute bottom-[8%] left-1/2 -translate-x-1/2",
          "size-[88px] rounded-full",
          // Outer ring
          "ring-4 ring-white/60 ring-offset-4 ring-offset-transparent",
          // Inner fill
          "bg-white shadow-lg",
          "transition-transform active:scale-95",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      />

      {/* ── Error overlay ── */}
      {camera.error && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-[80%] max-w-sm">
          <div className="rounded-xl bg-black/70 px-4 py-3 text-center text-sm text-white backdrop-blur-sm">
            {camera.error}
          </div>
        </div>
      )}

      {/* ── Flash effect on capture ── */}
      {capturing && (
        <div className="absolute inset-0 bg-white animate-ping opacity-0 pointer-events-none" />
      )}
    </div>
  )
}
