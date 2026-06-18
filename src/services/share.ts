import { Share as CapShare } from "@capacitor/share";
import { Filesystem, Directory } from "@capacitor/filesystem";

function base64FromDataUri(uri: string): string {
  return uri.includes(",") ? uri.split(",")[1] : uri;
}

function fileName(): string {
  return `reporte-${new Date().toISOString().slice(0, 10)}.pdf`;
}

export const Share = {
  async shareOrSave(pdfDataUri: string) {
    const name = fileName();
    const base64 = base64FromDataUri(pdfDataUri);

    await Filesystem.writeFile({
      path: name,
      data: base64,
      directory: Directory.Cache,
    });

    const { uri } = await Filesystem.getUri({
      path: name,
      directory: Directory.Cache,
    });

    try {
      await CapShare.share({
        title: "Reporte diario DailySells",
        text: "Ventas del día",
        url: uri,
        dialogTitle: "Compartir reporte",
      });
    } catch {
      await Filesystem.copy({
        from: name,
        directory: Directory.Cache,
        to: `Download/${name}`,
        toDirectory: Directory.ExternalStorage,
      }).catch(() => {
        // Fallback: keep in cache
      });
    }
  },
};
