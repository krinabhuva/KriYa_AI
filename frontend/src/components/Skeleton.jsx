import React from 'react'

export function SkeletonCard() {
  return <div className="glass-panel rounded-xl p-5 animate-pulse h-32 bg-surface-container-high/50" />
}

export function SkeletonTable() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-12 bg-surface-container-high/30 animate-pulse rounded-lg" />
      ))}
    </div>
  )
}
