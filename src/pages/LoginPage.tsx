import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (!email || !password) {
      setError('Completa todos los campos')
      return
    }
    // Por ahora simulamos — mañana conectamos con Zustand
    if (email === 'admin@parking.com' && password === 'admin123') {
      setError('')
      alert('✅ Login correcto — mañana conectamos el router')
    } else {
      setError('Correo o contraseña incorrectos')
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">P</span>
          </div>
          <h1 className="text-3xl font-bold text-white">ParkSys</h1>
          <p className="text-gray-400 mt-1 text-sm">Sistema de Gestión de Parqueadero</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">

          {/* Email */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-400 mb-2 tracking-wider">
              CORREO ELECTRÓNICO
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@parking.com"
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-400 mb-2 tracking-wider">
              CONTRASEÑA
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-950 border border-red-800 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Botón */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
          >
            Iniciar Sesión
          </button>

          {/* Hint */}
          <div className="mt-6 p-3 bg-gray-950 rounded-lg border border-gray-800">
            <p className="text-xs text-gray-500 font-semibold mb-1">CUENTA DE PRUEBA:</p>
            <p className="text-xs text-gray-400">admin@parking.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  )
}