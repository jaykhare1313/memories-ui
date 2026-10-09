import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { UploadView } from '@/features/upload/components/UploadView'
import { useStartUpload } from '@/features/upload/hooks/useStartUpload'
import { useUploadStatus } from '@/features/upload/hooks/useUploadStatus'
import { tripsKey } from '@/features/trips/hooks/useTrips'
import { libraryStatusKey } from '@/features/library/hooks/useLibraryStatus'
import { useQueryClient } from '@tanstack/react-query'
import { clearMockUploadSession } from '@/api/mock/uploadSession'

export function UploadPage() {
  const { uploadId: paramId } = useParams<{ uploadId: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const startUpload = useStartUpload()
  const uploadId = paramId ?? startUpload.data?.id

  useEffect(() => {
    if (!paramId && !startUpload.isPending && !startUpload.data) {
      startUpload.mutate(undefined, {
        onSuccess: (res) => navigate(`/upload/${res.id}`, { replace: true }),
      })
    }
  }, [paramId, startUpload, navigate])

  const { data: upload, isLoading } = useUploadStatus(uploadId)

  useEffect(() => {
    if (upload?.status === 'done') {
      void queryClient.invalidateQueries({ queryKey: libraryStatusKey })
      void queryClient.invalidateQueries({ queryKey: tripsKey })
      const t = window.setTimeout(() => {
        clearMockUploadSession()
        navigate('/home', { replace: true })
      }, 600)
      return () => window.clearTimeout(t)
    }
  }, [upload?.status, navigate, queryClient])

  const handleCancel = () => {
    clearMockUploadSession()
    navigate(-1)
  }

  return (
    <UploadView
      upload={upload}
      isLoading={!uploadId || isLoading}
      onCancel={handleCancel}
    />
  )
}
