type Props = {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600">{message}</p>
        <div className="flex gap-2">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700"
          >
            {confirmLabel ?? "Confirmar"}
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 text-gray-600 font-medium"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
