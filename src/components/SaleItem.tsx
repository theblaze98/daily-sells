import type { Sale } from "../types";

type Props = {
  sale: Sale;
  productName: string;
};

export function SaleItem({ sale, productName }: Props) {
  const time = new Date(sale.createdAt).toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-800">{productName}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold">
          x{sale.quantity}
        </p>
        <p className="text-xs text-gray-500">
          ${(sale.quantity * sale.unitPrice).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
