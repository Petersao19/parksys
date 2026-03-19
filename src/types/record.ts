// Un registro de entrada/salida de un vehículo
export interface ParkingRecord {
  id: string
  vehicleId: string      // referencia al vehículo
  placa: string          // guardamos la placa directamente para mostrarlo fácil
  tipo: string           // auto, moto, camion
  entryTime: string      // hora de entrada en ISO string
  exitTime?: string      // hora de salida — undefined si aún está adentro
  duration?: number      // minutos que estuvo — se calcula al salir
  amount?: number        // monto cobrado — se calcula al salir
  status: "open" | "closed"  // open = está adentro, closed = ya salió
}

// Tarifas por tipo de vehículo ($/hora)
export interface Rate {
  auto: number
  moto: number
  camion: number
}