import { useQuery } from '@tanstack/react-query'

import { listTrips } from '@/api'

export const tripsKey = ['trips'] as const

export function useTrips() {
  return useQuery({
    queryKey: tripsKey,
    queryFn: listTrips,
  })
}
