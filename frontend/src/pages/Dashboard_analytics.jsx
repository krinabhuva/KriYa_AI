import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import './dashboard.css'

export default function DashboardAnalytics() {
  useEffect(() => {
    try { document.documentElement.classList.add('dark') } catch (e) {}
  }, [])

  return (
    <div className="flex h-screen overflow-hidden antialiased font-body-md text-body-md bg-surface-container-lowest">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-surface">
        <div className="flex-1 overflow-y-auto p-margin-mobile md:p-margin-desktop scroll-smooth">
          <div className="max-w-container-max mx-auto space-y-stack-xl">
            <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-stack-md mb-stack-xl">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded bg-secondary-container/20 text-secondary font-label-sm text-label-sm border border-secondary/20">LIVE DATA</span>
                  <span className="text-outline text-sm">•</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Last updated: 2 mins ago</span>
                </div>
                <h1 className="font-display-lg text-display-lg font-bold tracking-tight text-on-surface">Analytics Overview</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-stack-xs max-w-2xl">Monitor KPIs, revenue streams, and product growth vectors across your portfolio.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="glass-panel rounded-lg flex items-center px-4 py-2.5 cursor-pointer hover:bg-surface-container transition-colors group">
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors mr-2">calendar_month</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline-variant uppercase tracking-wider text-[10px] leading-none mb-1">Date Range</span>
                    <span className="font-label-md text-label-md text-on-surface">Oct 1 - Oct 31, 2024</span>
                  </div>
                  <span className="material-symbols-outlined text-outline ml-4">expand_more</span>
                </div>
                <div className="glass-panel rounded-lg flex items-center px-4 py-2.5 cursor-pointer hover:bg-surface-container transition-colors group">
                  <span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors mr-2">category</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline-variant uppercase tracking-wider text-[10px] leading-none mb-1">Product Category</span>
                    <span className="font-label-md text-label-md text-on-surface">All Categories</span>
                  </div>
                  <span className="material-symbols-outlined text-outline ml-4">expand_more</span>
                </div>
                <button className="w-10 h-10 rounded-lg bg-surface-container border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container-highest hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
              </div>
            </header>

            {/* KPI Summary Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-gutter">
              <div className="glass-panel rounded-xl p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Total Revenue</p>
                <h3 className="font-headline-lg text-headline-lg font-semibold text-on-surface">$2.4M</h3>
                <div className="flex items-center gap-1 mt-2 text-primary">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  <span className="font-label-md text-label-md">+14.2%</span>
                  <span className="font-body-sm text-body-sm text-outline ml-1">vs last month</span>
                </div>
              </div>
              <div className="glass-panel rounded-xl p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Active Users</p>
                <h3 className="font-headline-lg text-headline-lg font-semibold text-on-surface">84.2K</h3>
                <div className="flex items-center gap-1 mt-2 text-primary">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  <span className="font-label-md text-label-md">+5.8%</span>
                  <span className="font-body-sm text-body-sm text-outline ml-1">vs last month</span>
                </div>
              </div>
              <div className="glass-panel rounded-xl p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Conversion Rate</p>
                <h3 className="font-headline-lg text-headline-lg font-semibold text-on-surface">3.24%</h3>
                <div className="flex items-center gap-1 mt-2 text-error">
                  <span className="material-symbols-outlined text-[16px]">trending_down</span>
                  <span className="font-label-md text-label-md">-1.1%</span>
                  <span className="font-body-sm text-body-sm text-outline ml-1">vs last month</span>
                </div>
              </div>
              <div className="glass-panel rounded-xl p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Avg Order Value</p>
                <h3 className="font-headline-lg text-headline-lg font-semibold text-on-surface">$142.50</h3>
                <div className="flex items-center gap-1 mt-2 text-primary">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  <span className="font-label-md text-label-md">+8.4%</span>
                  <span className="font-body-sm text-body-sm text-outline ml-1">vs last month</span>
                </div>
              </div>
            </div>

            {/* The rest of the analytics layout can be added here (charts, tables) - using simplified placeholders for now */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
              <div className="glass-panel rounded-xl p-6 lg:col-span-8 min-h-[320px]">Monthly Revenue Trend (chart placeholder)</div>
              <div className="glass-panel rounded-xl p-6 lg:col-span-4 min-h-[320px]">Category Performance (chart placeholder)</div>
              <div className="glass-panel rounded-xl p-6 lg:col-span-6 min-h-[300px]">Acquisition vs Retention (chart placeholder)</div>
              <div className="glass-panel rounded-xl p-6 lg:col-span-6 min-h-[300px]">Top Products (chart placeholder)</div>
              <div className="glass-panel rounded-xl p-0 lg:col-span-12 overflow-hidden">Recent Anomalies (table placeholder)</div>
            </div>
          </div>
        </div>

        <footer className="mt-stack-xl py-6 border-t border-outline-variant/10">
          <div className="max-w-container-max mx-auto flex justify-between items-center">
            <p className="text-body-sm text-on-surface-variant">© 2024 Kriya AI. All rights reserved.</p>
            <div className="flex gap-4">
              <a className="hover:text-primary transition-colors" href="#">Privacy</a>
              <a className="hover:text-primary transition-colors" href="#">Terms</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
