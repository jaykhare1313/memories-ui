import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

import { signatureGradient } from '@/theme/tokens'

export function LogoMark({ size = 26 }: { size?: number }) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '9px',
        background: signatureGradient,
        position: 'relative',
        boxShadow: '0 4px 14px -2px rgba(242, 107, 58, 0.45)',
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: size * 0.27,
          borderRadius: '4px',
          background: theme.palette.memories.card,
        },
      }}
    />
  )
}

export function Logo({ showWordmark = true }: { showWordmark?: boolean }) {
  const theme = useTheme()
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
      <LogoMark />
      {showWordmark && (
        <Typography
          component="span"
          sx={{
            fontFamily: theme.typography.h3.fontFamily,
            fontSize: '1.375rem',
            fontWeight: 400,
            color: theme.palette.memories.ink,
            letterSpacing: '-0.01em',
          }}
        >
          Memories
        </Typography>
      )}
    </Box>
  )
}
