import { useState, useMemo } from "react";
import type { Product } from "../types";
import { useProducts } from "../hooks/useProducts";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { ProductCard } from "../components/ProductCard";
import { ProductForm } from "../components/ProductForm";
import { SearchBar } from "../components/SearchBar";
import { ConfirmModal } from "../components/ConfirmModal";

export function ProductsPage() {
  const { products, loading, addProduct, updateProduct, deleteProduct } =
    useProducts();
  const { rate, calcPrice } = useExchangeRate();
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

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

  if (loading) {
    return (
      <p className="text-center text-zinc-500 mt-12 text-sm">
        Cargando...
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-zinc-100">
          Productos{" "}
          <span className="text-sm font-normal text-zinc-500">
            ({products.length})
          </span>
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-500 active:bg-blue-400 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-lg shadow-blue-600/20"
        >
          + Nuevo
        </button>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Buscar producto..." />

      {products.length === 0 && (
        <p className="text-center text-zinc-500 mt-12 text-sm">
          No hay productos. Presiona "+ Nuevo" para crear el primero.
        </p>
      )}

      {filtered.length === 0 && search && (
        <p className="text-center text-zinc-500 mt-12 text-sm">
          Sin resultados para "{search}"
        </p>
      )}

      <div className="grid grid-cols-2 gap-2">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            bsPrice={calcPrice(product)}
            onEdit={setEditing}
            onDelete={setDeleteId}
          />
        ))}
      </div>

      {(showForm || editing) && (
        <ProductForm
          key={editing?.id ?? "new"}
          initial={editing ?? undefined}
          exchangeRate={rate}
          onSubmit={(data) => {
            if (editing) {
              updateProduct(editing.id, data);
              setEditing(null);
            } else {
              addProduct(data);
              setShowForm(false);
            }
          }}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      {deleteId && (
        <ConfirmModal
          title="Eliminar producto"
          message="¿Estás seguro de eliminar este producto?"
          confirmLabel="Eliminar"
          onConfirm={() => {
            deleteProduct(deleteId);
            setDeleteId(null);
          }}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
