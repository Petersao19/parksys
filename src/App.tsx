import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import DashboardLayout from "./components/DashboardLayout"
import ProtectedRoute from "./components/ProtectedRoute"
import ActivePage from "./pages/ActivePage"
import VehiclesPage from "./pages/VehiclePage"
import ReportsPage from "./pages/ReportsPage"
import TarifasPage from "./pages/TarifasPage"
import UsuariosPage from "./pages/UsuariosPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="vehicles" element={<VehiclesPage />} />
          <Route path="active" element={<ActivePage />} />          
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<TarifasPage />} />
          
          <Route path="users" element={<UsuariosPage />} />
          
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <p className="text-4xl mb-4">🚧</p>
        <h2 className="text-gray-900 font-bold text-xl">{title}</h2>
        <p className="text-gray-500 text-sm mt-2">Próximamente — semana 2</p>
      </div>
    </div>
  )
}

export default App