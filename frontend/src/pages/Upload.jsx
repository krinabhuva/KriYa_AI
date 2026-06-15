import React, { useState, useRef, useEffect } from 'react'

export default function Upload() {
	const [uploads, setUploads] = useState([
		{ id: 1, name: 'Q4_Sales_Projections.xlsx', size: '12.4 MB', date: 'Oct 24, 2023', status: 'Success' },
		{ id: 2, name: 'Inventory_Audit_Log.csv', size: '85.1 MB', date: 'Oct 23, 2023', status: 'Processing' },
		{ id: 3, name: 'Global_Customer_Churn.xlsx', size: '4.2 MB', date: 'Oct 21, 2023', status: 'Success' },
		{ id: 4, name: 'Corrupted_Report.xlsx', size: '0.1 MB', date: 'Oct 20, 2023', status: 'Failed' }
	])
	const [dragActive, setDragActive] = useState(false)
	const fileInputRef = useRef(null)
	const dropRef = useRef(null)

	useEffect(() => {
		const el = dropRef.current
		if (!el) return
		const onDragOver = (e) => { e.preventDefault(); setDragActive(true) }
		const onDragLeave = (e) => { e.preventDefault(); setDragActive(false) }
		const onDrop = (e) => {
			e.preventDefault(); setDragActive(false)
			const files = e.dataTransfer.files
			if (files && files.length) handleUpload(files[0])
		}
		el.addEventListener('dragover', onDragOver)
		el.addEventListener('dragleave', onDragLeave)
		el.addEventListener('drop', onDrop)
		return () => {
			el.removeEventListener('dragover', onDragOver)
			el.removeEventListener('dragleave', onDragLeave)
			el.removeEventListener('drop', onDrop)
		}
	}, [])

	function handleSelectClick() {
		fileInputRef.current?.click()
	}

	function handleFileChange(e) {
		const f = e.target.files && e.target.files[0]
		if (f) handleUpload(f)
	}

	function handleUpload(file) {
		const id = Date.now()
		const newRow = { id, name: file.name, size: formatSize(file.size), date: new Date().toLocaleDateString(), status: 'Processing' }
		setUploads(prev => [newRow, ...prev])

		// Simulate upload work
		setTimeout(() => {
			setUploads(prev => prev.map(r => r.id === id ? { ...r, status: 'Success' } : r))
		}, 2000 + Math.random() * 3000)
	}

	function formatSize(bytes) {
		if (bytes < 1024) return bytes + ' B'
		if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
		return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
	}

	return (
		<div className="font-body-md text-body-md selection:bg-primary-container selection:text-on-primary-container">
			<style>{`
				.glass-card { background: rgba(23, 31, 51, 0.5); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.05); }
				@keyframes border-glow { 0%,100%{border-color:rgba(192,193,255,0.2);}50%{border-color:rgba(192,193,255,0.6);} }
				.animated-border { animation: border-glow 3s ease-in-out infinite; }
				.shimmer-btn:hover { background: linear-gradient(90deg,#8083ff 0%,#ddb7ff 100%); transition: all 0.3s ease; }
				.custom-scrollbar::-webkit-scrollbar{width:4px} .custom-scrollbar::-webkit-scrollbar-thumb{background:#464554;border-radius:10px}
			`}</style>

			<div>
				<main className="flex-grow min-w-0 bg-background relative overflow-hidden w-full">
					<div className="max-w-container-max mx-auto px-margin-desktop py-stack-lg relative z-10">
						<div className="mb-stack-lg">
							<h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Upload Data</h2>
							<p className="font-body-md text-body-md text-on-surface-variant">Import your enterprise datasets for AI processing and predictive analysis.</p>
						</div>

						<div ref={dropRef} id="drop-zone" onClick={handleSelectClick} className={`glass-card animated-border border-2 border-dashed rounded-3xl p-16 flex flex-col items-center justify-center text-center transition-all group cursor-pointer mb-stack-xl ${dragActive ? 'bg-primary-container/10 scale-[1.01]' : ''}`}>
							<div className="w-20 h-20 bg-primary-container/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
								<span className="material-symbols-outlined text-primary text-5xl" style={{fontVariationSettings: "'FILL' 1"}}>cloud_upload</span>
							</div>
							<h3 className="font-headline-md text-headline-md text-on-surface mb-2">Drag and drop your files here</h3>
							<p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-md mx-auto">Support for <span className="text-primary font-semibold">CSV</span> and <span className="text-secondary font-semibold">XLSX</span> files. Max file size: 500MB.</p>
							<div className="flex gap-stack-md">
								<button onClick={handleSelectClick} className="shimmer-btn bg-primary text-on-primary px-8 py-3 rounded-xl font-label-md text-label-md shadow-lg flex items-center gap-2">
									<span className="material-symbols-outlined">add</span>
									Select Files
								</button>
								<button className="bg-surface-container border border-outline-variant/30 text-on-surface px-8 py-3 rounded-xl font-label-md text-label-md hover:bg-surface-variant">Connect Google Drive</button>
							</div>
							<input ref={fileInputRef} accept=".csv, .xlsx" className="hidden" id="file-input" type="file" onChange={handleFileChange} />
						</div>

						<section>
							<div className="flex justify-between items-center mb-stack-md">
								<h4 className="font-headline-md text-headline-md text-on-surface">Recent Uploads</h4>
								<button className="text-primary font-label-md text-label-md hover:underline flex items-center gap-1">View All History <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
							</div>

							<div className="glass-card rounded-2xl overflow-hidden">
								<table className="w-full text-left border-collapse">
									<thead>
										<tr className="bg-surface-container-high/50">
											<th className="px-gutter py-4 font-label-md text-label-md text-on-surface-variant border-b border-white/5 uppercase tracking-wider">Filename</th>
											<th className="px-gutter py-4 font-label-md text-label-md text-on-surface-variant border-b border-white/5 uppercase tracking-wider">Size</th>
											<th className="px-gutter py-4 font-label-md text-label-md text-on-surface-variant border-b border-white/5 uppercase tracking-wider">Date</th>
											<th className="px-gutter py-4 font-label-md text-label-md text-on-surface-variant border-b border-white/5 uppercase tracking-wider">Status</th>
											<th className="px-gutter py-4 font-label-md text-label-md text-on-surface-variant border-b border-white/5 uppercase tracking-wider text-right">Action</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-white/5">
										{uploads.map(row => (
											<tr key={row.id} className="hover:bg-white/[0.03] transition-colors group">
												<td className="px-gutter py-5">
													<div className="flex items-center gap-3">
														<span className="material-symbols-outlined text-tertiary">table_chart</span>
														<span className="font-body-md text-body-md text-on-surface">{row.name}</span>
													</div>
												</td>
												<td className="px-gutter py-5 font-body-sm text-body-sm text-on-surface-variant">{row.size}</td>
												<td className="px-gutter py-5 font-body-sm text-body-sm text-on-surface-variant">{row.date}</td>
												<td className="px-gutter py-5">
													{row.status === 'Success' && (
														<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-400 font-label-sm text-label-sm"><span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Success</span>
													)}
													{row.status === 'Processing' && (
														<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm animate-pulse"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Processing</span>
													)}
													{row.status === 'Failed' && (
														<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-error-container/20 text-error font-label-sm text-label-sm"><span className="w-1.5 h-1.5 rounded-full bg-error"></span> Failed</span>
													)}
												</td>
												<td className="px-gutter py-5 text-right">
													{row.status === 'Processing' ? (
														<button className="opacity-50 cursor-not-allowed bg-surface-container text-on-surface-variant px-4 py-1.5 rounded-lg font-label-md text-label-md" disabled>Pending</button>
													) : row.status === 'Failed' ? (
														<button className="bg-surface-container border border-error/20 text-error px-4 py-1.5 rounded-lg font-label-md text-label-md">Retry</button>
													) : (
														<button className="bg-primary/10 text-primary px-4 py-1.5 rounded-lg font-label-md text-label-md hover:bg-primary/20">Analyze</button>
													)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</section>
					</div>

					<footer className="w-full bg-surface-container-lowest border-t border-outline-variant mt-stack-xl">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-gutter px-margin-desktop py-stack-xl max-w-container-max mx-auto">
							<div>
								<h5 className="text-headline-md font-headline-md font-bold text-primary mb-4">Kriya</h5>
								<p className="font-body-sm text-body-sm text-on-surface-variant">© 2024 Kriya AI. Precision Engineering for Enterprise.</p>
							</div>
							<div>
								<h6 className="font-label-md text-label-md text-on-surface mb-4">Product</h6>
								<ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
									<li><a className="hover:text-secondary" href="#">Company</a></li>
									<li><a className="hover:text-secondary" href="#">Features</a></li>
									<li><a className="hover:text-secondary" href="#">Pricing</a></li>
								</ul>
							</div>
							<div>
								<h6 className="font-label-md text-label-md text-on-surface mb-4">Support</h6>
								<ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
									<li><a className="hover:text-secondary" href="#">Documentation</a></li>
									<li><a className="hover:text-secondary" href="#">Privacy</a></li>
									<li><a className="hover:text-secondary" href="#">Terms</a></li>
								</ul>
							</div>
							<div className="flex flex-col items-end">
								<h6 className="font-label-md text-label-md text-on-surface mb-4">Integrations</h6>
								<div className="flex gap-4">
									<span className="material-symbols-outlined text-on-surface-variant">database</span>
									<span className="material-symbols-outlined text-on-surface-variant">cloud_queue</span>
									<span className="material-symbols-outlined text-on-surface-variant">monitoring</span>
								</div>
							</div>
						</div>
					</footer>
				</main>
			</div>
		</div>
	)
}
