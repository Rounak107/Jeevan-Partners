// // frontend/src/bootstrap.js (or wherever you initialize Echo)
// import axios from "axios";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

// axios.defaults.baseURL = import.meta.env.VITE_API_URL || "https://couplemarriage.com";
// axios.defaults.withCredentials = true; // send cookies for cross-site requests

// // If your app stores an access token in localStorage, attach it so Echo auth can use it:
// const token = localStorage.getItem('token');
// if (token) {
//   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }

// // expose axios so Echo (and other libs) can use it
// window.axios = axios;

// // Initialize CSRF cookie in an async function
// const initializeCSRF = async () => {
//   try {
//     await axios.get('/sanctum/csrf-cookie'); // returns 204 and sets XSRF-TOKEN + laravel_session cookies
//     console.log("✅ CSRF cookie initialized");
//   } catch (err) {
//     console.warn('Could not fetch CSRF cookie:', err?.message || err);
//   }
// };

// // Call the async function but don't block Echo initialization
// initializeCSRF();

// Pusher.logToConsole = true;
// window.Pusher = Pusher;

// // Use a custom authorizer so the auth call uses axios (and the headers we set)
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: '12a1161315a422de01e1',
//     cluster: 'ap2',
//     forceTLS: true,
//     encrypted: true,
//     wsHost: 'ws-ap2.pusher.com',
//     wsPort: 443,
//     wssPort: 443,
//     enabledTransports: ['ws', 'wss'],
//     authEndpoint: '/broadcasting/auth',
//     auth: {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       }
//     }
  
// });

// console.log("✅ Laravel Echo (Pusher) initialized");




import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "https://couplemarriage.com";
axios.defaults.withCredentials = true;

// Initialize CSRF cookie first
const initializeCSRF = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    console.log("✅ CSRF cookie initialized");
  } catch (err) {
    console.warn('Could not fetch CSRF cookie:', err?.message || err);
  }
};

// Initialize Echo after CSRF
const initializeEcho = async () => {
  await initializeCSRF();
  
  Pusher.logToConsole = true;
  window.Pusher = Pusher;

  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '12a1161315a422de01e1',
    cluster: 'ap2',
    forceTLS: true,
    encrypted: true,
    wsHost: 'ws-ap2.pusher.com',
    wsPort: 443,
    wssPort: 443,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: '/broadcasting/auth',
    auth: {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }
  });

  console.log("✅ Laravel Echo (Pusher) initialized");
};

initializeEcho();