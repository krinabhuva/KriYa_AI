import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'
import Sidebar from '../components/Sidebar'
import './dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const [summary, setSummary] = useState(null)
  const [valuation, setValuation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState('')
  const [timeRange, setTimeRange] = useState('1M')

  useEffect(() => {
    try { document.documentElement.classList.add('dark') } catch (e) {}
    
    async function fetchDashboardData() {
      try {
        const [sumData, valData] = await Promise.all([
          api.getDashboardSummary(),
          api.getInventoryValuation()
        ]);
        setSummary(sumData);
        setValuation(valData);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, [])

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  }

  const handleExport = () => {
    // Generate simple CSV download for inventory valuation
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value\n"
      + `Total Items,${summary?.inventory?.total_items || 0}\n`
      + `Low Stock Items,${summary?.inventory?.low_stock_items || 0}\n`
      + `Active ML Models,${summary?.predictions?.active_models || 0}\n`
      + `Retail Value,$${valuation?.retail_value?.toLocaleString() || 0}\n`
      + `Cost Value,$${valuation?.cost_value?.toLocaleString() || 0}\n`
      + `Potential Margin,$${valuation?.potential_margin?.toLocaleString() || 0}\n`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `kriya_executive_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Executive Dashboard Report exported as CSV!');
  }

  const currentUser = api.user || { username: 'Guest', role: 'viewer', full_name: 'Guest User' }

  return (
    <div className="flex h-screen overflow-hidden antialiased font-body-md text-body-md bg-surface-container-lowest">
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-surface">
        {/* Toast Notification */}
        {toast && (
          <div className="fixed top-20 right-6 bg-primary text-on-primary font-label-md px-6 py-3 rounded-xl shadow-2xl z-[99] border border-primary-fixed-dim/30 animate-in fade-in slide-in-from-top duration-300">
            {toast}
          </div>
        )}

        {/* TopNavBar */}
        <header className="flex justify-between items-center w-full px-margin-desktop py-5 bg-surface/40 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/5 shrink-0">
          <div className="flex items-center gap-12">
            <div className="relative hidden md:block">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
              <input 
                className="bg-surface-container-low border border-outline-variant/10 rounded-xl py-2.5 pl-12 pr-6 text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:ring-1 focus:ring-primary focus:border-primary/50 w-80 transition-all outline-none" 
                placeholder="Search metrics..." 
                type="text" 
                onKeyDown={(e) => { if (e.key === 'Enter') showToast(`Searching database for: "${e.target.value}"`) }}
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 pr-6 border-r border-outline-variant/10">
              <button onClick={() => showToast('No new notifications')} className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors relative">
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-surface"></span>
              </button>
              <button onClick={() => navigate('/ai-insights')} className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors" title="AI Chatbot">
                <span className="material-symbols-outlined text-[22px]">chat_bubble</span>
              </button>
            </div>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/settings')}>
              <div className="text-right hidden sm:block">
                <p className="text-label-md text-on-surface leading-none font-semibold">{currentUser.full_name}</p>
                <p className="text-label-sm text-primary leading-none mt-1 capitalize">{currentUser.role}</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden bg-primary/10 flex items-center justify-center text-primary font-bold">
                {currentUser.username.substring(0, 2).toUpperCase()}
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
                <button onClick={() => showToast('Date range locked to Last 30 Days')} className="px-5 py-2.5 rounded-xl bg-surface-container-high text-on-surface font-label-md border border-outline-variant/10 hover:bg-surface-bright transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                  Last 30 Days
                </button>
                <button onClick={handleExport} className="px-5 py-2.5 rounded-xl bg-surface-container-high text-on-surface font-label-md border border-outline-variant/10 hover:bg-surface-bright transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">file_download</span>
                  Export
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="font-label-md text-outline">Loading database metrics...</p>
              </div>
            ) : (
              <>
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
                    <p className="text-label-md font-semibold text-on-surface-variant tracking-wide">TOTAL REVENUE (RETAIL)</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <h3 className="font-display-lg text-display-lg font-bold text-on-surface">
                        ${valuation?.retail_value?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                      </h3>
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
                    <p className="text-label-md font-semibold text-on-surface-variant tracking-wide">POTENTIAL PROFIT MARGIN</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <h3 className="font-display-lg text-display-lg font-bold text-on-surface">
                        ${valuation?.potential_margin?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                      </h3>
                      <span className="text-on-surface-variant text-label-sm">USD</span>
                    </div>
                  </div>

                  <div className="premium-card rounded-2xl p-8 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined text-[28px]">inventory</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`font-bold flex items-center gap-1 text-label-md px-2.5 py-1 rounded-lg ${
                          (summary?.inventory?.low_stock_items || 0) > 0 ? 'bg-error/10 text-error' : 'bg-green-500/10 text-green-400'
                        }`}>
                          <span className="material-symbols-outlined text-[16px]">
                            {(summary?.inventory?.low_stock_items || 0) > 0 ? 'warning' : 'check_circle'}
                          </span>
                          {summary?.inventory?.low_stock_items || 0} Low Stock
                        </span>
                        <span className="text-[11px] text-on-surface-variant uppercase tracking-widest mt-2">needs attention</span>
                      </div>
                    </div>
                    <p className="text-label-md font-semibold text-on-surface-variant tracking-wide">TOTAL UNIQUE SKUS</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <h3 className="font-display-lg text-display-lg font-bold text-on-surface">
                        {summary?.inventory?.total_items || 0}
                      </h3>
                      <span className="text-on-surface-variant text-label-sm">ITEMS</span>
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
                        {['7D', '1M', '1Y'].map((range) => (
                          <button 
                            key={range} 
                            onClick={() => { setTimeRange(range); showToast(`Chart updated for: ${range}`) }}
                            className={`px-4 py-1.5 rounded-lg text-label-sm transition-all ${
                              timeRange === range ? 'bg-primary/20 text-primary font-bold shadow-inner' : 'text-on-surface-variant hover:text-on-surface'
                            }`}
                          >
                            {range}
                          </button>
                        ))}
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
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface px-2 py-1 rounded text-xs text-on-surface border border-outline-variant/30 font-label-sm">
                          ${((valuation?.retail_value || 0) / 1000000).toFixed(1)}M
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="premium-card rounded-2xl p-8 flex flex-col">
                    <h3 className="font-headline-md text-on-surface mb-2">Platform Summary</h3>
                    <p className="text-body-sm text-on-surface-variant mb-8">Overall model status and system users</p>
                    <div className="flex-1 flex flex-col justify-center gap-6">
                      <div className="p-4 rounded-xl bg-surface-container-high/40 border border-outline-variant/5">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
                          <div>
                            <p className="font-label-sm text-on-surface-variant uppercase text-[11px]">Active ML Engines</p>
                            <p className="text-body-lg font-bold text-on-surface">{summary?.predictions?.active_models || 0} Models Active</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-xl bg-surface-container-high/40 border border-outline-variant/5">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-secondary text-3xl">group</span>
                          <div>
                            <p className="font-label-sm text-on-surface-variant uppercase text-[11px]">System Access</p>
                            <p className="text-body-lg font-bold text-on-surface">{summary?.users?.total || 0} Registered Users</p>
                          </div>
                        </div>
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
                    <button onClick={() => navigate('/reports')} className="text-primary font-bold text-label-md hover:underline">View All Reports</button>
                  </div>
                  <div className="divide-y divide-outline-variant/5">
                    <div onClick={() => navigate('/upload')} className="flex items-center gap-6 p-6 hover:bg-primary/5 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform group-hover:scale-110">
                        <span className="material-symbols-outlined text-[24px]">upload_file</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-label-md text-on-surface text-[16px]">Upload New Dataset</h4>
                          <span className="px-2 py-0.5 rounded bg-tertiary/10 text-tertiary text-[10px] font-bold uppercase tracking-wider">Data Sync</span>
                        </div>
                        <p className="text-body-sm text-on-surface-variant mt-1">Upload CSV or Excel files to run custom AI predictions.</p>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-label-sm font-semibold text-on-surface">Online</p>
                        <p className="text-label-sm text-on-surface-variant">Source: Browser</p>
                      </div>
                    </div>

                    <div onClick={() => navigate('/prediction')} className="flex items-center gap-6 p-6 hover:bg-secondary/5 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0 transition-transform group-hover:scale-110">
                        <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-label-md text-on-surface text-[16px]">Run Sales Forecasting</h4>
                          <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider">ML Ops</span>
                        </div>
                        <p className="text-body-sm text-on-surface-variant mt-1">Make predictions using seeded linear regression/ARIMA models.</p>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-label-sm font-semibold text-on-surface">Ready</p>
                        <p className="text-label-sm text-on-surface-variant">Active</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-stack-xl py-12 border-t border-outline-variant/10">
          <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-8 font-body-sm">
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
