import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'

import { Logo } from './Logo'

const isDevBuild = import.meta.env.VITE_APP_ENV === 'dev'

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Logo />
          {isDevBuild && (
            <Chip
              label="DEV"
              size="small"
              sx={{
                height: 22,
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                bgcolor: 'memories.lagoonFill',
                color: '#fff',
              }}
            />
          )}
        </Box>
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
