import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

export default function DashboardPage() {

  // Obtenemos el usuario logueado y la función logout del store
  const { user, logout } = useAuthStore()
  
  // useNavigate nos permite redirigir por código
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()                  // limpia user y token del store
    navigate('/login')        // manda al login
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">
          ¡Bienvenido, {user?.name}! 👋
        </h1>
        <p className="text-gray-400 mb-6">Rol: {user?.role}</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg text-sm font-semibold"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}