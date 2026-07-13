import { useState, useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import { useSales } from "../hooks/useSales";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { QuantityModal } from "../components/QuantityModal";
import { SearchBar } from "../components/SearchBar";

export function SalesPage() {
  const { products } = useProducts();
  const { addSale, getTodaySales } = useSales();
  const { calcPrice } = useExchangeRate();
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    name: string;
    price: number;
  } | null>(null);
  const [search, setSearch] = useState("");

  const sales = getTodaySales();

  const salesByProduct = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of sales) {
      map.set(s.productId, (map.get(s.productId) ?? 0) + s.quantity);
    }
    return map;
  }, [sales]);

  const handleConfirm = (quantity: number) => {
    if (!selectedProduct) return;
    addSale(selectedProduct.id, quantity, selectedProduct.price);
    setSelectedProduct(null);
  };

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        const q = search.toLowerCase();
        return (
          !q ||
          p.name.toLowerCase().includes(q) ||
          (p.category ?? "").toLowerCase().includes(q)
        );
      }),
    [products, search]
  );

  const grouped = useMemo(() => {
    const categories = new Map<string, typeof products>();
    for (const p of filtered) {
      const cat = p.category ?? "General";
      if (!categories.has(cat)) categories.set(cat, []);
      categories.get(cat)!.push(p);
    }
    return categories;
  }, [filtered]);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-zinc-100">Registrar venta</h2>

      <SearchBar value={search} onChange={setSearch} placeholder="Buscar producto..." />

      {products.length === 0 && (
        <p className="text-center text-zinc-500 mt-12 text-sm">
          No hay productos. Ve a Productos para crear uno.
        </p>
      )}

      {filtered.length === 0 && search && (
        <p className="text-center text-zinc-500 mt-12 text-sm">
          Sin resultados para "{search}"
        </p>
      )}

      {Array.from(grouped.entries()).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-1">
            {category}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {items.map((product) => {
              const bsPrice = calcPrice(product);
              const sold = salesByProduct.get(product.id) ?? 0;
              return (
                <button
                  key={product.id}
                  onClick={() =>
                    setSelectedProduct({
                      id: product.id,
                      name: product.name,
                      price: bsPrice,
                    })
                  }
                  className="bg-zinc-900 rounded-2xl border border-zinc-800 p-3.5 text-left hover:border-zinc-700 active:bg-zinc-800 transition-all text-start"
                >
                  <p className="font-semibold text-zinc-100 text-sm leading-tight">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <p className="text-blue-400 font-bold text-sm">
                      Bs {bsPrice.toLocaleString()}
                    </p>
                    {product.usdPrice && (
                      <span className="text-[10px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded-full">
                        ${product.usdPrice}
                      </span>
                    )}
                  </div>
                  {sold > 0 && (
                    <p className="text-[11px] text-green-400 font-medium mt-2 bg-green-500/10 px-2 py-0.5 rounded-full inline-block">
                      {sold} hoy
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {selectedProduct && (
        <QuantityModal
          productName={selectedProduct.name}
          onConfirm={handleConfirm}
          onCancel={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
