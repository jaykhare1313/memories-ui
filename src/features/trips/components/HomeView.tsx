import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import type { TripSummary } from '@/api/types'
import { Loader } from '@/components/Loader'
import { PageShell } from '@/components/PageShell'
import { SerifTitle } from '@/components/SerifTitle'
import { formatCount } from '@/utils/pluralize'

import { LatestTripBanner } from './LatestTripBanner'
import { TripCard } from './TripCard'

interface HomeViewProps {
  trips: TripSummary[] | undefined
  isLoading: boolean
  libraryPhotoCount?: number
  onUpload: () => void
  onPlayFilm: () => void
}

export function HomeView({
  trips,
  isLoading,
  libraryPhotoCount,
  onUpload,
  onPlayFilm,
}: HomeViewProps) {
  if (isLoading || !trips) {
    return (
      <PageShell showUpload onUpload={onUpload}>
        <Loader />
      </PageShell>
    )
  }

  const latest = trips[0]
  const totalPhotos =
    libraryPhotoCount ??
    trips.reduce((sum, t) => sum + t.photoCount + t.videoCount, 0)

  return (
    <PageShell showUpload onUpload={onUpload}>
      {latest && <LatestTripBanner trip={latest} onPlayFilm={onPlayFilm} />}

      <Box sx={{ mt: 5 }}>
        <SerifTitle variant="h3" sx={{ fontSize: '2rem' }}>
          Your trips
        </SerifTitle>
        <Typography variant="body2" sx={{ mt: 0.75 }}>
          {formatCount(trips.length, 'trip')} · {formatCount(totalPhotos, 'photo')}
        </Typography>

        <Box
          sx={{
            mt: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(5, 1fr)',
            },
            gap: 2.5,
          }}
        >
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </Box>
      </Box>
    </PageShell>
  )
}
