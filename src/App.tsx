import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import VehiclesPage from "./pages/VehiclePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas — todas usan el mismo layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* RUTASSSS Páginas hijas — se renderizan en el Outlet */}
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="vehicles" element={<VehiclesPage />} />
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="active" element={<ComingSoon title="Activos" />} />
          <Route path="reports" element={<ComingSoon title="Reportes" />} />
          <Route path="settings" element={<ComingSoon title="Tarifas" />} />
          <Route path="users" element={<ComingSoon title="Usuarios" />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <p className="text-4xl mb-4">🚧</p>
        <h2 className="text-white font-bold text-xl">{title}</h2>
        <p className="text-gray-500 text-sm mt-2">Próximamente — semana 2</p>
      </div>
    </div>
  );
}

export default App;
