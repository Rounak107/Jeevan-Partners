  /* eslint-env node */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env files from current directory
  const env = loadEnv(mode, process.cwd(), '')
  
  // Filter only VITE_* environment variables
  const clientEnv = {}
  for (const key in env) {
    if (key.startsWith('VITE_')) {
      clientEnv[key] = env[key]
    }
  }
  
  return {
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      hmr: {
        host: 'localhost',
      },
      cors: true,
    },
    define: {
      // Use import.meta.env instead of process.env
      'import.meta.env.VITE_REVERB_APP_KEY': JSON.stringify(env.VITE_REVERB_APP_KEY),
      'import.meta.env.VITE_REVERB_HOST': JSON.stringify(env.VITE_REVERB_HOST),
      'import.meta.env.VITE_REVERB_PORT': JSON.stringify(env.VITE_REVERB_PORT),
      'import.meta.env.VITE_REVERB_SCHEME': JSON.stringify(env.VITE_REVERB_SCHEME),
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    }
  }
})