import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import './dashboard.css'

export default function DashboardPrediction() {
  useEffect(() => {
    try { document.documentElement.classList.add('dark') } catch (e) {}
  }, [])

  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="md:hidden flex items-center justify-between px-margin-mobile py-4 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 sticky top-0 z-30">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Kriya</h1>
          <button className="text-on-surface-variant">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
          <div className="max-w-container-max mx-auto space-y-gutter">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-stack-lg">
              <div>
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">Sales Forecast</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-stack-xs">AI-driven predictive modeling for Q3 2024.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container/20 text-secondary border border-secondary/30 font-label-sm text-label-sm">
                  <span className="w-2 h-2 rounded-full bg-secondary mr-2 animate-pulse"></span>
                  Live Sync
                </span>
                <button className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant transition-colors border border-outline-variant/30 font-label-md text-label-md text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined">download</span>
                  Export
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
              <div className="col-span-1 md:col-span-4 glass-panel rounded-xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-50"></div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-label-md text-label-md text-on-surface-variant">Next Day Sales (Est.)</p>
                    <h3 className="font-display-lg text-display-lg text-on-surface mt-1">$42.8K</h3>
                  </div>
                  <div className="p-2 rounded-lg bg-primary-container/10 text-primary">
                    <span className="material-symbols-outlined">today</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-label-sm text-label-sm">
                  <span className="text-tertiary flex items-center"><span className="material-symbols-outlined text-[14px]">arrow_upward</span> 4.2%</span>
                  <span className="text-on-surface-variant">vs. historical avg</span>
                </div>
              </div>

              <div className="col-span-1 md:col-span-4 glass-panel rounded-xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-transparent opacity-50"></div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-label-md text-label-md text-on-surface-variant">Next Week Sales (Est.)</p>
                    <h3 className="font-display-lg text-display-lg text-on-surface mt-1">$294.1K</h3>
                  </div>
                  <div className="p-2 rounded-lg bg-secondary-container/10 text-secondary">
                    <span className="material-symbols-outlined">date_range</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-label-sm text-label-sm">
                  <span className="text-tertiary flex items-center"><span className="material-symbols-outlined text-[14px]">arrow_upward</span> 8.7%</span>
                  <span className="text-on-surface-variant">vs. historical avg</span>
                </div>
              </div>

              <div className="col-span-1 md:col-span-4 glass-panel rounded-xl p-6 relative overflow-hidden glow-effect">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-inverse-primary to-transparent opacity-80"></div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-label-md text-label-md text-on-surface-variant">Next Month Revenue</p>
                    <h3 className="font-display-lg text-display-lg text-primary mt-1">$1.2M</h3>
                  </div>
                  <div className="p-2 rounded-lg bg-inverse-primary/10 text-inverse-primary">
                    <span className="material-symbols-outlined">monitoring</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-label-sm text-label-sm">
                  <span className="text-tertiary flex items-center"><span className="material-symbols-outlined text-[14px]">arrow_upward</span> 12.4%</span>
                  <span className="text-on-surface-variant">High confidence</span>
                </div>
              </div>

              <div className="col-span-1 md:col-span-8 glass-panel rounded-xl p-6 flex flex-col h-[500px]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-headline-md text-headline-md text-on-surface">Revenue Projection Model</h3>
                  <div className="flex gap-2 bg-surface-container p-1 rounded-lg">
                    <button className="px-3 py-1 rounded bg-surface-variant text-on-surface font-label-sm text-label-sm">Day</button>
                    <button className="px-3 py-1 rounded text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors">Week</button>
                    <button className="px-3 py-1 rounded text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors">Month</button>
                  </div>
                </div>

                <div className="flex-1 relative w-full border-b border-l border-outline-variant/30 mt-4">
                  <div className="absolute -left-12 top-0 h-full flex flex-col justify-between text-on-surface-variant font-label-sm text-label-sm py-2">
                    <span>1.5M</span>
                    <span>1.0M</span>
                    <span>500K</span>
                    <span>0</span>
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="w-full h-px bg-outline-variant/10"></div>
                    <div className="w-full h-px bg-outline-variant/10"></div>
                    <div className="w-full h-px bg-outline-variant/10"></div>
                    <div className="w-full h-px bg-transparent"></div>
                  </div>
                  <div className="absolute -bottom-8 left-0 w-full flex justify-between text-on-surface-variant font-label-sm text-label-sm px-4">
                    <span>Jul 1</span>
                    <span>Jul 15</span>
                    <span>Aug 1</span>
                    <span>Aug 15</span>
                    <span>Sep 1</span>
                  </div>
                  <div className="absolute inset-0 px-4 flex items-end">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path d="M0,70 L20,65 L40,50 L60,40 L80,25 L100,10 L100,90 L80,75 L60,80 L40,85 L20,90 L0,95 Z" fill="rgba(192, 193, 255, 0.05)"></path>
                      <polyline fill="none" points="0,80 20,75 40,65" stroke="rgba(199, 196, 215, 0.5)" strokeDasharray="2,2" strokeWidth="0.5"></polyline>
                      <polyline fill="none" points="40,65 60,55 80,45 100,30" stroke="#8083ff" strokeWidth="1.5" style={{filter: 'drop-shadow(0 0 4px rgba(128, 131, 255, 0.5))'}}></polyline>
                    </svg>
                  </div>
                </div>

                <div className="mt-12 flex justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-on-surface-variant/50 border-b border-dashed border-on-surface-variant"></div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Historical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-primary"></div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Predicted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary/10 rounded-sm"></div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">95% Confidence</span>
                  </div>
                </div>
              </div>

              <div className="col-span-1 md:col-span-4 flex flex-col gap-gutter">
                <div className="glass-panel rounded-xl p-6 flex-1 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3"></div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary-container to-secondary-container text-on-primary-container">
                      <span className="material-symbols-outlined">psychology</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface">Insight Engine</h3>
                  </div>
                  <div className="space-y-6">
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">The projected 12.4% increase in next month's revenue is primarily driven by an anticipated surge in enterprise renewals and the successful launch of the new 'Pro' tier feature set.</p>
                    <div className="space-y-4 border-t border-outline-variant/10 pt-4">
                      <h4 className="font-label-md text-label-md text-primary uppercase tracking-wider">Key Drivers</h4>
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-tertiary mt-0.5 text-[18px]">add_circle</span>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface">Enterprise Renewals</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Historically, Q3 sees a 40% higher renewal rate for top-tier accounts.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-tertiary mt-0.5 text-[18px]">add_circle</span>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface">Marketing Velocity</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Recent campaigns show a 2x improvement in lead-to-opportunity conversion time.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 opacity-70">
                        <span className="material-symbols-outlined text-error mt-0.5 text-[18px]">remove_circle</span>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface">Seasonal Churn</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Slight offset expected from typical late-summer SMB churn (-2.1%).</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-panel rounded-xl p-6 bg-surface-container-high/50 border-none">
                  <p className="font-label-md text-label-md text-on-surface mb-3">AI Recommendation</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Increase ad spend in the EU region by 15% this week to capitalize on early conversion trends.</p>
                  <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-inverse-primary to-primary-container text-white font-label-md text-label-md hover:shadow-[0_0_15px_rgba(128,131,255,0.4)] transition-all flex justify-center items-center gap-2">
                    <span className="material-symbols-outlined">auto_awesome</span>
                    Apply Allocation Strategy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
