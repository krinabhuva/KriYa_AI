import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import api from '../api'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import { SkeletonCard } from '../components/Skeleton'
import './dashboard.css'

export default function DashboardPrediction() {
  const [loading, setLoading] = useState(true)
  const [kpis, setKpis] = useState(null)
  const [salesDaily, setSalesDaily] = useState([])
  const [selectedSKU, setSelectedSKU] = useState('SKU-001')
  const [skus, setSkus] = useState([])
  const [inventoryItems, setInventoryItems] = useState([])
  const [forecastData, setForecastData] = useState(null)
  const [forecastLoading, setForecastLoading] = useState(false)

  useEffect(() => {
    try { document.documentElement.classList.add('dark') } catch (e) {}
    
    async function fetchForecastData() {
      try {
        const [kpiData, dailyData, itemsData] = await Promise.all([
          api.getKPIs(),
          api.getSalesDaily(30),
          api.getInventoryItems()
        ])
        
        setKpis(kpiData)
        setSalesDaily(dailyData)
        setInventoryItems(itemsData)
        
        // Extract unique SKUs from inventory
        const uniqueSKUs = itemsData.map(item => item.sku)
        setSkus(uniqueSKUs)
        if (uniqueSKUs.length > 0) {
          setSelectedSKU(uniqueSKUs[0])
        }
      } catch (err) {
        console.error('Failed to load forecast data:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchForecastData()
  }, [])

  useEffect(() => {
    if (!selectedSKU) return
    async function getSkuForecast() {
      setForecastLoading(true)
      try {
        const data = await api.getForecast(selectedSKU, 7)
        setForecastData(data)
      } catch (err) {
        console.error('Failed to load forecast for SKU:', selectedSKU, err)
      } finally {
        setForecastLoading(false)
      }
    }
    getSkuForecast()
  }, [selectedSKU])

  const chartData = []
  if (forecastData) {
    const hist = forecastData.historical_data || []
    const pred = forecastData.predictions || []
    hist.forEach((item, idx) => {
      chartData.push({
        date: item.date,
        historical: item.revenue,
        forecast: idx === hist.length - 1 ? item.revenue : null
      })
    })
    pred.forEach(item => {
      chartData.push({
        date: item.date,
        historical: null,
        forecast: item.predicted_revenue
      })
    })
  }

  const nextDayRevenue = kpis?.total_revenue_30d ? kpis.total_revenue_30d / 30 : 0
  const nextWeekRevenue = (kpis?.total_revenue_30d || 0)
  const nextMonthRevenue = (kpis?.revenue_forecast_7d || 0) * 4
  
  const nextDayChange = kpis?.avg_order_value_change_pct || 0
  const nextWeekChange = kpis?.total_revenue_30d_change_pct || 0
  const nextMonthChange = ((nextMonthRevenue - (kpis?.total_revenue_30d || 0)) / (kpis?.total_revenue_30d || 1)) * 100

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
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-stack-xs">AI-driven predictive modeling using real sales data.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container/20 text-secondary border border-secondary/30 font-label-sm text-label-sm">
                  <span className="w-2 h-2 rounded-full bg-secondary mr-2 animate-pulse"></span>
                  Live Sync
                </span>
              </div>
            </div>

            {loading ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                  <div className="md:col-span-2 h-80 bg-surface-container-low animate-pulse rounded-2xl" />
                  <div className="h-80 bg-surface-container-low animate-pulse rounded-2xl" />
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                  {/* Daily Forecast Card */}
                  <div className="col-span-1 md:col-span-4 glass-panel rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-50"></div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-label-md text-label-md text-on-surface-variant">Daily Avg Sales</p>
                        <h3 className="font-display-lg text-display-lg text-on-surface mt-1">
                          ${(nextDayRevenue / 1000).toFixed(1)}K
                        </h3>
                      </div>
                      <div className="p-2 rounded-lg bg-primary-container/10 text-primary">
                        <span className="material-symbols-outlined">today</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 font-label-sm text-label-sm">
                      <span className={`flex items-center ${nextDayChange >= 0 ? 'text-tertiary' : 'text-error'}`}>
                        <span className="material-symbols-outlined text-[14px]">{nextDayChange >= 0 ? 'arrow_upward' : 'arrow_downward'}</span>
                        {Math.abs(nextDayChange).toFixed(1)}%
                      </span>
                      <span className="text-on-surface-variant">vs. prior period</span>
                    </div>
                  </div>

                  {/* Weekly Forecast Card */}
                  <div className="col-span-1 md:col-span-4 glass-panel rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-transparent opacity-50"></div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-label-md text-label-md text-on-surface-variant">30-Day Revenue</p>
                        <h3 className="font-display-lg text-display-lg text-on-surface mt-1">
                          ${(kpis?.total_revenue_30d / 1000000).toFixed(2)}M
                        </h3>
                      </div>
                      <div className="p-2 rounded-lg bg-secondary-container/10 text-secondary">
                        <span className="material-symbols-outlined">date_range</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 font-label-sm text-label-sm">
                      <span className={`flex items-center ${nextWeekChange >= 0 ? 'text-tertiary' : 'text-error'}`}>
                        <span className="material-symbols-outlined text-[14px]">{nextWeekChange >= 0 ? 'arrow_upward' : 'arrow_downward'}</span>
                        {Math.abs(nextWeekChange).toFixed(1)}%
                      </span>
                      <span className="text-on-surface-variant">vs. prior 30d</span>
                    </div>
                  </div>

                  {/* Accuracy Card */}
                  <div className="col-span-1 md:col-span-4 glass-panel rounded-xl p-6 relative overflow-hidden glow-effect">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-inverse-primary to-transparent opacity-80"></div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-label-md text-label-md text-on-surface-variant">Model Accuracy (R²)</p>
                        <h3 className="font-display-lg text-display-lg text-primary mt-1">
                          {forecastData && forecastData.r2_score !== undefined
                            ? forecastData.r2_score.toFixed(4)
                            : '0.0000'}
                        </h3>
                      </div>
                      <div className="p-2 rounded-lg bg-inverse-primary/10 text-inverse-primary">
                        <span className="material-symbols-outlined">analytics</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 font-label-sm text-label-sm">
                      <span className="text-tertiary flex items-center">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        Linear Regression
                      </span>
                      <span className="text-on-surface-variant">Fit Confidence</span>
                    </div>
                  </div>

                  {/* Revenue Chart */}
                  <div className="col-span-1 md:col-span-8 glass-panel rounded-xl p-6 flex flex-col h-[500px]">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="font-headline-md text-headline-md text-on-surface">Revenue Forecast - SKU: {selectedSKU}</h3>
                        <p className="text-body-sm text-on-surface-variant mt-1">Historical sales and 7-day predicted trend</p>
                      </div>
                    </div>

                    <div className="flex-1 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                          <XAxis dataKey="date" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                          <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} tickFormatter={(v) => `$${(v).toFixed(0)}`} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(30,30,40,0.95)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '12px' }} 
                            formatter={(v) => v !== null && v !== undefined ? `$${v.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : 'N/A'}
                          />
                          <Legend />
                          <Line type="monotone" dataKey="historical" stroke="var(--md-sys-color-primary, #5b7cf0)" strokeWidth={2} name="Historical Sales" connectNulls={true} dot={{ r: 2 }} activeDot={{ r: 6 }} />
                          <Line type="monotone" dataKey="forecast" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name="7D Forecast" connectNulls={true} dot={{ r: 2 }} activeDot={{ r: 6 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* SKU Selector & Insights */}
                  <div className="col-span-1 md:col-span-4 flex flex-col gap-gutter">
                    <div className="glass-panel rounded-xl p-6 flex-1 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3"></div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-primary-container to-secondary-container text-on-primary-container">
                          <span className="material-symbols-outlined">psychology</span>
                        </div>
                        <h3 className="font-headline-md text-headline-md text-on-surface">Product Selection</h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Select SKU</label>
                          <select 
                            value={selectedSKU}
                            onChange={(e) => setSelectedSKU(e.target.value)}
                            className="w-full mt-2 px-3 py-2 rounded-lg bg-surface-container border border-outline-variant/20 text-on-surface font-body-sm focus:ring-1 focus:ring-primary outline-none"
                          >
                            {skus.map(sku => (
                              <option key={sku} value={sku}>{sku}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2 border-t border-outline-variant/10 pt-4">
                          <p className="font-label-md text-label-md text-primary uppercase tracking-wider">Top Product</p>
                          <p className="font-headline-md text-headline-md text-on-surface">{kpis?.top_product?.name || 'N/A'}</p>
                          <p className="font-body-sm text-on-surface-variant">
                            Revenue: ${(kpis?.top_product?.revenue / 1000).toFixed(1)}K
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="glass-panel rounded-xl p-6 bg-surface-container-high/50 border-none">
                      <p className="font-label-md text-label-md text-on-surface mb-3">AI Insight</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                        Your top product "{kpis?.top_product?.name}" generated ${(kpis?.top_product?.revenue / 1000000).toFixed(2)}M in revenue. 
                        Consider inventory optimization for sustained growth.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
