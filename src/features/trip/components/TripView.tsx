import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import type { Trip } from '@/api/types'
import { Lightbox } from '@/components/Lightbox'
import { Loader } from '@/components/Loader'
import { PageShell } from '@/components/PageShell'
import { SerifTitle } from '@/components/SerifTitle'
import { formatDayHeader, formatTripMeta } from '@/utils/format'

import { MediaTile } from './MediaTile'

interface TripViewProps {
  trip: Trip | undefined
  isLoading: boolean
  onUpload: () => void
  onPlayFilm: () => void
}

export function TripView({ trip, isLoading, onUpload, onPlayFilm }: TripViewProps) {
  const [lightbox, setLightbox] = useState<Trip['days'][0]['media'][0] | null>(null)

  if (isLoading || !trip) {
    return (
      <PageShell showUpload onUpload={onUpload}>
        <Loader />
      </PageShell>
    )
  }

  return (
    <PageShell showUpload onUpload={onUpload}>
      <Button
        component={RouterLink}
        to="/home"
        startIcon={<ArrowBackIcon />}
        size="small"
        sx={{
          bgcolor: 'memories.linen',
          color: 'memories.ink',
          mb: 2,
          '&:hover': { bgcolor: 'memories.sand' },
        }}
      >
        All trips
      </Button>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
          pb: 3,
          borderBottom: (t) => `1px solid ${t.palette.memories.line}`,
        }}
      >
        <Box>
          <SerifTitle variant="h2" sx={{ fontSize: { xs: '2.25rem', md: '3rem' } }}>
            {trip.title}
          </SerifTitle>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {formatTripMeta(
              trip.startDate,
              trip.endDate,
              trip.country,
              trip.photoCount,
              trip.videoCount,
            )}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<PlayArrowIcon />}
          onClick={onPlayFilm}
          sx={{
            background: (t) => t.palette.memories.signatureGradient,
            color: '#1A0E08',
            px: 3,
            boxShadow: '0 12px 28px -10px rgba(232, 80, 60, 0.55)',
            '&:hover': {
              background: (t) => t.palette.memories.signatureGradient,
              filter: 'brightness(1.05)',
            },
          }}
        >
          Play film
        </Button>
      </Box>

      {trip.days.map((day) => (
        <Box key={day.day} sx={{ mt: 4 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="h4" sx={{ fontSize: '1.75rem' }}>
                Day {day.day}
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {formatDayHeader(day.date, day.place)}
              </Typography>
            </Box>
            <Typography variant="caption">{day.media.length} items</Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(4, 1fr)',
                md: 'repeat(6, 1fr)',
              },
              gap: 1.5,
            }}
          >
            {day.media.map((item) => (
              <MediaTile
                key={item.id}
                item={item}
                onClick={() => setLightbox(item)}
              />
            ))}
          </Box>
        </Box>
      ))}

      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
    </PageShell>
  )
}
