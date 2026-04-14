import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string  // permite agregar clases extra desde afuera
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm ${className}`}>
      {children}
    </div>
  )
}