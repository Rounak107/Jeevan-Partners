import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://couplemarriage.com',
  headers: { 'Accept': 'application/json' },
   withCredentials: true,
});

// attach token from localStorage if present
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

api.interceptors.request.use((config) => {
  const xsrfToken = getCookieValue('XSRF-TOKEN');
  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
  }
  return config;
});

function getCookieValue(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}


export default api;
