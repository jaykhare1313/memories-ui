export const endpoints = {
  libraryStatus: '/api/library/status',
  uploads: '/api/uploads',
  upload: (id: string) => `/api/uploads/${encodeURIComponent(id)}`,
  trips: '/api/trips',
  trip: (id: string) => `/api/trips/${encodeURIComponent(id)}`,
  mediaThumb: (id: string) => `/media/${encodeURIComponent(id)}/thumb`,
  media: (id: string) => `/media/${encodeURIComponent(id)}`,
} as const
