import { Share as CapShare } from "@capacitor/share";

export const Share = {
  async shareOrSave(pdfDataUri: string) {
    try {
      await CapShare.share({
        title: "Reporte diario DailySells",
        text: "Reporte de ventas del día",
        url: pdfDataUri,
        dialogTitle: "Compartir reporte",
      });
    } catch {
      const blob = await (await fetch(pdfDataUri)).blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `reporte-${new Date().toISOString().slice(0, 10)}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    }
  },
};
