import { useState } from "react";
import { useRecordStore } from "../store/recordStore";
import { useVehicleStore } from "../store/vehicleStore";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import type { ParkingRecord } from "../types/record";

export default function ActivePage() {
  const { records, registerEntry, registerExit, getActiveRecords } =
    useRecordStore();
  const { vehicles } = useVehicleStore();

  // Placa que el usuario escribe para registrar entrada
  const [placa, setPlaca] = useState("");
  const [error, setError] = useState("");

  // Solo los vehículos que están adentro ahora
  const activeRecords = getActiveRecords();

  // ID del record al que se va a registrar salida
  const [exitId, setExitId] = useState<string | null>(null);

  const handleEntry = () => {
    if (!placa.trim()) {
      setError("Ingresa una placa");
      return;
    }

    // Busca el vehículo por placa
    const vehicle = vehicles.find(
      (v) => v.placa.toLowerCase() === placa.trim().toLowerCase(),
    );

    if (!vehicle) {
      setError("Vehículo no encontrado — regístralo primero en Vehículos");
      return;
    }

    if (!vehicle.activo) {
      setError("Este vehículo está inactivo en el sistema");
      return;
    }

    // Verifica que no esté ya adentro
    const yaAdentro = activeRecords.find((r:ParkingRecord) => r.vehicleId === vehicle.id);
    if (yaAdentro) {
      setError("Este vehículo ya está registrado adentro");
      return;
    }

    registerEntry(vehicle.id, vehicle.placa, vehicle.tipo);
    setPlaca("");
    setError("");
  };

  const handleExit = (recordId: string) => {
    registerExit(recordId);
    setExitId(null);
  };

  // Busca el record para mostrar el resumen de cobro
  const recordToExit = records.find((r:ParkingRecord) => r.id === exitId);

  return (
    <div className="p-6 space-y-6">
      {/* Título */}
      <div>
        <h1 className="text-white text-2xl font-bold">Activos</h1>
        <p className="text-gray-400 text-sm mt-1">
          {activeRecords.length} vehículo{activeRecords.length !== 1 ? "s" : ""}{" "}
          en el parqueadero ahora
        </p>
      </div>

      {/* Formulario de entrada */}
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
        <h2 className="text-white font-semibold mb-4">Registrar Entrada</h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={placa}
            onChange={(e) => {
              setPlaca(e.target.value.toUpperCase());
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleEntry()}
            placeholder="Ej: ABC-1234"
            className="flex-1 bg-gray-900 text-white rounded-lg px-4 py-2.5 border border-gray-700 focus:border-blue-500 focus:outline-none placeholder-gray-500 font-mono uppercase"
          />
          <button
            onClick={handleEntry}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors"
          >
            Registrar entrada
          </button>
        </div>
        {/* Error de validación */}
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>

      {/* Lista de vehículos activos */}
      {activeRecords.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-4xl mb-3">🅿️</p>
          <p className="text-white font-medium">Parqueadero vacío</p>
          <p className="text-gray-500 text-sm mt-1">
            Registra la entrada de un vehículo
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {activeRecords.map((record:ParkingRecord) => (
            <div
              key={record.id}
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {/* Icono por tipo */}
                <div className="text-3xl">
                  {record.tipo === "auto"
                    ? "🚗"
                    : record.tipo === "moto"
                      ? "🏍️"
                      : "🚛"}
                </div>
                <div>
                  <p className="text-white font-mono font-bold text-lg">
                    {record.placa}
                  </p>
                  <p className="text-gray-400 text-sm capitalize">
                    {record.tipo}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Entró{" "}
                    {formatDistanceToNow(new Date(record.entryTime), {
                      addSuffix: true,
                      locale: es,
                    })}
                  </p>
                </div>
              </div>

              {/* Botón de salida */}
              <button
                onClick={() => setExitId(record.id)}
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Registrar Salida
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal de confirmación de salida con cobro */}
      {exitId && recordToExit && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-sm w-full border border-gray-700">
            <p className="text-4xl text-center mb-3">🏁</p>
            <h3 className="text-white font-bold text-center text-lg">
              Confirmar Salida
            </h3>
            <p className="text-gray-400 text-sm text-center mt-2">
              ¿Registrar salida de{" "}
              <span className="text-white font-mono font-bold">
                {recordToExit.placa}
              </span>
              ?
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setExitId(null)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg py-2.5 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleExit(exitId)}
                className="flex-1 bg-green-600 hover:bg-green-500 text-white rounded-lg py-2.5 font-semibold transition-colors"
              >
                Confirmar salida
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
