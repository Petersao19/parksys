// Variantes de color del botón
const variants = {
  primary:  'bg-blue-600 hover:bg-blue-700 text-white',
  danger:   'bg-red-600  hover:bg-red-700  text-white',
  ghost:    'bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white border border-gray-700',
}

interface ButtonProps {
  label: string
  onClick?: () => void
  variant?: keyof typeof variants
  loading?: boolean   // muestra spinner si está cargando
  disabled?: boolean
  type?: 'button' | 'submit'
  className?: string
}

export default function Button({
  label,
  onClick,
  variant = 'primary',
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
        transition-colors disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${className}
      `}
    >
      {/* Spinner cuando está cargando */}
      {loading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {label}
    </button>
  )
}