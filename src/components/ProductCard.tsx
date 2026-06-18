import type { Product } from "../types";

type Props = {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

export function ProductCard({ product, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
      <div>
        <h3 className="font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">
          ${product.price.toFixed(2)}
          {product.category && ` · ${product.category}`}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(product)}
          className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
