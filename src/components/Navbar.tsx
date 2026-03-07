import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">

      {/* Saludo */}
      <p className="text-gray-400 text-sm">
        Bienvenido, <span className="text-white font-semibold">{user?.name}</span>
      </p>

      {/* Botón cerrar sesión */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-gray-400 hover:text-red-400 text-sm transition-colors"
      >
        <span>Cerrar Sesión</span>
        <span>→</span>
      </button>

    </header>
  )
}