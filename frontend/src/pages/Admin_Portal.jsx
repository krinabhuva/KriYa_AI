import React, { useEffect } from 'react'

export default function Admin_Portal() {
	useEffect(() => {
		// Ensure dark mode class is present for Tailwind-based dark styles
		document.documentElement.classList.add('dark')
	}, [])

	return (
		<div className="flex min-h-screen font-body-md text-body-md bg-background text-on-background">
			{/* SideNav */}
			<nav className="hidden md:flex flex-col h-screen py-stack-lg sticky top-0 bg-surface-container-low/50 backdrop-blur-2xl w-64 border-r border-outline-variant/10 z-40 shrink-0">
				<div className="px-gutter mb-stack-lg">
					<h1 className="font-headline-md text-headline-md font-extrabold text-on-surface">Kriya AI</h1>
					<p className="font-label-sm text-label-sm text-on-surface-variant mt-unit opacity-70">Enterprise Intelligence</p>
				</div>
				<div className="px-gutter mb-stack-md">
					<button className="w-full bg-primary text-on-primary font-label-md text-label-md py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-fixed-dim transition-colors">
						<span className="material-symbols-outlined text-[18px]">add</span>
						New Analysis
					</button>
				</div>
				<ul className="flex-1 space-y-1 px-stack-sm overflow-y-auto mt-stack-md">
					<li>
						<a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary-container/30 text-primary border-r-4 border-primary hover:bg-surface-container-highest transition-all duration-300 scale-[0.98]" href="#">
							<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
							<span className="font-label-md text-label-md">Overview</span>
						</a>
					</li>
					<li>
						<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/20 hover:bg-surface-container-highest transition-all duration-300" href="#">
							<span className="material-symbols-outlined">group</span>
							<span className="font-label-md text-label-md">Users</span>
						</a>
					</li>
					<li>
						<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/20 hover:bg-surface-container-highest transition-all duration-300" href="#">
							<span className="material-symbols-outlined">domain</span>
							<span className="font-label-md text-label-md">Orgs</span>
						</a>
					</li>
					<li>
						<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/20 hover:bg-surface-container-highest transition-all duration-300" href="#">
							<span className="material-symbols-outlined">payments</span>
							<span className="font-label-md text-label-md">Revenue</span>
						</a>
					</li>
					<li>
						<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/20 hover:bg-surface-container-highest transition-all duration-300" href="#">
							<span className="material-symbols-outlined">memory</span>
							<span className="font-label-md text-label-md">AI Monitoring</span>
						</a>
					</li>
				</ul>
				<ul className="space-y-1 px-stack-sm mt-auto pt-stack-md border-t border-outline-variant/10">
					<li>
						<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/20 hover:bg-surface-container-highest transition-all duration-300" href="#">
							<span className="material-symbols-outlined">help</span>
							<span className="font-label-md text-label-md">Help Center</span>
						</a>
					</li>
					<li>
						<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/20 hover:bg-surface-container-highest transition-all duration-300" href="#">
							<span className="material-symbols-outlined">logout</span>
							<span className="font-label-md text-label-md">Logout</span>
						</a>
					</li>
				</ul>
			</nav>

			{/* Main Content Canvas */}
			<main className="flex-1 flex flex-col min-w-0">
				<header className="flex justify-between items-center w-full px-margin-desktop py-4 max-w-container-max mx-auto bg-surface/80 backdrop-blur-xl sticky top-0 z-30 shadow-sm border-b border-outline-variant/10">
					<div className="flex items-center gap-4">
						<span className="font-headline-md text-headline-md font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Admin Overview</span>
					</div>
					<div className="flex items-center gap-gutter">
						<div className="hidden md:flex items-center gap-2">
							<button className="text-on-surface-variant hover:text-primary transition-colors duration-200">
								<span className="material-symbols-outlined">notifications</span>
							</button>
							<button className="text-on-surface-variant hover:text-primary transition-colors duration-200">
								<span className="material-symbols-outlined">account_circle</span>
							</button>
						</div>
					</div>
				</header>

				<div className="p-margin-desktop md:p-margin-desktop flex-1 overflow-y-auto max-w-container-max mx-auto w-full space-y-stack-lg">
					{/* KPIs Bento Grid */}
					<section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-stack-md">
						<div className="glass-card p-6 rounded-xl flex flex-col justify-between relative overflow-hidden group">
							<div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>
							<div>
								<span className="material-symbols-outlined text-primary mb-2">group</span>
								<h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Total Users</h3>
								<p className="font-headline-lg text-headline-lg font-semibold text-on-surface">142.8K</p>
							</div>
							<div className="flex items-center gap-1 mt-4 text-tertiary">
								<span className="material-symbols-outlined text-[16px]">trending_up</span>
								<span className="font-label-sm text-label-sm">+12.4%</span>
							</div>
						</div>

						<div className="glass-card p-6 rounded-xl flex flex-col justify-between relative overflow-hidden group">
							<div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-secondary/10 transition-colors"></div>
							<div>
								<span className="material-symbols-outlined text-secondary mb-2">domain</span>
								<h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Active Orgs</h3>
								<p className="font-headline-lg text-headline-lg font-semibold text-on-surface">3,240</p>
							</div>
							<div className="flex items-center gap-1 mt-4 text-tertiary">
								<span className="material-symbols-outlined text-[16px]">trending_up</span>
								<span className="font-label-sm text-label-sm">+5.2%</span>
							</div>
						</div>

						<div className="glass-card p-6 rounded-xl flex flex-col justify-between relative overflow-hidden group">
							<div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-tertiary/10 transition-colors"></div>
							<div>
								<span className="material-symbols-outlined text-tertiary mb-2">payments</span>
								<h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Monthly MRR</h3>
								<p className="font-headline-lg text-headline-lg font-semibold text-on-surface">$2.4M</p>
							</div>
							<div className="flex items-center gap-1 mt-4 text-tertiary">
								<span className="material-symbols-outlined text-[16px]">trending_up</span>
								<span className="font-label-sm text-label-sm">+18.1%</span>
							</div>
						</div>

						<div className="glass-card p-6 rounded-xl flex flex-col justify-between relative overflow-hidden group glow-effect">
							<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
							<div>
								<span className="material-symbols-outlined text-primary mb-2">psychology</span>
								<h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">AI Requests</h3>
								<p className="font-headline-lg text-headline-lg font-semibold text-on-surface">18.5M</p>
							</div>
							<div className="flex items-center gap-1 mt-4 text-error">
								<span className="material-symbols-outlined text-[16px]">warning</span>
								<span className="font-label-sm text-label-sm">High Load</span>
							</div>
						</div>

						<div className="glass-card p-6 rounded-xl flex flex-col justify-between relative overflow-hidden group">
							<div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>
							<div>
								<span className="material-symbols-outlined text-primary-fixed-dim mb-2">api</span>
								<h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">API Usage</h3>
								<p className="font-headline-lg text-headline-lg font-semibold text-on-surface">94%</p>
							</div>
							<div className="w-full bg-surface-container h-1.5 rounded-full mt-4 overflow-hidden">
								<div className="bg-primary h-full rounded-full" style={{ width: '94%' }}></div>
							</div>
						</div>
					</section>

					{/* Revenue Chart Placeholder */}
					<section className="glass-card rounded-xl p-stack-md border-t-2 border-t-primary/50 relative">
						<div className="flex justify-between items-center mb-stack-md">
							<h2 className="font-headline-md text-headline-md text-on-surface">Revenue & Growth</h2>
							<div className="flex gap-2">
								<button className="px-3 py-1 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm hover:text-primary transition-colors">7D</button>
								<button className="px-3 py-1 rounded bg-primary/20 text-primary font-label-sm text-label-sm border border-primary/30">30D</button>
								<button className="px-3 py-1 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm hover:text-primary transition-colors">YTD</button>
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
								<div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface px-2 py-1 rounded text-xs text-on-surface border border-outline-variant/30 font-label-sm">$2.4M</div>
							</div>
						</div>
					</section>

					{/* Tables Section */}
					<div className="grid grid-cols-1 xl:grid-cols-2 gap-stack-md">
						{/* Recent User Management */}
						<section className="glass-card rounded-xl overflow-hidden flex flex-col">
							<div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-lowest/30">
								<h2 className="font-headline-md text-[20px] font-semibold text-on-surface">Recent User Activity</h2>
								<button className="text-primary hover:text-primary-fixed-dim font-label-sm text-label-sm flex items-center gap-1">
									View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
								</button>
							</div>
							<div className="overflow-x-auto">
								<table className="w-full text-left border-collapse">
									<thead>
										<tr className="bg-surface-container-low/50">
											<th className="p-4 font-label-sm text-label-sm text-on-surface-variant font-medium border-b border-outline-variant/10">User</th>
											<th className="p-4 font-label-sm text-label-sm text-on-surface-variant font-medium border-b border-outline-variant/10">Action</th>
											<th className="p-4 font-label-sm text-label-sm text-on-surface-variant font-medium border-b border-outline-variant/10">Time</th>
										</tr>
									</thead>
									<tbody className="font-body-sm text-body-sm">
										<tr className="hover:bg-surface-variant/10 transition-colors border-b border-outline-variant/5">
											<td className="p-4 text-on-surface flex items-center gap-3">
												<div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs">JD</div>
												John Doe
											</td>
											<td className="p-4 text-on-surface-variant"><span className="px-2 py-1 rounded bg-error-container/20 text-error-container text-xs border border-error-container/30">Password Reset</span></td>
											<td className="p-4 text-on-surface-variant opacity-70">2 mins ago</td>
										</tr>
										<tr className="hover:bg-surface-variant/10 transition-colors border-b border-outline-variant/5">
											<td className="p-4 text-on-surface flex items-center gap-3">
												<div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">AS</div>
												Alice Smith
											</td>
											<td className="p-4 text-on-surface-variant"><span className="px-2 py-1 rounded bg-tertiary-container/20 text-tertiary text-xs border border-tertiary-container/30">Role Updated</span></td>
											<td className="p-4 text-on-surface-variant opacity-70">15 mins ago</td>
										</tr>
										<tr className="hover:bg-surface-variant/10 transition-colors">
											<td className="p-4 text-on-surface flex items-center gap-3">
												<div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-bold text-xs">BW</div>
												Bob Wilson
											</td>
											<td className="p-4 text-on-surface-variant"><span className="px-2 py-1 rounded bg-surface-container-high text-on-surface text-xs border border-outline-variant/30">Login Success</span></td>
											<td className="p-4 text-on-surface-variant opacity-70">1 hour ago</td>
										</tr>
									</tbody>
								</table>
							</div>
						</section>

						{/* New Company Registrations */}
						<section className="glass-card rounded-xl overflow-hidden flex flex-col">
							<div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-lowest/30">
								<h2 className="font-headline-md text-[20px] font-semibold text-on-surface">New Registrations</h2>
								<button className="text-primary hover:text-primary-fixed-dim font-label-sm text-label-sm flex items-center gap-1">
									View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
								</button>
							</div>
							<div className="overflow-x-auto">
								<table className="w-full text-left border-collapse">
									<thead>
										<tr className="bg-surface-container-low/50">
											<th className="p-4 font-label-sm text-label-sm text-on-surface-variant font-medium border-b border-outline-variant/10">Company</th>
											<th className="p-4 font-label-sm text-label-sm text-on-surface-variant font-medium border-b border-outline-variant/10">Plan</th>
											<th className="p-4 font-label-sm text-label-sm text-on-surface-variant font-medium border-b border-outline-variant/10">Status</th>
										</tr>
									</thead>
									<tbody className="font-body-sm text-body-sm">
										<tr className="hover:bg-surface-variant/10 transition-colors border-b border-outline-variant/5">
											<td className="p-4 text-on-surface font-medium">Acme Corp</td>
											<td className="p-4 text-on-surface-variant">Enterprise</td>
											<td className="p-4"><span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs border border-primary/20 flex w-fit items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Pending</span></td>
										</tr>
										<tr className="hover:bg-surface-variant/10 transition-colors border-b border-outline-variant/5">
											<td className="p-4 text-on-surface font-medium">Globex Inc</td>
											<td className="p-4 text-on-surface-variant">Pro</td>
											<td className="p-4"><span className="px-2 py-1 rounded bg-surface-container-high text-on-surface text-xs border border-outline-variant/30 flex w-fit items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></span> Active</span></td>
										</tr>
										<tr className="hover:bg-surface-variant/10 transition-colors">
											<td className="p-4 text-on-surface font-medium">Initech</td>
											<td className="p-4 text-on-surface-variant">Startup</td>
											<td className="p-4"><span className="px-2 py-1 rounded bg-surface-container-high text-on-surface text-xs border border-outline-variant/30 flex w-fit items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></span> Active</span></td>
										</tr>
									</tbody>
								</table>
							</div>
						</section>
					</div>
				</div>

				{/* Footer */}
				<footer className="w-full py-stack-xl px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-gutter bg-surface-container-lowest border-t border-outline-variant/20 mt-auto">
					<div className="font-headline-md text-[20px] font-semibold text-on-surface">Kriya AI</div>
					<div className="text-on-surface-variant font-body-sm text-body-sm">© 2024 Kriya AI. All rights reserved.</div>
					<div className="flex gap-4 font-label-sm text-label-sm">
						<a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#">Privacy Policy</a>
						<a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#">Terms of Service</a>
						<a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#">Security</a>
					</div>
				</footer>
			</main>
		</div>
	)
}

