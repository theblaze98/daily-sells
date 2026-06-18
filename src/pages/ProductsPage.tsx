import { useState } from "react";
import type { Product } from "../types";
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/ProductCard";
import { ProductForm } from "../components/ProductForm";

export function ProductsPage() {
  const { products, loading, addProduct, updateProduct, deleteProduct } =
    useProducts();
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  if (loading) {
    return (
      <p className="text-center text-gray-400 mt-8">Cargando...</p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Productos</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            + Nuevo
          </button>
        )}
      </div>

      {showForm && (
        <ProductForm
          onSubmit={(data) => {
            addProduct(data);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editing && (
        <ProductForm
          initial={editing}
          onSubmit={(data) => {
            updateProduct(editing.id, data);
            setEditing(null);
          }}
          onCancel={() => setEditing(null)}
        />
      )}

      {products.length === 0 && !showForm && (
        <p className="text-center text-gray-400 mt-8">
          No hay productos. Crea el primero.
        </p>
      )}

      <div className="space-y-2">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={setEditing}
            onDelete={deleteProduct}
          />
        ))}
      </div>
    </div>
  );
}
