// frontend/src/bootstrap.js (or wherever you initialize Echo)
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "https://couplemarriage.com";
axios.defaults.withCredentials = true; // send cookies for cross-site requests

// If your app stores an access token in localStorage, attach it so Echo auth can use it:
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// expose axios so Echo (and other libs) can use it
window.axios = axios;

// Ensure CSRF cookie exists (if using session-based login)
try {
  await axios.get('/sanctum/csrf-cookie'); // returns 204 and sets XSRF-TOKEN + laravel_session cookies
} catch (err) {
  console.warn('Could not fetch CSRF cookie:', err?.message || err);
}

Pusher.logToConsole = true;
window.Pusher = Pusher;

// Use a custom authorizer so the auth call uses axios (and the headers we set)
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY || import.meta.env.VITE_PUSHER_KEY || '12a1161315a422de01e1',
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER || import.meta.env.VITE_PUSHER_CLUSTER || 'ap2',
  forceTLS: true,
  wsHost: 'ws-ap2.pusher.com',
  wsPort: 443,
  wssPort: 443,
  enabledTransports: ['ws', 'wss'],
  // DO NOT set authEndpoint to a full URL if axios.baseURL is set; we'll use axios explicitly below
  auth: {
    headers: {
      Accept: 'application/json',
      // X-CSRF-TOKEN will be included automatically by axios if present
    }
  },
  // custom authorizer — ensures axios (with Authorization header and cookies) is used
  authorizer: (channel) => { // Removed unused 'options' parameter
    return {
      authorize: (socketId, callback) => {
        axios.post('/broadcasting/auth', {
          socket_id: socketId,
          channel_name: channel.name
        }).then(response => {
          callback(false, response.data);
        }).catch(error => {
          // callback with error — pusher will emit AuthError
          callback(true, error.response ? error.response.data : error);
        });
      }
    };
  },
});

console.log("✅ Laravel Echo (Pusher) initialized");