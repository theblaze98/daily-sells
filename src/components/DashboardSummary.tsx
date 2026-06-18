import type { DailySummary, Product } from "../types";

type Props = {
  summary: DailySummary;
  products: Product[];
};

export function DashboardSummary({ summary, products }: Props) {
  const productMap = new Map(products.map((p) => [p.id, p]));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">
            {summary.totalSales}
          </p>
          <p className="text-xs text-gray-500">Ventas hoy</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold text-green-600">
            ${summary.totalRevenue.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">Ingreso total</p>
        </div>
      </div>

      {summary.topProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold text-gray-700 mb-2">
            Productos más vendidos
          </h3>
          <div className="space-y-2">
            {summary.topProducts.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between text-sm"
              >
                <span className="text-gray-700">
                  {productMap.get(item.productId)?.name ?? "Eliminado"}
                </span>
                <span className="text-gray-500">
                  {item.quantity} · ${item.revenue.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
