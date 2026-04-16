/** Shared 440×956 artboard scaling (Figma 756px reference frame). */
export const ARTBOARD_W = 440
export const ARTBOARD_H = 956
export const FIGMA_FRAME_H = 756

export const Y = (n: number) => Math.round((n * ARTBOARD_H) / FIGMA_FRAME_H)

export const SHEET_HEIGHT_PX = 440
export const HERO_HEIGHT_PERCENT = 60

/** Peach blur band height vs hero (Figma 394px on 760px reference). */
export const HERO_PEACH_BLUR_H = Math.round(
  (394 * (ARTBOARD_H * (HERO_HEIGHT_PERCENT / 100))) / 760,
)

export const BACK_TOP = Y(32)
export const BACK_INSET = 24
export const HOME_BAR_BOTTOM = Y(16)
