import { useState, useEffect, useCallback } from "react";
import { storage } from "../services/storage";

const KEY = "daily_exchange_rate";

export function useExchangeRate() {
  const [rate, setRate] = useState(1);

  useEffect(() => {
    storage.get<number>(KEY).then((data) => {
      if (data && data > 0) setRate(data);
    });
  }, []);

  const setExchangeRate = useCallback((value: number) => {
    setRate(value);
    storage.set(KEY, value);
  }, []);

  const calcPrice = useCallback(
    (product: { price: number; usdPrice?: number }) =>
      product.usdPrice ? Math.round(product.usdPrice * rate) : product.price,
    [rate]
  );

  return { rate, setExchangeRate, calcPrice };
}
