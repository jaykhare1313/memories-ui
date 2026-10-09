import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import { MemoriesAppBar } from './AppBar'

interface PageShellProps {
  children: React.ReactNode
  showUpload?: boolean
  onUpload?: () => void
  maxWidth?: 'sm' | 'md' | 'lg' | false
}

export function PageShell({
  children,
  showUpload,
  onUpload,
  maxWidth = 'lg',
}: PageShellProps) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'memories.paper' }}>
      <MemoriesAppBar showUpload={showUpload} onUpload={onUpload} />
      <Container maxWidth={maxWidth} sx={{ py: { xs: 3, md: 4 }, px: { xs: 2, md: 3 } }}>
        {children}
      </Container>
    </Box>
  )
}
