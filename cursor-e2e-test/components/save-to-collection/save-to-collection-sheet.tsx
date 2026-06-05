"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { CircleCheck, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardsStackIcon } from "@/components/save-to-collection/cards-stack-icon"
import {
  type Collection,
  CollectionPickerTrigger,
  CollectionDropdown,
} from "@/components/save-to-collection/collection-picker"
import { NewCollectionForm } from "@/components/save-to-collection/new-collection-form"

// ---------------------------------------------------------------------------
// Types & defaults
// ---------------------------------------------------------------------------

type SheetState = "idle" | "selecting" | "creating" | "created"

const DEFAULT_COLLECTIONS: Collection[] = [
  { id: "fake-cards", name: "Fake Cards Collection" },
  { id: "original-cards", name: "Original Cards Collection" },
  { id: "expensive", name: "Expensive cards" },
]

export type SaveToCollectionSheetProps = {
  initialCollections?: Collection[]
  /** Stub for Storybook / testing — fires instead of router.push. */
  onSave?: (collectionId: string) => void
  onBack?: () => void
  /** Force a specific state (useful for Storybook). */
  initialState?: SheetState
}

// ---------------------------------------------------------------------------
// Sheet
// ---------------------------------------------------------------------------

/**
 * Four-state save flow (Figma 27065:114034 → 27070:126762).
 *
 * States:
 *  idle      — closed dropdown, collection selected
 *  selecting — dropdown list open
 *  creating  — new-collection inline form visible (Save Card disabled)
 *  created   — new collection added & selected, success toast visible
 */
export function SaveToCollectionSheet({
  initialCollections = DEFAULT_COLLECTIONS,
  onSave,
  onBack,
  initialState = "idle",
}: SaveToCollectionSheetProps) {
  const [sheetState, setSheetState] = useState<SheetState>(initialState)
  const [collections, setCollections] = useState<Collection[]>(initialCollections)
  const [selectedId, setSelectedId] = useState(() => {
    if (typeof window !== "undefined") {
      const type = sessionStorage.getItem("cardResultType")
      if (type === "original") return "original-cards"
      if (type === "fake") return "fake-cards"
    }
    return initialCollections[0]?.id ?? ""
  })
  const [newName, setNewName] = useState("")
  const backdropRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const selectedCollection = collections.find((c) => c.id === selectedId) ?? collections[0]

  function handleTriggerClick() {
    setSheetState((s) => (s === "selecting" ? "idle" : "selecting"))
  }

  function handleSelect(id: string) {
    setSelectedId(id)
    setSheetState("idle")
  }

  function openCreateForm() {
    setNewName("")
    setSheetState("creating")
  }

  function cancelCreate() {
    setNewName("")
    setSheetState("idle")
  }

  function confirmCreate() {
    if (!newName.trim()) return
    const id = `custom-${Date.now()}`
    const newCollection: Collection = { id, name: newName.trim() }
    setCollections((prev) => [...prev, newCollection])
    setSelectedId(id)
    setNewName("")
    setSheetState("created")
  }

  function handleSave() {
    if (onSave) { onSave(selectedId); return }
    router.push("/collections")
  }

  function handleDismiss() {
    if (onBack) { onBack(); return }
    router.back()
  }

  const isSaveDisabled = sheetState === "creating"

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Click-away backdrop when dropdown is open */}
      {sheetState === "selecting" && (
        <div
          ref={backdropRef}
          className="fixed inset-0 z-10"
          onClick={() => setSheetState("idle")}
          aria-hidden
        />
      )}

      {/* Centred illustration + headings */}
      <div className="shrink-0 flex flex-col items-center gap-3 px-6 pt-6 text-center">
        <CardsStackIcon size={90} />
        <h1 className="text-[30px] font-medium leading-9 text-black">Save to Collection</h1>
        <p className="text-base font-normal leading-6 text-slate-500">
          Select existing collection to save or create new
        </p>
      </div>

      {/* Collection picker area */}
      <div className="min-h-0 flex-1 px-6 pt-8">
        <p className="font-mono text-xs font-medium uppercase leading-none tracking-normal text-gray-500">
          Select Collection
        </p>

        {sheetState === "creating" ? (
          <div className="mt-4">
            <NewCollectionForm
              value={newName}
              onChange={setNewName}
              onCancel={cancelCreate}
              onSubmit={confirmCreate}
            />
          </div>
        ) : (
          <div className="relative mt-4">
            <CollectionPickerTrigger
              collection={selectedCollection}
              open={sheetState === "selecting"}
              onClick={handleTriggerClick}
            />
            {sheetState === "selecting" && (
              <CollectionDropdown
                collections={collections}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
            )}
          </div>
        )}

        {sheetState !== "creating" && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-sm text-slate-500">or</p>
            <button
              type="button"
              onClick={openCreateForm}
              className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-[#0a0a0a] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-neutral-50"
            >
              <Plus className="size-4" strokeWidth={2} />
              Create New Collection
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="shrink-0 space-y-3 px-6 pt-4 pb-10">
        {/* "New collection created" toast — screen 4 */}
        {sheetState === "created" && (
          <div className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <CircleCheck className="size-4 shrink-0 text-green-600" strokeWidth={2} />
            <p className="text-sm font-medium text-[#0a0a0a]">New collection created</p>
          </div>
        )}

        <Button
          type="button"
          disabled={isSaveDisabled}
          onClick={handleSave}
          className="h-16 w-full rounded-2xl border-0 bg-[#dc2626] text-lg font-medium text-white hover:bg-[#b91c1c] disabled:opacity-40"
        >
          Save Card
        </Button>
        <button
          type="button"
          onClick={handleDismiss}
          className="flex h-10 w-full items-center justify-center text-lg font-semibold text-gray-400 hover:text-gray-600"
        >
          Discard Result
        </button>
      </div>
    </div>
  )
}
