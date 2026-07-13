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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 rounded-3xl p-6 w-full max-w-xs border border-zinc-800 shadow-2xl space-y-5"
      >
        <h2 className="text-lg font-bold text-zinc-100 text-center">
          Tasa de cambio
        </h2>
        <div className="flex items-center justify-center gap-2">
          <span className="text-zinc-400 text-lg font-medium">1 USD =</span>
          <input
            type="number"
            step="0.01"
            min="0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-28 bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-center text-xl font-bold text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
            autoFocus
          />
          <span className="text-zinc-400 text-lg font-medium">Bs</span>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-500 active:bg-blue-400 text-white py-3.5 rounded-xl font-medium transition-colors"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3.5 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
