// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Import the Footer
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MatchesPage from "./pages/MatchesPage";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import LikesPage from "./pages/LikesPage";
import CallPage from './pages/CallPage';
import MembershipPricing from './components/MembershipPricing';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Navbar />
        
        {/* Main content area that grows to fill space */}
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/messages" element={<Navigate to="/matches" replace />} />
            <Route path="/messages/:id" element={<MessagesPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/membership" element={<MembershipPricing />} />
            <Route path="/call/:id" element={<CallPage />} />
            <Route path="/likes" element={<LikesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        {/* Footer at the bottom */}
        <Footer />
      </div>
    </Router>
  );
}