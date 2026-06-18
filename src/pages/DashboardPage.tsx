import { useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import { useSales } from "../hooks/useSales";
import { DashboardSummary } from "../components/DashboardSummary";
import { SaleItem } from "../components/SaleItem";
import { generateDailyReport } from "../pdf/generator";
import { Share } from "../services/share";

export function DashboardPage() {
  const { products } = useProducts();
  const { getTodaySales, getTodaySummary, clearTodaySales, loading } =
    useSales();

  const productNames = useMemo(
    () => Object.fromEntries(products.map((p) => [p.id, p.name])),
    [products]
  );

  const todaySales = getTodaySales();
  const summary = getTodaySummary();

  const handleFinalize = async () => {
    const doc = generateDailyReport(products, todaySales);
    const pdfBase64 = doc.output("datauristring");
    await Share.shareOrSave(pdfBase64);
    clearTodaySales();
  };

  if (loading) {
    return (
      <p className="text-center text-gray-400 mt-8">Cargando...</p>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800">Dashboard</h2>

      <DashboardSummary summary={summary} products={products} />

      {todaySales.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold text-gray-700 mb-2">
            Historial de ventas
          </h3>
          {todaySales
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((sale) => (
              <SaleItem
                key={sale.id}
                sale={sale}
                productName={productNames[sale.productId] ?? "Eliminado"}
              />
            ))}
        </div>
      )}

      {todaySales.length > 0 && (
        <button
          onClick={handleFinalize}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700"
        >
          Finalizar Jornada
        </button>
      )}

      {todaySales.length === 0 && (
        <p className="text-center text-gray-400 mt-8">
          No hay ventas registradas hoy.
        </p>
      )}
    </div>
  );
}
