import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './dashboard.css'
import Sidebar from '../components/Sidebar'

export default function Dashboard() {
  useEffect(() => {
    try { document.documentElement.classList.add('dark') } catch (e) {}
    return () => {
      // keep dark globally, but allow cleanup if you change behavior
    }
  }, [])

  return (
    <div className="flex h-screen overflow-hidden antialiased font-body-md text-body-md bg-surface-container-lowest">
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-surface">
        {/* TopNavBar */}
        <header className="flex justify-between items-center w-full px-margin-desktop py-5 bg-surface/40 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/5 shrink-0">
          <div className="flex items-center gap-12">
            <div className="relative hidden md:block">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
              <input className="bg-surface-container-low border border-outline-variant/10 rounded-xl py-2.5 pl-12 pr-6 text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:ring-1 focus:ring-primary focus:border-primary/50 w-80 transition-all" placeholder="Search data points..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 pr-6 border-r border-outline-variant/10">
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors relative">
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-surface"></span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-[22px]">chat_bubble</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-label-md text-on-surface leading-none">Alexander Pierce</p>
                <p className="text-label-sm text-primary leading-none mt-1">Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden">
                <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeMFKh5xmuy0DQMR5IluZ5yK3DbfBrBnRO6Rh8tQcL_jzDFxeo3HmHqESNx8_0RjWXCNLv4IWbVFJAXzOUN6uYfF0aUs0n4jl0tlcszPN24AR4td21-axVq4L4sMhsuEbUWt8zoPZvQQBtAn1IfEVubVgHdwobbCRqnZJNAJJBKOLp6-qnt5juUpIhLbmbK7W8-gQiiTr138mFP8IrJFSbV_h-yd8VnkMjumPjiGq8gNSXF72HM5angsht4MzJAWnvqASOFuotmgI" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-margin-mobile md:p-margin-desktop scroll-smooth">
          <div className="max-w-container-max mx-auto space-y-stack-xl">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">Executive Dashboard</h2>
                <p className="font-body-md text-on-surface-variant mt-2 max-w-2xl">A comprehensive view of your organization's real-time performance metrics and predictive growth insights.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-5 py-2.5 rounded-xl bg-surface-container-high text-on-surface font-label-md border border-outline-variant/10 hover:bg-surface-bright transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                  Last 30 Days
                </button>
                <button className="px-5 py-2.5 rounded-xl bg-surface-container-high text-on-surface font-label-md border border-outline-variant/10 hover:bg-surface-bright transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">file_download</span>
                  Export
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              <div className="premium-card rounded-2xl p-8 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[28px]">payments</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-tertiary font-bold flex items-center gap-1 text-label-md bg-tertiary/10 px-2.5 py-1 rounded-lg">
                      <span className="material-symbols-outlined text-[16px]">trending_up</span>
                      14.5%
                    </span>
                    <span className="text-[11px] text-on-surface-variant uppercase tracking-widest mt-2">vs prev month</span>
                  </div>
                </div>
                <p className="text-label-md font-semibold text-on-surface-variant tracking-wide">TOTAL REVENUE</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <h3 className="font-display-lg text-display-lg font-bold text-on-surface">$2,450,000</h3>
                  <span className="text-on-surface-variant text-label-sm">USD</span>
                </div>
              </div>

              <div className="premium-card rounded-2xl p-8 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[28px]">account_balance_wallet</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-tertiary font-bold flex items-center gap-1 text-label-md bg-tertiary/10 px-2.5 py-1 rounded-lg">
                      <span className="material-symbols-outlined text-[16px]">trending_up</span>
                      8.2%
                    </span>
                    <span className="text-[11px] text-on-surface-variant uppercase tracking-widest mt-2">vs prev month</span>
                  </div>
                </div>
                <p className="text-label-md font-semibold text-on-surface-variant tracking-wide">GROSS PROFIT</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <h3 className="font-display-lg text-display-lg font-bold text-on-surface">$845,200</h3>
                  <span className="text-on-surface-variant text-label-sm">USD</span>
                </div>
              </div>

              <div className="premium-card rounded-2xl p-8 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined text-[28px]">shopping_cart</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-error font-bold flex items-center gap-1 text-label-md bg-error/10 px-2.5 py-1 rounded-lg">
                      <span className="material-symbols-outlined text-[16px]">trending_down</span>
                      2.1%
                    </span>
                    <span className="text-[11px] text-on-surface-variant uppercase tracking-widest mt-2">vs prev month</span>
                  </div>
                </div>
                <p className="text-label-md font-semibold text-on-surface-variant tracking-wide">TOTAL ORDERS</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <h3 className="font-display-lg text-display-lg font-bold text-on-surface">12,450</h3>
                  <span className="text-on-surface-variant text-label-sm">PCS</span>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
              <div className="premium-card rounded-2xl p-8 lg:col-span-2 flex flex-col">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h3 className="font-headline-md text-on-surface">Revenue Growth Trend</h3>
                    <p className="text-body-sm text-on-surface-variant mt-1">Daily revenue fluctuations over current period</p>
                  </div>
                  <div className="flex p-1 bg-surface-container-low border border-outline-variant/10 rounded-xl">
                    <button className="px-4 py-1.5 rounded-lg text-on-surface-variant text-label-sm hover:text-on-surface transition-all">7D</button>
                    <button className="px-4 py-1.5 rounded-lg bg-primary/20 text-primary font-bold text-label-sm transition-all shadow-inner">1M</button>
                    <button className="px-4 py-1.5 rounded-lg text-on-surface-variant text-label-sm hover:text-on-surface transition-all">1Y</button>
                  </div>
                </div>
                <div className="w-full h-64 bg-surface-container-low rounded-lg relative overflow-hidden flex items-end px-4 pb-4 gap-2 border border-outline-variant/10">
                  <div className="w-full h-[30%] bg-primary-container/20 rounded-t-sm hover:bg-primary-container/40 transition-colors"></div>
                  <div className="w-full h-[45%] bg-primary-container/20 rounded-t-sm hover:bg-primary-container/40 transition-colors"></div>
                  <div className="w-full h-[40%] bg-primary-container/20 rounded-t-sm hover:bg-primary-container/40 transition-colors"></div>
                  <div className="w-full h-[60%] bg-primary-container/20 rounded-t-sm hover:bg-primary-container/40 transition-colors"></div>
                  <div className="w-full h-[55%] bg-primary-container/20 rounded-t-sm hover:bg-primary-container/40 transition-colors"></div>
                  <div className="w-full h-[75%] bg-primary-container/20 rounded-t-sm hover:bg-primary-container/40 transition-colors"></div>
                  <div className="w-full h-[85%] bg-primary/50 rounded-t-sm border-t border-primary relative">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface px-2 py-1 rounded text-xs text-on-surface border border-outline-variant/30 font-label-sm">$2.4M</div>
                  </div>
                </div>
              </div>

              <div className="premium-card rounded-2xl p-8 flex flex-col">
                <h3 className="font-headline-md text-on-surface mb-2">Category Split</h3>
                <p className="text-body-sm text-on-surface-variant mb-8">Revenue distribution by sector</p>
                <div className="flex-1 flex items-center justify-center relative">
                  <div className="relative w-56 h-56 rounded-full flex items-center justify-center border-[20px] border-surface-container-high">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="block font-display-lg text-on-surface leading-none">65%</span>
                      <span className="text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">SaaS</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-surface-container-high/40 border border-outline-variant/5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      <span className="text-label-sm text-on-surface-variant uppercase">Software</span>
                    </div>
                    <p className="text-body-lg font-bold text-on-surface">65.2%</p>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-high/40 border border-outline-variant/5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      <span className="text-label-sm text-on-surface-variant uppercase">Services</span>
                    </div>
                    <p className="text-body-lg font-bold text-on-surface">24.8%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="premium-card rounded-2xl overflow-hidden">
              <div className="p-8 border-b border-outline-variant/5 flex justify-between items-center">
                <div>
                  <h3 className="font-headline-md text-on-surface">Intelligence Feed</h3>
                  <p className="text-body-sm text-on-surface-variant mt-1">Real-time system events and data updates</p>
                </div>
                <button className="text-primary font-bold text-label-md hover:underline">View All Activity</button>
              </div>
              <div className="divide-y divide-outline-variant/5">
                <div className="flex items-center gap-6 p-6 hover:bg-primary/5 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform group-hover:scale-110">
                    <span className="material-symbols-outlined text-[24px]">upload_file</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-label-md text-on-surface text-[16px]">Q3 Financial Dataset Uploaded</h4>
                      <span className="px-2 py-0.5 rounded bg-tertiary/10 text-tertiary text-[10px] font-bold uppercase tracking-wider">Data Sync</span>
                    </div>
                    <p className="text-body-sm text-on-surface-variant mt-1">Automated batch process #8924 executed by System Core.</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-label-sm font-semibold text-on-surface">2 mins ago</p>
                    <p className="text-label-sm text-on-surface-variant">Source: ERP Connect</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 p-6 hover:bg-secondary/5 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0 transition-transform group-hover:scale-110">
                    <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-label-md text-on-surface text-[16px]">AI Prediction Model Retrained</h4>
                      <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider">ML Ops</span>
                    </div>
                    <p className="text-body-sm text-on-surface-variant mt-1">Prophetic Engine v2.4 achieved 99.2% accuracy on validation set.</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-label-sm font-semibold text-on-surface">1 hour ago</p>
                    <p className="text-label-sm text-on-surface-variant">Accuracy: +0.4%</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 p-6 hover:bg-surface-variant/30 transition-colors group">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center text-on-surface-variant shrink-0">
                    <span className="material-symbols-outlined text-[20px]">group_add</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-label-md text-on-surface text-[16px]">New User Invited</h4>
                    </div>
                    <p className="text-body-sm text-on-surface-variant mt-1">Sarah Jenkins (sarah.j@acmecorp.com)</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-label-sm font-semibold text-on-surface-variant">3 hrs ago</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-surface-container-highest text-on-surface-variant">System</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-stack-xl py-12 border-t border-outline-variant/10">
          <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[14px] text-on-primary font-bold">bolt</span>
                </div>
                <span className="font-headline-md text-on-surface text-[20px]">Kriya AI</span>
              </div>
              <p className="text-body-sm text-on-surface-variant">The future of enterprise intelligence, today.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Security Architecture</a>
              <a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Compliance</a>
              <a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
              <a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Use</a>
            </div>
            <p className="text-label-sm text-on-surface-variant/60">© 2024 Kriya AI. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
