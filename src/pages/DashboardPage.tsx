import Card from '../components/Card'
import Badge from '../components/Badge'
import Table from '../components/Table'

// Datos de prueba
const recentVehicles = [
  { id: 1, plate: 'ABC-123', type: 'Auto',  owner: 'Carlos Pérez',  status: 'active' },
  { id: 2, plate: 'XYZ-456', type: 'Moto',  owner: 'Ana González',  status: 'active' },
  { id: 3, plate: 'DEF-789', type: 'Auto',  owner: 'Luis Martínez', status: 'exited' },
]

// Columnas de la tabla
const columns = [
  { key: 'plate' as const, label: 'Placa' },
  { key: 'type'  as const, label: 'Tipo' },
  { key: 'owner' as const, label: 'Propietario' },
  {
    key: 'status' as const,
    label: 'Estado',
    // render personalizado — Badge en lugar de texto plano
    render: (row: typeof recentVehicles[0]) => (
      <Badge
        label={row.status === 'active' ? 'Activo' : 'Salió'}
        variant={row.status === 'active' ? 'success' : 'gray'}
      />
    ),
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* Título de la página */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Resumen del día</p>
      </div>

      {/* 4 KPI Cards en grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <p className="text-gray-400 text-sm">Vehículos Activos</p>
          <p className="text-3xl font-bold text-white mt-1">2</p>
          <p className="text-green-400 text-xs mt-1">↑ en el parqueadero ahora</p>
        </Card>
        <Card>
          <p className="text-gray-400 text-sm">Ingresos Hoy</p>
          <p className="text-3xl font-bold text-white mt-1">$12.50</p>
          <p className="text-green-400 text-xs mt-1">↑ 3 vehículos atendidos</p>
        </Card>
        <Card>
          <p className="text-gray-400 text-sm">Total del Mes</p>
          <p className="text-3xl font-bold text-white mt-1">$284.00</p>
          <p className="text-gray-500 text-xs mt-1">Marzo 2026</p>
        </Card>
        <Card>
          <p className="text-gray-400 text-sm">Vehículos Registrados</p>
          <p className="text-3xl font-bold text-white mt-1">47</p>
          <p className="text-gray-500 text-xs mt-1">en el sistema</p>
        </Card>
      </div>

      {/* Tabla de actividad reciente */}
      <Card>
        <h2 className="text-white font-semibold mb-4">Actividad Reciente</h2>
        <Table columns={columns} data={recentVehicles} />
      </Card>

    </div>
  )
}