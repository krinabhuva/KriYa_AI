import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <>
      <main className="flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop py-stack-xl z-10 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[100px] mix-blend-screen"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary-container/10 rounded-full blur-[120px] mix-blend-screen"></div>
        </div>
        <div className="w-full max-w-container-max flex flex-col gap-stack-lg items-center text-center">
          <div className="space-y-stack-sm max-w-2xl mb-stack-md">
            <h1 className="font-headline-lg-mobile md:font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface mb-stack-xs tracking-tight">Select your portal</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Choose your destination to access enterprise intelligence tools or manage platform settings.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter w-full max-w-5xl">
            <Link to="/dashboard" className="group relative block w-full rounded-xl p-[1px] bg-gradient-to-b from-outline-variant/30 to-transparent hover:from-primary/50 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              <div className="glass-card rounded-xl h-full flex flex-col relative z-10 p-stack-lg sm:p-stack-xl">
                <div className="flex-grow flex flex-col items-center justify-center text-center space-y-stack-md">
                  <div className="w-20 h-20 rounded-2xl bg-surface-container-high border border-outline-variant/20 flex items-center justify-center mb-stack-sm group-hover:scale-110 group-hover:bg-primary-container/20 group-hover:border-primary/30 transition-all duration-500 shadow-lg">
                    <span className="material-symbols-outlined text-[40px] text-primary" style={{fontVariationSettings: "'FILL' 0"}}>query_stats</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface group-hover:text-primary transition-colors">User Portal</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mx-auto">Access AI-driven analytics, interactive dashboards, and business insights.</p>
                </div>
                <div className="mt-stack-lg pt-stack-md border-t border-outline-variant/10 flex justify-between items-center w-full">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-surface-container border-2 border-surface flex items-center justify-center text-xs text-on-surface-variant">AI</div>
                    <div className="w-8 h-8 rounded-full bg-surface-container border-2 border-surface flex items-center justify-center text-xs text-on-surface-variant">BI</div>
                  </div>
                  <span className="font-label-md text-label-md text-primary flex items-center gap-unit group-hover:translate-x-1 transition-transform">Enter Portal <span className="material-symbols-outlined text-[18px]">arrow_forward</span></span>
                </div>
              </div>
            </Link>

            <Link to="/admin" className="group relative block w-full rounded-xl p-[1px] bg-gradient-to-b from-outline-variant/30 to-transparent hover:from-secondary/50 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              <div className="glass-card rounded-xl h-full flex flex-col relative z-10 p-stack-lg sm:p-stack-xl">
                <div className="flex-grow flex flex-col items-center justify-center text-center space-y-stack-md">
                  <div className="w-20 h-20 rounded-2xl bg-surface-container-high border border-outline-variant/20 flex items-center justify-center mb-stack-sm group-hover:scale-110 group-hover:bg-secondary-container/20 group-hover:border-secondary/30 transition-all duration-500 shadow-lg">
                    <span className="material-symbols-outlined text-[40px] text-secondary" style={{fontVariationSettings: "'FILL' 0"}}>admin_panel_settings</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface group-hover:text-secondary transition-colors">Admin Portal</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mx-auto">Manage user access, configure platform integrations, and monitor system health.</p>
                </div>
                <div className="mt-stack-lg pt-stack-md border-t border-outline-variant/10 flex justify-between items-center w-full">
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded-md bg-surface-container-highest border border-outline-variant/20 font-label-sm text-label-sm text-on-surface-variant">Config</span>
                  </div>
                  <span className="font-label-md text-label-md text-secondary flex items-center gap-unit group-hover:translate-x-1 transition-transform">Enter Portal <span className="material-symbols-outlined text-[18px]">arrow_forward</span></span>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-stack-lg font-body-sm text-body-sm text-on-surface-variant opacity-60">Secure connection established. All sessions are monitored.</div>
        </div>
      </main>

      <footer className="w-full py-stack-lg px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-gutter border-t border-outline-variant/10 bg-surface-container-lowest z-10 relative">
        <div className="font-headline-md text-body-sm font-bold text-on-surface opacity-50">© 2024 Kriya AI. All rights reserved.</div>
        <div className="flex gap-gutter">
          <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Privacy Policy</a>
          <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Terms of Service</a>
          <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Security</a>
        </div>
      </footer>
    </>
  )
}
