"use client"

import { useState } from "react"
import { Camera, X, ZapIcon, AlertCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CameraPreview } from "@/components/camera/camera-preview"
import { useCamera } from "@/hooks/use-camera"
import { cn } from "@/lib/utils"

export default function CameraTestPage() {
  const camera = useCamera()
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [capturedFile, setCapturedFile] = useState<File | null>(null)

  async function handleStartCamera() {
    setCapturedImage(null)
    setCapturedFile(null)
    await camera.startCamera()
  }

  async function handleTakePhoto() {
    const file = await camera.takePhoto()
    camera.stopCamera()

    if (file) {
      setCapturedFile(file)
      const url = URL.createObjectURL(file)
      setCapturedImage(url)
    }
  }

  function handleCancel() {
    camera.stopCamera()
  }

  function handleReset() {
    if (capturedImage) URL.revokeObjectURL(capturedImage)
    setCapturedImage(null)
    setCapturedFile(null)
  }

  const showScanButton = !camera.isActive && !capturedImage && camera.isSupported
  const showUnsupportedHint = !camera.isSupported

  return (
    <main className="flex min-h-full flex-col bg-white">
      <div className="relative w-full max-w-sm flex flex-col flex-1 px-6 pt-8 pb-8 mx-auto gap-6">

        {/* Header */}
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-[#101111]">Camera Test</h1>
          <p className="mt-1 text-sm text-[#7d7d7d]">
            Try the live camera capture feature.
          </p>
        </header>

        {/* Preview area — same container for all three states */}
        <CameraPreview
          cameraMode={camera.isActive}
          videoRef={camera.videoRef}
          imageSrc={capturedImage ?? undefined}
        />

        {/* Error banner */}
        {camera.error && (
          <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
            <p className="text-sm text-destructive">{camera.error}</p>
          </div>
        )}

        {/* Unsupported hint */}
        {showUnsupportedHint && !camera.error && (
          <div className="flex items-start gap-3 rounded-xl border border-muted bg-muted/40 px-4 py-3">
            <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Camera API is not available in this browser. Try Chrome or Safari over HTTPS.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {/* Idle — show Scan button */}
          {showScanButton && (
            <Button
              className="w-full h-14 rounded-2xl gap-3 text-base font-medium [&_svg]:size-5"
              onClick={handleStartCamera}
            >
              <Camera />
              Scan with Camera
            </Button>
          )}

          {/* Camera active — show Take Photo + Cancel */}
          {camera.isActive && (
            <>
              <Button
                className="w-full h-14 rounded-2xl gap-3 text-base font-medium [&_svg]:size-5"
                onClick={handleTakePhoto}
              >
                <ZapIcon />
                Take Photo
              </Button>
              <Button
                variant="outline"
                className="w-full h-14 rounded-2xl gap-3 text-base font-medium [&_svg]:size-5"
                onClick={handleCancel}
              >
                <X />
                Cancel
              </Button>
            </>
          )}

          {/* Image captured — show re-scan option */}
          {capturedImage && !camera.isActive && (
            <>
              <div className="rounded-xl border border-muted bg-muted/40 px-4 py-3">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Captured:</span>{" "}
                  {capturedFile?.name} &mdash;{" "}
                  {capturedFile ? `${(capturedFile.size / 1024).toFixed(1)} KB` : ""}
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full h-14 rounded-2xl gap-3 text-base font-medium [&_svg]:size-5"
                onClick={handleReset}
              >
                <Camera />
                Scan Again
              </Button>
            </>
          )}

          {/* Error recovery — try again */}
          {camera.error && !camera.isActive && (
            <Button
              variant="outline"
              className={cn("w-full h-14 rounded-2xl gap-3 text-base font-medium [&_svg]:size-5")}
              onClick={handleStartCamera}
            >
              <Camera />
              Try Again
            </Button>
          )}
        </div>

      </div>
    </main>
  )
}
