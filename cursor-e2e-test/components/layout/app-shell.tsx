/**
 * Full-width app column. Scroll lives here so the document body does not scroll.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain">
      {children}
    </div>
  )
}
