/// <reference types="@capacitor/splash-screen" />
/// <reference types="@capacitor/push-notifications" />

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
    PushNotifications: {
      presentationOptions: ["alert", "badge", "sound"],
    },
  },
};

export default config;
