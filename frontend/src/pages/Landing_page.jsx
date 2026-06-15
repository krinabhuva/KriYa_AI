import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  useEffect(() => {
    try { document.documentElement.classList.add('dark') } catch (e) {}
  }, [])

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen selection:bg-primary-container selection:text-on-primary-container relative overflow-x-hidden">
      <style>{`
        .glass-card { background: rgba(19, 27, 46, 0.4); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid rgba(199, 196, 215, 0.1); }
        .hero-glow { position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(192,193,255,0.15) 0%, rgba(11,19,38,0) 70%); top: -200px; left: 50%; transform: translateX(-50%); z-index: 0; pointer-events: none; }
        .text-gradient { background: linear-gradient(135deg, #c0c1ff 0%, #ddb7ff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      `}</style>
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary-container/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header is provided globally by App */}

      <main className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-stack-xl">
        {/* Hero Section */}
        <section className="py-stack-xl md:py-[120px] flex flex-col items-center text-center relative md:py-stack-xl">
          <div className="hero-glow"></div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-stack-lg">
            <span className="material-symbols-outlined text-[16px] text-primary">auto_awesome</span>
            <span className="font-label-sm text-label-sm text-primary">Kriya AI 2.0 is now live</span>
          </div>
          <h1 className="font-display-lg text-[40px] md:text-display-lg font-bold leading-tight max-w-4xl mb-stack-md tracking-tighter">
            AI-Powered <span className="text-gradient">Business Analytics</span>
            <br />&amp; Sales Prediction
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-stack-lg">
            Upload your raw sales data. Get instant, institutional-grade insights, predictive forecasting, and automated recommendations without writing a single line of SQL.
          </p>
          <div className="flex flex-col sm:flex-row gap-stack-md w-full sm:w-auto">
            <button className="px-8 py-4 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-fixed transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(192,193,255,0.3)] hover:shadow-[0_0_30px_rgba(192,193,255,0.5)]">
              Start Free Analysis
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>arrow_forward</span>
            </button>
            <button className="px-8 py-4 rounded-lg border border-outline-variant text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-variant transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">play_circle</span>
              Watch Demo
            </button>
          </div>

          <div className="mt-stack-xl w-full max-w-5xl rounded-xl border border-outline-variant/20 glass-card p-2 shadow-2xl relative overflow-hidden group max-w-4xl">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <img alt="Platform Dashboard" className="w-full h-auto rounded-lg opacity-90 object-cover aspect-video" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgTqDWPAcXkseOnRIdrBVFDsiuWsUT-2frGHk9oo62pmnm-i4VoSZuhUI9xjZHkrLEWwMPt9BiMsVTO4dQRFSSmXRwZH-XVqDR3jhXWKxiCiUnKjW_scTPsrGAbeTN99vnbNklgUjre0eWzO67qV8re_xuNIFzASFBbwE1JQY5Nwl63idfPCcWXOQtvPntvheRJ0WJeWpJQjXKh58cjKabDli3HA3eraJjdAXAEISomp-n5SUTZgrv-QrmKjL3I_xRpsF9wwhd57M" />
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-stack-xl max-w-container-max" id="features">
          <div className="text-center mb-stack-lg">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold mb-stack-xs text-on-surface">Intelligence at Scale</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">Everything you need to turn raw data into actionable business strategy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Repeat feature cards (use same structure as provided) */}
            <Link to="/upload" className="group block glass-card p-stack-lg rounded-xl flex flex-col gap-stack-sm hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-stack-xs">
                <span className="material-symbols-outlined">upload_file</span>
              </div>
              <h3 className="font-headline-md text-[20px] font-semibold text-on-surface">Upload CSV</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Seamlessly ingest massive datasets with automatic schema detection.</p>
            </Link>

            <div className="glass-card p-stack-lg rounded-xl flex flex-col gap-stack-sm hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary mb-stack-xs">
                <span className="material-symbols-outlined">cleaning_services</span>
              </div>
              <h3 className="font-headline-md text-[20px] font-semibold text-on-surface">Data Cleaning</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">AI-powered normalization, deduplication, and anomaly resolution.</p>
            </div>

            <div className="glass-card p-stack-lg rounded-xl flex flex-col gap-stack-sm hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary mb-stack-xs">
                <span className="material-symbols-outlined">dashboard</span>
              </div>
              <h3 className="font-headline-md text-[20px] font-semibold text-on-surface">Dashboard</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Customizable views tailored to your specific KPI requirements.</p>
            </div>

            <div className="glass-card p-stack-lg rounded-xl flex flex-col gap-stack-sm hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-stack-xs">
                <span className="material-symbols-outlined">lightbulb</span>
              </div>
              <h3 className="font-headline-md text-[20px] font-semibold text-on-surface">Insight Generator</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Automated narrative generation highlighting critical business shifts.</p>
            </div>

            <div className="glass-card p-stack-lg rounded-xl flex flex-col gap-stack-sm hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary mb-stack-xs">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <h3 className="font-headline-md text-[20px] font-semibold text-on-surface">Sales Forecast</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">High-fidelity predictive modeling for future revenue streams.</p>
            </div>

            <div className="glass-card p-stack-lg rounded-xl flex flex-col gap-stack-sm hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary mb-stack-xs">
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
              <h3 className="font-headline-md text-[20px] font-semibold text-on-surface">Inventory Prediction</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Optimize stock levels mathematically based on seasonal demand.</p>
            </div>

            <div className="glass-card p-stack-lg rounded-xl flex flex-col gap-stack-sm hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-stack-xs">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <h3 className="font-headline-md text-[20px] font-semibold text-on-surface">Demand Forecast</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Anticipate market fluctuations before they impact your bottom line.</p>
            </div>

            <div className="glass-card p-stack-lg rounded-xl flex flex-col gap-stack-sm hover:border-primary/50 transition-colors md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary mb-stack-xs">
                <span className="material-symbols-outlined">forum</span>
              </div>
              <h3 className="font-headline-md text-[20px] font-semibold text-on-surface">AI Chatbot</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Query your dataset using natural language for immediate answers.</p>
            </div>

            <div className="glass-card p-stack-lg rounded-xl flex flex-col gap-stack-sm hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary mb-stack-xs">
                <span className="material-symbols-outlined">description</span>
              </div>
              <h3 className="font-headline-md text-[20px] font-semibold text-on-surface">Reports</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Export board-ready PDF and interactive web reports instantly.</p>
            </div>
          </div>
        </section>

        <footer className="w-full py-stack-xl px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-gutter border-t border-outline-variant/20 bg-surface-container-lowest mt-stack-xl max-w-container-max">
          <div className="flex items-center gap-stack-sm">
            <span className="font-headline-md text-headline-md text-on-surface">Kriya</span>
          </div>
          <div className="font-body-sm text-body-sm text-on-surface-variant">© 2024 Kriya AI. All rights reserved.</div>
          <div className="flex gap-gutter">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Terms of Service</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Cookie Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Security</a>
          </div>
        </footer>
      </main>
    </div>
  )
}
