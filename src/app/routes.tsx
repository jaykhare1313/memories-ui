import { Navigate, Route, Routes } from 'react-router-dom'

import { EmptyPage } from '@/pages/EmptyPage'
import { HomePage } from '@/pages/HomePage'
import { RootRedirectPage } from '@/pages/RootRedirectPage'
import { TripPage } from '@/pages/TripPage'
import { UploadPage } from '@/pages/UploadPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirectPage />} />
      <Route path="/empty" element={<EmptyPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/upload/:uploadId" element={<UploadPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/trips/:tripId" element={<TripPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
