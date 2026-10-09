import {
  getMockLibraryHasPhotosOverride,
  isDevEmptyState,
  setMockLibraryHasPhotos,
} from '@/utils/devState'

import type {
  LibraryStatus,
  MockDataFile,
  Trip,
  TripSummary,
  Upload,
  UploadStartResponse,
} from '../types'
import {
  beginMockUpload,
  clearMockUploadSession,
  getMockUploadProgress,
} from './uploadSession'
import data from './data.json'

const mockData = data as MockDataFile

async function delay(ms: number): Promise<void> {
  await new Promise((r) => setTimeout(r, ms))
}

function libraryFromMock(): LibraryStatus {
  const override = getMockLibraryHasPhotosOverride()
  if (override === true) {
    return mockData.library
  }
  if (override === false || isDevEmptyState()) {
    return {
      hasPhotos: false,
      photoCount: 0,
      videoCount: 0,
      tripCount: 0,
    }
  }
  return mockData.library
}

export async function mockGetLibraryStatus(): Promise<LibraryStatus> {
  await delay(80)
  return libraryFromMock()
}

export async function mockStartUpload(
  files?: FileList | File[],
): Promise<UploadStartResponse> {
  void files
  await delay(120)
  clearMockUploadSession()
  return beginMockUpload(mockData.upload)
}

export async function mockGetUpload(id: string): Promise<Upload> {
  await delay(60)
  const live = getMockUploadProgress(id)
  if (live) {
    if (live.status === 'done') {
      setMockLibraryHasPhotos(true)
    }
    return live
  }
  return mockData.upload
}

export async function mockListTrips(): Promise<TripSummary[]> {
  await delay(100)
  if (!libraryFromMock().hasPhotos) {
    return []
  }
  return mockData.trips
    .map(({ days, ...summary }) => {
      void days
      return summary
    })
    .sort((a, b) => b.startDate.localeCompare(a.startDate))
}

export async function mockGetTrip(id: string): Promise<Trip> {
  await delay(100)
  const trip = mockData.trips.find((t) => t.id === id)
  if (!trip) {
    throw new Error(`trip ${id} not found`)
  }
  return trip
}
