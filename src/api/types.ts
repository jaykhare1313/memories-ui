export interface LibraryStatus {
  hasPhotos: boolean
  photoCount: number
  videoCount: number
  tripCount: number
}

export type UploadStatus = 'queued' | 'processing' | 'done' | 'failed'

export type UploadStageKey = 'reading' | 'finding_dates_places' | 'grouping'

export interface UploadStage {
  key: UploadStageKey
  label: string
}

export interface TripFoundChip {
  id: string
  title: string
  photoCount: number
}

export interface Upload {
  id: string
  status: UploadStatus
  processed: number
  total: number
  stage: UploadStageKey
  stages: UploadStage[]
  tripsFound: TripFoundChip[]
  recentThumbs: string[]
}

export interface UploadStartResponse {
  id: string
  status: UploadStatus
  total: number
}

export interface TripSummary {
  id: string
  title: string
  place: string
  country: string
  startDate: string
  endDate: string
  coverUrl: string
  photoCount: number
  videoCount: number
}

export interface MediaItem {
  id: string
  type: 'photo' | 'video'
  url: string
  thumbUrl: string
  takenAt: string
  lat: number | null
  lon: number | null
  durationSec: number | null
}

export interface TripDay {
  day: number
  date: string
  place: string
  media: MediaItem[]
}

export interface Trip extends TripSummary {
  days: TripDay[]
}

export interface ApiErrorBody {
  error: {
    code: string
    message: string
  }
}

export interface MockDataFile {
  library: LibraryStatus
  upload: Upload
  trips: Trip[]
}
