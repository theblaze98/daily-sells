import { useState } from "react";
import type { Product } from "../types";

type Props = {
  initial?: Product;
  onSubmit: (data: { name: string; price: number; category?: string }) => void;
  onCancel: () => void;
};

export function ProductForm({ initial, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [price, setPrice] = useState(String(initial?.price ?? ""));
  const [category, setCategory] = useState(initial?.category ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(price);
    if (!name.trim() || isNaN(parsed) || parsed <= 0) return;
    onSubmit({
      name: name.trim(),
      price: parsed,
      category: category.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 space-y-3">
      <input
        type="text"
        placeholder="Nombre del producto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
        autoFocus
      />
      <input
        type="number"
        step="0.01"
        min="0"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
      />
      <input
        type="text"
        placeholder="Categoría (opcional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700"
        >
          {initial ? "Guardar cambios" : "Crear producto"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
