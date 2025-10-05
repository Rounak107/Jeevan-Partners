import './bootstrap';

// Import Laravel Echo
import Echo from 'laravel-echo';

// Since Reverb uses Pusher protocol, we can use Pusher client
import Pusher from 'pusher-js';

// Assign Pusher to window for Laravel Echo
window.Pusher = Pusher;

// Initialize Echo with Reverb configuration
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    wssPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    disableStats: true,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER || 'mt1',
});

// Connection event listeners
window.Echo.connector.pusher.connection.bind('connected', () => {
    console.log('Connected to Reverb WebSocket server');
});

window.Echo.connector.pusher.connection.bind('disconnected', () => {
    console.log('Disconnected from Reverb WebSocket server');
});

window.Echo.connector.pusher.connection.bind('error', (error) => {
    console.error('WebSocket error:', error);
});