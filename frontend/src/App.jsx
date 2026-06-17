import React from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Landing_page from './pages/Landing_page'
import Upload from './pages/Upload'
import Dashboard from './pages/Dashboard'
import Portal from './pages/portal'
import Admin_Portal from './pages/Admin_Portal'
import DashboardAnalytics from './pages/Dashboard_analytics'
import DashboardAIinsights from './pages/Dashboard_AIinsights'
import DashboardReports from './pages/Dashboard_Reports'
import DashboardInventory from './pages/Dashboard_inventory'
import DashboardPrediction from './pages/Dashboard_prediction'
import DashboardSettings from './pages/Dashboard_Settings'
import api from './api'
import './App.css'

function ProtectedRoute({ children }) {
  if (!api.isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return children
}

function AdminRoute({ children }) {
  if (!api.isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  if (api.user?.role !== 'admin') {
    return <Navigate to="/portal" replace />
  }
  return children
}

export default function App() {
  const { pathname } = useLocation()
  
  // Paths where the global Header should be hidden (they have their own nav)
  const hideHeaderPaths = ['/login', '/', '/about', '/landing', '/dashboard', '/analytics', '/ai-insights', '/prediction', '/inventory', '/reports', '/settings', '/admin', '/portal', '/upload']
  const shouldHideHeader = hideHeaderPaths.includes(pathname)

  return (
    <>
      {!shouldHideHeader && <Header />}
      <main className="app-container">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing_page />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/landing" element={<Landing_page />} />

          {/* Protected routes */}
          <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><DashboardAnalytics /></ProtectedRoute>} />
          <Route path="/ai-insights" element={<ProtectedRoute><DashboardAIinsights /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><DashboardReports /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><DashboardSettings /></ProtectedRoute>} />
          <Route path="/prediction" element={<ProtectedRoute><DashboardPrediction /></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute><DashboardInventory /></ProtectedRoute>} />
          <Route path="/portal" element={<ProtectedRoute><Portal /></ProtectedRoute>} />
          
          {/* Admin only route */}
          <Route path="/admin" element={<AdminRoute><Admin_Portal /></AdminRoute>} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  )
}
