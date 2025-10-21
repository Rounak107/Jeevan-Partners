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

// Initialize CSRF cookie in an async function
const initializeCSRF = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie'); // returns 204 and sets XSRF-TOKEN + laravel_session cookies
    console.log("✅ CSRF cookie initialized");
  } catch (err) {
    console.warn('Could not fetch CSRF cookie:', err?.message || err);
  }
};

// Call the async function but don't block Echo initialization
initializeCSRF();

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
  auth: {
    headers: {
      Accept: 'application/json',
    }
  },
  // custom authorizer — ensures axios (with Authorization header and cookies) is used
  authorizer: (channel) => {
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