import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export function Loader() {
  return (
    <Box
      sx={{
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={32} sx={{ color: 'memories.emberFill' }} />
    </Box>
  )
}
