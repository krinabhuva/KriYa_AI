import React from 'react'

export default class ErrorBoundary extends React.Component {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) return (
      <div className="flex items-center justify-center h-screen bg-surface flex-col gap-4">
        <span className="material-symbols-outlined text-6xl text-error">error</span>
        <h2 className="font-headline-md text-on-surface">Something went wrong</h2>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-primary text-on-primary rounded-lg">Reload</button>
      </div>
    )
    return this.props.children
  }
}
