/// <reference types="@capacitor/splash-screen" />
import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "org.toastbrot.covidcases",
  appName: "Einfache Fallzahlen",
  webDir: "build",
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      androidScaleType: "FIT_CENTER",
      backgroundColor: "#000000",
    },
  },
};

export default config;
