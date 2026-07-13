import { useState, useMemo } from "react";
import type { Sale } from "../types";
import { useProducts } from "../hooks/useProducts";
import { useSales } from "../hooks/useSales";
import { DashboardSummary } from "../components/DashboardSummary";
import { SaleItem } from "../components/SaleItem";
import { ConfirmModal } from "../components/ConfirmModal";
import { generateDailyReport } from "../pdf/generator";
import { Share } from "../services/share";

export function DashboardPage() {
  const { products } = useProducts();
  const {
    getTodaySales,
    getTodaySummary,
    clearTodaySales,
    updateSale,
    deleteSale,
    loading,
  } = useSales();

  const productNames = useMemo(
    () => Object.fromEntries(products.map((p) => [p.id, p.name])),
    [products]
  );

  const todaySales = getTodaySales();
  const summary = getTodaySummary();

  const [showConfirm, setShowConfirm] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState("");

  const handleFinalize = async () => {
    setShowConfirm(false);
    const doc = generateDailyReport(products, todaySales);
    const pdfBase64 = doc.output("datauristring");
    await Share.shareOrSave(pdfBase64);
    clearTodaySales();
  };

  const handleEditStart = (sale: Sale) => {
    setEditingSale(sale);
    setEditQuantity(String(sale.quantity));
  };

  const handleEditConfirm = () => {
    if (!editingSale) return;
    const q = parseInt(editQuantity, 10);
    if (isNaN(q) || q < 1) return;
    updateSale(editingSale.id, { quantity: q });
    setEditingSale(null);
  };

  if (loading) {
    return (
      <p className="text-center text-zinc-500 mt-12 text-sm">
        Cargando...
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-zinc-100">Dashboard</h2>

      <DashboardSummary summary={summary} products={products} />

      {todaySales.length > 0 && (
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4">
          <h3 className="text-sm font-semibold text-zinc-300 mb-1">
            Historial de ventas
          </h3>
          {todaySales
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((sale) => (
              <SaleItem
                key={sale.id}
                sale={sale}
                productName={productNames[sale.productId] ?? "Eliminado"}
                onEdit={handleEditStart}
                onDelete={setDeleteId}
              />
            ))}
        </div>
      )}

      {todaySales.length > 0 && (
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full bg-red-600 hover:bg-red-500 active:bg-red-400 text-white py-3.5 rounded-xl font-medium transition-colors shadow-lg shadow-red-600/20"
        >
          Finalizar Jornada
        </button>
      )}

      {todaySales.length === 0 && (
        <p className="text-center text-zinc-500 mt-12 text-sm">
          No hay ventas registradas hoy.
        </p>
      )}

      {showConfirm && (
        <ConfirmModal
          title="Finalizar Jornada"
          message="Se generará un PDF con el reporte y se limpiarán las ventas del día. ¿Estás seguro?"
          confirmLabel="Finalizar"
          onConfirm={handleFinalize}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {editingSale && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-3xl p-6 w-full max-w-xs border border-zinc-800 shadow-2xl space-y-5">
            <h2 className="text-lg font-bold text-zinc-100 text-center">
              Editar venta
            </h2>
            <p className="text-sm text-zinc-400 text-center">
              {productNames[editingSale.productId] ?? "Producto eliminado"}
            </p>
            <input
              type="number"
              min="1"
              value={editQuantity}
              onChange={(e) => setEditQuantity(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-4 text-center text-3xl font-bold text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleEditConfirm}
                className="flex-1 bg-blue-600 hover:bg-blue-500 active:bg-blue-400 text-white py-3.5 rounded-xl font-medium transition-colors"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditingSale(null)}
                className="px-5 py-3.5 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <ConfirmModal
          title="Eliminar venta"
          message="¿Estás seguro de eliminar esta venta?"
          confirmLabel="Eliminar"
          onConfirm={() => {
            deleteSale(deleteId);
            setDeleteId(null);
          }}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
