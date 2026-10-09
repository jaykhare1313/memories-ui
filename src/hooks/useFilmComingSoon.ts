import { useCallback, useState } from 'react'

export function useFilmComingSoon() {
  const [open, setOpen] = useState(false)
  const showComingSoon = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])
  return { open, showComingSoon, close }
}
