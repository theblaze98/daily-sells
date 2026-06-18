import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.dailysells.app",
  appName: "DailySells",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
