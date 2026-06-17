import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import api from '../api'
import '../pages/dashboard.css'

export default function Sidebar() {
  const navigate = useNavigate()
  const linkClass = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl font-label-md transition-all ${
      isActive ? 'nav-link-active text-primary bg-primary/10 font-semibold' : 'text-on-surface-variant hover:bg-surface-variant/20'
    }`

  const handleLogout = () => {
    api.logout()
    navigate('/login')
  }

  const currentUser = api.user || { username: 'Guest', role: 'viewer', full_name: 'Guest User' }

  return (
    <aside className="hidden md:flex flex-col h-full py-6 sticky top-0 bg-surface-container-low border-r border-outline-variant/10 w-72 shrink-0 z-40">
      {/* Brand Header */}
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(91,124,240,0.2)]">
          <span className="material-symbols-outlined text-on-primary font-bold">bolt</span>
        </div>
        <div>
          <h1 className="font-headline-md text-headline-md font-extrabold tracking-tight text-on-surface">Kriya AI</h1>
          <p className="font-label-sm text-[10px] uppercase tracking-[0.2em] text-primary/70">Enterprise Intelligence</p>
        </div>
      </div>

      {/* Portal Quick Navigation Actions */}
      <div className="px-6 mb-6 flex flex-col gap-2">
        <NavLink to="/portal" className="w-full bg-surface-container-high border border-outline-variant/30 hover:bg-surface-bright text-on-surface font-label-md py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all">
          <span className="material-symbols-outlined text-[20px]">apps</span>
          Portal Selector
        </NavLink>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        <NavLink to="/dashboard" className={linkClass}>
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-md">Dashboard</span>
        </NavLink>
        <NavLink to="/analytics" className={linkClass}>
          <span className="material-symbols-outlined">monitoring</span>
          <span className="font-label-md">Analytics</span>
        </NavLink>
        <NavLink to="/ai-insights" className={linkClass}>
          <span className="material-symbols-outlined">psychology</span>
          <span className="font-label-md">AI Insights</span>
        </NavLink>
        <NavLink to="/prediction" className={linkClass}>
          <span className="material-symbols-outlined">query_stats</span>
          <span className="font-label-md">Predictions</span>
        </NavLink>
        <NavLink to="/inventory" className={linkClass}>
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="font-label-md">Inventory</span>
        </NavLink>
        <NavLink to="/reports" className={linkClass}>
          <span className="material-symbols-outlined">description</span>
          <span className="font-label-md">Reports</span>
        </NavLink>
        <NavLink to="/settings" className={linkClass}>
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label-md">Settings</span>
        </NavLink>

        {/* Admin only sidebar link */}
        {currentUser.role === 'admin' && (
          <NavLink to="/admin" className={linkClass}>
            <span className="material-symbols-outlined text-secondary">admin_panel_settings</span>
            <span className="font-label-md text-secondary">Admin Portal</span>
          </NavLink>
        )}
      </nav>

      {/* User Session Info Card & Logout at Bottom */}
      <div className="mt-auto px-4 pt-4 border-t border-outline-variant/10">
        <div className="flex flex-col gap-3 bg-surface-container-high/40 p-4 rounded-xl border border-outline-variant/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm border border-primary/20">
              {currentUser.username.substring(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-label-md text-label-md text-on-surface truncate font-semibold leading-tight">{currentUser.full_name}</p>
              <p className="font-label-sm text-[11px] text-primary/80 capitalize mt-0.5 leading-none">{currentUser.role}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full mt-1 bg-error-container/10 hover:bg-error-container/20 text-error border border-error/20 hover:border-error/40 font-label-sm text-label-sm py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]">
            <span className="material-symbols-outlined text-[16px]">logout</span>
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  )
}
