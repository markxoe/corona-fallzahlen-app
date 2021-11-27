import { FC, useEffect } from "react";
import { PushNotifications } from "@capacitor/push-notifications";
import { isPlatform } from "@ionic/core";

const PushNotificationRegister: FC = ({ children }) => {
  useEffect(() => {
    if (isPlatform("capacitor")) {
      PushNotifications.addListener("registration", (token) =>
        console.log("Token", token.value)
      );
      PushNotifications.requestPermissions()
        .then(() => {
          PushNotifications.createChannel({
            id: "updates",
            importance: 3,
            name: "Updates",
            description: "Benachrichtigungen über verfügbare Updates",
            visibility: 1,
          });
          PushNotifications.register();
        })
        .catch(() => {});
    }
  }, []);

  return <>{children}</>;
};

export default PushNotificationRegister;
