const STORAGE_KEY = 'memories_dev_empty'

export function isDevEmptyState(): boolean {
  if (import.meta.env.VITE_DEV_EMPTY_STATE === '1') {
    return true
  }
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    if (params.get('state') === 'empty') {
      return true
    }
    if (localStorage.getItem(STORAGE_KEY) === '1') {
      return true
    }
  }
  return false
}

export function setDevEmptyState(enabled: boolean): void {
  if (enabled) {
    localStorage.setItem(STORAGE_KEY, '1')
  } else {
    localStorage.removeItem(STORAGE_KEY)
  }
}

/** After a successful mock upload, library should report photos. */
let mockLibraryHasPhotosOverride: boolean | null = null

export function setMockLibraryHasPhotos(value: boolean): void {
  mockLibraryHasPhotosOverride = value
  if (value) {
    setDevEmptyState(false)
  }
}

export function getMockLibraryHasPhotosOverride(): boolean | null {
  return mockLibraryHasPhotosOverride
}

export function resetMockSession(): void {
  mockLibraryHasPhotosOverride = null
}
