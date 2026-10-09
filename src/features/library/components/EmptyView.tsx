import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useRef, useState } from 'react'

import { GlassCard } from '@/components/GlassCard'
import { PageShell } from '@/components/PageShell'
import { SerifTitle } from '@/components/SerifTitle'

import { EmptyHeroArt } from './EmptyHeroArt'

interface EmptyViewProps {
  onStartUpload: (files?: FileList) => void
}

export function EmptyView({ onStartUpload }: EmptyViewProps) {
  const folderRef = useRef<HTMLInputElement>(null)
  const photosRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFiles = (files: FileList | null) => {
    if (files?.length) {
      onStartUpload(files)
    }
  }

  return (
    <PageShell maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          pt: { xs: 2, md: 4 },
        }}
      >
        <EmptyHeroArt />
        <SerifTitle sx={{ fontSize: { xs: '3rem', md: '4.5rem' } }}>
          No memories <Box component="em" sx={{ fontStyle: 'italic' }}>yet</Box>
        </SerifTitle>
        <Typography variant="subtitle1" sx={{ mt: 1.75, maxWidth: 480 }}>
          Add your trip photos and videos. Memories sorts them into trips by date and
          place.
        </Typography>

        <GlassCard
          padding={0}
          sx={{
            mt: 4.5,
            width: '100%',
            maxWidth: 760,
            bgcolor: 'rgba(255, 255, 255, 0.72)',
          }}
        >
          <Box
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragOver(false)
              handleFiles(e.dataTransfer.files)
            }}
            sx={{
              m: 1.5,
              py: 5,
              px: 3,
              borderRadius: '22px',
              border: '2px dashed',
              borderColor: dragOver ? 'memories.emberFill' : 'rgba(185, 70, 26, 0.28)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'border-color 0.2s',
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '20px',
                bgcolor: '#FFF1E6',
                color: 'memories.emberText',
                display: 'grid',
                placeItems: 'center',
                mb: 2.25,
              }}
            >
              <UploadOutlinedIcon />
            </Box>
            <Typography variant="h5" sx={{ fontSize: '1.375rem' }}>
              Drag a folder or photos here
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              JPG, HEIC, PNG, MP4 and MOV
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 3.25, justifyContent: 'center' }}>
              <Button
                variant="contained"
                startIcon={<CreateNewFolderOutlinedIcon />}
                onClick={() => folderRef.current?.click()}
              >
                Choose folder
              </Button>
              <Button
                variant="outlined"
                startIcon={<ImageOutlinedIcon />}
                onClick={() => photosRef.current?.click()}
              >
                Choose photos
              </Button>
            </Box>
          </Box>
        </GlassCard>

        <Box
          sx={{
            mt: 3.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'memories.lagoonText',
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: 18 }} />
          <Typography variant="body2" sx={{ color: 'memories.mute' }}>
            Everything stays on this computer. Nothing is sent online.
          </Typography>
        </Box>
      </Box>

      <input
        ref={folderRef}
        type="file"
        hidden
        multiple
        // @ts-expect-error webkitdirectory is non-standard but supported
        webkitdirectory=""
        onChange={(e) => handleFiles(e.target.files)}
      />
      <input
        ref={photosRef}
        type="file"
        hidden
        multiple
        accept="image/*,video/*"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </PageShell>
  )
}
