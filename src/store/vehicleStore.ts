import { create } from "zustand";
import type { Vehicle, VehicleFormData } from "../types/vehicle";

// Datos de prueba para ver el módulo funcionando desde el primer día
const mockVehicles: Vehicle[] = [
  {
    id: "1",
    placa: "ABC-1234",
    marca: "Toyota",
    modelo: "Corolla",
    color: "Blanco",
    tipo: "auto",
    activo: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    placa: "XYZ-5678",
    marca: "Honda",
    modelo: "CB500",
    color: "Negro",
    tipo: "moto",
    activo: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    placa: "LMN-9999",
    marca: "Chevrolet",
    modelo: "NHR",
    color: "Gris",
    tipo: "camion",
    activo: false, // Ejemplo de vehículo inactivo para ver el comportamiento
    createdAt: new Date().toISOString(),
  },
];

// Forma del estado y las acciones del store
interface VehicleStore {
  vehicles: Vehicle[];
  addVehicle: (data: VehicleFormData) => void;
  updateVehicle: (id: string, data: VehicleFormData) => void;
  toggleVehicle: (id: string) => void; // Alterna entre activo e inactivo — nunca elimina
}

export const useVehicleStore = create<VehicleStore>((set) => ({
  // Estado inicial con datos de prueba
  vehicles: mockVehicles,

  // Agrega un vehículo nuevo — siempre arranca como activo
  addVehicle: (data) =>
    set((state) => ({
      vehicles: [
        ...state.vehicles,
        {
          ...data,
          id: Date.now().toString(),
          activo: true,
          createdAt: new Date().toISOString(),
        },
      ],
    })),

  // Actualiza los datos de un vehículo existente por su id
  updateVehicle: (id, data) =>
    set((state) => ({
      vehicles: state.vehicles.map((v) =>
        v.id === id ? { ...v, ...data } : v
      ),
    })),

  // Alterna el estado activo/inactivo — el registro nunca se elimina
  toggleVehicle: (id) =>
    set((state) => ({
      vehicles: state.vehicles.map((v) =>
        v.id === id ? { ...v, activo: !v.activo } : v
      ),
    })),
}));