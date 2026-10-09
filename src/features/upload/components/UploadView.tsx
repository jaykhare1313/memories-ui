import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

import { resolveUploadThumb } from '@/api/media'
import type { Upload } from '@/api/types'
import { GlassCard } from '@/components/GlassCard'
import { Loader } from '@/components/Loader'
import { PageShell } from '@/components/PageShell'
import { SerifTitle } from '@/components/SerifTitle'
import { formatEta } from '@/utils/format'
import { formatCount } from '@/utils/pluralize'

import { UploadStagePills } from './UploadStagePills'

interface UploadViewProps {
  upload?: Upload
  isLoading: boolean
  onCancel: () => void
}

export function UploadView({ upload, isLoading, onCancel }: UploadViewProps) {
  if (isLoading || !upload) {
    return (
      <PageShell maxWidth="md">
        <Loader />
      </PageShell>
    )
  }

  const pct = upload.total > 0 ? Math.round((upload.processed / upload.total) * 100) : 0
  const remaining = Math.max(0, Math.ceil(((100 - pct) / 100) * 70))

  return (
    <PageShell maxWidth="md">
      <SerifTitle sx={{ fontSize: { xs: '2.5rem', md: '3.25rem' } }}>
        Adding your <Box component="em" sx={{ fontStyle: 'italic' }}>photos</Box>
      </SerifTitle>
      <Typography variant="body2" sx={{ mt: 1 }}>
        This runs on your computer. You can keep browsing while it finishes.
      </Typography>

      <GlassCard sx={{ mt: 3.5 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Typography variant="h5" sx={{ fontSize: '1.5rem' }}>
            {upload.processed} of {formatCount(upload.total, 'photo')}
          </Typography>
          <Typography variant="caption" sx={{ color: 'memories.faint' }}>
            {pct}% · {formatEta(remaining)}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={pct}
          sx={{ mt: 2, mb: 0.5 }}
        />

        <UploadStagePills upload={upload} />

        <Typography variant="caption" sx={{ display: 'block', mt: 3.5, mb: 1.5 }}>
          Just added
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: 1,
            '@media (max-width: 900px)': {
              gridTemplateColumns: 'repeat(4, 1fr)',
            },
          }}
        >
          {Array.from({ length: 16 }).map((_, i) => {
            const src = upload.recentThumbs[i]
            return (
              <Box
                key={i}
                sx={{
                  aspectRatio: '1',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  bgcolor: 'memories.sand',
                  backgroundImage: src
                    ? undefined
                    : `repeating-linear-gradient(135deg, transparent, transparent 6px, rgba(22,23,27,0.04) 6px, rgba(22,23,27,0.04) 12px)`,
                }}
              >
                {src && (
                  <Box
                    component="img"
                    src={resolveUploadThumb(src)}
                    alt=""
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </Box>
            )
          })}
        </Box>

        <Typography variant="caption" sx={{ display: 'block', mt: 3, mb: 1.5 }}>
          Trips found so far
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {upload.tripsFound.map((trip) => (
            <Chip
              key={trip.id}
              label={`${trip.title} (${trip.photoCount})`}
              variant="outlined"
            />
          ))}
          {upload.tripsFound.length < 3 && (
            <Chip label="More as we go…" variant="outlined" sx={{ color: 'memories.faint' }} />
          )}
        </Box>

        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: (t) => `1px solid ${t.palette.memories.line}`,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="text" onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </GlassCard>
    </PageShell>
  )
}
