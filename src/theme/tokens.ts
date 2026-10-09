export const palette = {
  paper: '#FAF8F4',
  linen: '#F3F0EA',
  card: '#FFFFFF',
  sand: '#ECE8E0',
  ink: '#16171B',
  mute: '#5B5E68',
  faint: '#686B75',
  line: 'rgba(22, 23, 27, 0.08)',
  lineStrong: 'rgba(22, 23, 27, 0.13)',
  emberFill: '#FF7A3D',
  emberText: '#B9461A',
  roseFill: '#F2557A',
  roseText: '#B5345A',
  goldFill: '#F2B84B',
  goldText: '#8A5E0E',
  lagoonFill: '#2BB5A6',
  lagoonText: '#0E7369',
  duskFill: '#7C6AF5',
  duskText: '#5B48D6',
} as const

export const radii = {
  xl: 28,
  lg: 22,
  md: 16,
  sm: 12,
  pill: 9999,
} as const

export const signatureGradient =
  'linear-gradient(135deg, #FFB36B 0%, #F26B3A 48%, #E8506E 100%)'

export const glass = {
  background: 'rgba(255, 255, 255, 0.66)',
  backdropFilter: 'blur(24px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.75)',
  boxShadow:
    '0 1px 0 rgba(255, 255, 255, 0.9) inset, 0 1px 2px rgba(60, 40, 20, 0.05), 0 12px 28px -10px rgba(60, 40, 20, 0.14), 0 36px 72px -28px rgba(60, 40, 20, 0.2)',
} as const

export const fonts = {
  serif: '"Instrument Serif", Georgia, serif',
  sans: '"Inter", system-ui, sans-serif',
  mono: '"Geist Mono", "JetBrains Mono", monospace',
} as const
