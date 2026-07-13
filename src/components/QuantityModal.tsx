import { useState } from "react";

type Props = {
  productName: string;
  onConfirm: (quantity: number) => void;
  onCancel: () => void;
};

export function QuantityModal({ productName, onConfirm, onCancel }: Props) {
  const [quantity, setQuantity] = useState("1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = parseInt(quantity, 10);
    if (isNaN(q) || q < 1) return;
    onConfirm(q);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 rounded-3xl p-6 w-full max-w-xs border border-zinc-800 shadow-2xl space-y-5"
      >
        <h2 className="text-lg font-bold text-zinc-100 text-center">
          {productName}
        </h2>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-4 text-center text-3xl font-bold text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
          autoFocus
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-500 active:bg-blue-400 text-white py-3.5 rounded-xl font-medium transition-colors"
          >
            Registrar venta
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
