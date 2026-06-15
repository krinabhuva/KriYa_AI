import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import './dashboard.css'

export default function Dashboard_Settings() {
  const [tab, setTab] = useState('account')

  useEffect(() => {
    document.documentElement.classList.add('dark')
    return () => {}
  }, [])

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative">
        <header className="sticky top-0 w-full z-40 bg-surface/50 backdrop-blur-md border-b border-white/10 flex justify-between items-center px-gutter py-stack-sm">
          <div className="flex items-center bg-surface-container-low border border-white/5 rounded-full px-4 py-1.5 w-72">
            <span className="material-symbols-outlined text-outline text-body-md mr-2">search</span>
            <input className="bg-transparent border-none p-0 text-body-sm text-on-surface placeholder-on-surface-variant focus:ring-0 w-full" placeholder="Search resources..." type="text" />
          </div>
          <div className="flex items-center gap-stack-md">
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">dark_mode</span>
            </button>
            <div className="h-8 w-[1px] bg-white/10 mx-1"></div>
            <div className="flex items-center gap-3 pl-2">
              <img alt="User Profile" className="w-8 h-8 rounded-full border border-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3QjPITKcd2AkXo8ISHFZY5ePskLACJ2LaJa5ifFfHGLFiJcLawLfumvtkdQthj5gV8dqM-brU78hXm6ZVhZzoS34ir6YXyHXG8Fd0oXg8R_LVEcW4IFg03Pnq4zPycaRp09dntiy60-K8KdamSJQu0ra9TbMRxUBomJSBHjQuvAt23NJ9vZoL0swLHjfowbls8RW9ck3h2EfHFrA45XGzfdVMHhgc06rFUAs0rNYadNNds_F2e6ZFGE2O6XMpt52JSudUwZMzA8U" />
              <span className="text-label-md font-bold text-on-surface hidden sm:block">Marcus Vance</span>
            </div>
          </div>
        </header>

        <div className="px-margin-desktop py-stack-lg max-w-5xl mx-auto w-full">
          <div className="mb-stack-xl">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Account Settings</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Manage your personal profile, security preferences, and system configurations.</p>
          </div>

          <div className="flex gap-stack-lg border-b border-white/10 mb-stack-lg overflow-x-auto whitespace-nowrap">
            <button className={`tab-btn ${tab === 'account' ? 'active text-primary' : 'text-on-surface-variant' } pb-4 font-label-md text-label-md transition-all px-2`} onClick={() => setTab('account')}>Account Details</button>
            <button className={`tab-btn ${tab === 'security' ? 'active text-primary' : 'text-on-surface-variant' } pb-4 font-label-md text-label-md transition-all px-2`} onClick={() => setTab('security')}>Security &amp; Privacy</button>
            <button className={`tab-btn ${tab === 'system' ? 'active text-primary' : 'text-on-surface-variant' } pb-4 font-label-md text-label-md transition-all px-2`} onClick={() => setTab('system')}>System Preferences</button>
          </div>

          {tab === 'account' && (
            <div className="tab-pane animate-in fade-in duration-500" id="account-content">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
                <div className="lg:col-span-1">
                  <div className="glass-panel p-stack-lg rounded-xl flex flex-col items-center text-center">
                    <div className="relative group cursor-pointer mb-stack-md">
                      <img alt="Profile Large" className="w-32 h-32 rounded-full border-4 border-surface-container-highest group-hover:opacity-75 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxzKdrz_vmPONDBhSQhD9WRaLtay_jkZyKGCt9eQn30e9H8zl74OXsRYOtfX1MH7AaKqwAt9vEYJbL4j33GCd6JzCOp4W8Mt9EjPF38fXufUgULmaatU2QGB1kqtoP0eDeP88RTRtXimFum6-FOluDzALHkOkfAHm4fPrGdK5iwguk9ridqzI3tZmt-olTW6ZuJgM-Xaj_5AaMify1fjMoM5vxZRFacZAP-FeV2rfsc5y6YZh43Bh-IImU3Pe3gU8JRvFV4Wg-5To" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-on-primary">add_a_photo</span>
                      </div>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface">Marcus Vance</h3>
                    <p className="text-label-md text-primary mb-stack-md">Senior Data Architect</p>
                    <button className="text-label-sm font-bold text-on-surface-variant border border-outline-variant px-4 py-2 rounded-lg hover:bg-surface-variant transition-all">Upload New Photo</button>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-gutter">
                  <div className="glass-panel p-stack-lg rounded-xl">
                    <h4 className="text-label-md font-bold text-on-surface mb-stack-md">Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                      <div className="space-y-stack-xs">
                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Full Name</label>
                        <input defaultValue="Marcus Vance" className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-4 py-2.5 text-body-md text-on-surface focus:border-primary transition-all" type="text" />
                      </div>
                      <div className="space-y-stack-xs">
                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Email Address</label>
                        <input defaultValue="marcus.v@kriya.ai" className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-4 py-2.5 text-body-md text-on-surface focus:border-primary transition-all" type="email" />
                      </div>
                      <div className="space-y-stack-xs">
                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Company</label>
                        <input defaultValue="Kriya Analytics Inc." className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-4 py-2.5 text-body-md text-on-surface focus:border-primary transition-all" type="text" />
                      </div>
                      <div className="space-y-stack-xs">
                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Role</label>
                        <input defaultValue="Enterprise Admin" className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-4 py-2.5 text-body-md text-on-surface focus:border-primary transition-all" type="text" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-stack-md">
                    <button className="px-6 py-2.5 text-label-md font-bold text-on-surface-variant hover:text-on-surface transition-colors">Discard Changes</button>
                    <button className="px-8 py-2.5 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:shadow-[0_0_20px_rgba(192,193,255,0.3)] transition-all">Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'security' && (
            <div className="tab-pane animate-in fade-in duration-500" id="security-content">
              <div className="glass-panel rounded-xl divide-y divide-white/5">
                <div className="p-stack-lg">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-stack-md">
                    <div>
                      <h4 className="text-headline-md font-headline-md text-on-surface">Password</h4>
                      <p className="text-body-sm text-on-surface-variant">Last updated 4 months ago</p>
                    </div>
                    <button className="px-6 py-2 bg-surface-container-highest text-on-surface rounded-lg text-label-md font-bold hover:bg-surface-variant transition-all">Update Password</button>
                  </div>
                </div>
                <div className="p-stack-lg">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-stack-md">
                    <div className="flex gap-4">
                      <div className="p-3 bg-secondary-container rounded-xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-secondary-container">verified_user</span>
                      </div>
                      <div>
                        <h4 className="text-headline-md font-headline-md text-on-surface">Two-Factor Authentication</h4>
                        <p className="text-body-sm text-on-surface-variant">Add an extra layer of security to your account.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-label-sm font-bold text-error">DISABLED</span>
                      <button className="px-6 py-2 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:shadow-[0_0_20px_rgba(192,193,255,0.3)] transition-all">Enable 2FA</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'system' && (
            <div className="tab-pane animate-in fade-in duration-500" id="system-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <div className="glass-panel p-stack-lg rounded-xl">
                  <h4 className="text-label-md font-bold text-on-surface uppercase mb-stack-md">Display Theme</h4>
                  <div className="grid grid-cols-2 gap-stack-md">
                    <div className="p-4 rounded-xl border-2 border-primary bg-surface-container flex flex-col gap-2 cursor-pointer transition-all">
                      <div className="flex justify-between items-center">
                        <span className="text-label-md text-on-surface">Dark Mode</span>
                        <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: `"FILL" 1`}}>check_circle</span>
                      </div>
                      <div className="h-20 bg-surface-dim rounded border border-white/5 p-2 space-y-2">
                        <div className="h-2 w-1/2 bg-primary/20 rounded"></div>
                        <div className="h-2 w-full bg-white/5 rounded"></div>
                        <div className="h-2 w-2/3 bg-white/5 rounded"></div>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex flex-col gap-2 cursor-pointer hover:border-white/20 transition-all opacity-60">
                      <div className="flex justify-between items-center">
                        <span className="text-label-md text-on-surface-variant">Light Mode</span>
                      </div>
                      <div className="h-20 bg-gray-100 rounded border border-black/5 p-2 space-y-2">
                        <div className="h-2 w-1/2 bg-blue-600/20 rounded"></div>
                        <div className="h-2 w-full bg-black/5 rounded"></div>
                        <div className="h-2 w-2/3 bg-black/5 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-stack-lg rounded-xl">
                  <h4 className="text-label-md font-bold text-on-surface uppercase mb-stack-md">Notification Preferences</h4>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Data Analysis Ready</span>
                      <input defaultChecked className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-background bg-surface-container-lowest" type="checkbox" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">API Threshold Warnings</span>
                      <input defaultChecked className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-background bg-surface-container-lowest" type="checkbox" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Team Activity Digests</span>
                      <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-background bg-surface-container-lowest" type="checkbox" />
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2 glass-panel p-stack-lg rounded-xl">
                  <div className="flex justify-between items-center mb-stack-md">
                    <h4 className="text-label-md font-bold text-on-surface uppercase">API Management</h4>
                    <button className="text-label-sm font-bold text-primary hover:underline">+ Generate New Key</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="border-b border-white/5">
                        <tr>
                          <th className="pb-3 text-label-sm text-outline-variant font-bold uppercase">Name</th>
                          <th className="pb-3 text-label-sm text-outline-variant font-bold uppercase">Key</th>
                          <th className="pb-3 text-label-sm text-outline-variant font-bold uppercase text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <tr>
                          <td className="py-4 text-body-sm font-medium">Production Alpha</td>
                          <td className="py-4 font-mono text-xs text-on-surface-variant">kr_live_••••••••••••••••3a7b</td>
                          <td className="py-4 text-right">
                            <button className="text-outline hover:text-primary transition-colors">
                              <span className="material-symbols-outlined text-body-md">visibility</span>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 text-body-sm font-medium">Dev Sandbox</td>
                          <td className="py-4 font-mono text-xs text-on-surface-variant">kr_test_••••••••••••••••f922</td>
                          <td className="py-4 text-right">
                            <button className="text-outline hover:text-primary transition-colors">
                              <span className="material-symbols-outlined text-body-md">visibility</span>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        <footer className="mt-auto bg-surface-container-lowest border-t border-outline-variant">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter px-margin-desktop py-stack-xl max-w-container-max mx-auto">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-headline-md font-headline-md font-bold text-primary mb-stack-md">Kriya</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Precision Engineering for Enterprise Decision Intelligence.</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-label-md text-label-md text-on-surface font-bold mb-1">Company</span>
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">About Us</a>
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Careers</a>
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Contact</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-label-md text-label-md text-on-surface font-bold mb-1">Product</span>
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Features</a>
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Pricing</a>
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">API Docs</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-label-md text-label-md text-on-surface font-bold mb-1">Legal</span>
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Privacy</a>
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Terms</a>
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Security</a>
            </div>
          </div>
          <div className="border-t border-white/5 py-stack-sm text-center">
            <p className="font-label-sm text-label-sm text-outline-variant">© 2024 Kriya AI. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
