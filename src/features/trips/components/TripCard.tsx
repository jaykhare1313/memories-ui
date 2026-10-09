import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'

import { assetSrc } from '@/api/media'
import type { TripSummary } from '@/api/types'
import { formatDateRange } from '@/utils/format'
import { formatCount } from '@/utils/pluralize'

interface TripCardProps {
  trip: TripSummary
}

export function TripCard({ trip }: TripCardProps) {
  return (
    <Box
      component={RouterLink}
      to={`/trips/${trip.id}`}
      sx={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        '&:hover .cover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <Box
        className="cover"
        sx={{
          borderRadius: '22px',
          overflow: 'hidden',
          aspectRatio: '3 / 4',
          transition: 'transform 0.25s ease',
          boxShadow:
            '0 1px 0 rgba(255, 255, 255, 0.9) inset, 0 12px 28px -10px rgba(60, 40, 20, 0.14)',
        }}
      >
        <Box
          component="img"
          src={assetSrc(trip.coverUrl)}
          alt={trip.title}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </Box>
      <Typography
        variant="h4"
        sx={{ mt: 1.5, fontSize: '1.5rem', fontFamily: 'inherit' }}
      >
        {trip.title}
      </Typography>
      <Typography variant="body2" sx={{ mt: 0.5 }}>
        {formatDateRange(trip.startDate, trip.endDate)} ·{' '}
        {formatCount(trip.photoCount, 'photo')}
        {trip.videoCount > 0 ? ` · ${formatCount(trip.videoCount, 'video')}` : ''}
      </Typography>
    </Box>
  )
}
