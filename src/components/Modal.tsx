import { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean       // controla si se muestra o no
  onClose: () => void   // función para cerrarlo
  title: string
  children: ReactNode   // contenido del modal (formulario, confirmación, etc.)
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {

  // Si no está abierto no renderiza nada
  if (!isOpen) return null

  return (
    // Fondo oscuro detrás del modal
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay — clic aquí cierra el modal */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Contenido del modal */}
      <div className="relative z-10 w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl p-6 mx-4">

        {/* Header con título y botón cerrar */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-lg">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Aquí va el formulario o contenido */}
        {children}

      </div>
    </div>
  )
}