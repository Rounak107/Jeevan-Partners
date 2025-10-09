import Echo from "laravel-echo";
import Pusher from "pusher-js";

const enablePusher = true; // ✅ Enable Pusher

if (enablePusher) {
    // Enable Pusher logging (disable in production if you want)
    Pusher.logToConsole = true;
    window.Pusher = Pusher;

    const pusherKey = import.meta.env.VITE_PUSHER_KEY || "12a1161315a422de01e1";
    const pusherCluster = import.meta.env.VITE_PUSHER_CLUSTER || "ap2";

    console.log("🎯 Pusher Config:", {
        key: pusherKey ? "***" + pusherKey.slice(-4) : "MISSING",
        cluster: pusherCluster,
    });

    try {
        window.Echo = new Echo({
            broadcaster: "pusher",
            key: pusherKey,
            cluster: pusherCluster,
            forceTLS: true,
            wsHost: "ws-" + pusherCluster + ".pusher.com",
            wsPort: 443,
            wssPort: 443,
            enabledTransports: ["ws", "wss"],
            authEndpoint: "https://couplemarriage.com/broadcasting/auth",
            auth: {
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
                    "Accept": "application/json",
                },
            },
        });

        console.log("✅ Laravel Echo initialized successfully");
    } catch (error) {
        console.error("❌ Failed to initialize Echo:", error);
    }
} else {
    console.log("🚫 Pusher/Echo disabled for testing");
}
