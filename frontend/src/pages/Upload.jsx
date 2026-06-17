import React, { useState, useRef, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import api from '../api'
import Papa from 'papaparse'

export default function Upload() {
	const [uploads, setUploads] = useState([])
	const [dragActive, setDragActive] = useState(false)
	const [preview, setPreview] = useState(null)
	const [toast, setToast] = useState('')
	const [uploadResult, setUploadResult] = useState(null)
	const fileInputRef = useRef(null)
	const dropRef = useRef(null)

	useEffect(() => {
		try { document.documentElement.classList.add('dark') } catch (e) {}
	}, [])

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

	function showToast(message) {
		setToast(message)
		setTimeout(() => setToast(''), 4000)
	}

	function formatSize(bytes) {
		if (bytes < 1024) return bytes + ' B'
		if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
		return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
	}

	async function handleUpload(file) {
		if (!file.name.endsWith('.csv')) {
			showToast('Only CSV files are supported')
			return
		}

		setUploadResult(null)
		const id = Date.now()
		const newRow = { id, name: file.name, size: formatSize(file.size), date: new Date().toLocaleDateString(), status: 'Processing' }
		setUploads(prev => [newRow, ...prev])

		// Parse CSV to show preview
		Papa.parse(file, {
			header: true,
			complete: (results) => {
				const first5 = results.data.slice(0, 5).filter(row => Object.values(row).some(v => v))
				setPreview({ filename: file.name, rows: first5, columns: results.meta.fields })
			},
			error: () => {
				showToast('Failed to parse CSV')
				setUploads(prev => prev.map(r => r.id === id ? { ...r, status: 'Failed' } : r))
			}
		})

		try {
			const res = await api.uploadSalesCSV(file)
			setUploads(prev => prev.map(r => r.id === id ? { ...r, status: 'Success' } : r))
			setUploadResult(res)
			showToast(`✓ ${res.inserted} records imported`)
		} catch (err) {
			console.error('Upload error:', err)
			setUploads(prev => prev.map(r => r.id === id ? { ...r, status: 'Failed' } : r))
			setUploadResult({ error: err.message, inserted: 0, skipped: 1, errors: [err.message] })
			showToast(`✗ Upload failed: ${err.message}`)
		}
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

			{toast && (
				<div className="fixed top-20 right-6 bg-primary text-on-primary font-label-md px-6 py-3 rounded-xl shadow-2xl z-[99] border border-primary-fixed-dim/30 animate-in fade-in slide-in-from-top duration-300">
					{toast}
				</div>
			)}

			<div className="flex h-screen overflow-hidden">
				<Sidebar />

				<main className="flex-grow min-w-0 bg-background relative overflow-hidden w-full">
					<div className="max-w-container-max mx-auto px-margin-desktop py-stack-lg relative z-10">
						<div className="mb-stack-lg">
							<h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Upload Sales Data</h2>
							<p className="font-body-md text-body-md text-on-surface-variant">Import CSV files with sales records. Required columns: date, product_sku, quantity_sold, revenue</p>
						</div>

						<div ref={dropRef} id="drop-zone" onClick={handleSelectClick} className={`glass-card animated-border border-2 border-dashed rounded-3xl p-16 flex flex-col items-center justify-center text-center transition-all group cursor-pointer mb-stack-xl ${dragActive ? 'bg-primary-container/10 scale-[1.01]' : ''}`}>
							<div className="w-20 h-20 bg-primary-container/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
								<span className="material-symbols-outlined text-primary text-5xl" style={{fontVariationSettings: "'FILL' 1"}}>cloud_upload</span>
							</div>
							<h3 className="font-headline-md text-headline-md text-on-surface mb-2">Drag and drop your CSV files here</h3>
							<p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-md mx-auto">Support for <span className="text-primary font-semibold">CSV</span> files. Max file size: 500MB.</p>
							<div className="flex gap-stack-md">
								<button onClick={handleSelectClick} className="shimmer-btn bg-primary text-on-primary px-8 py-3 rounded-xl font-label-md text-label-md shadow-lg flex items-center gap-2">
									<span className="material-symbols-outlined">add</span>
									Select Files
								</button>
							</div>
							<input ref={fileInputRef} accept=".csv" className="hidden" id="file-input" type="file" onChange={handleFileChange} />
						</div>

						{uploadResult && (
							<section className="mb-stack-xl glass-card rounded-2xl p-6 border border-outline-variant/10">
								<div className="flex justify-between items-center mb-4">
									<div>
										<h4 className="font-headline-md text-headline-md text-on-surface">Upload Summary</h4>
										<p className="text-body-sm text-on-surface-variant mt-1">
											Successfully imported: <span className="text-primary font-bold">{uploadResult.inserted}</span> records. 
											Skipped: <span className="text-error font-bold">{uploadResult.skipped}</span> records.
										</p>
									</div>
									<button onClick={() => setUploadResult(null)} className="text-on-surface-variant hover:text-on-surface">
										<span className="material-symbols-outlined">close</span>
									</button>
								</div>
								{uploadResult.errors && uploadResult.errors.length > 0 && (
									<div className="mt-4 p-4 rounded-xl bg-error-container/10 border border-error/20 text-body-sm text-error max-h-48 overflow-y-auto custom-scrollbar">
										<h5 className="font-label-md text-label-md mb-2 flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">warning</span> Validation Warnings (e.g. SKU not found):</h5>
										<ul className="list-disc pl-5 space-y-1">
											{uploadResult.errors.map((err, idx) => (
												<li key={idx}>{err}</li>
											))}
										</ul>
									</div>
								)}
							</section>
						)}

						{preview && (
							<section className="mb-stack-xl">
								<div className="flex justify-between items-center mb-stack-md">
									<div>
										<h4 className="font-headline-md text-headline-md text-on-surface">Preview: {preview.filename}</h4>
										<p className="text-body-sm text-on-surface-variant mt-1">Showing first 5 rows</p>
									</div>
									<button onClick={() => setPreview(null)} className="text-on-surface-variant hover:text-on-surface">
										<span className="material-symbols-outlined">close</span>
									</button>
								</div>

								<div className="glass-card rounded-2xl overflow-hidden">
									<table className="w-full text-left border-collapse text-body-sm">
										<thead>
											<tr className="bg-surface-container-high/50">
												{preview.columns?.map((col, i) => (
													<th key={i} className="px-gutter py-3 font-label-sm text-label-sm text-on-surface-variant border-b border-white/5 uppercase tracking-wider">{col}</th>
												))}
											</tr>
										</thead>
										<tbody className="divide-y divide-white/5">
											{preview.rows.map((row, i) => (
												<tr key={i} className="hover:bg-white/[0.03] transition-colors">
													{preview.columns?.map((col, j) => (
														<td key={j} className="px-gutter py-3 text-on-surface-variant">{row[col]}</td>
													))}
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</section>
						)}

						<section>
							<div className="flex justify-between items-center mb-stack-md">
								<h4 className="font-headline-md text-headline-md text-on-surface">Upload History</h4>
							</div>

							{uploads.length === 0 ? (
								<div className="glass-card rounded-2xl p-12 text-center">
									<span className="material-symbols-outlined text-4xl text-on-surface-variant/40 block mb-4">folder_open</span>
									<p className="font-body-md text-on-surface-variant">No uploads yet. Upload a CSV file to get started.</p>
								</div>
							) : (
								<div className="glass-card rounded-2xl overflow-hidden">
									<table className="w-full text-left border-collapse">
										<thead>
											<tr className="bg-surface-container-high/50">
												<th className="px-gutter py-4 font-label-md text-label-md text-on-surface-variant border-b border-white/5 uppercase tracking-wider">Filename</th>
												<th className="px-gutter py-4 font-label-md text-label-md text-on-surface-variant border-b border-white/5 uppercase tracking-wider">Size</th>
												<th className="px-gutter py-4 font-label-md text-label-md text-on-surface-variant border-b border-white/5 uppercase tracking-wider">Date</th>
												<th className="px-gutter py-4 font-label-md text-label-md text-on-surface-variant border-b border-white/5 uppercase tracking-wider">Status</th>
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
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)}
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
