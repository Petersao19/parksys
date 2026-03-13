// Los tipos de badge disponibles y su color correspondiente
const variants = {
  success: 'bg-green-950 text-green-400 border-green-800',
  danger:  'bg-red-950  text-red-400  border-red-800',
  warning: 'bg-yellow-950 text-yellow-400 border-yellow-800',
  info:    'bg-blue-950 text-blue-400 border-blue-800',
  gray:    'bg-gray-800 text-gray-400 border-gray-700',
}

interface BadgeProps {
  label: string
  variant?: keyof typeof variants  // solo acepta los tipos definidos arriba
}

export default function Badge({ label, variant = 'gray' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variants[variant]}`}>
      {label}
    </span>
  )
}