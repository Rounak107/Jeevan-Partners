import axios from "axios";
import { getToken } from "./auth";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",
  headers: { 
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  withCredentials: true, // Important for CORS
});

// Request interceptor
API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Log request for debugging
  console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
}, (error) => {
  console.error('❌ Request interceptor error:', error);
  return Promise.reject(error);
});

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.status, error.config?.url);
    
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    
    if (error.code === 'ERR_NETWORK') {
      console.error('🌐 Network error - check CORS configuration');
    }
    
    return Promise.reject(error);
  }
);

export default API;