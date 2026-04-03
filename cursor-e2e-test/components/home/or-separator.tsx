import { Separator } from "@/components/ui/separator"

export function OrSeparator() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Separator className="w-10 shrink-0" />
      <span className="text-sm text-muted-foreground leading-5">or</span>
      <Separator className="w-10 shrink-0" />
    </div>
  )
}
