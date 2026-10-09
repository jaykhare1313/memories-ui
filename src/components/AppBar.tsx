import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

import { Logo } from './Logo'

interface MemoriesAppBarProps {
  showUpload?: boolean
  onUpload?: () => void
}

export function MemoriesAppBar({ showUpload, onUpload }: MemoriesAppBarProps) {
  return (
    <Box
      component="header"
      sx={{
        py: 2.75,
        borderBottom: (t) => `1px solid ${t.palette.memories.line}`,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Logo />
        {showUpload && onUpload && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<UploadOutlinedIcon fontSize="small" />}
            onClick={onUpload}
          >
            Upload more
          </Button>
        )}
      </Container>
    </Box>
  )
}
