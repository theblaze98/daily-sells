import { useState, useCallback } from "react";
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
  const [bsInput, setBsInput] = useState(
    initial?.usdPrice
      ? String(Math.round(initial.usdPrice * exchangeRate))
      : initial
        ? String(initial.price)
        : ""
  );
  const [usdInput, setUsdInput] = useState(
    initial?.usdPrice ? String(initial.usdPrice) : ""
  );
  const [category, setCategory] = useState(initial?.category ?? "");

  const handleBsChange = useCallback(
    (value: string) => {
      setBsInput(value);
      const bs = parseFloat(value);
      if (!isNaN(bs) && bs > 0 && exchangeRate > 0) {
        setUsdInput((bs / exchangeRate).toFixed(2));
      } else {
        setUsdInput("");
      }
    },
    [exchangeRate]
  );

  const handleUsdChange = useCallback(
    (value: string) => {
      setUsdInput(value);
      const usd = parseFloat(value);
      if (!isNaN(usd) && usd > 0 && exchangeRate > 0) {
        setBsInput(String(Math.round(usd * exchangeRate)));
      } else {
        setBsInput("");
      }
    },
    [exchangeRate]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const usd = parseFloat(usdInput);
    const hasUsd = !isNaN(usd) && usd > 0;

    if (hasUsd) {
      onSubmit({
        name: name.trim(),
        price: Math.round(usd * exchangeRate),
        usdPrice: usd,
        category: category.trim() || undefined,
      });
    } else {
      const bs = parseFloat(bsInput);
      if (isNaN(bs) || bs <= 0) return;
      onSubmit({
        name: name.trim(),
        price: bs,
        category: category.trim() || undefined,
      });
    }
  };

  const canSubmit =
    name.trim() &&
    (parseFloat(usdInput) > 0 || parseFloat(bsInput) > 0);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-end sm:items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-md mx-auto border border-zinc-800 shadow-2xl space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-100">
            {initial ? "Editar producto" : "Nuevo producto"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="text-zinc-500 hover:text-zinc-300 text-xl leading-none transition-colors"
          >
            ✕
          </button>
        </div>

        <input
          type="text"
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
          autoFocus
        />

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
            Precio en bolívares
          </label>
          <input
            type="number"
            step="1"
            min="0"
            placeholder="0"
            value={bsInput}
            onChange={(e) => handleBsChange(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3.5 text-lg font-bold text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-[11px] font-medium text-zinc-600">
            o en USD (tasa: {exchangeRate.toFixed(2)})
          </span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
            Precio de referencia en USD
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={usdInput}
            onChange={(e) => handleUsdChange(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3.5 text-lg font-bold text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
          />
        </div>

        {bsInput && usdInput && parseFloat(bsInput) > 0 && parseFloat(usdInput) > 0 && (
          <p className="text-center text-sm text-green-400 bg-green-500/10 py-2.5 rounded-xl font-medium">
            Bs {parseFloat(bsInput).toLocaleString()} ≈ ${parseFloat(usdInput).toFixed(2)}
          </p>
        )}

        <input
          type="text"
          placeholder="Categoría (opcional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
        />

        <div className="flex gap-2 pt-1">
          <button
            type="submit"
            disabled={!canSubmit}
            className={`flex-1 py-3.5 rounded-xl text-sm font-medium transition-colors ${
              canSubmit
                ? "bg-blue-600 hover:bg-blue-500 active:bg-blue-400 text-white"
                : "bg-zinc-800 text-zinc-600"
            }`}
          >
            {initial ? "Guardar cambios" : "Crear producto"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-3.5 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
