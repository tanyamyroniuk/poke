/**
 * Fills AppShell without growing past the viewport so the analysis chrome stays fixed;
 * only the drawer body scrolls (see AnalysisDrawer).
 */
export default function AnalysisLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
}
