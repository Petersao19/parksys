import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: "📊" },
  { path: "/vehicles", label: "Vehículos", icon: "🚗" },
  { path: "/active", label: "Activos", icon: "🅿️" },
  { path: "/reports", label: "Reportes", icon: "📈" },
  { path: "/settings", label: "Tarifas", icon: "⚙️" },
];

// Solo el admin ve esto
const adminItems = [{ path: "/users", label: "Usuarios", icon: "👥" }];
export default function Sidebar() {
  const { user } = useAuthStore();

  return (
    <aside className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Logo arriba */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm">ParkSys</p>
            <p className="text-gray-500 text-xs">Parqueadero</p>
          </div>
        </div>
      </div>

      {/* Links de navegación */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}

        {/* Sección admin — solo visible si role === 'admin' */}
        {user?.role === "admin" && (
          <>
            <div className="pt-4 pb-2">
              <p className="text-xs text-gray-600 font-semibold tracking-wider px-3">
                ADMINISTRACIÓN
              </p>
            </div>
            {adminItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </>
        )}
      </nav>

      {/* Usuario abajo */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">
              {user?.name}
            </p>
            <p className="text-gray-500 text-xs capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
