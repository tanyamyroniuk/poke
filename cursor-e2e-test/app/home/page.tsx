"use client"

import { useRouter } from "next/navigation"
import { HeroSection } from "@/components/home/hero-section"
import { FileUploader } from "@/components/home/file-uploader"
import { OrSeparator } from "@/components/home/or-separator"
import { CameraButton } from "@/components/home/camera-button"
import { BottomNav } from "@/components/home/bottom-nav"
export default function HomePage() {
  const router = useRouter()

  function handleFileSelect(file: File) {
    const objectUrl = URL.createObjectURL(file)
    const img = new window.Image()
    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      const MAX_DIM = 900
      let { width, height } = img
      if (width > MAX_DIM || height > MAX_DIM) {
        if (width > height) {
          height = Math.round(height * (MAX_DIM / width))
          width = MAX_DIM
        } else {
          width = Math.round(width * (MAX_DIM / height))
          height = MAX_DIM
        }
      }
      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")!
      ctx.drawImage(img, 0, 0, width, height)
      const dataUrl = canvas.toDataURL("image/jpeg", 0.82)
      sessionStorage.setItem("capturedCardImage", dataUrl)
      router.push("/analysis")
    }
    img.src = objectUrl
  }

  return (
    <main className="flex min-h-full flex-col bg-white">
      <div className="relative w-full flex flex-col flex-1 justify-center px-8 py-6 mx-auto gap-12">
        <HeroSection />
        <div className="flex flex-col gap-6">
          <FileUploader onFileSelect={handleFileSelect} />
          <OrSeparator />
          <CameraButton href="/camera-screen" />
        </div>
      </div>
      <BottomNav activeTab="scan" />
    </main>
  )
}
