import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import './dashboard.css'

export default function DashboardInventory() {
  useEffect(() => {
    try { document.documentElement.classList.add('dark') } catch (e) {}
  }, [])

  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="docked full-width top-0 sticky z-50 flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto border-b border-outline-variant/10 shadow-sm bg-surface/80 backdrop-blur-xl flex-shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <button className="md:hidden text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <div className="relative w-full max-w-md hidden sm:block group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors text-[20px]">search</span>
              <input className="w-full bg-surface-container border border-outline-variant/30 rounded-full py-2 pl-10 pr-4 text-body-sm font-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner bg-opacity-50" placeholder="Search products, SKUs, or insights..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 justify-end flex-1">
            <button className="text-on-surface-variant hover:text-primary transition-colors relative group">
              <span className="material-symbols-outlined text-[22px] group-hover:animate-pulse">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border border-surface"></span>
            </button>
            <button className="hidden sm:block text-on-surface-variant hover:text-primary transition-colors group">
              <span className="material-symbols-outlined text-[22px]">chat_bubble</span>
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[24px]">account_circle</span>
            </button>
            <button className="hidden md:flex items-center px-4 py-2 rounded-lg bg-surface-container-high border border-outline-variant/30 text-on-surface font-label-md text-label-md hover:border-primary/50 hover:text-primary transition-all">
              Upgrade Plan
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto w-full scroll-smooth">
          <div className="max-w-container-max mx-auto p-margin-mobile md:p-margin-desktop space-y-stack-lg pb-stack-xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-stack-md">
              <div>
                <div className="flex items-center gap-2 text-primary mb-2">
                  <span className="material-symbols-outlined text-[18px]">auto_graph</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest font-semibold">Predictive Engine Active</span>
                </div>
                <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Inventory Forecast</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">AI-driven analysis indicating potential stockouts within the next 30 days based on current velocity and lead times.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant/30 text-on-surface font-label-md text-label-md hover:bg-surface-variant/20 transition-all bg-surface/50 backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(192,193,255,0.2)]">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  Export Report
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <div className="glass-card rounded-xl p-gutter relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-[80px] text-primary">health_and_safety</span>
                </div>
                <h3 className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                  Global Risk Score
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display-lg text-display-lg text-error">42</span>
                  <span className="font-body-md text-body-md text-outline">/100</span>
                </div>
                <p className="font-body-sm text-body-sm text-error mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">trending_down</span>
                  -12 pts from last week. Critical attention needed.
                </p>
              </div>

              <div className="glass-card rounded-xl p-gutter relative overflow-hidden">
                <h3 className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">warning</span>
                  SKUs at High Risk
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display-lg text-display-lg text-on-surface">14</span>
                </div>
                <div className="mt-3 w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-error h-full rounded-full" style={{width: '15%'}}></div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">15% of total catalog</p>
              </div>

              <div className="glass-card rounded-xl p-gutter relative overflow-hidden">
                <h3 className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-secondary">payments</span>
                  Est. Revenue at Risk
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display-lg text-display-lg text-on-surface">$128.5K</span>
                </div>
                <p className="font-body-sm text-body-sm text-secondary mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">lightbulb</span>
                  Expediting orders saves est. $85K
                </p>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6 border-l-4 border-l-primary relative overflow-hidden ai-shimmer">
              <div className="flex items-start gap-4 relative z-10">
                <div className="p-2 rounded-lg bg-primary/10 text-primary mt-1">
                  <span className="material-symbols-outlined text-[24px]">model_training</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-headline-md text-headline-md ai-glow-text mb-2">Supply Chain Anomaly Detected</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Kriya AI has identified a cascading delay in shipments originating from Port of Shenzhen affecting the <strong className="text-on-surface">Alpha-Series Widgets</strong>. Current trajectory suggests a complete stockout by Oct 14th.
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <button className="px-4 py-2 rounded-md bg-surface-bright border border-outline-variant/30 text-primary font-label-sm text-label-sm hover:bg-surface-variant transition-colors flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                      Approve Expedited Freight
                    </button>
                    <button className="text-on-surface-variant font-label-sm text-label-sm hover:text-on-surface transition-colors underline decoration-outline-variant underline-offset-4">
                      View Alternative Suppliers
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-md text-headline-md text-on-surface">Critical Restock Action List</h3>
                <div className="flex gap-2">
                  <button className="p-2 rounded-md border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary/50 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">search</span>
                  </button>
                  <button className="p-2 rounded-md border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary/50 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">sort</span>
                  </button>
                </div>
              </div>

              <div className="glass-card rounded-xl border border-outline-variant/20 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-surface-container-high/50 border-b border-outline-variant/20">
                        <th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Product / SKU</th>
                        <th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Current Stock</th>
                        <th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Predicted Stockout</th>
                        <th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Risk Level</th>
                        <th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold text-right">Suggested Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10 font-body-sm text-body-sm text-on-surface">
                      <tr className="hover:bg-surface-variant/10 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center border border-outline-variant/20">
                              <span className="material-symbols-outlined text-outline text-[20px]">router</span>
                            </div>
                            <div>
                              <p className="font-label-md text-label-md text-on-surface font-semibold">Alpha-Series Core Router</p>
                              <p className="text-outline text-[12px] font-mono mt-0.5">SKU: ALPH-RT-001</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col gap-1">
                            <span className="font-medium">42 units</span>
                            <div className="w-24 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                              <div className="bg-error h-full rounded-full" style={{width: '12%'}}></div>
                            </div>
                            <span className="text-[11px] text-outline">Velocity: 18/week</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-error font-medium flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">event_busy</span>
                            Oct 14 (12 Days)
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container/20 text-error border border-error/30 font-label-sm text-label-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
                            Critical
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="px-3 py-1.5 rounded bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors font-label-sm text-label-sm inline-flex items-center gap-1">
                            Order 200 <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </button>
                        </td>
                      </tr>

                      {/* Row 2 */}
                      <tr className="hover:bg-surface-variant/10 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center border border-outline-variant/20">
                              <span className="material-symbols-outlined text-outline text-[20px]">memory</span>
                            </div>
                            <div>
                              <p className="font-label-md text-label-md text-on-surface font-semibold">Quantum Logic Chip V2</p>
                              <p className="text-outline text-[12px] font-mono mt-0.5">SKU: QLC-V2-88X</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col gap-1">
                            <span className="font-medium">350 units</span>
                            <div className="w-24 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                              <div className="bg-[#f59e0b] h-full rounded-full" style={{width: '45%'}}></div>
                            </div>
                            <span className="text-[11px] text-outline">Velocity: 85/week</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-[#f59e0b] font-medium flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">calendar_clock</span>
                            Oct 28 (26 Days)
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/30 font-label-sm text-label-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span>
                            Warning
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="px-3 py-1.5 rounded bg-surface-container text-on-surface border border-outline-variant/30 hover:border-outline transition-colors font-label-sm text-label-sm inline-flex items-center gap-1">
                            Review Plan
                          </button>
                        </td>
                      </tr>

                      {/* Row 3 */}
                      <tr className="hover:bg-surface-variant/10 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center border border-outline-variant/20">
                              <span className="material-symbols-outlined text-outline text-[20px]">dns</span>
                            </div>
                            <div>
                              <p className="font-label-md text-label-md text-on-surface font-semibold">Edge Server Blade</p>
                              <p className="text-outline text-[12px] font-mono mt-0.5">SKU: ESB-100-M</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col gap-1">
                            <span className="font-medium">1,240 units</span>
                            <div className="w-24 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                              <div className="bg-[#10b981] h-full rounded-full" style={{width: '78%'}}></div>
                            </div>
                            <span className="text-[11px] text-outline">Velocity: 120/week</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-outline font-medium flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                            Dec 15 (72 Days)
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 font-label-sm text-label-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                            Healthy
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className="text-outline font-label-sm text-label-sm italic mr-4">No action needed</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 border-t border-outline-variant/20 bg-surface-container-low/50 flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Showing 1-3 of 24 critical items</span>
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded hover:bg-surface-variant text-outline disabled:opacity-50" disabled>
                      <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                    </button>
                    <button className="p-1.5 rounded hover:bg-surface-variant text-on-surface">
                      <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="full-width bottom border-t border-outline-variant/20 flat bg-surface-container-lowest w-full py-stack-xl px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-gutter z-10 relative mt-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight">Kriya AI</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">© 2024 Kriya AI. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors hover:opacity-100" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors hover:opacity-100" href="#">Terms of Service</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors hover:opacity-100" href="#">Cookie Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors hover:opacity-100" href="#">Security</a>
          </div>
        </footer>
      </div>
    </div>
  )
}
