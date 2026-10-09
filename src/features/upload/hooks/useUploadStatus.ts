import { useQuery } from '@tanstack/react-query'

import { getUpload } from '@/api'
import type { Upload } from '@/api/types'

export const uploadStatusKey = (id: string) => ['upload', id] as const

export function useUploadStatus(uploadId: string | undefined) {
  return useQuery({
    queryKey: uploadId ? uploadStatusKey(uploadId) : ['upload', 'none'],
    queryFn: () => getUpload(uploadId!),
    enabled: Boolean(uploadId),
    refetchInterval: (query) => {
      const data = query.state.data as Upload | undefined
      if (!data) {
        return 800
      }
      return data.status === 'done' || data.status === 'failed' ? false : 800
    },
  })
}
