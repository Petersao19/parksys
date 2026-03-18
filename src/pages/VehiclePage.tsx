import { useState, useMemo } from "react";
import { useVehicleStore } from "../store/vehicleStore";
import type { Vehicle, VehicleFormData, VehicleType } from "../types/vehicle";
import VehicleModal from "../components/vehicles/VehicleModal";

// Icono y color según el tipo de vehículo
const TIPO_CONFIG: Record<VehicleType, { icon: string; color: string; label: string }> = {
  auto: { icon: "🚗", color: "bg-blue-500/20 text-blue-400", label: "Auto" },
  moto: { icon: "🏍️", color: "bg-yellow-500/20 text-yellow-400", label: "Moto" },
  camion: { icon: "🚛", color: "bg-orange-500/20 text-orange-400", label: "Camión" },
};

export default function VehiclesPage() {
  // Datos y acciones del store global
  const { vehicles, addVehicle, updateVehicle, toggleVehicle } = useVehicleStore();

  // Estado del modal: null = cerrado, undefined = crear, Vehicle = editar
  const [modalVehicle, setModalVehicle] = useState<Vehicle | null | undefined>(undefined);

  // Estado de búsqueda y filtros
  const [search, setSearch] = useState("");
  const [filterTipo, setFilterTipo] = useState<VehicleType | "todos">("todos");
  const [filterEstado, setFilterEstado] = useState<"activos" | "inactivos" | "todos">("activos");

  // Estado para confirmar cambio de estado
  const [toggleId, setToggleId] = useState<string | null>(null);

  // Filtra los vehículos según búsqueda, tipo y estado activo/inactivo
  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      const matchSearch =
        v.placa.toLowerCase().includes(search.toLowerCase()) ||
        v.marca.toLowerCase().includes(search.toLowerCase()) ||
        v.modelo.toLowerCase().includes(search.toLowerCase());

      const matchTipo = filterTipo === "todos" || v.tipo === filterTipo;

      // Filtra por estado activo/inactivo
      const matchEstado =
        filterEstado === "todos" ||
        (filterEstado === "activos" && v.activo) ||
        (filterEstado === "inactivos" && !v.activo);

      return matchSearch && matchTipo && matchEstado;
    });
  }, [vehicles, search, filterTipo, filterEstado]);

  // Maneja el submit del modal (crear o editar según contexto)
  const handleSubmit = (data: VehicleFormData) => {
    if (modalVehicle) {
      updateVehicle(modalVehicle.id, data);
    } else {
      addVehicle(data);
    }
    setModalVehicle(undefined);
  };

  // Confirma y ejecuta el cambio de estado activo/inactivo
  const handleToggle = (id: string) => {
    toggleVehicle(id);
    setToggleId(null);
  };

  // Busca el vehículo que se va a desactivar para mostrar su placa en el modal
  const vehicleToToggle = vehicles.find((v) => v.id === toggleId);

  return (
    <div className="p-6 space-y-6">
      {/* Encabezado de la página */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">Vehículos</h1>
          <p className="text-gray-400 text-sm mt-1">
            {vehicles.filter((v) => v.activo).length} activo
            {vehicles.filter((v) => v.activo).length !== 1 ? "s" : ""} ·{" "}
            {vehicles.filter((v) => !v.activo).length} inactivo
            {vehicles.filter((v) => !v.activo).length !== 1 ? "s" : ""}
          </p>
        </div>
        {/* Botón para abrir el modal de nuevo vehículo */}
        <button
          onClick={() => setModalVehicle(null)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <span>＋</span> Nuevo vehículo
        </button>
      </div>

      {/* Barra de búsqueda y filtro por tipo */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Buscar por placa, marca o modelo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2.5 border border-gray-700 focus:border-blue-500 focus:outline-none placeholder-gray-500"
        />
        {/* Filtro por tipo de vehículo */}
        <select
          value={filterTipo}
          onChange={(e) => setFilterTipo(e.target.value as VehicleType | "todos")}
          className="bg-gray-800 text-white rounded-lg px-4 py-2.5 border border-gray-700 focus:border-blue-500 focus:outline-none"
        >
          <option value="todos">Todos los tipos</option>
          <option value="auto">Auto</option>
          <option value="moto">Moto</option>
          <option value="camion">Camión</option>
        </select>
        {/* Filtro por estado activo/inactivo */}
        <select
          value={filterEstado}
          onChange={(e) => setFilterEstado(e.target.value as "activos" | "inactivos" | "todos")}
          className="bg-gray-800 text-white rounded-lg px-4 py-2.5 border border-gray-700 focus:border-blue-500 focus:outline-none"
        >
          <option value="activos">Activos</option>
          <option value="inactivos">Inactivos</option>
          <option value="todos">Todos</option>
        </select>
      </div>

      {/* Tabla de vehículos */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        {filtered.length === 0 ? (
          // Estado vacío cuando no hay resultados
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-4xl mb-3">🚗</p>
            <p className="text-white font-medium">No hay vehículos</p>
            <p className="text-gray-500 text-sm mt-1">
              {search || filterTipo !== "todos"
                ? "Intenta con otros filtros"
                : "Registra el primer vehículo"}
            </p>
          </div>
        ) : (
          <table className="w-full">
            {/* Encabezados de la tabla */}
            <thead className="border-b border-gray-700">
              <tr>
                {["Tipo", "Placa", "Marca", "Modelo", "Color", "Estado", "Acciones"].map((h) => (
                  <th
                    key={h}
                    className="text-left text-gray-400 text-sm font-medium px-4 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filtered.map((vehicle) => {
                const tipoConfig = TIPO_CONFIG[vehicle.tipo];
                return (
                  <tr
                    key={vehicle.id}
                    className={`hover:bg-gray-700/30 transition-colors ${!vehicle.activo ? "opacity-50" : ""}`}
                  >
                    {/* Badge de tipo con icono */}
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${tipoConfig.color}`}
                      >
                        {tipoConfig.icon} {tipoConfig.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white font-mono font-medium">
                      {vehicle.placa}
                    </td>
                    <td className="px-4 py-3 text-gray-300">{vehicle.marca}</td>
                    <td className="px-4 py-3 text-gray-300">{vehicle.modelo}</td>
                    <td className="px-4 py-3 text-gray-300">{vehicle.color}</td>

                    {/* Badge de estado activo/inactivo */}
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          vehicle.activo
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {vehicle.activo ? "● Activo" : "○ Inactivo"}
                      </span>
                    </td>

                    {/* Botones editar y activar/desactivar */}
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setModalVehicle(vehicle)}
                          className="text-blue-400 hover:text-blue-300 text-sm transition-colors px-2 py-1 rounded hover:bg-blue-500/10"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => setToggleId(vehicle.id)}
                          className={`text-sm transition-colors px-2 py-1 rounded ${
                            vehicle.activo
                              ? "text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10"
                              : "text-green-400 hover:text-green-300 hover:bg-green-500/10"
                          }`}
                        >
                          {vehicle.activo ? "Desactivar" : "Activar"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal de crear/editar — solo se monta cuando está abierto */}
      {modalVehicle !== undefined && (
        <VehicleModal
          vehicle={modalVehicle}
          onClose={() => setModalVehicle(undefined)}
          onSubmit={handleSubmit}
        />
      )}

      {/* Modal de confirmación para activar/desactivar */}
      {toggleId && vehicleToToggle && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-sm w-full border border-gray-700 shadow-2xl">
            <p className="text-4xl text-center mb-3">
              {vehicleToToggle.activo ? "⚠️" : "✅"}
            </p>
            <h3 className="text-white font-bold text-center text-lg">
              {vehicleToToggle.activo ? "¿Desactivar vehículo?" : "¿Activar vehículo?"}
            </h3>
            <p className="text-gray-400 text-sm text-center mt-2">
              <span className="text-white font-mono">{vehicleToToggle.placa}</span>
              {vehicleToToggle.activo
                ? " pasará a estado inactivo. El registro se conserva."
                : " volverá a estar disponible en el sistema."}
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setToggleId(null)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg py-2.5 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleToggle(toggleId)}
                className={`flex-1 text-white rounded-lg py-2.5 transition-colors ${
                  vehicleToToggle.activo
                    ? "bg-yellow-600 hover:bg-yellow-500"
                    : "bg-green-600 hover:bg-green-500"
                }`}
              >
                {vehicleToToggle.activo ? "Desactivar" : "Activar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}