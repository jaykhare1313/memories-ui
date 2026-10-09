import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'

import { glass, radii } from '@/theme/tokens'

interface GlassCardProps {
  children: React.ReactNode
  sx?: SxProps<Theme>
  padding?: number | string
}

export function GlassCard({ children, sx, padding = 3 }: GlassCardProps) {
  return (
    <Box
      sx={{
        background: glass.background,
        backdropFilter: glass.backdropFilter,
        WebkitBackdropFilter: glass.backdropFilter,
        border: glass.border,
        boxShadow: glass.boxShadow,
        borderRadius: `${radii.xl}px`,
        p: padding,
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
