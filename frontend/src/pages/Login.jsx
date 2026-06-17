import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function Login() {
  const canvasRef = useRef(null)
  const starsRef = useRef([])
  const animRef = useRef(null)

  const navigate = useNavigate()

  const [isRegister, setIsRegister] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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

  async function handleSubmit() {
    setError('')
    setSuccess('')
    if (!username) return setError('Please enter a username')
    if (isRegister && !email) return setError('Please enter your email')
    if (isRegister && !fullName) return setError('Please enter your full name')
    if (!password) return setError('Please enter your password')
    
    setLoading(true)

    try {
      if (isRegister) {
        await api.register(username, email, fullName, password);
        setSuccess('Registration successful! Please log in.');
        setIsRegister(false);
        setPassword('');
      } else {
        await api.login(username, password, remember);
        navigate('/portal');
      }
    } catch (e) {
      setError(e.message || 'Authentication failed. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-background text-on-surface font-body-md selection:bg-primary/30 min-h-screen flex flex-col items-center justify-center overflow-x-hidden mesh-gradient">
      <canvas ref={canvasRef} className="star-field fixed top-0 left-0 w-full h-full pointer-events-none z-0"></canvas>

      <main className="relative z-10 w-full max-w-[440px] px-lg py-xl">
        <div className="flex flex-col items-center mb-xl">
          <div className="mb-md">
            <img alt="Kriya Logo" className="h-12 w-auto" src="https://lh3.googleusercontent.com/aida/AP1WRLtEAj3jZYAvUh6bG_FIi6ekiNROrCsdisuXFOT9VL1XtmtYvGuckvdpAoeYiPPN2zJWfy7zq_CcKo6NIJKufD2yUR44nU_UAm_7wuBLxGKEStM0DyzcUVsoJJReO1v-1Y9fgBbxqItkEG8Z1cf_wHHhvNQDzkV8B9NOmuZTY9AAB1LVMNxyqMlpKGZiYOgomegmx8DE8S_hsjd6iXpxP8XSDeEsy2EolQdAk3E1zb-BdNB6tC9HNAOYIo6K" />
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            {isRegister ? 'Sign up for a Kriya Analytics account' : 'Log in to your Kriya Analytics account'}
          </p>
        </div>

        <div className="relative p-[2px] rounded-xl overflow-hidden group">
          <div className="absolute inset-0 animate-border-shimmer-strong opacity-95 group-hover:opacity-100 transition-opacity"></div>
          <div className="glass-panel strong-shadow relative rounded-[12px] px-lg py-12 flex flex-col gap-lg font-body-md">
            {error && <div className="text-sm bg-error/10 border border-error/20 text-error p-3 rounded-lg">{error}</div>}
            {success && <div className="text-sm bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-lg">{success}</div>}

            <form className="flex flex-col gap-lg" onSubmit={e => { e.preventDefault(); handleSubmit() }}>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant px-unit" htmlFor="username">Username</label>
                <div className="relative group/input">
                  <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within/input:text-primary transition-colors">person</span>
                  <input id="username" placeholder="e.g. admin" type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-md pl-[44px] pr-md text-on-surface placeholder:text-outline-variant transition-all outline-none" />
                </div>
              </div>

              {isRegister && (
                <>
                  <div className="flex flex-col gap-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant px-unit" htmlFor="email">Email Address</label>
                    <div className="relative group/input">
                      <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within/input:text-primary transition-colors">mail</span>
                      <input id="email" placeholder="name@company.com" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-md pl-[44px] pr-md text-on-surface placeholder:text-outline-variant transition-all outline-none" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant px-unit" htmlFor="fullName">Full Name</label>
                    <div className="relative group/input">
                      <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within/input:text-primary transition-colors">badge</span>
                      <input id="fullName" placeholder="Alexander Pierce" type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-md pl-[44px] pr-md text-on-surface placeholder:text-outline-variant transition-all outline-none" />
                    </div>
                  </div>
                </>
              )}

              <div className="flex flex-col gap-xs">
                <div className="flex justify-between items-center px-unit">
                  <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">Password</label>
                  {!isRegister && <a className="font-label-sm text-label-sm text-primary hover:text-primary-fixed-dim transition-colors" href="#">Forgot Password?</a>}
                </div>
                <div className="relative group/input">
                  <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within/input:text-primary transition-colors">lock</span>
                  <input id="password" placeholder="••••••••" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-md pl-[44px] pr-md text-on-surface placeholder:text-outline-variant transition-all outline-none" />
                </div>
              </div>

              {!isRegister && (
                <div className="flex items-center gap-sm px-unit">
                  <input id="remember" type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="w-4 h-4 rounded border-outline-variant bg-surface-container-low text-primary focus:ring-primary focus:ring-offset-surface" />
                  <label className="font-label-md text-label-md text-on-surface-variant cursor-pointer select-none" htmlFor="remember">Keep me logged in</label>
                </div>
              )}

              <button type="submit" disabled={loading} className={`w-full ${loading ? 'opacity-70 cursor-wait' : ''} bg-gradient-to-r from-primary-container to-secondary-container hover:from-primary hover:to-secondary text-on-primary-container font-label-md py-md rounded-lg shadow-lg active:scale-[0.98] transition-all flex justify-center items-center gap-sm`}>
                {loading ? (isRegister ? 'Creating Account...' : 'Signing in...') : (isRegister ? 'Register' : 'Login')}
                <span className="material-symbols-outlined text-[20px]">{isRegister ? 'person_add' : 'login'}</span>
              </button>
            </form>

            <div className="flex items-center gap-md my-md">
              <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">or</span>
              <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
            </div>

            <button onClick={() => {
              // Set mock admin credentials for quick testing
              setUsername('admin');
              setPassword('admin123');
              setSuccess('Autofilled admin credentials');
            }} className="w-full glass-panel hover:bg-surface-variant/20 border border-outline-variant/50 text-on-surface font-label-md py-md rounded-lg transition-all flex justify-center items-center gap-md active:scale-[0.98]">
              <span className="material-symbols-outlined">key</span>
              Autofill Admin Credentials
            </button>

            <p className="text-center font-label-md text-label-md text-on-surface-variant mt-sm">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}
              <button type="button" onClick={() => { setIsRegister(!isRegister); setError(''); setSuccess('') }} className="text-primary font-bold hover:underline ml-1 underline-offset-4 bg-transparent border-none p-0 cursor-pointer">
                {isRegister ? 'Log In' : 'Sign Up'}
              </button>
            </p>
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
