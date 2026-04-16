import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export type NewCollectionFormProps = {
  value: string
  onChange: (value: string) => void
  onCancel: () => void
  onSubmit: () => void
  className?: string
}

/**
 * Inline form card for creating a new collection (Figma 27069:114780).
 * Replaces the collection picker trigger when visible.
 */
export function NewCollectionForm({
  value,
  onChange,
  onCancel,
  onSubmit,
  className,
}: NewCollectionFormProps) {
  return (
    <div className={`flex flex-col gap-3 rounded-lg border border-neutral-200 p-4 ${className ?? ""}`}>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#0a0a0a]">Collection name</label>
        <Input
          placeholder="e.g. My Favourites"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        />
      </div>
      <div className="flex items-center justify-between gap-3">
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="button"
          size="sm"
          disabled={value.trim().length === 0}
          onClick={onSubmit}
          className="bg-[#dc2626] hover:bg-[#b91c1c]"
        >
          Create Collection
        </Button>
      </div>
    </div>
  )
}
