import type { Product } from "../types";

type Props = {
  product: Product;
  bsPrice: number;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

export function ProductCard({ product, bsPrice, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3.5 flex items-center justify-between gap-2">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 text-sm truncate">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-blue-700 font-bold text-sm">
            Bs {bsPrice.toLocaleString()}
          </span>
          {product.usdPrice && (
            <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
              ${product.usdPrice}
            </span>
          )}
        </div>
        {product.category && (
          <span className="text-[11px] text-gray-400">{product.category}</span>
        )}
      </div>
      <div className="flex gap-1.5 shrink-0">
        <button
          onClick={() => onEdit(product)}
          className="px-3 py-1.5 text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg hover:bg-yellow-100 active:bg-yellow-200"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 active:bg-red-200"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
