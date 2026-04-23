"use client"

import { useRef, useState, useEffect, useCallback } from "react"

interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>
  isActive: boolean
  error: string
  isSupported: boolean
  startCamera: () => Promise<void>
  stopCamera: () => void
  takePhoto: () => Promise<File | null>
}

export function useCamera(): UseCameraReturn {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const [isActive, setIsActive] = useState(false)
  const [error, setError] = useState("")
  const [isSupported, setIsSupported] = useState(false)

  // Defer browser API check to client only (avoids SSR hydration mismatch)
  useEffect(() => {
    setIsSupported(
      typeof navigator !== "undefined" &&
        !!navigator.mediaDevices?.getUserMedia
    )
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopStreamTracks()
    }
  }, [])

  function stopStreamTracks() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
      console.log("[useCamera] stream stopped")
    }
  }

  const stopCamera = useCallback(() => {
    stopStreamTracks()
    setIsActive(false)
    setError("")
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    console.log("[useCamera] camera stopped")
  }, [])

  const startCamera = useCallback(async () => {
    setError("")

    // CRITICAL: Set isActive first so the video element renders in the DOM
    // before we try to attach the stream to it (fixes black screen bug)
    setIsActive(true)

    // Yield to React to flush the DOM update
    await new Promise<void>((resolve) => setTimeout(resolve, 0))

    try {
      console.log("[useCamera] requesting camera stream…")

      let stream: MediaStream

      try {
        // Prefer rear camera on mobile; desktop ignores facingMode
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        })
      } catch {
        // Fallback: try without facingMode constraint (desktop-safe)
        console.log("[useCamera] retrying without facingMode…")
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        })
      }

      streamRef.current = stream
      console.log("[useCamera] stream acquired")

      const video = videoRef.current
      if (!video) {
        // Video element still didn't mount — abort cleanly
        stopStreamTracks()
        setIsActive(false)
        setError("Camera preview failed to initialize.")
        return
      }

      video.srcObject = stream

      // Wait for metadata so dimensions are known before playing
      await new Promise<void>((resolve, reject) => {
        video.onloadedmetadata = () => resolve()
        video.onerror = () => reject(new Error("Video element error"))
        // Safety timeout
        setTimeout(resolve, 3000)
      })

      try {
        await video.play()
        console.log("[useCamera] video playing")
      } catch (playErr) {
        console.warn("[useCamera] video.play() rejected:", playErr)
      }
    } catch (err) {
      stopStreamTracks()
      setIsActive(false)

      if (err instanceof DOMException) {
        switch (err.name) {
          case "NotAllowedError":
          case "PermissionDeniedError":
            setError("Camera permission denied. Please allow access and try again.")
            break
          case "NotFoundError":
          case "DevicesNotFoundError":
            setError("No camera found on this device.")
            break
          case "NotReadableError":
          case "TrackStartError":
            setError("Camera is already in use by another app.")
            break
          default:
            setError("Could not start camera. Please try again.")
        }
      } else {
        setError("Could not start camera. Please try again.")
      }

      console.error("[useCamera] error:", err)
    }
  }, [])

  const takePhoto = useCallback(async (): Promise<File | null> => {
    const video = videoRef.current
    if (!video || !streamRef.current) return null

    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    return new Promise<File | null>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) { resolve(null); return }
          const filename = `scan-${Date.now()}.jpg`
          resolve(new File([blob], filename, { type: "image/jpeg" }))
          console.log("[useCamera] photo captured:", filename)
        },
        "image/jpeg",
        0.92
      )
    })
  }, [])

  return { videoRef, isActive, error, isSupported, startCamera, stopCamera, takePhoto }
}
