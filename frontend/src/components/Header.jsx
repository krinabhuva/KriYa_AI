import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="brand">
          <img src={logo} alt="KriYaAI" />
          <span>KriYaAI</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/portal">Portal</Link>
          <Link to="/login" className="ml-4 px-3 py-1 rounded-full bg-primary text-on-primary font-medium hover:opacity-90">Sign In</Link>
        </nav>
      </div>
    </header>
  )
}
