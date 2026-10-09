/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DATA_SOURCE: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_DEV_EMPTY_STATE: string
  readonly VITE_APP_ENV: 'dev' | 'prod' | string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
