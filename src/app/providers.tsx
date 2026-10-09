import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

import { theme } from '@/theme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter
          basename={
            import.meta.env.BASE_URL === './'
              ? undefined
              : import.meta.env.BASE_URL.replace(/\/$/, '')
          }
        >
          {children}
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
