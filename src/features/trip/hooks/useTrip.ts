import { useQuery } from '@tanstack/react-query'

import { getTrip } from '@/api'

export const tripKey = (id: string) => ['trip', id] as const

export function useTrip(tripId: string | undefined) {
  return useQuery({
    queryKey: tripId ? tripKey(tripId) : ['trip', 'none'],
    queryFn: () => getTrip(tripId!),
    enabled: Boolean(tripId),
  })
}
