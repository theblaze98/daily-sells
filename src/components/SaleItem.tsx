import type { Sale } from "../types";

type Props = {
  sale: Sale;
  productName: string;
  onEdit: (sale: Sale) => void;
  onDelete: (id: string) => void;
};

export function SaleItem({ sale, productName, onEdit, onDelete }: Props) {
  const time = new Date(sale.createdAt).toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0 gap-2">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">
          {productName}
        </p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-semibold">x{sale.quantity}</p>
        <p className="text-xs text-gray-500">
          ${(sale.quantity * sale.unitPrice).toFixed(2)}
        </p>
      </div>
      <div className="flex gap-1 shrink-0">
        <button
          onClick={() => onEdit(sale)}
          className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(sale.id)}
          className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
