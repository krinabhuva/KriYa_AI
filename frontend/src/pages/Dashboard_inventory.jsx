import React, { useEffect, useState } from 'react'
import api from '../api'
import Sidebar from '../components/Sidebar'
import './dashboard.css'

export default function DashboardInventory() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  
  // New item form state
  const [sku, setSku] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Electronics')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState('0')
  const [price, setPrice] = useState('0.00')
  const [cost, setCost] = useState('0.00')
  const [reorderLevel, setReorderLevel] = useState('10')
  const [supplier, setSupplier] = useState('')
  const [location, setLocation] = useState('')
  const [formError, setFormError] = useState('')

  const fetchItems = async () => {
    setLoading(true)
    try {
      const data = await api.getInventoryItems()
      setItems(data)
    } catch (err) {
      console.error('Failed to load inventory items:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    try { document.documentElement.classList.add('dark') } catch (e) {}
    fetchItems()
  }, [])

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(''), 3000)
  }

  const handleOrderMore = async (itemId, itemName, currentQty) => {
    try {
      showToast(`Ordering 200 units for ${itemName}...`)
      // Call api to record movement
      await api.recordInventoryMovement(itemId, 'IN', 200, 'Restock Order', 'Automated dashboard restock action')
      showToast(`Stock updated! Added 200 units to ${itemName}.`)
      fetchItems() // Refresh list
    } catch (err) {
      showToast(`Error restocking: ${err.message}`)
    }
  }

  const handleAddItem = async (e) => {
    e.preventDefault()
    setFormError('')
    if (!sku || !name || !price || !cost) {
      return setFormError('SKU, Name, Price, and Cost are required.')
    }

    try {
      const newItem = {
        sku,
        name,
        category,
        description,
        quantity: parseInt(quantity) || 0,
        price: parseFloat(price) || 0,
        cost: parseFloat(cost) || 0,
        reorder_level: parseInt(reorderLevel) || 10,
        supplier,
        location
      }
      await api.createInventoryItem(newItem)
      showToast(`Product "${name}" added successfully!`)
      setShowAddModal(false)
      // Reset form
      setSku('')
      setName('')
      setDescription('')
      setQuantity('0')
      setPrice('0.00')
      setCost('0.00')
      setReorderLevel('10')
      setSupplier('')
      setLocation('')
      // Refresh items list
      fetchItems()
    } catch (err) {
      setFormError(err.message || 'Failed to add item. Check SKU uniqueness.')
    }
  }

  // Calculate stats dynamically
  const totalSkuCount = items.length
  const lowStockItems = items.filter(item => item.quantity <= item.reorder_level)
  const lowStockCount = lowStockItems.length
  
  // Risk Score: Percentage of catalog at low stock (scaled to 100)
  const riskScore = totalSkuCount > 0 ? Math.round((lowStockCount / totalSkuCount) * 100) : 0
  
  // Revenue at Risk: Missing stock value for items at low stock (reorder_level - quantity) * price
  const revenueAtRisk = lowStockItems.reduce((acc, item) => {
    const missing = Math.max(0, item.reorder_level - item.quantity)
    return acc + (missing * item.price)
  }, 0)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Toast */}
        {toast && (
          <div className="fixed top-20 right-6 bg-primary text-on-primary font-label-md px-6 py-3 rounded-xl shadow-2xl z-[99] border border-primary-fixed-dim/30 animate-in fade-in slide-in-from-top duration-300">
            {toast}
          </div>
        )}

        <header className="docked full-width top-0 sticky z-30 flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto border-b border-outline-variant/10 shadow-sm bg-surface/80 backdrop-blur-xl flex-shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <h1 className="font-headline-md text-headline-md font-bold text-on-surface md:block hidden">Inventory Management</h1>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 justify-end flex-1">
            <button onClick={() => showToast('No new notifications')} className="text-on-surface-variant hover:text-primary transition-colors relative group">
              <span className="material-symbols-outlined text-[22px] group-hover:animate-pulse">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border border-surface"></span>
            </button>
            <button onClick={() => setShowAddModal(true)} className="flex items-center px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(192,193,255,0.2)]">
              <span className="material-symbols-outlined text-[18px] mr-1">add</span>
              Add Item
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
                <button onClick={() => showToast('Filters are currently locked to active catalog')} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant/30 text-on-surface font-label-md text-label-md hover:bg-surface-variant/20 transition-all bg-surface/50 backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  Filter
                </button>
                <button onClick={fetchItems} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant/30 text-on-surface font-label-md text-label-md hover:bg-surface-variant/20 transition-all bg-surface/50 backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                  Refresh List
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <div className="glass-card rounded-xl p-gutter relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-[80px] text-primary">health_and_safety</span>
                </div>
                <h3 className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${riskScore > 30 ? 'bg-error animate-pulse' : 'bg-green-500'}`}></span>
                  Global Risk Score
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className={`font-display-lg text-display-lg ${riskScore > 30 ? 'text-error' : 'text-green-400'}`}>{riskScore}</span>
                  <span className="font-body-md text-body-md text-outline">/100</span>
                </div>
                <p className={`font-body-sm text-body-sm mt-2 flex items-center gap-1 ${riskScore > 30 ? 'text-error' : 'text-green-400'}`}>
                  <span className="material-symbols-outlined text-[16px]">{riskScore > 30 ? 'trending_down' : 'trending_up'}</span>
                  {riskScore > 30 ? 'High stockout ratio. Critical attention needed.' : 'Healthy stock balance across catalog.'}
                </p>
              </div>

              <div className="glass-card rounded-xl p-gutter relative overflow-hidden">
                <h3 className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">warning</span>
                  SKUs at High Risk
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display-lg text-display-lg text-on-surface">{lowStockCount}</span>
                  <span className="font-body-md text-body-md text-outline">/ {totalSkuCount}</span>
                </div>
                <div className="mt-3 w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-error h-full rounded-full" style={{width: `${totalSkuCount > 0 ? (lowStockCount / totalSkuCount) * 100 : 0}%`}}></div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                  {totalSkuCount > 0 ? Math.round((lowStockCount / totalSkuCount) * 100) : 0}% of total catalog
                </p>
              </div>

              <div className="glass-card rounded-xl p-gutter relative overflow-hidden">
                <h3 className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-secondary">payments</span>
                  Est. Revenue at Risk
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display-lg text-display-lg text-on-surface">${revenueAtRisk.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>
                </div>
                <p className="font-body-sm text-body-sm text-secondary mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">lightbulb</span>
                  Restocking items mitigates this risk
                </p>
              </div>
            </div>

            {/* Anomaly banner */}
            {lowStockCount > 0 && (
              <div className="glass-card rounded-xl p-6 border-l-4 border-l-primary relative overflow-hidden ai-shimmer">
                <div className="flex items-start gap-4 relative z-10">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary mt-1">
                    <span className="material-symbols-outlined text-[24px]">model_training</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-headline-md text-headline-md ai-glow-text mb-2">Supply Chain Anomaly Detected</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed font-body-sm">
                      Kriya AI has identified that <strong className="text-on-surface">{lowStockCount} items</strong> are below their recommended safety thresholds. The model forecasts a complete stockout of these SKUs within 14 days.
                    </p>
                    <div className="mt-4 flex items-center gap-4">
                      <button onClick={async () => {
                        showToast('Initiating bulk restock of all low stock items...')
                        for (const item of lowStockItems) {
                          await api.recordInventoryMovement(item.id, 'IN', 200, 'Bulk Restock', 'AI automated batch restock')
                        }
                        showToast('Bulk restock complete!')
                        fetchItems()
                      }} className="px-4 py-2 rounded-md bg-surface-bright border border-outline-variant/30 text-primary font-label-sm text-label-sm hover:bg-surface-variant transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                        Approve Bulk Safety Restock
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action list */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-md text-headline-md text-on-surface">Critical Restock Action List</h3>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="font-label-md text-outline">Loading catalog...</p>
                </div>
              ) : items.length === 0 ? (
                <div className="glass-card p-12 text-center rounded-xl border border-dashed border-outline-variant/30 flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-outline mb-2">inventory_2</span>
                  <h4 className="font-label-md text-on-surface font-bold">No Items Found</h4>
                  <p className="text-body-sm text-on-surface-variant mt-1">Please add items to populate the inventory database.</p>
                </div>
              ) : (
                <div className="glass-card rounded-xl border border-outline-variant/20 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                      <thead>
                        <tr className="bg-surface-container-high/50 border-b border-outline-variant/20">
                          <th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Product / SKU</th>
                          <th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Current Stock</th>
                          <th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Price / Cost</th>
                          <th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Status</th>
                          <th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold text-right">Suggested Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/10 font-body-sm text-body-sm text-on-surface">
                        {items.map(item => {
                          const isLowStock = item.quantity <= item.reorder_level
                          return (
                            <tr key={item.id} className="hover:bg-surface-variant/10 transition-colors group">
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center border border-outline-variant/20">
                                    <span className="material-symbols-outlined text-outline text-[20px]">package_2</span>
                                  </div>
                                  <div>
                                    <p className="font-label-md text-label-md text-on-surface font-semibold">{item.name}</p>
                                    <p className="text-outline text-[12px] font-mono mt-0.5">SKU: {item.sku} | Cat: {item.category}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex flex-col gap-1">
                                  <span className="font-medium">{item.quantity} units</span>
                                  <div className="w-24 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${isLowStock ? 'bg-error' : 'bg-green-500'}`} style={{width: `${Math.min(100, (item.quantity / Math.max(1, item.reorder_level * 2)) * 100)}%`}}></div>
                                  </div>
                                  <span className="text-[11px] text-outline">Reorder Level: {item.reorder_level}</span>
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex flex-col">
                                  <span className="font-medium">${item.price.toFixed(2)} retail</span>
                                  <span className="text-[11px] text-outline">${item.cost.toFixed(2)} cost</span>
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-sm text-label-sm ${
                                  isLowStock ? 'bg-error-container/20 text-error border border-error/30' : 'bg-green-500/10 text-green-400 border border-green-500/20'
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${isLowStock ? 'bg-error animate-pulse' : 'bg-green-400'}`}></span>
                                  {isLowStock ? 'Critical' : 'Healthy'}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-right">
                                <button onClick={() => handleOrderMore(item.id, item.name, item.quantity)} className="px-3 py-1.5 rounded bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors font-label-sm text-label-sm inline-flex items-center gap-1 active:scale-[0.98]">
                                  Order 200 <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 border-t border-outline-variant/20 bg-surface-container-low/50 flex items-center justify-between">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Showing {items.length} items total</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Modal for adding product */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-surface-container-high border border-outline-variant/30 rounded-2xl w-full max-w-xl p-6 shadow-2xl relative animate-in zoom-in duration-200">
              <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Add Inventory Product</h3>
              
              {formError && <div className="text-sm bg-error/10 border border-error/20 text-error p-3 rounded-lg mb-4">{formError}</div>}

              <form onSubmit={handleAddItem} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">SKU</label>
                    <input type="text" value={sku} onChange={e => setSku(e.target.value)} placeholder="e.g. SKU004" className="bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none" required />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Product Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Product D" className="bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} className="bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none">
                      <option value="Electronics">Electronics</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Software">Software</option>
                      <option value="Services">Services</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Initial Quantity</label>
                    <input type="number" min="0" value={quantity} onChange={e => setQuantity(e.target.value)} className="bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Price (Retail)</label>
                    <input type="number" step="0.01" min="0" value={price} onChange={e => setPrice(e.target.value)} className="bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none" required />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Cost</label>
                    <input type="number" step="0.01" min="0" value={cost} onChange={e => setCost(e.target.value)} className="bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none" required />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Reorder Level</label>
                    <input type="number" min="0" value={reorderLevel} onChange={e => setReorderLevel(e.target.value)} className="bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Supplier</label>
                    <input type="text" value={supplier} onChange={e => setSupplier(e.target.value)} placeholder="Supplier Name" className="bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Warehouse Location</label>
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Warehouse C" className="bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none" />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Description</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} rows="2" className="bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none resize-none" placeholder="Product details..."></textarea>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2 text-label-md text-on-surface-variant hover:text-on-surface">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:shadow-[0_0_15px_rgba(192,193,255,0.3)]">Save Product</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <footer className="full-width bottom border-t border-outline-variant/20 flat bg-surface-container-lowest w-full py-stack-xl px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-gutter z-10 relative mt-auto font-body-sm">
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
