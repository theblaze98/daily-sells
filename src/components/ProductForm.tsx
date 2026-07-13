import { useState } from "react";
import type { Product } from "../types";

type Props = {
  initial?: Product;
  exchangeRate: number;
  onSubmit: (data: {
    name: string;
    price: number;
    usdPrice?: number;
    category?: string;
  }) => void;
  onCancel: () => void;
};

export function ProductForm({
  initial,
  exchangeRate,
  onSubmit,
  onCancel,
}: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [priceType, setPriceType] = useState<"bs" | "usd">(
    initial?.usdPrice ? "usd" : "bs"
  );
  const [bsPrice, setBsPrice] = useState(
    initial && !initial.usdPrice ? String(initial.price) : ""
  );
  const [usdPrice, setUsdPrice] = useState(
    initial?.usdPrice ? String(initial.usdPrice) : ""
  );
  const [category, setCategory] = useState(initial?.category ?? "");

  const calculatedBs = usdPrice
    ? Math.round(parseFloat(usdPrice) * exchangeRate)
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (priceType === "usd") {
      const usd = parseFloat(usdPrice);
      if (isNaN(usd) || usd <= 0) return;
      const bs = Math.round(usd * exchangeRate);
      onSubmit({ name: name.trim(), price: bs, usdPrice: usd, category: category.trim() || undefined });
    } else {
      const bs = parseFloat(bsPrice);
      if (isNaN(bs) || bs <= 0) return;
      onSubmit({ name: name.trim(), price: bs, category: category.trim() || undefined });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-t-2xl sm:rounded-2xl p-5 w-full max-w-md mx-auto space-y-4 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">
            {initial ? "Editar producto" : "Nuevo producto"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <input
          type="text"
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
        />

        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            type="button"
            onClick={() => setPriceType("bs")}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
              priceType === "bs"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-gray-500"
            }`}
          >
            Precio en Bs
          </button>
          <button
            type="button"
            onClick={() => setPriceType("usd")}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
              priceType === "usd"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-gray-500"
            }`}
          >
            Precio en USD
          </button>
        </div>

        {priceType === "bs" ? (
          <div>
            <input
              type="number"
              step="1"
              min="0"
              placeholder="Precio en bolívares"
              value={bsPrice}
              onChange={(e) => setBsPrice(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg text-center font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="Precio en USD"
              value={usdPrice}
              onChange={(e) => setUsdPrice(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg text-center font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {usdPrice && parseFloat(usdPrice) > 0 && (
              <p className="text-center text-sm text-gray-500">
                = Bs{" "}
                <span className="font-semibold text-gray-700">
                  {calculatedBs.toLocaleString()}
                </span>{" "}
                (tasa: {exchangeRate.toFixed(2)})
              </p>
            )}
          </div>
        )}

        <input
          type="text"
          placeholder="Categoría (opcional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <div className="flex gap-2 pt-1">
          <button
            type="submit"
            className="flex-1 bg-blue-700 text-white py-3 rounded-xl text-sm font-medium hover:bg-blue-800 active:bg-blue-900"
          >
            {initial ? "Guardar cambios" : "Crear producto"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-3 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
