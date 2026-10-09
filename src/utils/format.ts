import { formatCount } from './pluralize'

const dateFmt = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

const dayFmt = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

export function formatDateRange(start: string, end: string): string {
  const s = new Date(`${start}T12:00:00`)
  const e = new Date(`${end}T12:00:00`)
  const sameMonth =
    s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()
  if (sameMonth) {
    return `${s.getDate()} – ${dateFmt.format(e)}`
  }
  return `${dateFmt.format(s)} – ${dateFmt.format(e)}`
}

export function dayCount(start: string, end: string): number {
  const s = new Date(`${start}T12:00:00`)
  const e = new Date(`${end}T12:00:00`)
  const diff = Math.round((e.getTime() - s.getTime()) / 86400000)
  return diff + 1
}

export function formatDayHeader(date: string, place: string): string {
  const d = new Date(`${date}T12:00:00`)
  return `${dayFmt.format(d)} · ${place}`
}

export function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  if (m > 0) {
    return `${m}:${s.toString().padStart(2, '0')}`
  }
  return `0:${s.toString().padStart(2, '0')}`
}

export function formatEta(secondsLeft: number): string {
  if (secondsLeft <= 5) {
    return 'ALMOST DONE'
  }
  if (secondsLeft < 60) {
    return `ABOUT ${secondsLeft} SEC LEFT`
  }
  const mins = Math.ceil(secondsLeft / 60)
  return mins === 1 ? 'ABOUT 1 MIN LEFT' : `ABOUT ${mins} MIN LEFT`
}

export function formatTripMeta(
  start: string,
  end: string,
  country: string,
  photoCount: number,
  videoCount: number,
): string {
  const days = dayCount(start, end)
  const parts = [
    formatDateRange(start, end),
    country,
    formatCount(days, 'day'),
    formatCount(photoCount, 'photo'),
  ]
  if (videoCount > 0) {
    parts.push(formatCount(videoCount, 'video'))
  }
  return parts.join(' · ')
}
