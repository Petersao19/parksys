import { useMemo } from "react"
import { useRecordStore } from "../store/recordStore"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts"
import Card from "../components/Card"

export default function ReportsPage() {
  const { records } = useRecordStore()

  // Solo registros cerrados (ya salieron y se cobró)
  const closed = records.filter((r) => r.status === "closed")

  // Totales generales
  const totalIngresos = closed.reduce((sum, r) => sum + (r.amount ?? 0), 0)
  const totalVehiculos = closed.length
  const promedio = totalVehiculos > 0 ? totalIngresos / totalVehiculos : 0

  // Agrupa ingresos por día para el gráfico
  const chartData = useMemo(() => {
    const byDay: Record<string, number> = {}
    closed.forEach((r) => {
      const day = new Date(r.entryTime).toLocaleDateString("es-EC", {
        day: "2-digit", month: "short",
      })
      byDay[day] = (byDay[day] ?? 0) + (r.amount ?? 0)
    })
    return Object.entries(byDay).map(([day, total]) => ({
      day,
      total: parseFloat(total.toFixed(2)),
    }))
  }, [records])

  return (
    <div className="space-y-6">

      {/* Título */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reportes</h1>
        <p className="text-gray-500 text-sm mt-1">Resumen de ingresos del mes</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <p className="text-gray-500 text-sm">Ingresos Totales</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            ${totalIngresos.toFixed(2)}
          </p>
          <p className="text-green-500 text-xs mt-1">↑ registros cerrados</p>
        </Card>
        <Card>
          <p className="text-gray-500 text-sm">Vehículos Atendidos</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{totalVehiculos}</p>
          <p className="text-gray-400 text-xs mt-1">entradas registradas</p>
        </Card>
        <Card>
          <p className="text-gray-500 text-sm">Promedio por Visita</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            ${promedio.toFixed(2)}
          </p>
          <p className="text-gray-400 text-xs mt-1">por vehículo</p>
        </Card>
      </div>

      {/* Gráfico de barras */}
      <Card>
        <h2 className="text-gray-900 font-semibold mb-6">Ingresos por día</h2>
        {chartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-4xl mb-3">📊</p>
            <p className="text-gray-400 text-sm">
              No hay datos aún — registra entradas y salidas para ver el gráfico
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: "8px" }}
                labelStyle={{ color: "#111827" }}
                
                formatter={(value) => [`$${value}`, "Ingresos"]}
              />
              <Bar dataKey="total" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>

      {/* Tabla de registros recientes */}
      <Card>
        <h2 className="text-gray-900 font-semibold mb-4">Registros recientes</h2>
        {closed.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">No hay registros aún</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="text-left text-gray-500 px-3 py-2 text-xs uppercase">Placa</th>
                <th className="text-left text-gray-500 px-3 py-2 text-xs uppercase">Tipo</th>
                <th className="text-left text-gray-500 px-3 py-2 text-xs uppercase">Duración</th>
                <th className="text-left text-gray-500 px-3 py-2 text-xs uppercase">Monto</th>
              </tr>
            </thead>
            <tbody>
              {closed.map((r) => (
                <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-3 py-3 text-gray-900 font-mono">{r.placa}</td>
                  <td className="px-3 py-3 text-gray-600 capitalize">{r.tipo}</td>
                  <td className="px-3 py-3 text-gray-600">{r.duration} min</td>
                  <td className="px-3 py-3 text-green-600 font-semibold">${r.amount?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

    </div>
  )
}