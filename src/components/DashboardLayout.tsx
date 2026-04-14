import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

// Outlet = aquí React Router renderiza la página activa
// (Dashboard, Vehículos, Reportes, etc.)

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* Sidebar fijo a la izquierda */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar arriba */}
        <Navbar />

        {/* Página activa — cambia según la ruta */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>

      </div>
    </div>
  )
}