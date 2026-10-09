import { Navigate } from 'react-router-dom'

import { Loader } from '@/components/Loader'
import { useLibraryStatus } from '@/features/library/hooks/useLibraryStatus'

export function RootRedirectPage() {
  const { data, isLoading, isError } = useLibraryStatus()

  if (isLoading) {
    return <Loader />
  }

  if (isError || !data) {
    return <Navigate to="/empty" replace />
  }

  return <Navigate to={data.hasPhotos ? '/home' : '/empty'} replace />
}
