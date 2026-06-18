import { useState, useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import { useSales } from "../hooks/useSales";
import { QuantityModal } from "../components/QuantityModal";

export function SalesPage() {
  const { products } = useProducts();
  const { addSale, getTodaySales } = useSales();
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    name: string;
    price: number;
  } | null>(null);

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

  const grouped = useMemo(() => {
    const categories = new Map<string, typeof products>();
    for (const p of products) {
      const cat = p.category ?? "General";
      if (!categories.has(cat)) categories.set(cat, []);
      categories.get(cat)!.push(p);
    }
    return categories;
  }, [products]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800">Registrar venta</h2>

      {products.length === 0 && (
        <p className="text-center text-gray-400 mt-8">
          No hay productos. Ve a Productos para crear uno.
        </p>
      )}

      {Array.from(grouped.entries()).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
            {category}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {items.map((product) => {
              const sold = salesByProduct.get(product.id) ?? 0;
              return (
                <button
                  key={product.id}
                  onClick={() =>
                    setSelectedProduct({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                    })
                  }
                  className="bg-white rounded-lg shadow p-4 text-left hover:shadow-md transition-shadow"
                >
                  <p className="font-semibold text-gray-800 text-sm">
                    {product.name}
                  </p>
                  <p className="text-blue-600 font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                  {sold > 0 && (
                    <p className="text-xs text-green-600 mt-1">
                      {sold} vendido{sold !== 1 ? "s" : ""} hoy
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
