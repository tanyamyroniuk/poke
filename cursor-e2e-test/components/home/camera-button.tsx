import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CameraButtonProps {
  onClick?: () => void
  label?: string
  disabled?: boolean
}

export function CameraButton({
  onClick,
  label = "Scan with Camera",
  disabled = false,
}: CameraButtonProps) {
  return (
    <Button
      className="w-full h-16 rounded-2xl gap-3 text-lg font-medium [&_svg]:size-6"
      onClick={onClick}
      disabled={disabled}
    >
      <Camera />
      {label}
    </Button>
  )
}
