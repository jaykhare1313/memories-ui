import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

import type { Upload, UploadStageKey } from '@/api/types'

const stageOrder: UploadStageKey[] = [
  'reading',
  'finding_dates_places',
  'grouping',
]

function stageIndex(key: UploadStageKey): number {
  return stageOrder.indexOf(key)
}

interface UploadStagePillsProps {
  upload: Upload
}

export function UploadStagePills({ upload }: UploadStagePillsProps) {
  const theme = useTheme()
  const current = stageIndex(upload.stage)

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 1.5,
        mt: 3,
      }}
    >
      {upload.stages.map((stage) => {
        const idx = stageIndex(stage.key)
        const done = upload.status === 'done' || idx < current
        const active = !done && idx === current
        return (
          <Box
            key={stage.key}
            sx={{
              borderRadius: '18px',
              px: 2,
              py: 1.75,
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              bgcolor: active ? 'memories.card' : 'memories.linen',
              border: '1px solid',
              borderColor: active ? 'memories.emberFill' : 'transparent',
              boxShadow: active
                ? '0 0 0 3px rgba(255, 122, 61, 0.15)'
                : 'none',
            }}
          >
            {done ? (
              <CheckCircleIcon sx={{ color: 'memories.lagoonFill', fontSize: 22 }} />
            ) : active ? (
              <CircularProgress size={20} sx={{ color: 'memories.emberFill' }} />
            ) : (
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  border: `2px solid ${theme.palette.memories.lineStrong}`,
                }}
              />
            )}
            <Typography variant="body2" sx={{ color: 'memories.ink', fontWeight: 500 }}>
              {stage.label}
            </Typography>
          </Box>
        )
      })}
    </Box>
  )
}
