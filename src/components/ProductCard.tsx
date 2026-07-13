import type { Product } from "../types";

type Props = {
  product: Product;
  bsPrice: number;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

export function ProductCard({ product, bsPrice, onEdit, onDelete }: Props) {
  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 flex items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-zinc-100 text-sm truncate">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-blue-400 font-bold text-base">
            Bs {bsPrice.toLocaleString()}
          </span>
          {product.usdPrice && (
            <span className="text-[11px] text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">
              ${product.usdPrice}
            </span>
          )}
        </div>
        {product.category && (
          <span className="text-[11px] text-zinc-500 mt-0.5 block">
            {product.category}
          </span>
        )}
      </div>
      <div className="flex gap-1.5 shrink-0">
        <button
          onClick={() => onEdit(product)}
          className="px-3 py-2 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500/20 active:bg-blue-500/30 transition-colors"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="px-3 py-2 text-xs font-medium bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 active:bg-red-500/30 transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
