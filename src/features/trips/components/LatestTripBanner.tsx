import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'

import { assetSrc } from '@/api/media'
import type { TripSummary } from '@/api/types'
import { dayCount, formatDateRange } from '@/utils/format'
import { formatCount } from '@/utils/pluralize'

interface LatestTripBannerProps {
  trip: TripSummary
  onPlayFilm: () => void
}

export function LatestTripBanner({ trip, onPlayFilm }: LatestTripBannerProps) {
  const days = dayCount(trip.startDate, trip.endDate)
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '28px',
        overflow: 'hidden',
        minHeight: { xs: 320, md: 380 },
        boxShadow:
          '0 1px 0 rgba(255, 255, 255, 0.9) inset, 0 36px 72px -28px rgba(60, 40, 20, 0.2)',
      }}
    >
      <Box
        component="img"
        src={assetSrc(trip.coverUrl)}
        alt=""
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(5,6,9,0.82) 100%)',
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          p: { xs: 3, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          minHeight: { xs: 320, md: 380 },
          color: '#fff',
        }}
      >
        <Chip
          size="small"
          label="Latest trip"
          sx={{
            alignSelf: 'flex-start',
            mb: 1.5,
            bgcolor: 'rgba(0,0,0,0.35)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)',
            '& .MuiChip-label': { fontSize: '0.65rem', letterSpacing: '0.12em' },
            '&::before': {
              content: '""',
              width: 7,
              height: 7,
              borderRadius: '50%',
              bgcolor: 'memories.emberFill',
              mr: 0.5,
            },
          }}
        />
        <Typography
          variant="h2"
          sx={{ color: '#fff', fontSize: { xs: '2.5rem', md: '3.5rem' }, maxWidth: 520 }}
        >
          {trip.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', mt: 1 }}>
          {formatDateRange(trip.startDate, trip.endDate)} · {formatCount(days, 'day')} ·{' '}
          {formatCount(trip.photoCount, 'photo')} · {formatCount(trip.videoCount, 'video')}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 2.5 }}>
          <Button
            variant="contained"
            startIcon={<PlayArrowIcon />}
            onClick={onPlayFilm}
            sx={{
              bgcolor: '#fff',
              color: 'memories.ink',
              '&:hover': { bgcolor: '#f5f5f5' },
            }}
          >
            Play film
          </Button>
          <Button
            component={RouterLink}
            to={`/trips/${trip.id}`}
            endIcon={<ArrowForwardIcon />}
            sx={{
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.35)',
              bgcolor: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
            }}
          >
            Open trip
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
