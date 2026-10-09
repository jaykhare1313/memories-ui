import { useQuery } from '@tanstack/react-query'

import { getLibraryStatus } from '@/api'

export const libraryStatusKey = ['library', 'status'] as const

export function useLibraryStatus() {
  return useQuery({
    queryKey: libraryStatusKey,
    queryFn: getLibraryStatus,
    staleTime: 30_000,
  })
}
