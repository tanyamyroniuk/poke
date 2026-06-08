import Link from "next/link"
import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CameraButtonProps {
  href?: string
  onClick?: () => void
  label?: string
  disabled?: boolean
}

export function CameraButton({
  href,
  onClick,
  label = "Scan with Camera",
  disabled = false,
}: CameraButtonProps) {
  const className = "w-full h-16 rounded-2xl gap-3 text-lg font-medium [&_svg]:size-6"

  if (href) {
    return (
      <Button asChild className={className}>
        <Link href={href}>
          <Camera />
          {label}
        </Link>
      </Button>
    )
  }

  return (
    <Button className={className} onClick={onClick} disabled={disabled}>
      <Camera />
      {label}
    </Button>
  )
}
