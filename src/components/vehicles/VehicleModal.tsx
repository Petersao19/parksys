import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Vehicle, VehicleFormData, VehicleType } from "../../types/vehicle";

interface VehicleModalProps {
  vehicle: Vehicle | null; // null = modo crear, Vehicle = modo editar
  onClose: () => void;
  onSubmit: (data: VehicleFormData) => void;
}

// Opciones de tipo de vehículo para el select
const VEHICLE_TYPES: { value: VehicleType; label: string }[] = [
  { value: "auto", label: "Auto" },
  { value: "moto", label: "Moto" },
  { value: "camion", label: "Camión" },
];

export default function VehicleModal({
  vehicle,
  onClose,
  onSubmit,
}: VehicleModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleFormData>();

  // Si viene un vehículo, precarga el formulario con sus datos (modo editar)
  useEffect(() => {
    if (vehicle) {
      reset({
        placa: vehicle.placa,
        marca: vehicle.marca,
        modelo: vehicle.modelo,
        color: vehicle.color,
        tipo: vehicle.tipo,
      });
    } else {
      reset({ placa: "", marca: "", modelo: "", color: "", tipo: "auto" });
    }
  }, [vehicle, reset]);

  const isEditing = vehicle !== null;

  return (
    // Fondo oscuro semitransparente detrás del modal
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-md shadow-2xl border border-gray-700">
        {/* Header del modal */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-white font-bold text-lg">
            {isEditing ? "Editar Vehículo" : "Nuevo Vehículo"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Placa */}
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Placa</label>
            <input
              {...register("placa", { required: "La placa es obligatoria" })}
              placeholder="Ej: ABC-1234"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 border border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-500 uppercase"
            />
            {errors.placa && (
              <p className="text-red-400 text-xs mt-1">{errors.placa.message}</p>
            )}
          </div>

          {/* Marca y Modelo en la misma fila */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Marca</label>
              <input
                {...register("marca", { required: "Obligatorio" })}
                placeholder="Ej: Toyota"
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 border border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-500"
              />
              {errors.marca && (
                <p className="text-red-400 text-xs mt-1">{errors.marca.message}</p>
              )}
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Modelo</label>
              <input
                {...register("modelo", { required: "Obligatorio" })}
                placeholder="Ej: Corolla"
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 border border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-500"
              />
              {errors.modelo && (
                <p className="text-red-400 text-xs mt-1">{errors.modelo.message}</p>
              )}
            </div>
          </div>

          {/* Color y Tipo en la misma fila */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Color</label>
              <input
                {...register("color", { required: "Obligatorio" })}
                placeholder="Ej: Blanco"
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 border border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-500"
              />
              {errors.color && (
                <p className="text-red-400 text-xs mt-1">{errors.color.message}</p>
              )}
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Tipo</label>
              <select
                {...register("tipo")}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                {VEHICLE_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg py-2.5 font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2.5 font-medium transition-colors"
            >
              {isEditing ? "Guardar cambios" : "Registrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}