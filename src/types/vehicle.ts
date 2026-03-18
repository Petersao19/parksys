// Tipos posibles de vehículo en el sistema
export type VehicleType = "auto" | "moto" | "camion";

// Estructura principal de un vehículo
export interface Vehicle {
  id: string;
  placa: string;       // Placa del vehículo (identificador único visible)
  marca: string;       // Ej: Toyota, Chevrolet
  modelo: string;      // Ej: Corolla, Spark
  color: string;       // Color del vehículo
  tipo: VehicleType;   // Categoría del vehículo
  activo: boolean;     // true = activo, false = inactivo (nunca se elimina)
  createdAt: string;   // Fecha de registro en ISO string
}

// Datos del formulario (sin id, activo ni createdAt — se manejan internamente)
export type VehicleFormData = Omit<Vehicle, "id" | "activo" | "createdAt">;