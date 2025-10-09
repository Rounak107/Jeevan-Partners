import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "axios";

window.Pusher = Pusher;
window.axios = axios; // ensure axios exists

const echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_APP_KEY || "12a1161315a422de01e1",
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER || "ap2",
  forceTLS: true,
  authEndpoint: (import.meta.env.VITE_API_URL || 'https://couplemarriage.com') + '/broadcasting/auth',
  // Echo will use axios for auth if window.axios exists; axios.defaults.withCredentials = true from bootstrap-auth
  auth: {
    headers: {
      'Accept': 'application/json',
    }
  }
});

export default echo;
