// TarifasPage.tsx — Gestión de tarifas del parqueadero
import { useState } from 'react'
import Card from '../components/Card'
import Modal from '../components/Modal'
import Button from '../components/Button'

// --- Tipos ---
interface Tarifa {
  id: number
  tipo: 'Auto' | 'Moto'
  emoji: string
  porHora: number
  porDia: number
}

// --- Datos iniciales (luego vendrán del backend) ---
const tarifasIniciales: Tarifa[] = [
  { id: 1, tipo: 'Auto', emoji: '🚗', porHora: 1.00, porDia: 2.00 },
  { id: 2, tipo: 'Moto', emoji: '🏍️', porHora: 1.00, porDia: 2.00 },
]

export default function TarifasPage() {
  const [tarifas, setTarifas]       = useState<Tarifa[]>(tarifasIniciales)
  const [editando, setEditando]     = useState<Tarifa | null>(null)
  const [porHora, setPorHora]       = useState('')
  const [porDia, setPorDia]         = useState('')
  const [guardado, setGuardado]     = useState(false)

  // Abrir modal con los valores actuales
  const abrirModal = (tarifa: Tarifa) => {
    setEditando(tarifa)
    setPorHora(tarifa.porHora.toFixed(2))
    setPorDia(tarifa.porDia.toFixed(2))
    setGuardado(false)
  }

  // Guardar cambios
  const guardar = () => {
    if (!editando) return
    setTarifas(prev =>
      prev.map(t =>
        t.id === editando.id
          ? { ...t, porHora: parseFloat(porHora), porDia: parseFloat(porDia) }
          : t
      )
    )
    setGuardado(true)
    setTimeout(() => setEditando(null), 800)
  }

  return (
    <div className="space-y-6">

      {/* Título */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tarifas</h1>
        <p className="text-gray-500 text-sm mt-1">
          Configura los precios del parqueadero
        </p>
      </div>

      {/* Tabla de tarifas */}
      <Card>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Tipo</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Por Hora</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Por Día</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tarifas.map(tarifa => (
              <tr key={tarifa.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{tarifa.emoji}</span>
                    <span className="text-gray-800 font-medium">{tarifa.tipo}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-800 font-semibold">
                    ${tarifa.porHora.toFixed(2)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-800 font-semibold">
                    ${tarifa.porDia.toFixed(2)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => abrirModal(tarifa)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Info de referencia */}
      <Card>
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="text-gray-800 font-medium text-sm">Referencia de cobro</p>
            <p className="text-gray-500 text-sm mt-1">
              El sistema calcula automáticamente el tiempo de permanencia
              al registrar la salida del vehículo en la sección <strong>Activos</strong>.
            </p>
          </div>
        </div>
      </Card>

      {/* Modal de edición */}
      {editando && (
        <Modal
          title={`Editar Tarifa — ${editando.emoji} ${editando.tipo}`}
          onClose={() => setEditando(null)}
        >
          <div className="space-y-4">

            {/* Campo Por Hora */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio por Hora ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.25"
                value={porHora}
                onChange={e => setPorHora(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Campo Por Día */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio por Día ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.25"
                value={porDia}
                onChange={e => setPorDia(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setEditando(null)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <Button onClick={guardar}>
                {guardado ? '✓ Guardado' : 'Guardar Cambios'}
              </Button>
            </div>

          </div>
        </Modal>
      )}

    </div>
  )
}