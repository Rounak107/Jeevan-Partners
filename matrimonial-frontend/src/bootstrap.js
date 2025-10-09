import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "https://couplemarriage.com";
axios.defaults.withCredentials = true;

window.axios = axios;

await axios.get("/sanctum/csrf-cookie").catch(() => {
  console.warn("⚠️ Could not get CSRF cookie from backend");
});

Pusher.logToConsole = true;
window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_KEY || '12a1161315a422de01e1',
  cluster: import.meta.env.VITE_PUSHER_CLUSTER || 'ap2',
  forceTLS: true,
  encrypted: true,
  wsHost: 'ws-ap2.pusher.com',
  wsPort: 443,
  wssPort: 443,
  enabledTransports: ['ws', 'wss'],
  authEndpoint: 'https://couplemarriage.com/broadcasting/auth',
  auth: {
    headers: {
      Accept: 'application/json',
    },
  },
});


console.log("✅ Laravel Echo initialized successfully");
