import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { thumbSrc } from '@/api/media'
import type { MediaItem } from '@/api/types'
import { formatDuration } from '@/utils/format'

interface MediaTileProps {
  item: MediaItem
  onClick: () => void
}

export function MediaTile({ item, onClick }: MediaTileProps) {
  return (
    <Box
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      role="button"
      tabIndex={0}
      sx={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        aspectRatio: '1',
        cursor: 'pointer',
        border: (t) => `1px solid ${t.palette.memories.line}`,
        boxShadow: '0 6px 16px -8px rgba(60, 40, 20, 0.12)',
        '&:hover': { transform: 'scale(1.02)' },
        transition: 'transform 0.2s',
      }}
    >
      <Box
        component="img"
        src={thumbSrc(item)}
        alt=""
        sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      {item.type === 'video' && item.durationSec != null && (
        <Box
          sx={{
            position: 'absolute',
            right: 8,
            bottom: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            px: 1,
            py: 0.35,
            borderRadius: '999px',
            bgcolor: 'rgba(0,0,0,0.55)',
            color: '#fff',
          }}
        >
          <PlayArrowIcon sx={{ fontSize: 14 }} />
          <Typography variant="caption" sx={{ color: '#fff', letterSpacing: 0 }}>
            {formatDuration(item.durationSec)}
          </Typography>
        </Box>
      )}
    </Box>
  )
}
