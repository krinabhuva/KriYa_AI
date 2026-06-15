import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
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
import DashboardInventory from './pages/Dashboard_Inventory'
import DashboardPrediction from './pages/Dashboard_Prediction'
import DashboardSettings from './pages/Dashboard_Settings'
import './App.css'

export default function App() {
  const { pathname } = useLocation()

  return (
    <>
      {pathname !== '/login' && <Header />}
      <main className="app-container">
        <Routes>
          <Route path="/" element={<Landing_page />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/landing" element={<Landing_page />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<DashboardAnalytics />} />
          <Route path="/ai-insights" element={<DashboardAIinsights />} />
          <Route path="/reports" element={<DashboardReports />} />
          <Route path="/settings" element={<DashboardSettings />} />
          <Route path="/prediction" element={<DashboardPrediction />} />
          <Route path="/inventory" element={<DashboardInventory />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/admin" element={<Admin_Portal />} />
        </Routes>
      </main>
    </>
  )
}
