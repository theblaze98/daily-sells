import { useState } from "react";

type Props = {
  currentRate: number;
  onSave: (rate: number) => void;
  onClose: () => void;
};

export function ExchangeRateModal({ currentRate, onSave, onClose }: Props) {
  const [value, setValue] = useState(String(currentRate));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(value);
    if (isNaN(parsed) || parsed <= 0) return;
    onSave(parsed);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 w-full max-w-xs space-y-4"
      >
        <h2 className="text-lg font-bold text-gray-800">
          Tasa de cambio del día
        </h2>
        <input
          type="number"
          step="0.01"
          min="0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 text-center text-2xl font-bold"
          autoFocus
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-gray-600 font-medium"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
