import type { TypographyVariantsOptions } from '@mui/material/styles'

import { fonts, palette } from './tokens'

export const typography: TypographyVariantsOptions = {
  fontFamily: fonts.sans,
  h1: {
    fontFamily: fonts.serif,
    fontWeight: 400,
    fontSize: '4.5rem',
    lineHeight: 0.95,
    letterSpacing: '-0.015em',
    color: palette.ink,
  },
  h2: {
    fontFamily: fonts.serif,
    fontWeight: 400,
    fontSize: '3rem',
    lineHeight: 1,
    letterSpacing: '-0.01em',
    color: palette.ink,
  },
  h3: {
    fontFamily: fonts.serif,
    fontWeight: 400,
    fontSize: '2.25rem',
    lineHeight: 1.05,
    color: palette.ink,
  },
  h4: {
    fontFamily: fonts.serif,
    fontWeight: 400,
    fontSize: '1.75rem',
    lineHeight: 1.1,
    color: palette.ink,
  },
  h5: {
    fontFamily: fonts.sans,
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.3,
    letterSpacing: '-0.015em',
    color: palette.ink,
  },
  h6: {
    fontFamily: fonts.sans,
    fontWeight: 600,
    fontSize: '1.0625rem',
    lineHeight: 1.35,
    color: palette.ink,
  },
  body1: {
    fontSize: '0.9375rem',
    lineHeight: 1.47,
    color: palette.ink,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.43,
    color: palette.mute,
  },
  subtitle1: {
    fontSize: '1.0625rem',
    lineHeight: 1.53,
    color: palette.mute,
  },
  caption: {
    fontFamily: fonts.mono,
    fontSize: '0.6875rem',
    fontWeight: 600,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: palette.faint,
  },
  button: {
    fontFamily: fonts.sans,
    fontWeight: 600,
    fontSize: '0.9375rem',
    letterSpacing: '-0.01em',
    textTransform: 'none',
  },
}
