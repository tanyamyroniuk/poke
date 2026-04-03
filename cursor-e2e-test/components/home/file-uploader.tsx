"use client"

import { useRef, useState } from "react"
import { ArrowUpFromLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploaderProps {
  onFileSelect?: (file: File) => void
  accept?: string
  maxSizeMB?: number
}

export function FileUploader({
  onFileSelect,
  accept = "image/jpeg,image/png",
  maxSizeMB = 10,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onFileSelect?.(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) onFileSelect?.(file)
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave() {
    setIsDragging(false)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload card image"
      className={cn(
        "bg-sidebar-accent border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-6 cursor-pointer transition-colors",
        isDragging ? "border-primary bg-primary/5" : "border-[#d8daeb]"
      )}
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleFileChange}
      />

      <ArrowUpFromLine className="size-6 text-primary" />

      <div className="flex flex-col items-center gap-3 text-center w-full">
        <p className="text-xl font-medium text-[#101111] leading-7">
          Click to upload your card image
        </p>
        <p className="text-sm text-[#7d7d7d] leading-[21px]">
          JPEG or PNG up to {maxSizeMB}MB
        </p>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="rounded-[10px] border-[#d5d3e0] shadow-[0px_5px_20px_0px_rgba(0,0,0,0.02)] text-[#2e3037] bg-white hover:bg-gray-50"
        onClick={(e) => {
          e.stopPropagation()
          inputRef.current?.click()
        }}
      >
        Select file
      </Button>
    </div>
  )
}
