import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

export type Collection = {
  id: string
  name: string
  /** Optional thumbnail shown as the collection avatar. Falls back to the name initial. */
  imageUrl?: string
}

// ---------------------------------------------------------------------------
// Shared avatar
// ---------------------------------------------------------------------------

function CollectionAvatar({ collection }: { collection: Collection }) {
  if (collection.imageUrl) {
    return (
      <div className="relative size-8 shrink-0 overflow-hidden rounded-full border-2 border-white">
        <img
          src={collection.imageUrl}
          alt={collection.name}
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    )
  }
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold uppercase text-slate-600 ring-2 ring-white">
      {collection.name.charAt(0)}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------

export type CollectionPickerTriggerProps = {
  collection: Collection
  open?: boolean
  onClick?: () => void
  className?: string
}

/** 64 px tall dropdown trigger — shows selected collection (Figma 27065:114025). */
export function CollectionPickerTrigger({
  collection,
  open = false,
  onClick,
  className,
}: CollectionPickerTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-16 w-full items-center gap-2 overflow-hidden rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-colors hover:bg-neutral-50",
        open && "ring-2 ring-ring ring-offset-1",
        className,
      )}
    >
      <CollectionAvatar collection={collection} />
      <span className="flex-1 truncate text-left text-base font-medium text-[#0a0a0a]">
        {collection.name}
      </span>
      <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
    </button>
  )
}

// ---------------------------------------------------------------------------
// Dropdown menu
// ---------------------------------------------------------------------------

export type CollectionDropdownProps = {
  collections: Collection[]
  selectedId: string
  onSelect: (id: string) => void
  className?: string
}

/** Popover list rendered below the trigger when open (Figma 27067:114429). */
export function CollectionDropdown({
  collections,
  selectedId,
  onSelect,
  className,
}: CollectionDropdownProps) {
  return (
    <div
      className={cn(
        "absolute left-0 right-0 z-20 mt-1 flex flex-col gap-[2px] rounded-lg border border-[#e5e5e5] bg-white p-1 shadow-[0_4px_6px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1)]",
        className,
      )}
    >
      {collections.map((c) => {
        const selected = c.id === selectedId
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(c.id)}
            className={cn(
              "flex w-full items-center gap-[2px] rounded-md transition-colors hover:bg-neutral-50",
              selected ? "pr-2" : "",
            )}
          >
            {/* Inner content — avatar + name */}
            <div className="flex flex-1 items-center gap-2 px-1 py-[6px]">
              <CollectionAvatar collection={c} />
              <span className="flex-1 text-left text-sm font-semibold text-[#0a0a0a]">
                {c.name}
              </span>
            </div>
            {/* Check icon sits outside the inner flex to match Figma layout */}
            {selected && (
              <Check className="size-6 shrink-0 text-[#0a0a0a]" strokeWidth={2} />
            )}
          </button>
        )
      })}
    </div>
  )
}
