import { Preferences } from "@capacitor/preferences";

const KEYS = {
  PRODUCTS: "daily_sells_products",
  SALES: "daily_sells_sales",
} as const;

export const storage = {
  async get<T>(key: string): Promise<T | null> {
    const { value } = await Preferences.get({ key });
    if (!value) return null;
    return JSON.parse(value) as T;
  },

  async set<T>(key: string, value: T): Promise<void> {
    await Preferences.set({ key, value: JSON.stringify(value) });
  },

  async remove(key: string): Promise<void> {
    await Preferences.remove({ key });
  },
};

export { KEYS };
