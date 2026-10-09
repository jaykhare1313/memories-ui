import { useNavigate, useParams } from 'react-router-dom'

import { FilmComingSoonSnackbar } from '@/components/FilmComingSoonSnackbar'
import { TripView } from '@/features/trip/components/TripView'
import { useTrip } from '@/features/trip/hooks/useTrip'
import { useFilmComingSoon } from '@/hooks/useFilmComingSoon'

export function TripPage() {
  const { tripId } = useParams<{ tripId: string }>()
  const navigate = useNavigate()
  const { data: trip, isLoading } = useTrip(tripId)
  const film = useFilmComingSoon()

  return (
    <>
      <TripView
        trip={trip}
        isLoading={isLoading}
        onUpload={() => navigate('/upload')}
        onPlayFilm={film.showComingSoon}
      />
      <FilmComingSoonSnackbar open={film.open} onClose={film.close} />
    </>
  )
}
