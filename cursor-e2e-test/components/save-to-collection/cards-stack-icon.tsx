/** Decorative stacked-cards illustration used on the Save to Collection screen. */
export function CardsStackIcon({ size = 128 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      aria-hidden
    >
      {/* Back card */}
      <rect x="14" y="30" width="76" height="90" rx="8" stroke="#dc2626" strokeWidth="4.5" />
      {/* Front card */}
      <rect x="38" y="16" width="76" height="90" rx="8" fill="white" stroke="#dc2626" strokeWidth="4.5" />
      {/* Lines inside front card */}
      <line x1="54" y1="44" x2="100" y2="44" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
      <line x1="54" y1="58" x2="100" y2="58" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
      <line x1="54" y1="72" x2="82" y2="72" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
