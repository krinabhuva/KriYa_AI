import React, { useEffect } from "react";

export default function About_us() {
	useEffect(() => {
		const onScroll = () => {
			const scrolled = window.pageYOffset;
			const heroPulse = document.querySelector(".animate-pulse");
			if (heroPulse) heroPulse.style.transform = `translateY(${scrolled * 0.1}px)`;
		};

		window.addEventListener("scroll", onScroll);

		const groups = Array.from(document.querySelectorAll(".group"));
		groups.forEach((card) => {
			const onMove = (e) => {
				const rect = card.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;

				const centerX = rect.width / 2;
				const centerY = rect.height / 2;

				const rotateX = (y - centerY) / 20;
				const rotateY = (centerX - x) / 20;

				const img = card.querySelector("img");
				if (img) {
					img.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
				}
			};

			const onLeave = () => {
				const img = card.querySelector("img");
				if (img) {
					img.style.transform = `scale(1) rotateX(0) rotateY(0)`;
				}
			};

			card.addEventListener("mousemove", onMove);
			card.addEventListener("mouseleave", onLeave);

			// store handlers for cleanup
			card._onMove = onMove;
			card._onLeave = onLeave;
		});

		return () => {
			window.removeEventListener("scroll", onScroll);
			groups.forEach((card) => {
				if (card._onMove) card.removeEventListener("mousemove", card._onMove);
				if (card._onLeave) card.removeEventListener("mouseleave", card._onLeave);
			});
		};
	}, []);

	return (
		<>
			<style>{`
				.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
				.glass-card { background: rgba(23, 31, 51, 0.6); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); }
				.text-gradient-primary { background: linear-gradient(135deg, #c0c1ff 0%, #ddb7ff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
				.shimmer-btn { position: relative; overflow: hidden; }
				.shimmer-btn::after { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent); transform: rotate(45deg); animation: shimmer 3s infinite; }
				@keyframes shimmer { 0% { transform: translateX(-100%) rotate(45deg); } 100% { transform: translateX(100%) rotate(45deg); } }
				.timeline-line { background: linear-gradient(to bottom, #c0c1ff, #6f00be, transparent); }
			`}</style>

			<main className="pt-16">
				<nav className="fixed top-0 w-full bg-background/80 backdrop-blur-xl border-b border-white/10 z-50 shadow-sm">
					<div className="flex justify-between items-center h-16 px-margin-desktop max-w-container-max mx-auto">
						<div className="font-headline-md text-headline-md font-bold text-primary">Kriya</div>
						<div className="hidden md:flex items-center gap-stack-lg">
							<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Platform</a>
							<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Solutions</a>
							<a className="font-label-md text-label-md text-primary border-b-2 border-primary pb-1" href="#">About</a>
							<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Insights</a>
							<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Careers</a>
						</div>
						<div className="flex items-center gap-stack-md">
							<button className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200 px-4 py-2">Login</button>
							<button className="bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded-lg hover:opacity-90 transition-all">Get Started</button>
						</div>
					</div>
				</nav>

				{/* Hero Section */}
				<section className="relative min-h-[921px] flex items-center justify-center overflow-hidden px-margin-mobile md:px-margin-desktop">
					<div className="absolute inset-0 z-0">
						<div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10"></div>
						<div className="absolute inset-0 opacity-30">
							<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
							<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }}></div>
						</div>
					</div>

					<div className="relative z-20 max-w-4xl text-center space-y-stack-lg">
						<h1 className="font-display-lg text-display-lg md:text-[64px] leading-tight tracking-tight">
							Empowering <span className="text-gradient-primary">Human Intuition</span> with Artificial Intelligence.
						</h1>
						<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
							Kriya is on a mission to redefine enterprise decision-making by blending precision data science with high-fidelity executive insights.
						</p>
						<div className="flex flex-col sm:flex-row items-center justify-center gap-stack-md pt-stack-sm">
							<button className="shimmer-btn bg-primary text-on-primary font-label-md text-label-md px-8 py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2">
								Read Our Manifesto <span className="material-symbols-outlined">arrow_forward</span>
							</button>
						</div>
					</div>
				</section>

				{/* Impact Stats */}
				<section className="py-stack-xl border-y border-outline-variant/30 bg-surface-container-lowest/50 backdrop-blur-sm">
					<div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-stack-xl text-center">
						<div className="space-y-stack-xs">
							<div className="font-display-lg text-display-lg text-primary">500+</div>
							<div className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Global Enterprises</div>
						</div>
						<div className="space-y-stack-xs">
							<div className="font-display-lg text-display-lg text-secondary">$2.4B</div>
							<div className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Savings Predicted</div>
						</div>
						<div className="space-y-stack-xs">
							<div className="font-display-lg text-display-lg text-tertiary">99.9%</div>
							<div className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Model Accuracy</div>
						</div>
					</div>
				</section>

				{/* Our Story / Timeline */}
				<section className="py-stack-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
					<div className="flex flex-col md:flex-row gap-stack-xl">
						<div className="md:w-1/3 space-y-stack-md sticky top-24 h-fit">
							<div className="text-primary font-label-sm text-label-sm uppercase tracking-[0.2em]">The Journey</div>
							<h2 className="font-headline-lg text-headline-lg">From Research to <span className="text-primary italic">Global Leader</span>.</h2>
							<p className="font-body-md text-body-md text-on-surface-variant">
								Our origin story is rooted in a simple question: How can we make complex data speak the language of leadership?
							</p>
						</div>
						<div className="md:w-2/3 space-y-stack-xl relative pl-stack-lg">
							<div className="absolute left-0 top-0 bottom-0 w-[2px] timeline-line"></div>
							<div className="relative">
								<div className="absolute -left-[37px] top-2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-[0_0_15px_rgba(192,193,255,0.5)]"></div>
								<div className="glass-card p-stack-lg rounded-xl space-y-stack-sm">
									<span className="text-primary font-label-md text-label-md">2018</span>
									<h3 className="font-headline-md text-headline-md">The Genesis</h3>
									<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
										Kriya began as a joint research project at MIT, focused on bridging the gap between neural network complexity and human decision-making workflows.
									</p>
								</div>
							</div>
							<div className="relative">
								<div className="absolute -left-[37px] top-2 w-4 h-4 rounded-full bg-secondary border-4 border-background"></div>
								<div className="glass-card p-stack-lg rounded-xl space-y-stack-sm">
									<span className="text-secondary font-label-md text-label-md">2020</span>
									<h3 className="font-headline-md text-headline-md">Alpha Deployment</h3>
									<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
										Our first pilot programs with Fortune 500 financial institutions yielded a 40% improvement in market forecast accuracy, validating the Kriya Core engine.
									</p>
								</div>
							</div>
							<div className="relative">
								<div className="absolute -left-[37px] top-2 w-4 h-4 rounded-full bg-tertiary border-4 border-background"></div>
								<div className="glass-card p-stack-lg rounded-xl space-y-stack-sm">
									<span className="text-tertiary font-label-md text-label-md">Present Day</span>
									<h3 className="font-headline-md text-headline-md">Enterprise Intelligence</h3>
									<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
										Now operating at scale, Kriya powers real-time predictive analytics for global leaders across logistics, healthcare, and finance.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Core Values */}
				<section className="py-stack-xl bg-surface-container-low/30 px-margin-mobile md:px-margin-desktop">
					<div className="max-w-container-max mx-auto">
						<div className="text-center mb-stack-xl space-y-stack-sm">
							<h2 className="font-headline-lg text-headline-lg">Our Foundation</h2>
							<p className="text-on-surface-variant font-body-md text-body-md max-w-xl mx-auto">Operating at the intersection of technical excellence and ethical responsibility.</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
							<div className="glass-card p-stack-lg rounded-xl border-t-2 border-t-primary group hover:bg-surface-variant/40 transition-all duration-300">
								<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-stack-md">
									<span className="material-symbols-outlined text-primary text-3xl">rocket_launch</span>
								</div>
								<h4 className="font-headline-md text-headline-md mb-stack-sm">Innovation</h4>
								<p className="font-body-md text-body-md text-on-surface-variant">Pushing the boundaries of what's possible with generative intelligence and symbolic reasoning.</p>
							</div>
							<div className="glass-card p-stack-lg rounded-xl border-t-2 border-t-secondary group hover:bg-surface-variant/40 transition-all duration-300">
								<div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-stack-md">
									<span className="material-symbols-outlined text-secondary text-3xl">biotech</span>
								</div>
								<h4 className="font-headline-md text-headline-md mb-stack-sm">Precision</h4>
								<p className="font-body-md text-body-md text-on-surface-variant">Every data point matters. We eliminate noise to deliver high-fidelity signals that drive action.</p>
							</div>
							<div className="glass-card p-stack-lg rounded-xl border-t-2 border-t-tertiary group hover:bg-surface-variant/40 transition-all duration-300">
								<div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center mb-stack-md">
									<span className="material-symbols-outlined text-tertiary text-3xl">verified_user</span>
								</div>
								<h4 className="font-headline-md text-headline-md mb-stack-sm">Integrity</h4>
								<p className="font-body-md text-body-md text-on-surface-variant">Ethical AI for a better world. Transparency is baked into every model we deploy globally.</p>
							</div>
						</div>
					</div>
				</section>

				{/* The Team */}
				<section className="py-stack-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
					<div className="flex flex-col md:flex-row justify-between items-end mb-stack-xl gap-stack-md">
						<div className="space-y-stack-xs">
							<div className="text-primary font-label-sm text-label-sm uppercase tracking-widest">Leadership</div>
							<h2 className="font-headline-lg text-headline-lg">The Minds Behind the Machine.</h2>
						</div>
						<button className="font-label-md text-label-md text-primary flex items-center gap-2 hover:opacity-80 transition-opacity">
							Join the Team <span className="material-symbols-outlined text-sm">open_in_new</span>
						</button>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
						{[{
							name: 'Dr. Aris Thorne',
							role: 'Founder & CEO',
							src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpcWyOJWr9EDzlaEjhZpupn1KZ6j5-Jrw_Uo_th6C7bi03yuaoYXUeFBPE_t2SM1_Puex7ZpGVA2FEEiZXukkPi0Vai_pLenxajtK78Yx0oOcbevc1zYeP6ZSLS-VxQuNtVUqwPBWO0C7HtD7CKYSPXsg0jBOQowAG5avMQTdlYHPg_UqKCH1rFevjPw3Avab_2o57xij_FnTJjyU4Rl3dgHEXEM2K_Eg1dj4bBkSN1WNp6B1Rv5FoCjqXGemH9vKpU1nwvabVhA'
						},{
							name: 'Elena Vance',
							role: 'Chief Technology Officer',
							src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrKrN_6INcFDmE03mE43V_omWnGuVe7TEBB2EUODCtSEu0eiYPZbZTzsvRRCtMh_3IGdrLwbYwnQsXLRfosREUP10Me-TC6xeIOw82AtJA1VqFEPKA80_JC_IbBaEi80FKM5Lb-5HRThoByrq1bcXU7W4YjSU5DLYffGXB1KSppKfFgQYUZF_5BY2QFYgShwIVg9rWkiQjfiYXDIrTB6w4guEtJJ-u0-vyTdb70I4tDTP3mDIBhhJQrIcWksRwF8PSuBipAQZjHQ'
						},{
							name: 'Marcus Kael',
							role: 'Head of Research',
							src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWTG9NmzepPNwqE81jcV-xP-Oks1KzC-M7wZwXRtO7YYP7baeDRINcx9KkJ1QTapxjCCJfhT4egLH8Rxixz2E-nrb_QgZAq96kPDKocIlAluH5NHOhXoKcbi2vph1NAF1Q6Uosx2XCZhFYE3xdiIropLrzNA8iw1pezmNY5sbn5-aDDfiktm2FFJQT3TVRnJRl4jbh9Cfoar6z1o00Mf_e3_ks2sysx144GBBZnpwCAFac6ay0MvaTKNoBgaMkXbmobPfNXaXcrQ'
						},{
							name: 'Sarah Chen',
							role: 'Lead Product Design',
							src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqiPAmR8y3JzkOrpNQnaXDzdUq5VzlDz_vCp2EYe7OkOC6aIDWL-9EULCvkVNlY1hBbdK8kSZRwBLnRAi3B5cO6MJET9wMr8U4Q8c3YEv7Q2utKva_tttNWMppoAyHFLjBuViPEz7-QIWpyl3bxyrkz4o77g03yqW37WJFhdrU5bjdugIj19lg77LiRldNvOQydB14Pd-WleR4JIncNogc6t0x6d3mMFvI9x_Qqm7WQ2sfVw06S1rL1WR8pJ9XFqCrliT0du5Jww'
						}].map((m) => (
							<div key={m.name} className="group cursor-pointer">
								<div className="relative aspect-square rounded-2xl overflow-hidden mb-stack-md">
									<img alt={m.role} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={m.src} />
									<div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								</div>
								<div className="font-headline-md text-headline-md text-on-surface">{m.name}</div>
								<div className="font-label-md text-label-md text-on-surface-variant">{m.role}</div>
							</div>
						))}
					</div>
				</section>

				{/* CTA / Footer Transition */}
				<section className="py-stack-xl px-margin-mobile md:px-margin-desktop text-center relative overflow-hidden">
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[160px] -z-10"></div>
					<h2 className="font-display-lg text-display-lg mb-stack-md max-w-3xl mx-auto">Ready to see the future of <span className="text-primary">Intelligence</span>?</h2>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-stack-md">
						<button className="bg-primary text-on-primary font-label-md text-label-md px-10 py-4 rounded-xl hover:opacity-90 transition-all shadow-xl shadow-primary/20">Talk to an Expert</button>
						<button className="border border-outline-variant text-on-surface font-label-md text-label-md px-10 py-4 rounded-xl hover:bg-surface-variant transition-all">View the Platform</button>
					</div>
				</section>

				<footer className="w-full py-stack-lg border-t border-outline-variant bg-surface-container-lowest">
					<div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop max-w-container-max mx-auto gap-stack-md">
						<div className="flex flex-col md:flex-row items-center gap-stack-lg">
							<div className="font-label-md text-label-md font-bold text-on-surface">Kriya Analytics Inc.</div>
							<div className="flex gap-stack-md">
								<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-opacity" href="#">Privacy Policy</a>
								<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-opacity" href="#">Terms of Service</a>
								<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-opacity" href="#">Security</a>
								<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-opacity" href="#">Contact</a>
							</div>
						</div>
						<div className="font-body-sm text-body-sm text-on-surface-variant">© 2024 Kriya Analytics Inc. All rights reserved.</div>
					</div>
				</footer>
			</main>
		</>
	);
}
