import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function About_us() {
	useEffect(() => {
		try {
			document.documentElement.classList.add('dark')
		} catch (e) {}

		const onScroll = () => {
			const scrolled = window.pageYOffset
			const heroPulse = document.querySelector('.animate-pulse')
			if (heroPulse) heroPulse.style.transform = `translateY(${scrolled * 0.1}px)`
		}

		window.addEventListener('scroll', onScroll)

		const groups = Array.from(document.querySelectorAll('.group'))
		groups.forEach((card) => {
			const onMove = (e) => {
				const rect = card.getBoundingClientRect()
				const x = e.clientX - rect.left
				const y = e.clientY - rect.top

				const centerX = rect.width / 2
				const centerY = rect.height / 2

				const rotateX = (y - centerY) / 20
				const rotateY = (centerX - x) / 20

				const img = card.querySelector('img')
				if (img) {
					img.style.transform = `scale(1.08) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
				}
			}

			const onLeave = () => {
				const img = card.querySelector('img')
				if (img) img.style.transform = `scale(1) rotateX(0) rotateY(0)`
			}

			card.addEventListener('mousemove', onMove)
			card.addEventListener('mouseleave', onLeave)

			card._onMove = onMove
			card._onLeave = onLeave
		})

		// ambient mouse glow from original HTML: append occasional glow elements
		const onMouseMove = (e) => {
			if (Math.random() > 0.995) {
				const glow = document.createElement('div')
				glow.className = 'fixed pointer-events-none w-64 h-64 bg-primary/5 blur-[100px] rounded-full z-[-1]'
				glow.style.left = e.clientX - 128 + 'px'
				glow.style.top = e.clientY - 128 + 'px'
				document.body.appendChild(glow)
				setTimeout(() => glow.remove(), 800)
			}
		}

		document.addEventListener('mousemove', onMouseMove)

		return () => {
			window.removeEventListener('scroll', onScroll)
			groups.forEach((card) => {
				if (card._onMove) card.removeEventListener('mousemove', card._onMove)
				if (card._onLeave) card.removeEventListener('mouseleave', card._onLeave)
			})
			document.removeEventListener('mousemove', onMouseMove)
		}
	}, [])

	return (
		<main className="bg-background text-on-background selection:bg-primary/30 selection:text-primary overflow-x-hidden">
			<header className="w-full sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm">
				<div className="max-w-container-max mx-auto px-margin-desktop flex items-center justify-between h-20">
					<div className="flex items-center gap-3">
						<img alt="Kriya Logo" className="w-10 h-10 object-contain" src="https://lh3.googleusercontent.com/aida/AP1WRLtjtWPHW8ulYifr8N6YCUVsEbR3VozIoeSfuhnii7_OrRVRhmppCqnlknTrFEzJIjIRRdE83sjnsAM79LMiRhas6Ro8In0nj3NtjW8OZlYXWULf1K8-OuHTkIuD10FvDwLMPwfsXZVteZkhABkQdCrI1ap56Xar5P-843UhAIjkPGNI4qoEFG1iRQIWoBkhyBmk38e5NBnu2BNgtlSox5fSkyDWjjHVlloPPTNtIqtGD_missm23185kJ5l" />
						<span className="font-headline-md text-headline-md font-bold text-primary">Kriya</span>
					</div>
					<nav className="hidden md:flex items-center gap-stack-lg">
						<Link to="#" className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">Platform</Link>
						<Link to="#" className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">Solutions</Link>
						<Link to="/about" className="font-body-md text-body-md text-primary font-bold border-b-2 border-primary pb-1">About</Link>
						<Link to="#" className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">Pricing</Link>
					</nav>
					<div className="flex items-center gap-stack-md">
						<Link to="/login" className="hidden lg:block font-label-md text-label-md px-6 py-2.5 rounded-full border border-primary text-primary hover:bg-primary/5 transition-all active:scale-95">Sign In</Link>
						<Link to="/portal" className="font-label-md text-label-md px-6 py-2.5 rounded-full bg-primary text-on-primary font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95">Get Started</Link>
					</div>
				</div>
			</header>

			{/* Hero (converted from provided HTML) */}
			<section className="relative pt-stack-xl pb-32 overflow-hidden">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full"></div>
					<div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[120px] rounded-full"></div>
				</div>
				<div className="max-w-container-max mx-auto px-margin-desktop relative z-10 text-center">
					<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container border border-outline-variant/30 mb-8">
						<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
						<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Our Journey</span>
					</div>
					<h1 className="font-display-lg text-display-lg md:text-[64px] md:leading-[72px] mb-8 max-w-4xl mx-auto tracking-tight">
						Engineering the Future of <span className="gradient-text">Intelligence</span>
					</h1>
					<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
						Kriya was born at the intersection of deep neural architecture and enterprise necessity. We are building the nervous system for the next generation of autonomous business operations.
					</p>
					<div className="flex flex-col md:flex-row items-center justify-center gap-4">
						<button className="w-full md:w-auto px-8 py-4 rounded-xl bg-primary text-on-primary font-bold font-label-md text-label-md shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all">
							Read Whitepaper
						</button>
						<button className="w-full md:w-auto px-8 py-4 rounded-xl glass-card text-on-surface font-bold font-label-md text-label-md transition-all">
							View Roadmap
						</button>
					</div>
				</div>
			</section>

			{/* Remaining sections condensed for brevity but preserved structure */}
			<section className="py-stack-xl bg-surface-container-lowest/50 border-y border-outline-variant/10">
				<div className="max-w-container-max mx-auto px-margin-desktop">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<div>
							<h2 className="font-headline-lg text-headline-lg mb-6">Our Mission</h2>
							<p className="font-display-lg text-[40px] leading-[48px] font-bold text-on-surface mb-8">To democratize <span className="text-primary">institutional-grade</span> predictive analytics for every enterprise.</p>
							<p className="font-body-md text-body-md text-on-surface-variant mb-6">We believe that sophisticated AI shouldn't be locked behind the gates of a few tech giants. Kriya provides the tools, the scale, and the precision required for any organization to transform raw data into definitive strategic advantages.</p>
							<div className="flex gap-8">
								<div>
									<div className="font-display-lg text-display-lg text-primary">500M+</div>
									<div className="font-label-sm text-label-sm text-on-surface-variant">Predictions Daily</div>
								</div>
								<div>
									<div className="font-display-lg text-display-lg text-tertiary">99.9%</div>
									<div className="font-label-sm text-label-sm text-on-surface-variant">Precision Rate</div>
								</div>
							</div>
						</div>
						<div className="relative group">
							<div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-50 transition-opacity group-hover:opacity-80"></div>
							<div className="relative glass-card rounded-3xl overflow-hidden aspect-video">
								<img className="w-full h-full object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwAstC_kPo4uCgSh9b7OIRZh_qR-oej9s0jlEFQJycEWlTN3zJyujiFwYaNbE1MEFuO3e4K-Y_3LRbKUu_4nkWlw7w6BBlyH0Bb-NIiH93G3PDR8NPeXn6OPnh3NZAoZgFmJLEcLvCmntPqrFiimABPFIP1eIWeNphF1GibKnP1x23hoRhNwUAVShP8c-k2o6318Ov6x913OFXQUi1sc6841Obo0UoKN7rwZZNIPI7njmWRRSqEHfqEUbEKnU4TNZKMOSkRZGkVTtu" alt="server room" />
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-stack-xl">
				<div className="max-w-container-max mx-auto px-margin-desktop">
					<div className="mb-16 text-center">
						<h2 className="font-headline-lg text-headline-lg mb-4">Core Values</h2>
						<p className="font-body-md text-body-md text-on-surface-variant">The principles that guide every line of code we write.</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
						<div className="glass-card rounded-3xl p-8 flex flex-col items-start gap-6 border-t-2 border-t-primary">
							<div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
								<span className="material-symbols-outlined text-4xl">target</span>
							</div>
							<div>
								<h3 className="font-headline-md text-headline-md mb-3">Precision</h3>
								<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">In the world of high-stakes enterprise decisions, close enough isn't good enough. We obsess over the accuracy of our models to ensure your results are beyond reproach.</p>
							</div>
						</div>
						<div className="glass-card rounded-3xl p-8 flex flex-col items-start gap-6 border-t-2 border-t-tertiary">
							<div className="w-14 h-14 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary">
								<span className="material-symbols-outlined text-4xl">auto_awesome</span>
							</div>
							<div>
								<h3 className="font-headline-md text-headline-md mb-3">Innovation</h3>
								<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">We don't just follow industry standards; we set them. Our R&D team is constantly pushing the boundaries of what generative and predictive AI can achieve for business logic.</p>
							</div>
						</div>
						<div className="glass-card rounded-3xl p-8 flex flex-col items-start gap-6 border-t-2 border-t-secondary">
							<div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
								<span className="material-symbols-outlined text-4xl">verified_user</span>
							</div>
							<div>
								<h3 className="font-headline-md text-headline-md mb-3">Integrity</h3>
								<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">AI ethics are not an afterthought. We build transparency into our platform, ensuring that every insight is explainable, secure, and compliant with global standards.</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-stack-xl bg-surface-container-low/30">
				<div className="max-w-container-max mx-auto px-margin-desktop">
					<div className="mb-16">
						<h2 className="font-headline-lg text-headline-lg mb-4">The Minds Behind Kriya</h2>
						<p className="font-body-md text-body-md text-on-surface-variant max-w-xl">A world-class team of engineers, data scientists, and strategists dedicated to redefining intelligence.</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
						{[{
							name: 'Adrian Thorne', role: 'Founder & CEO', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDk-zgBlaDUAaukkmisjPPJx4CVOM4cT_byCJa1hgDO8EeLEGGpkH02BRW2PNTpDUvTqON0wl5oxCyAcXttcfdxPg3VJqXiqqHFoX2j4vjukrI7dqrnHHxjRr-SRKaa1yjNXkxkeFxIQ9N94F7pawjx1LSz_8dv2uEjc6z8pB-xe1d88i10JUk68nqkJxfIp1UFUYmAo6fZhIyOpcHv8wEpVIrS07FmhYUtbgA3z3do6P6eNqC-GpzUaG7YVYbDylkeOz9ahK8KY09f'
						},{
							name: 'Dr. Elena Volkov', role: 'Co-Founder & CTO', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9uYptbk4VvHJ_DW9TEq0P7Ya65ow_wbuuKqC_PtYuph-0HUoAz5EuTdjHPWVzHZJnc_N2r97t989nndmebeNQ3f5paBc3nJW6_ZKYUKTStha2zhoO3LJkWRPaqtxVrovMR2abcl50KDNuXJf9EU9AKOw-ax6InCdSYjEa3hSEJNTYhCklCnXz6St50HohjAiE1ZflTwHQgriBp1WDJD71cOuaXEcweBMZjDaSU-BRxA3a9Dq0D0Az1ijJvoQXpUDZYRcuT_ZFu_0C'
						},{
							name: 'Julian Chen', role: 'Lead AI Architect', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7x_5B1hVzU5UqivLJ1BcZ18NvZUGZ4mdeOKbfwYGD-R-eEt2XhwI4s6VHPDOBIKahLQMOYUtHW_LZEwg-FM7tgi_dQ-fkOG5EcZxOKdyxT97cgY_FrYq495OiWAF1i4cVkNfzDeg5i87OyR-LD1lfZe6TqqS2VWg1XKxL1FYd6dZSRv3-Igh2KzTTmhKRNDr7yzWrJlyRdiiGUp5gM3fVWCmUKuwsVjq2wZn9Fc3wmEYoXO8By1XtCzzlNyIP_Xr9vCtyjAkWUWih'
						}].map((m) => (
							<div key={m.name} className="group">
								<div className="relative mb-6 rounded-3xl overflow-hidden aspect-[4/5] bg-surface-container-highest">
									<img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src={m.src} alt={m.name} />
									<div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
									<div className="absolute bottom-6 left-6">
										<p className="font-label-sm text-label-sm text-primary mb-1">{m.role}</p>
										<h4 className="font-headline-md text-headline-md text-on-surface">{m.name}</h4>
									</div>
								</div>
								<p className="font-body-sm text-body-sm text-on-surface-variant">Short bio about {m.name}.</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-stack-xl overflow-hidden relative">
				<div className="max-w-container-max mx-auto px-margin-desktop relative z-10 text-center">
					<div className="glass-card rounded-[40px] p-16 md:p-24 ai-shimmer">
						<h2 className="font-display-lg text-display-lg mb-8">Ready to join the journey?</h2>
						<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">We are looking for partners and visionaries ready to deploy the future of enterprise intelligence. Let's build something extraordinary together.</p>
						<div className="flex flex-col md:flex-row items-center justify-center gap-6">
							<button className="w-full md:w-auto px-10 py-5 rounded-2xl bg-primary text-on-primary font-bold font-headline-md text-headline-md shadow-2xl shadow-primary/30 hover:scale-105 transition-all">Get Early Access</button>
							<button className="w-full md:w-auto px-10 py-5 rounded-2xl border border-outline-variant text-on-surface font-bold font-headline-md text-headline-md hover:bg-surface-variant/30 transition-all">Contact Partnerships</button>
						</div>
					</div>
				</div>
			</section>

			<footer className="w-full py-stack-xl bg-surface-container-lowest border-t border-outline-variant/10">
				<div className="max-w-container-max mx-auto px-margin-desktop">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg mb-stack-xl">
						<div>
							<div className="flex items-center gap-3 mb-6">
								<img alt="Kriya Logo" className="w-8 h-8 object-contain" src="https://lh3.googleusercontent.com/aida/AP1WRLtjtWPHW8ulYifr8N6YCUVsEbR3VozIoeSfuhnii7_OrRVRhmppCqnlknTrFEzJIjIRRdE83sjnsAM79LMiRhas6Ro8In0nj3NtjW8OZlYXWULf1K8-OuHTkIuD10FvDwLMPwfsXZVteZkhABkQdCrI1ap56Xar5P-843UhAIjkPGNI4qoEFG1iRQIWoBkhyBmk38e5NBnu2BNgtlSox5fSkyDWjjHVlloPPTNtIqtGD_missm23185kJ5l" />
								<span className="font-headline-md text-headline-md font-bold text-primary">Kriya</span>
							</div>
							<p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-8">The definitive intelligence platform for the modern enterprise. Built for scale, engineered for precision.</p>
							<div className="flex gap-4">
								<a className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#"><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
								<a className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#"><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg></a>
								<a className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#"><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"></path></svg></a>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-8">
							<div className="flex flex-col gap-4">
								<h5 className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-widest">Platform</h5>
								<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Features</a>
								<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Enterprise</a>
								<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Security</a>
								<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Case Studies</a>
							</div>
							<div className="flex flex-col gap-4">
								<h5 className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-widest">Company</h5>
								<Link to="/about" className="font-body-sm text-body-sm text-primary underline">About Us</Link>
								<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Careers</a>
								<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Contact</a>
								<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Legal</a>
							</div>
						</div>
					</div>
					<div className="pt-8 border-t border-outline-variant/5 flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="font-body-sm text-body-sm text-on-surface-variant/60">© 2024 Kriya AI. All rights reserved. Precision intelligence for the enterprise.</p>
						<div className="flex gap-6">
							<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Privacy Policy</a>
							<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Terms of Service</a>
							<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Security</a>
							<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Contact Us</a>
						</div>
					</div>
				</div>
			</footer>
		</main>
	)
}
