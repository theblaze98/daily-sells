export type Product = {
  id: string;
  name: string;
  price: number;
  category?: string;
};

export type Sale = {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  createdAt: number;
};

export type DailySummary = {
  totalSales: number;
  totalRevenue: number;
  topProducts: { productId: string; quantity: number; revenue: number }[];
};

export type Page = "products" | "sales" | "dashboard";
