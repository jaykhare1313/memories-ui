import type { Upload, UploadStartResponse } from '../types'

const MOCK_DURATION_MS = 5500

interface Session {
  id: string
  total: number
  startedAt: number
  template: Upload
}

let session: Session | null = null

export function beginMockUpload(template: Upload): UploadStartResponse {
  session = {
    id: template.id,
    total: template.total,
    startedAt: Date.now(),
    template,
  }
  return { id: template.id, status: 'queued', total: template.total }
}

export function getMockUploadProgress(id: string): Upload | null {
  if (!session || session.id !== id) {
    return null
  }
  const elapsed = Date.now() - session.startedAt
  const t = Math.min(1, elapsed / MOCK_DURATION_MS)
  let processed = Math.max(1, Math.floor(t * session.total))
  let stage: Upload['stage']
  let status: Upload['status']
  if (t < 0.28) {
    stage = 'reading'
    status = t < 0.05 ? 'queued' : 'processing'
  } else if (t < 0.62) {
    stage = 'finding_dates_places'
    status = 'processing'
  } else if (t < 1) {
    stage = 'grouping'
    status = 'processing'
  } else {
    stage = 'grouping'
    status = 'done'
    processed = session.total
  }

  const thumbCount = Math.min(
    session.template.recentThumbs.length,
    Math.max(4, Math.floor(t * session.template.recentThumbs.length)),
  )
  const tripCount = Math.min(
    session.template.tripsFound.length,
    t < 0.35 ? 0 : t < 0.55 ? 1 : t < 0.75 ? 2 : session.template.tripsFound.length,
  )

  return {
    ...session.template,
    id,
    status,
    stage,
    processed,
    total: session.total,
    recentThumbs: session.template.recentThumbs.slice(0, thumbCount),
    tripsFound: session.template.tripsFound.slice(0, tripCount),
  }
}

export function clearMockUploadSession(): void {
  session = null
}

export function hasActiveMockUpload(): boolean {
  return session !== null
}
