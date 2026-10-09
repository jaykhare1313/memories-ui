import Snackbar from '@mui/material/Snackbar'

interface FilmComingSoonSnackbarProps {
  open: boolean
  onClose: () => void
}

export function FilmComingSoonSnackbar({ open, onClose }: FilmComingSoonSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      message="Film player is coming soon — stay tuned!"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    />
  )
}
