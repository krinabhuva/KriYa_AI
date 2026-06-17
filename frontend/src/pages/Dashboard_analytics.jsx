import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import api from '../api'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from 'recharts'
import { SkeletonCard, SkeletonTable } from '../components/Skeleton'
import './dashboard.css'

export default function DashboardAnalytics() {
  const [loading, setLoading] = useState(true)
  const [kpis, setKpis] = useState(null)
  const [salesDaily, setSalesDaily] = useState([])
  const [salesByCategory, setSalesByCategory] = useState([])
  const [items, setItems] = useState([])
  
  // Set default dates: 30 days ago to today
  const [startDate, setStartDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() - 30)
    return d.toISOString().split('T')[0]
  })
  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split('T')[0]
  })

  const getDaysDiff = (start, end) => {
    const s = new Date(start)
    const e = new Date(end)
    const diffTime = Math.abs(e - s)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 30
  }

  useEffect(() => {
    try { document.documentElement.classList.add('dark') } catch (e) {}
    
    async function fetchAnalyticsData() {
      setLoading(true)
      try {
        const days = getDaysDiff(startDate, endDate)
        const [kpiData, dailyData, catData, itemsData] = await Promise.all([
          api.getKPIs(),
          api.getSalesDaily(days),
          api.getSalesByCategory(days),
          api.getInventoryItems()
        ])
        setKpis(kpiData)
        setSalesDaily(dailyData)
        setSalesByCategory(catData)
        
        // Sort items by movement count / price as proxy for movement
        const sortedItems = [...itemsData].sort((a, b) => b.price - a.price)
        setItems(sortedItems)
      } catch (err) {
        console.error('Failed to load analytics data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [startDate, endDate])

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
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Real-time analytical insights</span>
                </div>
                <h1 className="font-display-lg text-display-lg font-bold tracking-tight text-on-surface">Analytics Overview</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-stack-xs max-w-2xl">Monitor KPIs, revenue streams, and product growth vectors across your portfolio.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 bg-surface-container-low p-3 rounded-2xl border border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <label className="text-[10px] uppercase font-bold text-outline-variant">From</label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-surface-container-highest text-on-surface text-body-sm rounded-lg px-2.5 py-1.5 border border-outline-variant/20 focus:ring-1 focus:ring-primary outline-none" 
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-[10px] uppercase font-bold text-outline-variant">To</label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-surface-container-highest text-on-surface text-body-sm rounded-lg px-2.5 py-1.5 border border-outline-variant/20 focus:ring-1 focus:ring-primary outline-none" 
                  />
                </div>
              </div>
            </header>

            {loading ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
                <SkeletonTable />
              </div>
            ) : (
              <>
                {/* KPI Summary Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
                  <div className="glass-panel rounded-xl p-5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Total Revenue (30D)</p>
                    <h3 className="font-headline-lg text-headline-lg font-semibold text-on-surface">
                      ${kpis?.total_revenue_30d?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                    </h3>
                    <div className="flex items-center gap-1 mt-2">
                      <span className={`font-bold flex items-center gap-0.5 text-label-sm ${
                        (kpis?.total_revenue_30d_change_pct || 0) >= 0 ? 'text-green-400' : 'text-error'
                      }`}>
                        <span className="material-symbols-outlined text-[14px]">
                          {(kpis?.total_revenue_30d_change_pct || 0) >= 0 ? 'trending_up' : 'trending_down'}
                        </span>
                        {Math.abs(kpis?.total_revenue_30d_change_pct || 0).toFixed(1)}%
                      </span>
                      <span className="font-body-sm text-body-sm text-outline ml-1">vs prior 30d</span>
                    </div>
                  </div>
                  <div className="glass-panel rounded-xl p-5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Total Orders (30D)</p>
                    <h3 className="font-headline-lg text-headline-lg font-semibold text-on-surface">
                      {kpis?.total_orders_30d?.toLocaleString() || '0'}
                    </h3>
                    <div className="flex items-center gap-1 mt-2 text-primary">
                      <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                      <span className="font-label-md text-label-md">Orders Ingested</span>
                    </div>
                  </div>
                  <div className="glass-panel rounded-xl p-5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Average Order Value</p>
                    <h3 className="font-headline-lg text-headline-lg font-semibold text-on-surface">
                      ${kpis?.avg_order_value?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                    </h3>
                    <div className="flex items-center gap-1 mt-2">
                      <span className={`font-bold flex items-center gap-0.5 text-label-sm ${
                        (kpis?.avg_order_value_change_pct || 0) >= 0 ? 'text-green-400' : 'text-error'
                      }`}>
                        <span className="material-symbols-outlined text-[14px]">
                          {(kpis?.avg_order_value_change_pct || 0) >= 0 ? 'trending_up' : 'trending_down'}
                        </span>
                        {Math.abs(kpis?.avg_order_value_change_pct || 0).toFixed(1)}%
                      </span>
                      <span className="font-body-sm text-body-sm text-outline ml-1">vs prior 30d</span>
                    </div>
                  </div>
                  <div className="glass-panel rounded-xl p-5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">7D Predicted Revenue</p>
                    <h3 className="font-headline-lg text-headline-lg font-semibold text-on-surface">
                      ${kpis?.revenue_forecast_7d?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                    </h3>
                    <div className="flex items-center gap-1 mt-2 text-secondary">
                      <span className="material-symbols-outlined text-[16px]">online_prediction</span>
                      <span className="font-label-md text-label-md">LinearRegression model</span>
                    </div>
                  </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
                  <div className="glass-panel rounded-xl p-6 lg:col-span-8 flex flex-col h-96">
                    <h3 className="font-headline-md text-on-surface mb-1">Revenue Performance Trend</h3>
                    <p className="text-body-sm text-on-surface-variant mb-6">Daily sales revenue timeline</p>
                    <div className="flex-1 w-full h-full relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={salesDaily}>
                          <defs>
                            <linearGradient id="colorRevenueAnalytics" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--md-sys-color-primary, #5b7cf0)" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="var(--md-sys-color-primary, #5b7cf0)" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                          <XAxis dataKey="date" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} />
                          <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v}`} />
                          <Tooltip contentStyle={{ backgroundColor: 'rgba(30,30,40,0.95)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '12px' }} />
                          <Area type="monotone" dataKey="revenue" stroke="var(--md-sys-color-primary, #5b7cf0)" fillOpacity={1} fill="url(#colorRevenueAnalytics)" strokeWidth={2} name="Revenue" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="glass-panel rounded-xl p-6 lg:col-span-4 flex flex-col h-96">
                    <h3 className="font-headline-md text-on-surface mb-1">Category breakdown</h3>
                    <p className="text-body-sm text-on-surface-variant mb-6">Aggregate category valuation</p>
                    <div className="flex-1 w-full h-full relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salesByCategory}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                          <XAxis dataKey="category" stroke="rgba(255,255,255,0.4)" fontSize={9} tickLine={false} />
                          <YAxis stroke="rgba(255,255,255,0.4)" fontSize={9} tickLine={false} tickFormatter={(v) => `$${v}`} />
                          <Tooltip contentStyle={{ backgroundColor: 'rgba(30,30,40,0.95)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '12px' }} />
                          <Bar dataKey="revenue" fill="var(--md-sys-color-secondary, #b8c4ff)" radius={[4, 4, 0, 0]} name="Revenue" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Top Products Table */}
                <div className="glass-panel rounded-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="font-headline-md text-on-surface">Top Moving Products</h3>
                      <p className="text-body-sm text-on-surface-variant mt-1">High movement inventory items sorted by retail valuation</p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-outline-variant/10 text-label-sm text-outline font-bold">
                          <th className="pb-3 uppercase">SKU</th>
                          <th className="pb-3 uppercase">Name</th>
                          <th className="pb-3 uppercase">Category</th>
                          <th className="pb-3 uppercase text-right">In Stock</th>
                          <th className="pb-3 uppercase text-right">Price</th>
                          <th className="pb-3 uppercase text-right">Valuation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/5">
                        {items.slice(0, 5).map((item) => (
                          <tr key={item.id} className="text-body-sm text-on-surface hover:bg-surface-container-low transition-colors">
                            <td className="py-4 font-mono font-bold text-primary">{item.sku}</td>
                            <td className="py-4 font-semibold">{item.name}</td>
                            <td className="py-4">{item.category}</td>
                            <td className="py-4 text-right">{item.quantity}</td>
                            <td className="py-4 text-right">${item.price.toFixed(2)}</td>
                            <td className="py-4 text-right font-semibold">${(item.quantity * item.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <footer className="mt-stack-xl py-6 border-t border-outline-variant/10 bg-surface-container-lowest px-6">
          <div className="max-w-container-max mx-auto flex justify-between items-center">
            <p className="text-body-sm text-on-surface-variant">© 2024 Kriya AI. All rights reserved.</p>
            <div className="flex gap-4">
              <a className="hover:text-primary transition-colors text-body-sm" href="#">Privacy</a>
              <a className="hover:text-primary transition-colors text-body-sm" href="#">Terms</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
