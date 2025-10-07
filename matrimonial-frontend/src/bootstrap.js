import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Temporarily disable Pusher for testing
const enablePusher = false; // Set to false to disable

if (enablePusher) {
    // Enable Pusher logging
    Pusher.logToConsole = true;
    window.Pusher = Pusher;

    // Get environment variables with fallbacks
    const reverbAppKey = import.meta.env.VITE_REVERB_APP_KEY;
    const reverbHost = import.meta.env.VITE_REVERB_HOST || '127.0.0.1';
    const reverbPort = parseInt(import.meta.env.VITE_REVERB_PORT || '6001');
    const reverbScheme = import.meta.env.VITE_REVERB_SCHEME || 'http';
    //const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
    const apiUrl = import.meta.env.VITE_API_URL || 'https://couplemarriage.com/api';

    console.log('🎯 Echo configuration:', {
        key: reverbAppKey ? '***' + reverbAppKey.slice(-4) : 'MISSING',
        host: reverbHost,
        port: reverbPort,
        scheme: reverbScheme,
        apiUrl: apiUrl
    });

    // Initialize Echo only if we have the app key
    if (reverbAppKey) {
        try {
            window.Echo = new Echo({
                broadcaster: 'reverb',
                key: reverbAppKey,
                wsHost: reverbHost,
                wsPort: reverbPort,
                wssPort: reverbPort,
                forceTLS: (reverbScheme === 'https'),
                enabledTransports: ['ws', 'wss'],
                authEndpoint: `${apiUrl}/broadcasting/auth`,
                auth: {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                }
            });

            console.log('✅ Echo initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize Echo:', error);
        }
    } else {
        console.error('❌ Cannot initialize Echo without app key');
    }
} else {
    console.log('🚫 Pusher/Echo disabled for testing');
}