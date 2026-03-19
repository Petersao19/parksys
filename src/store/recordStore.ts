import { create } from "zustand";
import type { ParkingRecord, Rate } from "../types/record";

// Tarifas por hora — semana 4 vienen de la BD
const DEFAULT_RATES: Rate = {
  auto: 1.0, // $1.00 por hora
  moto: 0.75, // $0.75 por hora
  camion: 1.5, // $1.50 por hora
};

interface RecordStore {
  records: ParkingRecord[];
  rates: Rate;
  registerEntry: (vehicleId: string, placa: string, tipo: string) => void;
  registerExit: (recordId: string) => void;
  getActiveRecords: () => ParkingRecord[];
}

export const useRecordStore = create<RecordStore>((set, get) => ({
  records: [],
  rates: DEFAULT_RATES,

  // Registra la entrada — crea un record con status "open"
  registerEntry: (vehicleId, placa, tipo) =>
    set((state) => ({
      records: [
        ...state.records,
        {
          id: Date.now().toString(),
          vehicleId,
          placa,
          tipo,
          entryTime: new Date().toISOString(),
          status: "open",
        },
      ],
    })),

  // Registra la salida — calcula duración y monto, cierra el registro
  registerExit: (recordId) =>
    set((state) => {
      const record = state.records.find((r) => r.id === recordId);
      if (!record) return state;

      const exitTime = new Date();
      const entryTime = new Date(record.entryTime);

      // Duración en minutos — mínimo 1 minuto
      const duration = Math.max(
        1,
        Math.round((exitTime.getTime() - entryTime.getTime()) / 1000 / 60),
      );

      // Monto = (minutos / 60) × tarifa por hora del tipo
      const rate = state.rates[record.tipo as keyof Rate] ?? 1.0;
      const amount = parseFloat(((duration / 60) * rate).toFixed(2));

      return {
        records: state.records.map((r) =>
          r.id === recordId
            ? {
                ...r,
                exitTime: exitTime.toISOString(),
                duration,
                amount,
                status: "closed",
              }
            : r,
        ),
      };
    }),

  // Retorna solo los vehículos que están adentro ahora mismo
  getActiveRecords: () => get().records.filter((r) => r.status === "open"),
}));
