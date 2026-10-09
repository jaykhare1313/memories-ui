import { createTheme } from '@mui/material/styles'

import { components } from './components'
import { palette, radii } from './tokens'
import { typography } from './typography'

declare module '@mui/material/styles' {
  interface Palette {
    memories: {
      paper: string
      linen: string
      card: string
      sand: string
      ink: string
      mute: string
      faint: string
      line: string
      lineStrong: string
      emberFill: string
      emberText: string
      lagoonFill: string
      lagoonText: string
      signatureGradient: string
    }
  }
  interface PaletteOptions {
    memories?: Palette['memories']
  }
  interface Theme {
    memoriesRadii: typeof radii
  }
  interface ThemeOptions {
    memoriesRadii?: typeof radii
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: palette.ink,
      contrastText: palette.paper,
    },
    background: {
      default: palette.paper,
      paper: palette.card,
    },
    text: {
      primary: palette.ink,
      secondary: palette.mute,
    },
    memories: {
      paper: palette.paper,
      linen: palette.linen,
      card: palette.card,
      sand: palette.sand,
      ink: palette.ink,
      mute: palette.mute,
      faint: palette.faint,
      line: palette.line,
      lineStrong: palette.lineStrong,
      emberFill: palette.emberFill,
      emberText: palette.emberText,
      lagoonFill: palette.lagoonFill,
      lagoonText: palette.lagoonText,
      signatureGradient:
        'linear-gradient(135deg, #FFB36B 0%, #F26B3A 48%, #E8506E 100%)',
    },
  },
  typography,
  components,
  memoriesRadii: radii,
  shape: {
    borderRadius: radii.md,
  },
})
