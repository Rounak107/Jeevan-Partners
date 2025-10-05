import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Load environment variables
    const env = loadEnv(mode, process.cwd(), '');
    
    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.js'],
                refresh: true,
            }),
            react(),
        ],
        server: {
            host: '0.0.0.0',
            port: 5173,
            hmr: {
                host: 'localhost',
            },
        },
        // Only define specific env variables needed for the frontend
        define: {
            'process.env.VITE_REVERB_APP_KEY': JSON.stringify(env.VITE_REVERB_APP_KEY),
            'process.env.VITE_REVERB_HOST': JSON.stringify(env.VITE_REVERB_HOST),
            'process.env.VITE_REVERB_PORT': JSON.stringify(env.VITE_REVERB_PORT),
            'process.env.VITE_REVERB_SCHEME': JSON.stringify(env.VITE_REVERB_SCHEME),
        }
    };
});