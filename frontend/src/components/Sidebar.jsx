import React from 'react'
import { NavLink } from 'react-router-dom'
import '../pages/dashboard.css'

export default function Sidebar() {
  const linkClass = ({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl font-label-md transition-all ${isActive? 'nav-link-active text-primary':'text-on-surface-variant hover:bg-surface-variant/20'}`

  return (
    <aside className="hidden md:flex flex-col h-full py-stack-lg sticky top-0 bg-surface-container-low border-r border-outline-variant/10 w-72 shrink-0 z-40">
      <div className="px-8 mb-stack-xl flex items-center gap-stack-sm">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(91,124,240,0.2)]">
          <span className="material-symbols-outlined text-on-primary font-bold">bolt</span>
        </div>
        <div>
          <h1 className="font-headline-md text-headline-md font-extrabold tracking-tight text-on-surface">Kriya AI</h1>
          <p className="font-label-sm text-[10px] uppercase tracking-[0.2em] text-primary/70">Enterprise Intelligence</p>
        </div>
      </div>
      <div className="px-8 mb-stack-md">
        <button className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-label-md py-3 rounded-lg shadow-[0_0_20px_rgba(99,102,241,0.25)] flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">add</span>
          + New Analytics
        </button>
      </div>
      <nav className="flex-1 px-4 space-y-3">
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
      </nav>
      
    </aside>
  )
}
