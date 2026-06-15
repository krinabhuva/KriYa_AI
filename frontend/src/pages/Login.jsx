import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const canvasRef = useRef(null)
  const starsRef = useRef([])
  const animRef = useRef(null)

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // ensure dark mode class for this page
    document.documentElement.classList.add('dark')
    // also add mesh-gradient class to body for background effect
    document.body.classList.add('mesh-gradient')

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
      const stars = []
      for (let i = 0; i < 220; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2.5,
          opacity: Math.random(),
          speed: (Math.random() * 0.08) - 0.04
        })
      }
    starsRef.current = stars

    function draw() {
      ctx.clearRect(0, 0, width, height)
      starsRef.current.forEach(star => {
        ctx.fillStyle = `rgba(207,188,255,${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        star.opacity += star.speed
        if (star.opacity > 1 || star.opacity < 0.1) star.speed *= -1
      })
      animRef.current = requestAnimationFrame(draw)
    }

    function onResize() {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      starsRef.current = []
        for (let i = 0; i < 220; i++) {
          starsRef.current.push({ x: Math.random() * width, y: Math.random() * height, size: Math.random() * 2.5, opacity: Math.random(), speed: (Math.random() * 0.08) - 0.04 })
        }
    }

    window.addEventListener('resize', onResize)
    draw()

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animRef.current)
      // cleanup page-specific classes
      document.body.classList.remove('mesh-gradient')
    }
  }, [])

  function handleSubmit() {
    setError('')
    if (!email) return setError('Please enter your email')
    if (!password) return setError('Please enter your password')
    setLoading(true)

    // Simulate authentication request
    setTimeout(() => {
      setLoading(false)
      const user = { email }
      try {
        if (remember) localStorage.setItem('user', JSON.stringify(user))
        else sessionStorage.setItem('user', JSON.stringify(user))
      } catch (e) {}
      // navigate to portal
      navigate('/portal')
    }, 1200)
  }

  return (
    <div className="bg-background text-on-surface font-body-md selection:bg-primary/30 min-h-screen flex flex-col items-center justify-center overflow-x-hidden mesh-gradient">
      <canvas ref={canvasRef} className="star-field fixed top-0 left-0 w-full h-full pointer-events-none z-0"></canvas>

      <main className="relative z-10 w-full max-w-[440px] px-lg py-xl">
        <div className="flex flex-col items-center mb-xl">
          <div className="mb-md">
            <img alt="Kriya Logo" className="h-12 w-auto" src="https://lh3.googleusercontent.com/aida/AP1WRLtEAj3jZYAvUh6bG_FIi6ekiNROrCsdisuXFOT9VL1XtmtYvGuckvdpAoeYiPPN2zJWfy7zq_CcKo6NIJKufD2yUR44nU_UAm_7wuBLxGKEStM0DyzcUVsoJJReO1v-1Y9fgBbxqItkEG8Z1cf_wHHhvNQDzkV8B9NOmuZTY9AAB1LVMNxyqMlpKGZiYOgomegmx8DE8S_hsjd6iXpxP8XSDeEsy2EolQdAk3E1zb-BdNB6tC9HNAOYIo6K" />
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Welcome Back</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Log in to your Kriya Analytics account</p>
        </div>

        <div className="relative p-[2px] rounded-xl overflow-hidden group">
          <div className="absolute inset-0 animate-border-shimmer-strong opacity-95 group-hover:opacity-100 transition-opacity"></div>
          <div className="glass-panel strong-shadow relative rounded-[12px] px-lg py-16 flex flex-col gap-lg">
              <form className="flex flex-col gap-lg" onSubmit={e => { e.preventDefault(); handleSubmit() }}>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant px-unit" htmlFor="email">Email Address</label>
                <div className="relative group/input">
                  <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within/input:text-primary transition-colors">mail</span>
                    <input id="email" placeholder="name@company.com" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-md pl-[44px] pr-md text-on-surface placeholder:text-outline-variant transition-all outline-none" />
                </div>
              </div>

              <div className="flex flex-col gap-xs">
                <div className="flex justify-between items-center px-unit">
                  <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">Password</label>
                  <a className="font-label-sm text-label-sm text-primary hover:text-primary-fixed-dim transition-colors" href="#">Forgot Password?</a>
                </div>
                <div className="relative group/input">
                  <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within/input:text-primary transition-colors">lock</span>
                  <input id="password" placeholder="••••••••" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-md pl-[44px] pr-md text-on-surface placeholder:text-outline-variant transition-all outline-none" />
                </div>
              </div>

              <div className="flex items-center gap-sm px-unit">
                <input id="remember" type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="w-4 h-4 rounded border-outline-variant bg-surface-container-low text-primary focus:ring-primary focus:ring-offset-surface" />
                <label className="font-label-md text-label-md text-on-surface-variant cursor-pointer select-none" htmlFor="remember">Keep me logged in</label>
              </div>

              {error && <div className="text-sm text-error mb-sm">{error}</div>}

              <button type="submit" disabled={loading} className={`w-full ${loading ? 'opacity-70 cursor-wait' : ''} bg-gradient-to-r from-primary-container to-secondary-container hover:from-primary hover:to-secondary text-on-primary-container font-label-md py-md rounded-lg shadow-lg active:scale-[0.98] transition-all flex justify-center items-center gap-sm`}>{loading ? 'Signing in...' : 'Login'} <span className="material-symbols-outlined text-[20px]">login</span></button>
            </form>

            
            {/* Sign in handler below */}

            <div className="flex items-center gap-md my-md">
              <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">or</span>
              <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
            </div>

            <button className="w-full glass-panel hover:bg-surface-variant/20 border border-outline-variant/50 text-on-surface font-label-md py-md rounded-lg transition-all flex justify-center items-center gap-md active:scale-[0.98]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center font-label-md text-label-md text-on-surface-variant mt-sm">Don't have an account? <a className="text-primary font-bold hover:underline underline-offset-4" href="#">Sign Up</a></p>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-lg text-center relative z-10">
        <p className="font-label-sm text-label-sm text-on-surface-variant opacity-60">© 2024 Kriya AI. All rights reserved. Secure Cloud Storage.</p>
      </footer>

      <style>{`@keyframes border-shimmer {0% {background-position: 0% 50%;}50% {background-position: 100% 50%;}100% {background-position: 0% 50%;}}.animate-border-shimmer {background-size:200% 200%;animation: border-shimmer 4s linear infinite;} .animate-border-shimmer-strong {background: linear-gradient(90deg, rgba(192,193,255,0.95) 0%, rgba(137,206,255,0.9) 50%, rgba(221,183,255,0.95) 100%); background-size:300% 100%; animation: border-shimmer 3.5s linear infinite;} .glass-panel {backdrop-filter: blur(28px); background: rgba(29,27,32,0.64); border: 1px solid rgba(255,255,255,0.08);} .strong-shadow {box-shadow: 0 20px 60px rgba(2,6,23,0.6), 0 0 40px rgba(128,131,255,0.06);} .mesh-gradient {background-color:#141218; background-image: radial-gradient(at 0% 0%, rgba(103,80,164,0.15) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(205,192,233,0.1) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(103,80,164,0.15) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(231,195,101,0.05) 0px, transparent 50%);} .star-field {position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0;}`}</style>
    </div>
  )
}
