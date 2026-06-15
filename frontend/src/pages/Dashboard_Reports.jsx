import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import './dashboard.css'

export default function DashboardReports() {
  useEffect(() => {
    try { document.documentElement.classList.add('dark') } catch (e) {}
  }, [])

  return (
    <div className="flex h-screen min-h-screen overflow-hidden antialiased font-body-md text-body-md bg-surface">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        <header className="px-margin-mobile md:px-margin-desktop py-8 md:py-10">
          <div className="max-w-container-max mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface font-bold tracking-tight mb-2 flex items-center gap-3">
                Intelligence Reports
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-primary-container/10 text-primary font-label-sm text-label-sm border border-primary/20">
                  Enterprise
                </span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Access, schedule, and distribute synthesized data intelligence across your organization.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
                <input className="bg-surface-container border border-outline-variant/30 text-on-surface font-body-sm text-body-sm rounded-lg pl-9 pr-4 py-2 w-full md:w-64 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline/70" placeholder="Search reports..." type="text" />
              </div>
              <button className="bg-surface-container hover:bg-surface-container-highest border border-outline-variant/30 text-on-surface font-label-md text-label-md px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                Filter
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 px-margin-mobile md:px-margin-desktop pb-stack-xl overflow-y-auto">
          <div className="max-w-container-max mx-auto space-y-stack-lg">
            <section>
              <div className="flex items-center justify-between mb-stack-md">
                <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">auto_awesome</span>
                  Recent AI Summaries
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card rounded-xl p-5 relative group overflow-hidden border-t-2 border-t-tertiary-container hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-tertiary-container/10 flex items-center justify-center border border-tertiary-container/20">
                      <span className="material-symbols-outlined text-tertiary-container">trending_up</span>
                    </div>
                    <span className="text-outline text-[12px] font-label-sm uppercase tracking-wider">Today, 08:30 AM</span>
                  </div>
                  <h3 className="font-label-md text-[16px] font-semibold text-on-surface mb-2">Q3 Revenue Acceleration</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-4">AI analysis indicates a 14% uplift in enterprise SaaS renewals compared to previous quarter...</p>
                  <div className="h-24 w-full rounded bg-surface-container/50 mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent z-10"></div>
                    <img alt="Data chart visualization" className="w-full h-full object-cover opacity-60 mix-blend-screen filter grayscale contrast-150" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJtO2UwDpw5iiUq9AQjfI_b6dKm1aeyrKQywXD2J3CtMV1VGmeh9o2wJNBVdLhc9jrApBxEpbbzSaQ0ZbXRu9QbfQaYxE030nsll-FLujRUmVVFQ0yFyvqAAxJsDR73_bjwLu7g2iBvg435-cMMxhXLAcYpg9VFX7xHaraJkWVD30sSi_2OYzWIbgLY-_8vHVMLeWGB0wGscsOynwH4AVEAHXOLeFDwJkWOJcKB8LcRcACwJE4DHWbGmPjBW1yMnmRQUr-rPQOu-g" />
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-surface-container hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm py-2 rounded border border-outline-variant/30 transition-colors flex items-center justify-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px]">visibility</span> View
                    </button>
                    <button className="flex-1 bg-surface-container hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm py-2 rounded border border-outline-variant/30 transition-colors flex items-center justify-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px]">picture_as_pdf</span> PDF
                    </button>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-5 relative group overflow-hidden border-t-2 border-t-secondary-container hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary-container/10 flex items-center justify-center border border-secondary-container/20">
                      <span className="material-symbols-outlined text-secondary-container">group</span>
                    </div>
                    <span className="text-outline text-[12px] font-label-sm uppercase tracking-wider">Yesterday</span>
                  </div>
                  <h3 className="font-label-md text-[16px] font-semibold text-on-surface mb-2">User Churn Prediction</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-4">Model identifies 3 key cohorts at risk of churn within the next 30 days based on engagement...</p>
                  <div className="h-24 w-full rounded bg-surface-container/50 mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent z-10"></div>
                    <img alt="Bar chart visualization" className="w-full h-full object-cover opacity-60 mix-blend-screen filter grayscale contrast-150" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6gwhDj3sACQRHG-x83TRStXB0x2n_RFvsELihuE_y5sqpk37mA6O4MPrfIoPH90FAOgRgkL2MPE-cKsnCbQBCzz6Ckt0pHvyB8Z_otii89ToUbrfiQKcUq54VvKI7LeZkktbaHaa-OqtqV6S8GeNliaCptQMg6vt-4eKi_BCCKYObLtmefLL6lg1ZjOvJMMG8tcGrmSW4HamUZGKMUcAt0gsqBBrTd8XDi3HX7mKaZVnRKeKy1nEL4bIWKbD3EvSsDUdEsSvP0aY" />
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-surface-container hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm py-2 rounded border border-outline-variant/30 transition-colors flex items-center justify-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px]">visibility</span> View
                    </button>
                    <button className="flex-1 bg-surface-container hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm py-2 rounded border border-outline-variant/30 transition-colors flex items-center justify-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px]">picture_as_pdf</span> PDF
                    </button>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-5 relative border border-dashed border-outline-variant/40 flex flex-col items-center justify-center text-center hover:bg-surface-container-low/50 transition-colors cursor-pointer min-h-[280px]">
                  <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-primary text-[24px]">add_chart</span>
                  </div>
                  <h3 className="font-label-md text-label-md font-semibold text-on-surface mb-2">Custom Analysis</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 px-4">Generate a new report using Kriya's natural language engine.</p>
                  <button className="text-primary font-label-sm text-label-sm hover:text-primary-container transition-colors flex items-center gap-1">
                    Start Generating <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <section className="lg:col-span-2 glass-card rounded-xl border border-outline-variant/10 overflow-hidden flex flex-col h-full">
                <div className="px-6 py-5 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-lowest/50">
                  <div>
                    <h2 className="font-headline-md text-headline-md text-on-surface">Generated Archive</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Complete history of manual and scheduled exports.</p>
                  </div>
                  <button className="text-outline hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </div>

                <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-outline-variant/10 bg-surface/50 text-[12px] font-label-sm text-outline uppercase tracking-wider">
                  <div className="col-span-5 md:col-span-4">Report Name</div>
                  <div className="col-span-3 hidden md:block">Type</div>
                  <div className="col-span-4 md:col-span-3">Generated</div>
                  <div className="col-span-3 md:col-span-2 text-right">Actions</div>
                </div>

                <div className="divide-y divide-outline-variant/5 overflow-y-auto">
                  {/* List items (static examples) */}
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center report-row-hover transition-colors">
                    <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                      <span className="material-symbols-outlined text-tertiary-container opacity-80">description</span>
                      <div>
                        <div className="font-label-md text-[14px] text-on-surface font-medium truncate">Monthly Financial Overview</div>
                        <div className="font-body-sm text-[12px] text-on-surface-variant md:hidden">Finance</div>
                      </div>
                    </div>
                    <div className="col-span-3 hidden md:flex items-center">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-tertiary-container/10 text-tertiary-container border border-tertiary-container/20">Finance</span>
                    </div>
                    <div className="col-span-4 md:col-span-3 font-body-sm text-[13px] text-on-surface-variant">Oct 12, 2024</div>
                    <div className="col-span-3 md:col-span-2 flex justify-end gap-2">
                      <button className="text-outline hover:text-primary transition-colors p-1.5 rounded hover:bg-surface-variant/30" title="Download PDF">
                        <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                      </button>
                      <button className="text-outline hover:text-[#107c41] transition-colors p-1.5 rounded hover:bg-surface-variant/30" title="Download Excel">
                        <span className="material-symbols-outlined text-[18px]">table_view</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center report-row-hover transition-colors">
                    <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary-container opacity-80">group</span>
                      <div>
                        <div className="font-label-md text-[14px] text-on-surface font-medium truncate">Customer Success Metrics</div>
                        <div className="font-body-sm text-[12px] text-on-surface-variant md:hidden">Operations</div>
                      </div>
                    </div>
                    <div className="col-span-3 hidden md:flex items-center">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-secondary-container/10 text-secondary-container border border-secondary-container/20">Operations</span>
                    </div>
                    <div className="col-span-4 md:col-span-3 font-body-sm text-[13px] text-on-surface-variant">Oct 10, 2024</div>
                    <div className="col-span-3 md:col-span-2 flex justify-end gap-2">
                      <button className="text-outline hover:text-primary transition-colors p-1.5 rounded hover:bg-surface-variant/30" title="Download PDF">
                        <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                      </button>
                      <button className="text-outline hover:text-[#107c41] transition-colors p-1.5 rounded hover:bg-surface-variant/30" title="Download Excel">
                        <span className="material-symbols-outlined text-[18px]">table_view</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center report-row-hover transition-colors">
                    <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary opacity-80">rocket_launch</span>
                      <div>
                        <div className="font-label-md text-[14px] text-on-surface font-medium truncate">Product Usage Analysis</div>
                        <div className="font-body-sm text-[12px] text-on-surface-variant md:hidden">Product</div>
                      </div>
                    </div>
                    <div className="col-span-3 hidden md:flex items-center">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-primary/10 text-primary border border-primary/20">Product</span>
                    </div>
                    <div className="col-span-4 md:col-span-3 font-body-sm text-[13px] text-on-surface-variant">Oct 05, 2024</div>
                    <div className="col-span-3 md:col-span-2 flex justify-end gap-2">
                      <button className="text-outline hover:text-primary transition-colors p-1.5 rounded hover:bg-surface-variant/30" title="Download PDF">
                        <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                      </button>
                      <button className="text-outline hover:text-[#107c41] transition-colors p-1.5 rounded hover:bg-surface-variant/30" title="Download Excel">
                        <span className="material-symbols-outlined text-[18px]">table_view</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center report-row-hover transition-colors">
                    <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                      <span className="material-symbols-outlined text-error opacity-80">warning</span>
                      <div>
                        <div className="font-label-md text-[14px] text-on-surface font-medium truncate">System Security Audit</div>
                        <div className="font-body-sm text-[12px] text-on-surface-variant md:hidden">IT / Sec</div>
                      </div>
                    </div>
                    <div className="col-span-3 hidden md:flex items-center">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-error/10 text-error border border-error/20">IT / Sec</span>
                    </div>
                    <div className="col-span-4 md:col-span-3 font-body-sm text-[13px] text-on-surface-variant">Oct 01, 2024</div>
                    <div className="col-span-3 md:col-span-2 flex justify-end gap-2">
                      <button className="text-outline hover:text-primary transition-colors p-1.5 rounded hover:bg-surface-variant/30" title="Download PDF">
                        <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                      </button>
                      <button className="text-outline hover:text-[#107c41] transition-colors p-1.5 rounded hover:bg-surface-variant/30" title="Download Excel">
                        <span className="material-symbols-outlined text-[18px]">table_view</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-3 border-t border-outline-variant/10 mt-auto flex justify-between items-center text-body-sm text-outline">
                  <span>Showing 1-4 of 42</span>
                  <div className="flex gap-1">
                    <button className="p-1 rounded hover:bg-surface-variant/30 hover:text-on-surface transition-colors disabled:opacity-50" disabled>
                      <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    </button>
                    <button className="p-1 rounded hover:bg-surface-variant/30 hover:text-on-surface transition-colors">
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </section>

              <section className="glass-card rounded-xl border border-outline-variant/10 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-headline-md text-[18px] font-semibold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-outline">schedule</span>
                    Automated Routing
                  </h2>
                  <button className="text-primary hover:bg-primary/10 p-1.5 rounded-full transition-colors">
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant/10">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-label-md text-label-md font-medium text-on-surface">Weekly Executive Summary</h3>
                        <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">Delivered to C-Suite Alias</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input checked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer z-10 opacity-0" id="toggle1" name="toggle1" type="checkbox" />
                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-surface-container-highest cursor-pointer" htmlFor="toggle1"></label>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-[12px] font-label-sm text-outline">
                      <span className="material-symbols-outlined text-[14px]">event_repeat</span> Every Monday, 08:00 AM
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant/10 opacity-60">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-label-md text-label-md font-medium text-on-surface">Daily Ops Health Check</h3>
                        <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">Slack integration (#ops-alerts)</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer z-10 opacity-0" id="toggle2" name="toggle2" type="checkbox" />
                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-surface-container-highest cursor-pointer" htmlFor="toggle2"></label>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-[12px] font-label-sm text-outline">
                      <span className="material-symbols-outlined text-[14px]">event_repeat</span> Daily, EOD (17:00)
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant/10">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-label-md text-label-md font-medium text-on-surface">End of Month Ledger</h3>
                        <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">SFTP to External Auditors</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input checked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer z-10 opacity-0" id="toggle3" name="toggle3" type="checkbox" />
                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-surface-container-highest cursor-pointer" htmlFor="toggle3"></label>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-[12px] font-label-sm text-outline">
                      <span className="material-symbols-outlined text-[14px]">event_repeat</span> Last day of month
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
