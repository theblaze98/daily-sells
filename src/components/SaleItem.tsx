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
    <div className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0 gap-2">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-zinc-200 truncate">
          {productName}
        </p>
        <p className="text-[11px] text-zinc-500 mt-0.5">{time}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-semibold text-zinc-100">x{sale.quantity}</p>
        <p className="text-xs text-zinc-400">
          Bs {(sale.quantity * sale.unitPrice).toLocaleString()}
        </p>
      </div>
      <div className="flex gap-1 shrink-0">
        <button
          onClick={() => onEdit(sale)}
          className="px-2.5 py-1.5 text-[11px] font-medium bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500/20 transition-colors"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(sale.id)}
          className="px-2.5 py-1.5 text-[11px] font-medium bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
