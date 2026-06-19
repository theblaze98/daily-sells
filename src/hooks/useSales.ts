import { useState, useEffect, useCallback } from "react";
import type { Sale, DailySummary } from "../types";
import { storage, KEYS } from "../services/storage";

function getTodayRange() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start: start.getTime(), end: end.getTime() };
}

function computeSummary(
  sales: Sale[]
): DailySummary {
  const productMap = new Map<
    string,
    { quantity: number; revenue: number }
  >();

  for (const sale of sales) {
    const prev = productMap.get(sale.productId) ?? {
      quantity: 0,
      revenue: 0,
    };
    productMap.set(sale.productId, {
      quantity: prev.quantity + sale.quantity,
      revenue: prev.revenue + sale.quantity * sale.unitPrice,
    });
  }

  const topProducts = Array.from(productMap.entries())
    .map(([productId, data]) => ({ productId, ...data }))
    .sort((a, b) => b.quantity - a.quantity);

  return {
    totalSales: sales.reduce((sum, s) => sum + s.quantity, 0),
    totalRevenue: sales.reduce((sum, s) => sum + s.quantity * s.unitPrice, 0),
    topProducts,
  };
}

export function useSales() {
  const [allSales, setAllSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storage.get<Sale[]>(KEYS.SALES).then((data) => {
      if (data) setAllSales(data);
      setLoading(false);
    });
  }, []);

  const save = useCallback((updated: Sale[]) => {
    setAllSales(updated);
    storage.set(KEYS.SALES, updated);
  }, []);

  const addSale = useCallback(
    (productId: string, quantity: number, unitPrice: number) => {
      const sale: Sale = {
        id: crypto.randomUUID(),
        productId,
        quantity,
        unitPrice,
        createdAt: Date.now(),
      };
      save([...allSales, sale]);
      return sale;
    },
    [allSales, save]
  );

  const getTodaySales = useCallback(() => {
    const { start, end } = getTodayRange();
    return allSales.filter((s) => s.createdAt >= start && s.createdAt <= end);
  }, [allSales]);

  const getTodaySummary = useCallback((): DailySummary => {
    return computeSummary(getTodaySales());
  }, [getTodaySales]);

  const updateSale = useCallback(
    (id: string, data: { quantity?: number; unitPrice?: number }) => {
      const updated = allSales.map((s) =>
        s.id === id ? { ...s, ...data } : s
      );
      save(updated);
    },
    [allSales, save]
  );

  const deleteSale = useCallback(
    (id: string) => {
      save(allSales.filter((s) => s.id !== id));
    },
    [allSales, save]
  );

  const clearTodaySales = useCallback(() => {
    const { start, end } = getTodayRange();
    const remaining = allSales.filter(
      (s) => s.createdAt < start || s.createdAt > end
    );
    save(remaining);
  }, [allSales, save]);

  return {
    allSales,
    loading,
    addSale,
    updateSale,
    deleteSale,
    getTodaySales,
    getTodaySummary,
    clearTodaySales,
  };
}
