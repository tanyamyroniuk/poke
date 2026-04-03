import { TopNav } from "@/components/home/top-nav"
import { HeroSection } from "@/components/home/hero-section"
import { FileUploader } from "@/components/home/file-uploader"
import { OrSeparator } from "@/components/home/or-separator"
import { CameraButton } from "@/components/home/camera-button"

export default function HomePage() {
  return (
    <main className="flex min-h-screen justify-center bg-white">
      <div className="relative w-full max-w-sm flex flex-col px-8 pt-6 pb-8">
        <TopNav activeTab="home" />

        <div className="mt-12">
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

        {/* iOS-style home indicator */}
        <div className="flex justify-center mt-auto pt-8">
          <div className="h-[5px] w-[204px] bg-black rounded-3xl" />
        </div>
      </div>
    </main>
  )
}
