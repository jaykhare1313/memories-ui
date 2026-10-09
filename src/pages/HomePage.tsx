import { useNavigate } from 'react-router-dom'

import { FilmComingSoonSnackbar } from '@/components/FilmComingSoonSnackbar'
import { HomeView } from '@/features/trips/components/HomeView'
import { useTrips } from '@/features/trips/hooks/useTrips'
import { useLibraryStatus } from '@/features/library/hooks/useLibraryStatus'
import { useFilmComingSoon } from '@/hooks/useFilmComingSoon'

export function HomePage() {
  const navigate = useNavigate()
  const { data: trips, isLoading } = useTrips()
  const { data: library } = useLibraryStatus()
  const film = useFilmComingSoon()

  return (
    <>
      <HomeView
        trips={trips}
        isLoading={isLoading}
        libraryPhotoCount={library?.photoCount}
        onUpload={() => navigate('/upload')}
        onPlayFilm={film.showComingSoon}
      />
      <FilmComingSoonSnackbar open={film.open} onClose={film.close} />
    </>
  )
}
