type Props = {
  title: string;
  message: string;
  confirmLabel?: string;
  confirmClass?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  title,
  message,
  confirmLabel,
  confirmClass,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-3xl p-6 w-full max-w-xs border border-zinc-800 shadow-2xl space-y-4">
        <h2 className="text-lg font-bold text-zinc-100">{title}</h2>
        <p className="text-sm text-zinc-400 leading-relaxed">{message}</p>
        <div className="flex gap-2 pt-1">
          <button
            onClick={onConfirm}
            className={`flex-1 text-white py-3.5 rounded-xl font-medium transition-colors ${
              confirmClass ?? "bg-red-600 hover:bg-red-500 active:bg-red-400"
            }`}
          >
            {confirmLabel ?? "Confirmar"}
          </button>
          <button
            onClick={onCancel}
            className="px-5 py-3.5 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
