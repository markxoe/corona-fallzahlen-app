import { IonSkeletonText } from "@ionic/react";

export const displayValue = (value: number) => {
  if (value % 1 === 0) {
    return value.toFixed(0);
  } else {
    return value.toFixed(2);
  }
};

export const makeToast = (
  message: string,
  buttons: { handler?: () => any; text: string }[]
) => {
  const el = document.createElement("ion-toast");
  el.buttons = buttons;
  el.message = message;
  el.translucent = true;
  el.present();
  document.body.appendChild(el);
};

export const showOrSkeleton = (
  whattoshow: any,
  middleware: (input: any) => any = (i) => i
) => {
  return whattoshow ? middleware(whattoshow) : <IonSkeletonText animated />;
};
