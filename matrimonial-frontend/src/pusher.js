import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_KEY || "12a1161315a422de01e1",
  cluster: import.meta.env.VITE_PUSHER_CLUSTER || "ap2",
  forceTLS: true,
  authEndpoint: "https://couplemarriage.com/broadcasting/auth",
  auth: {
    headers: {
      // if using cookie/session auth, ensure csrf cookie header or axios withCredentials = true
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
      'Accept': 'application/json'
    }
  }
});

export default echo;
