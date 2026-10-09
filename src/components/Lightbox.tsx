import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'

import { mediaSrc } from '@/api/media'
import type { MediaItem } from '@/api/types'

interface LightboxProps {
  item: MediaItem | null
  onClose: () => void
}

export function Lightbox({ item, onClose }: LightboxProps) {
  return (
    <Dialog open={Boolean(item)} onClose={onClose} maxWidth="lg" fullWidth>
      <IconButton
        onClick={onClose}
        sx={{ position: 'absolute', right: 12, top: 12, zIndex: 2, bgcolor: 'memories.card' }}
        aria-label="Close"
      >
        <CloseIcon />
      </IconButton>
      {item && (
        <Box sx={{ p: 2, pt: 6 }}>
          {item.type === 'video' ? (
            <Box
              component="video"
              src={mediaSrc(item)}
              controls
              sx={{ width: '100%', maxHeight: '80vh', borderRadius: '16px' }}
            />
          ) : (
            <Box
              component="img"
              src={mediaSrc(item)}
              alt=""
              sx={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '16px' }}
            />
          )}
        </Box>
      )}
    </Dialog>
  )
}
