/**
 * Centered app column (max 956px). Scroll lives here so the document body does not scroll.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-[956px] flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain">
      {children}
    </div>
  )
}
