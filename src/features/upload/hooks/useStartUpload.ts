import { useMutation, useQueryClient } from '@tanstack/react-query'

import { startUpload } from '@/api'
import { libraryStatusKey } from '@/features/library/hooks/useLibraryStatus'

export function useStartUpload() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (files?: FileList | File[]) => startUpload(files),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: libraryStatusKey })
    },
  })
}
