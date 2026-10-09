import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { EmptyView } from '@/features/library/components/EmptyView'
import { useLibraryStatus } from '@/features/library/hooks/useLibraryStatus'
import { useStartUpload } from '@/features/upload/hooks/useStartUpload'

export function EmptyPage() {
  const navigate = useNavigate()
  const { data: library } = useLibraryStatus()
  const startUpload = useStartUpload()

  useEffect(() => {
    if (library?.hasPhotos) {
      navigate('/home', { replace: true })
    }
  }, [library?.hasPhotos, navigate])

  const handleStart = (files?: FileList) => {
    startUpload.mutate(files ? [...files] : undefined, {
      onSuccess: (res) => {
        navigate(`/upload/${res.id}`)
      },
    })
  }

  if (library?.hasPhotos) {
    return <Navigate to="/home" replace />
  }

  return <EmptyView onStartUpload={handleStart} />
}
