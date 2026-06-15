import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './dashboard.css'
import Sidebar from '../components/Sidebar'

export default function DashboardAIinsights() {
	useEffect(() => {
		try { document.documentElement.classList.add('dark') } catch (e) {}
	}, [])

	const linkClass = (isActive) => `flex items-center gap-stack-sm px-4 py-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-secondary-container/30 text-primary border-r-4 border-primary scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-variant/20'}`

	return (
		<div className="flex h-screen overflow-hidden antialiased font-body-md text-body-md bg-surface">
			<Sidebar />

			<main className="flex-1 flex flex-col h-full overflow-hidden relative bg-surface">
				<div className="md:hidden flex items-center justify-between p-margin-mobile border-b border-outline-variant/10 bg-surface/80 backdrop-blur-xl z-30">
					<div className="flex items-center gap-stack-sm">
						<button className="p-1 text-on-surface-variant"><span className="material-symbols-outlined">menu</span></button>
						<span className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-on-surface">AI Insights</span>
					</div>
					<button className="p-1 text-on-surface-variant"><span className="material-symbols-outlined">add</span></button>
				</div>

				<div className="flex-1 flex overflow-hidden w-full h-full">
					<aside className="hidden lg:flex flex-col w-[280px] bg-surface-container-lowest border-r border-outline-variant/10 shrink-0 h-full">
						<div className="p-4 border-b border-outline-variant/10">
							<div className="relative">
								<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
								<input className="w-full bg-surface-container border-0 rounded-full py-2 pl-9 pr-4 font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Search history..." type="text" />
							</div>
						</div>
						<div className="flex-1 overflow-y-auto p-2 space-y-4">
							<div>
								<h3 className="font-label-sm text-label-sm text-on-surface-variant/70 px-3 mb-2 uppercase tracking-wider">Today</h3>
								<ul className="space-y-1">
									<li>
										<button className="w-full text-left px-3 py-2 rounded-lg bg-surface-container/50 border border-outline-variant/5 text-primary group transition-colors">
											<div className="font-label-md text-label-md truncate">Q3 Revenue Anomalies</div>
											<div className="font-body-sm text-body-sm text-on-surface-variant truncate mt-0.5">Which product generated highest revenue?</div>
										</button>
									</li>
									<li>
										<button className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container/30 text-on-surface-variant hover:text-on-surface transition-colors group">
											<div className="font-label-md text-label-md truncate group-hover:text-primary transition-colors">Inventory Shortage Prediction</div>
											<div className="font-body-sm text-body-sm truncate mt-0.5 opacity-70">Predict stockouts for SKU-892</div>
										</button>
									</li>
								</ul>
							</div>
							<div>
								<h3 className="font-label-sm text-label-sm text-on-surface-variant/70 px-3 mb-2 uppercase tracking-wider">Previous 7 Days</h3>
								<ul className="space-y-1">
									<li>
										<button className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container/30 text-on-surface-variant hover:text-on-surface transition-colors group">
											<div className="font-label-md text-label-md truncate group-hover:text-primary transition-colors">Declining Product Lines</div>
											<div className="font-body-sm text-body-sm truncate mt-0.5 opacity-70">What products are declining in APAC?</div>
										</button>
									</li>
									<li>
										<button className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container/30 text-on-surface-variant hover:text-on-surface transition-colors group">
											<div className="font-label-md text-label-md truncate group-hover:text-primary transition-colors">Customer Churn Analysis</div>
											<div className="font-body-sm text-body-sm truncate mt-0.5 opacity-70">Identify at-risk enterprise accounts</div>
										</button>
									</li>
									<li>
										<button className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container/30 text-on-surface-variant hover:text-on-surface transition-colors group">
											<div className="font-label-md text-label-md truncate group-hover:text-primary transition-colors">Margin Impact Report</div>
											<div className="font-body-sm text-body-sm truncate mt-0.5 opacity-70">Show gross margin variance by region</div>
										</button>
									</li>
								</ul>
							</div>
						</div>
					</aside>

					<section className="flex-1 flex flex-col h-full bg-surface relative">
						<header className="h-14 border-b border-outline-variant/10 flex items-center justify-between px-gutter shrink-0 bg-surface/50 backdrop-blur-md">
							<div className="flex items-center gap-3">
								<div className="flex items-center gap-2">
									<span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(91,124,240,0.4)]"></span>
									<span className="font-label-md text-label-md text-on-surface">Kriya Cortex Active</span>
								</div>
								<span className="text-outline-variant">|</span>
								<span className="font-body-sm text-body-sm text-on-surface-variant">Model: Enterprise v4.2</span>
							</div>
							<div className="flex items-center gap-2">
								<button className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors" title="Export Chat">
									<span className="material-symbols-outlined text-[20px]">download</span>
								</button>
								<button className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors" title="Clear Context">
									<span className="material-symbols-outlined text-[20px]">delete_sweep</span>
								</button>
							</div>
						</header>

						<div className="flex-1 overflow-y-auto px-margin-mobile md:px-margin-desktop py-stack-lg scroll-smooth">
							<div className="max-w-3xl mx-auto space-y-8 pb-32">
								<div className="flex gap-4 items-start">
									<div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 mt-1 shadow-sm shadow-primary/20">
										<span className="material-symbols-outlined text-on-primary text-[18px]">blur_on</span>
									</div>
									<div className="flex-1 space-y-4">
										<div className="font-body-md text-body-md text-on-surface leading-relaxed">
											Hello. I'm connected to your enterprise data warehouse. I can analyze revenue trends, predict inventory bottlenecks, or generate custom reports. How can I assist you today?
										</div>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
											<button className="text-left p-4 rounded-xl border border-outline-variant/20 bg-surface-container-low hover:bg-surface-container hover:border-primary/40 transition-all group flex flex-col gap-2">
												<div className="flex items-center gap-2 text-primary">
													<span className="material-symbols-outlined text-[18px]">trending_up</span>
													<span className="font-label-md text-label-md">Revenue Analysis</span>
												</div>
												<span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">"Which product generated highest revenue this quarter?"</span>
											</button>
											<button className="text-left p-4 rounded-xl border border-outline-variant/20 bg-surface-container-low hover:bg-surface-container hover:border-primary/40 transition-all group flex flex-col gap-2">
												<div className="flex items-center gap-2 text-error">
													<span className="material-symbols-outlined text-[18px]">trending_down</span>
													<span className="font-label-md text-label-md">Risk Assessment</span>
												</div>
												<span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">"What products are declining in the EMEA region?"</span>
											</button>
										</div>
									</div>
								</div>

								<div className="flex gap-4 items-start flex-row-reverse">
									<div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 mt-1 border border-outline-variant/20">
										<span className="material-symbols-outlined text-on-surface text-[18px]">person</span>
									</div>
									<div className="max-w-[80%] bg-surface-container-highest rounded-2xl rounded-tr-sm px-5 py-3 border border-outline-variant/10 shadow-sm">
										<p className="font-body-md text-body-md text-on-surface">Which product generated highest revenue across all regions in Q3?</p>
									</div>
								</div>

								<div className="flex gap-4 items-start">
									<div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 mt-1 shadow-sm shadow-primary/20">
										<span className="material-symbols-outlined text-on-primary text-[18px]">blur_on</span>
									</div>
									<div className="flex-1 space-y-4">
										<div className="font-body-md text-body-md text-on-surface leading-relaxed">
											Based on the consolidated Q3 dataset, the highest revenue-generating product was the <strong>Nexus Quantum Array (SKU-NQ88)</strong>.
										</div>
										<div className="bg-surface-container-low border border-outline-variant/20 rounded-xl overflow-hidden">
											<div className="px-4 py-3 border-b border-outline-variant/10 bg-surface-container/50 flex justify-between items-center">
												<span className="font-label-md text-label-md text-on-surface">Top Performer: Q3 Revenue</span>
												<button className="text-primary hover:text-secondary transition-colors"><span className="material-symbols-outlined text-[18px]">open_in_new</span></button>
											</div>
											<div className="p-4 grid grid-cols-3 gap-4">
												<div>
													<div className="font-label-sm text-label-sm text-on-surface-variant mb-1">Total Revenue</div>
													<div className="font-headline-md text-headline-md text-on-surface">$14.2M</div>
												</div>
												<div>
													<div className="font-label-sm text-label-sm text-on-surface-variant mb-1">Growth (YoY)</div>
													<div className="font-headline-md text-headline-md text-tertiary-fixed">+24.8%</div>
												</div>
												<div>
													<div className="font-label-sm text-label-sm text-on-surface-variant mb-1">Top Region</div>
													<div className="font-headline-md text-headline-md text-on-surface">APAC</div>
												</div>
											</div>
											<div className="px-4 pb-4">
												<div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden flex">
													<div className="h-full bg-primary w-[65%]"></div>
													<div className="h-full bg-secondary w-[20%]"></div>
													<div className="h-full bg-tertiary w-[15%]"></div>
												</div>
												<div className="flex justify-between mt-2 font-label-sm text-label-sm text-on-surface-variant">
													<span>APAC (65%)</span>
													<span>NA (20%)</span>
													<span>EMEA (15%)</span>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="flex gap-4 items-start opacity-70">
									<div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 mt-1">
										<span className="material-symbols-outlined text-on-surface-variant text-[18px]">more_horiz</span>
									</div>
									<div className="flex items-center h-10 px-4 rounded-xl bg-surface-container-low border border-outline-variant/10 shimmer-bg w-48">
										<span className="font-label-sm text-label-sm text-on-surface-variant">Analyzing cross-reference data...</span>
									</div>
								</div>
							</div>
						</div>

						<div className="absolute bottom-0 left-0 w-full p-margin-mobile md:p-margin-desktop bg-gradient-to-t from-surface via-surface to-transparent pt-12">
							<div className="max-w-3xl mx-auto relative">
								<div className="absolute -top-10 left-0 flex gap-2 overflow-x-auto w-full no-scrollbar pb-2">
									<button className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/20 hover:border-primary/40 text-on-surface-variant hover:text-on-surface transition-colors font-label-sm text-label-sm">
										<span className="material-symbols-outlined text-[14px]">table_chart</span> Add Dataset
									</button>
									<button className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/20 hover:border-primary/40 text-on-surface-variant hover:text-on-surface transition-colors font-label-sm text-label-sm">
										<span className="material-symbols-outlined text-[14px]">tune</span> Adjust Parameters
									</button>
								</div>
								<div className="relative bg-surface-container-low rounded-2xl border border-outline-variant/20 shadow-lg shadow-black/20 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all duration-300">
									<textarea className="w-full bg-transparent border-0 resize-none py-4 pl-4 pr-16 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:ring-0 outline-none max-h-32 min-h-[56px] rounded-2xl" placeholder="Ask Kriya a question about your data..." rows={1}></textarea>
									<div className="absolute right-2 bottom-2 flex items-center gap-2">
										<button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors" title="Attach file">
											<span className="material-symbols-outlined text-[20px]">attach_file</span>
										</button>
										<button className="p-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm shadow-primary/20 flex items-center justify-center">
											<span className="material-symbols-outlined text-[20px] ml-0.5">send</span>
										</button>
									</div>
								</div>
								<div className="text-center mt-3">
									<span className="font-label-sm text-label-sm text-on-surface-variant/50">Kriya AI can make mistakes. Consider verifying critical business data.</span>
								</div>
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	)
}

