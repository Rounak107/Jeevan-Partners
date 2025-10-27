// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MatchesPage from "./pages/MatchesPage";
import MessagesListPage from "./pages/MessagesListPage";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import LikesPage from "./pages/LikesPage";
import CallPage from './pages/CallPage';
import MembershipPricing from './components/MembershipPricing';
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashboardPage from './pages/DashboardPage';
import UsersDetailPage from './pages/UsersDetailPage';
import PaymentsDetailPage from './pages/PaymentsDetailPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import AIKundliPage from './pages/AIKundliPage';
import API from "./api";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize CSRF first
        await API.get("/sanctum/csrf-cookie");
        console.log("✅ Global CSRF cookie initialized");
        
        // Then fetch current user
        const response = await API.get('/api/user');
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error initializing app:', error);
        // User might not be authenticated, which is fine
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Navbar currentUser={currentUser} />
        
        {/* Main content area that grows to fill space */}
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/matches" element={<MatchesPage />} />
            
            {/* Protected Routes */}
            <Route 
              path="/messages" 
              element={
                <ProtectedRoute userPlan={currentUser?.membership_plan}>
                  <MessagesListPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/messages/:id" 
              element={
                <ProtectedRoute userPlan={currentUser?.membership_plan}>
                  <MessagesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/likes" 
              element={
                <ProtectedRoute userPlan={currentUser?.membership_plan}>
                  <LikesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
  path="/ai-kundli" 
  element={
    <ProtectedRoute userPlan={currentUser?.membership_plan}>
      <AIKundliPage />
    </ProtectedRoute>
  } 
/>
            {/* Other routes */}
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/membership" element={<MembershipPricing />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/call/:id" element={<CallPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/users" element={<UsersDetailPage />} />
            <Route path="/dashboard/payments" element={<PaymentsDetailPage />} />
            <Route path="/dashboard/activity" element={<ActivityDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        {/* Footer at the bottom */}
        <Footer />
      </div>
    </Router>
  );
}