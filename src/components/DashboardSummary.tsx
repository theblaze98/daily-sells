import type { DailySummary, Product } from "../types";

type Props = {
  summary: DailySummary;
  products: Product[];
};

export function DashboardSummary({ summary, products }: Props) {
  const productMap = new Map(products.map((p) => [p.id, p]));

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5 text-center">
          <p className="text-3xl font-bold text-blue-400">
            {summary.totalSales}
          </p>
          <p className="text-xs text-zinc-500 mt-1">Ventas hoy</p>
        </div>
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5 text-center">
          <p className="text-3xl font-bold text-green-400">
            Bs {summary.totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-zinc-500 mt-1">Ingreso total</p>
        </div>
      </div>

      {summary.topProducts.length > 0 && (
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4">
          <h3 className="text-sm font-semibold text-zinc-300 mb-3">
            Productos más vendidos
          </h3>
          <div className="space-y-2.5">
            {summary.topProducts.map((item, i) => (
              <div
                key={item.productId}
                className="flex items-center gap-3"
              >
                <span className="text-xs font-bold text-zinc-600 w-5">
                  {i + 1}
                </span>
                <span className="flex-1 text-sm text-zinc-200 truncate">
                  {productMap.get(item.productId)?.name ?? "Eliminado"}
                </span>
                <span className="text-sm text-zinc-400 shrink-0">
                  {item.quantity} · Bs {item.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
