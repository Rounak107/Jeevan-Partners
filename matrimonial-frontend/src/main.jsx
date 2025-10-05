// src/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './bootstrap'; // Add this import FIRST
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)