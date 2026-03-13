import type { ReactNode } from "react";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T) => ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export default function Table<T extends { id: number }>({
  columns,
  data,
  emptyMessage = "No hay datos para mostrar",
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-800">
      <table className="w-full text-sm">
        {/* Encabezados */}
        <thead>
          <tr className="border-b border-gray-800">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="text-left px-4 py-3 text-xs font-semibold text-gray-500 tracking-wider uppercase"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Filas */}
        <tbody>
          {data.length === 0 ? (
            // Estado vacío
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-12 text-gray-600"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3 text-gray-300">
                    {/* Si tiene render personalizado úsalo, si no muestra el valor directo */}
                    {col.render ? col.render(row) : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
