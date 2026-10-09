import Typography from '@mui/material/Typography'
import type { TypographyProps } from '@mui/material/Typography'

export function SerifTitle({ children, ...props }: TypographyProps) {
  return (
    <Typography component="h1" variant="h2" {...props}>
      {children}
    </Typography>
  )
}
