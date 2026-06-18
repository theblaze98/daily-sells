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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 w-full max-w-sm space-y-4"
      >
        <h2 className="text-lg font-bold text-gray-800">
          {productName}
        </h2>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 text-center text-2xl font-bold"
          autoFocus
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700"
          >
            Registrar venta
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 text-gray-600 font-medium"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
