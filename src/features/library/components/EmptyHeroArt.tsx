import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

import { assetSrc } from '@/api/media'

export function EmptyHeroArt() {
  const theme = useTheme()
  return (
    <Box
      sx={{
        position: 'relative',
        width: 220,
        height: 120,
        mb: 3.25,
      }}
    >
      <Box
        component="img"
        src={assetSrc('img/thumbs/p323.jpg')}
        alt=""
        sx={{
          position: 'absolute',
          left: 6,
          top: 10,
          width: 110,
          height: 84,
          borderRadius: '14px',
          border: '4px solid #fff',
          objectFit: 'cover',
          transform: 'rotate(-9deg)',
          boxShadow: '0 14px 30px -12px rgba(60, 40, 20, 0.35)',
          filter: 'saturate(0.25) brightness(1.08)',
          opacity: 0.6,
        }}
      />
      <Box
        component="img"
        src={assetSrc('img/thumbs/p1015.jpg')}
        alt=""
        sx={{
          position: 'absolute',
          left: 104,
          top: 10,
          width: 110,
          height: 84,
          borderRadius: '14px',
          border: '4px solid #fff',
          objectFit: 'cover',
          transform: 'rotate(8deg)',
          boxShadow: '0 14px 30px -12px rgba(60, 40, 20, 0.35)',
          filter: 'saturate(0.25) brightness(1.08)',
          opacity: 0.6,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: 55,
          top: 0,
          width: 110,
          height: 84,
          borderRadius: '14px',
          border: '4px solid #fff',
          bgcolor: theme.palette.memories.card,
          display: 'grid',
          placeItems: 'center',
          color: theme.palette.memories.faint,
          transform: 'rotate(-1deg)',
          zIndex: 2,
          boxShadow: '0 14px 30px -12px rgba(60, 40, 20, 0.35)',
        }}
      >
        <ImageOutlinedIcon />
      </Box>
    </Box>
  )
}
