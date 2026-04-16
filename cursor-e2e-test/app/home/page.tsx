import { HeroSection } from "@/components/home/hero-section"
import { FileUploader } from "@/components/home/file-uploader"
import { OrSeparator } from "@/components/home/or-separator"
import { CameraButton } from "@/components/home/camera-button"
import { BottomNav } from "@/components/home/bottom-nav"

export default function HomePage() {
  return (
    <main className="flex min-h-full flex-col justify-center bg-white">
      <div className="relative w-full max-w-sm flex flex-col flex-1 px-8 pt-6 pb-8 mx-auto">
        <div className="mt-6">
          <HeroSection />
        </div>

        <div className="mt-12">
          <FileUploader />
        </div>

        <div className="mt-6">
          <OrSeparator />
        </div>

        <div className="mt-6">
          <CameraButton />
        </div>

        <div className="mt-auto pt-10">
          <BottomNav activeTab="scan" />
        </div>
      </div>
    </main>
  )
}
