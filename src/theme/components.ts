import type { Components, Theme } from '@mui/material/styles'

import { glass, palette, radii, signatureGradient } from './tokens'

export const components: Components<Theme> = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: palette.paper,
        color: palette.ink,
        minHeight: '100vh',
      },
      '#root': {
        minHeight: '100vh',
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: radii.pill,
        minHeight: 48,
        paddingLeft: 22,
        paddingRight: 22,
        gap: 10,
      },
      containedPrimary: {
        backgroundColor: palette.ink,
        color: palette.paper,
        boxShadow:
          '0 10px 24px -10px rgba(22, 23, 27, 0.45), 0 1px 0 rgba(255, 255, 255, 0.12) inset',
        '&:hover': {
          backgroundColor: '#0f1014',
        },
      },
      outlined: {
        borderColor: palette.lineStrong,
        color: palette.ink,
        backgroundColor: palette.card,
        '&:hover': {
          backgroundColor: palette.linen,
          borderColor: palette.lineStrong,
        },
      },
      text: {
        color: palette.mute,
        '&:hover': {
          backgroundColor: palette.line,
        },
      },
      sizeSmall: {
        minHeight: 36,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: '0.8125rem',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: radii.pill,
        fontWeight: 500,
        fontSize: '0.8125rem',
        height: 32,
      },
      outlined: {
        borderColor: palette.line,
        backgroundColor: 'rgba(22, 23, 27, 0.035)',
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        height: 6,
        borderRadius: radii.pill,
        backgroundColor: palette.linen,
      },
      bar: {
        borderRadius: radii.pill,
        background: signatureGradient,
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: radii.lg,
        background: glass.background,
        backdropFilter: glass.backdropFilter,
        boxShadow: glass.boxShadow,
      },
    },
  },
  MuiSnackbar: {
    styleOverrides: {
      root: {
        '& .MuiSnackbarContent-root': {
          borderRadius: radii.md,
          backgroundColor: palette.ink,
          color: palette.paper,
        },
      },
    },
  },
}
