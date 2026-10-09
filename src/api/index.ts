import { apiFetch } from './client'
import { endpoints } from './endpoints'
import * as mock from './mock/adapter'
import type {
  LibraryStatus,
  Trip,
  TripSummary,
  Upload,
  UploadStartResponse,
} from './types'

const dataSource = import.meta.env.VITE_DATA_SOURCE ?? 'mock'

function isMockDataSource(): boolean {
  return dataSource !== 'api'
}

export async function getLibraryStatus(): Promise<LibraryStatus> {
  if (isMockDataSource()) {
    return mock.mockGetLibraryStatus()
  }
  return apiFetch<LibraryStatus>(endpoints.libraryStatus)
}

export async function startUpload(
  files?: FileList | File[],
): Promise<UploadStartResponse> {
  if (isMockDataSource()) {
    return mock.mockStartUpload(files)
  }
  const fd = new FormData()
  if (files) {
    [...files].forEach((f) => {
      fd.append('files[]', f, (f as File & { webkitRelativePath?: string }).webkitRelativePath || f.name)
    })
  }
  return apiFetch<UploadStartResponse>(endpoints.uploads, {
    method: 'POST',
    body: fd,
  })
}

export async function getUpload(id: string): Promise<Upload> {
  if (isMockDataSource()) {
    return mock.mockGetUpload(id)
  }
  return apiFetch<Upload>(endpoints.upload(id))
}

export async function listTrips(): Promise<TripSummary[]> {
  if (isMockDataSource()) {
    return mock.mockListTrips()
  }
  return apiFetch<TripSummary[]>(endpoints.trips)
}

export async function getTrip(id: string): Promise<Trip> {
  if (isMockDataSource()) {
    return mock.mockGetTrip(id)
  }
  return apiFetch<Trip>(endpoints.trip(id))
}
