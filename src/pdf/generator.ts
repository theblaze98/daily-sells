import jsPDF from "jspdf";
import type { Product, Sale } from "../types";

export function generateDailyReport(
  products: Product[],
  sales: Sale[]
): jsPDF {
  const productMap = new Map(products.map((p) => [p.id, p]));
  const today = new Date().toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFontSize(18);
  doc.text("DailySells", pageWidth / 2, 20, { align: "center" });
  doc.setFontSize(11);
  doc.text(`Reporte del ${today}`, pageWidth / 2, 28, { align: "center" });

  // Separator
  doc.setDrawColor(200);
  doc.line(14, 33, pageWidth - 14, 33);

  let y = 42;

  // Group sales by product
  const grouped = new Map<string, { quantity: number; total: number }>();
  for (const sale of sales) {
    const prev = grouped.get(sale.productId) ?? { quantity: 0, total: 0 };
    grouped.set(sale.productId, {
      quantity: prev.quantity + sale.quantity,
      total: prev.total + sale.quantity * sale.unitPrice,
    });
  }

  // Sales detail
  doc.setFontSize(12);
  doc.text("Ventas del día:", 14, y);
  y += 8;

  doc.setFontSize(9);
  for (const [productId, data] of grouped) {
    const name = productMap.get(productId)?.name ?? "Producto eliminado";
    const line = `${name}: ${data.quantity} x $${(data.total / data.quantity).toFixed(2)} = $${data.total.toFixed(2)}`;
    doc.text(line, 18, y);
    y += 6;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  }

  // Separator
  y += 4;
  doc.setDrawColor(200);
  doc.line(14, y, pageWidth - 14, y);
  y += 6;

  // Summary
  const totalQuantity = sales.reduce((s, sale) => s + sale.quantity, 0);
  const totalRevenue = sales.reduce(
    (s, sale) => s + sale.quantity * sale.unitPrice,
    0
  );

  doc.setFontSize(11);
  doc.text(`Total de ventas: ${totalQuantity}`, 14, y);
  y += 6;
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text(`Total ingresado: $${totalRevenue.toFixed(2)}`, 14, y);
  doc.setFont("helvetica", "normal");

  return doc;
}
