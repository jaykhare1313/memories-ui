import type { MediaItem } from './types'

const dataSource = import.meta.env.VITE_DATA_SOURCE ?? 'mock'

function baseUrl(): string {
  const base = import.meta.env.BASE_URL ?? '/'
  return base.endsWith('/') ? base : `${base}/`
}

function resolveMockAsset(path: string): string {
  if (/^(https?:)?\/\//.test(path)) {
    return path
  }
  const normalized = path.replace(/^img\/full\//, 'img/thumbs/')
  const clean = normalized.startsWith('/') ? normalized.slice(1) : normalized
  return `${baseUrl()}${clean}`
}

export function thumbSrc(item: Pick<MediaItem, 'id' | 'thumbUrl'>): string {
  if (dataSource === 'api') {
    return `/media/${item.id}/thumb`
  }
  return resolveMockAsset(item.thumbUrl)
}

export function mediaSrc(item: Pick<MediaItem, 'id' | 'url'>): string {
  if (dataSource === 'api') {
    return `/media/${item.id}`
  }
  return resolveMockAsset(item.url)
}

export function assetSrc(path: string): string {
  if (dataSource === 'api') {
    return path
  }
  return resolveMockAsset(path)
}

export function resolveUploadThumb(path: string): string {
  if (dataSource === 'api') {
    return path.startsWith('/') ? path : `/${path}`
  }
  return resolveMockAsset(path)
}
