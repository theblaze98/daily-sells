import { useState, useEffect, useCallback } from "react";
import type { Product } from "../types";
import { storage, KEYS } from "../services/storage";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storage.get<Product[]>(KEYS.PRODUCTS).then((data) => {
      if (data) setProducts(data);
      setLoading(false);
    });
  }, []);

  const save = useCallback((updated: Product[]) => {
    setProducts(updated);
    storage.set(KEYS.PRODUCTS, updated);
  }, []);

  const addProduct = useCallback(
    (product: Omit<Product, "id">) => {
      const newProduct: Product = { ...product, id: crypto.randomUUID() };
      save([...products, newProduct]);
      return newProduct;
    },
    [products, save]
  );

  const updateProduct = useCallback(
    (id: string, data: Partial<Omit<Product, "id">>) => {
      const updated = products.map((p) =>
        p.id === id ? { ...p, ...data } : p
      );
      save(updated);
    },
    [products, save]
  );

  const deleteProduct = useCallback(
    (id: string) => {
      save(products.filter((p) => p.id !== id));
    },
    [products, save]
  );

  return { products, loading, addProduct, updateProduct, deleteProduct };
}
