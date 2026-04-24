// UsuariosPage.tsx — CRUD de usuarios del sistema
import { useState } from 'react'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Button from '../components/Button'
import Modal from '../components/Modal'

// --- Tipos ---
type Rol = 'Admin' | 'Operador'
type Estado = 'activo' | 'inhabilitado'

interface Usuario {
  id: number
  nombre: string
  email: string
  password: string
  rol: Rol
  estado: Estado
}

// --- Datos iniciales ---
const usuariosIniciales: Usuario[] = [
  { id: 1, nombre: 'Admin Principal', email: 'admin@parksys.com',    password: '123456', rol: 'Admin',    estado: 'activo' },
  { id: 2, nombre: 'Juan Operador',   email: 'juan@parksys.com',     password: '123456', rol: 'Operador', estado: 'activo' },
  { id: 3, nombre: 'María López',     email: 'maria@parksys.com',    password: '123456', rol: 'Operador', estado: 'inhabilitado' },
]

// --- Formulario vacío ---
const formVacio = { nombre: '', email: '', password: '', rol: 'Operador' as Rol }

export default function UsuariosPage() {
  const [usuarios, setUsuarios]     = useState<Usuario[]>(usuariosIniciales)
  const [modalAbierto, setModal]    = useState(false)
  const [editando, setEditando]     = useState<Usuario | null>(null)
  const [form, setForm]             = useState(formVacio)
  const [errores, setErrores]       = useState<Partial<typeof formVacio>>({})

  // --- Abrir modal nuevo ---
  const abrirNuevo = () => {
    setEditando(null)
    setForm(formVacio)
    setErrores({})
    setModal(true)
  }

  // --- Abrir modal editar ---
  const abrirEditar = (u: Usuario) => {
    setEditando(u)
    setForm({ nombre: u.nombre, email: u.email, password: u.password, rol: u.rol })
    setErrores({})
    setModal(true)
  }

  // --- Validación ---
  const validar = () => {
    const e: Partial<typeof formVacio> = {}
    if (!form.nombre.trim())  e.nombre   = 'El nombre es requerido'
    if (!form.email.trim())   e.email    = 'El email es requerido'
    if (!form.password.trim()) e.password = 'La contraseña es requerida'
    setErrores(e)
    return Object.keys(e).length === 0
  }

  // --- Guardar (crear o editar) ---
  const guardar = () => {
    if (!validar()) return

    if (editando) {
      // Editar existente
      setUsuarios(prev =>
        prev.map(u => u.id === editando.id ? { ...u, ...form } : u)
      )
    } else {
      // Crear nuevo
      const nuevo: Usuario = {
        id: Date.now(),
        ...form,
        estado: 'activo',
      }
      setUsuarios(prev => [...prev, nuevo])
    }
    setModal(false)
  }

  // --- Inhabilitar / Reactivar ---
  const toggleEstado = (id: number) => {
    setUsuarios(prev =>
      prev.map(u =>
        u.id === id
          ? { ...u, estado: u.estado === 'activo' ? 'inhabilitado' : 'activo' }
          : u
      )
    )
  }

  const activos      = usuarios.filter(u => u.estado === 'activo').length
  const inhabilitados = usuarios.filter(u => u.estado === 'inhabilitado').length

  return (
    <div className="space-y-6">

      {/* Título + botón nuevo */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Usuarios</h1>
          <p className="text-gray-500 text-sm mt-1">
            {activos} activos · {inhabilitados} inhabilitados
          </p>
        </div>
        <Button onClick={abrirNuevo}>+ Nuevo usuario</Button>
      </div>

      {/* Tabla */}
      <Card>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Usuario</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Email</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Rol</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Estado</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">

                {/* Avatar + nombre */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                      {u.nombre.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-800 font-medium">{u.nombre}</span>
                  </div>
                </td>

                {/* Email */}
                <td className="py-4 px-4 text-gray-600">{u.email}</td>

                {/* Rol */}
                <td className="py-4 px-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    u.rol === 'Admin'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {u.rol}
                  </span>
                </td>

                {/* Estado */}
                <td className="py-4 px-4">
                  <Badge
                    label={u.estado === 'activo' ? 'Activo' : 'Inhabilitado'}
                    variant={u.estado === 'activo' ? 'success' : 'gray'}
                  />
                </td>

                {/* Acciones */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => abrirEditar(u)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => toggleEstado(u.id)}
                      className={`font-medium text-sm transition-colors ${
                        u.estado === 'activo'
                          ? 'text-orange-500 hover:text-orange-700'
                          : 'text-green-600 hover:text-green-800'
                      }`}
                    >
                      {u.estado === 'activo' ? 'Inhabilitar' : 'Reactivar'}
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Modal crear / editar */}
      {modalAbierto && (
        <Modal
          title={editando ? `Editar — ${editando.nombre}` : 'Nuevo Usuario'}
          onClose={() => setModal(false)}
        >
          <div className="space-y-4">

            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                value={form.nombre}
                onChange={e => setForm({ ...form, nombre: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Juan Pérez"
              />
              {errores.nombre && <p className="text-red-500 text-xs mt-1">{errores.nombre}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="juan@parksys.com"
              />
              {errores.email && <p className="text-red-500 text-xs mt-1">{errores.email}</p>}
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••"
              />
              {errores.password && <p className="text-red-500 text-xs mt-1">{errores.password}</p>}
            </div>

            {/* Rol */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rol
              </label>
              <select
                value={form.rol}
                onChange={e => setForm({ ...form, rol: e.target.value as Rol })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Operador">Operador</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <Button onClick={guardar}>
                {editando ? 'Guardar Cambios' : 'Crear Usuario'}
              </Button>
            </div>

          </div>
        </Modal>
      )}

    </div>
  )
}