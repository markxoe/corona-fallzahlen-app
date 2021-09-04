import { IonSkeletonText } from "@ionic/react";

export const displayValue = (value: number) => {
  if (value % 1 === 0) {
    return value.toFixed(0);
  } else {
    return value.toFixed(2).replaceAll(".", ",");
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
  return whattoshow !== undefined && whattoshow !== null ? (
    middleware(whattoshow)
  ) : (
    <IonSkeletonText animated />
  );
};

export const numberToStringWithThousands = (input: number): string => {
  if (input >= 1000) {
    let j = input.toFixed(0).split("").reverse();
    console.log(j);
    let out = [];
    for (let i = 0; i < j.length; i++) {
      if (i % 3 === 0 && i !== 0) {
        out.push(".");
      }
      out.push(j[i]);
    }
    return out.reverse().join("");
  } else {
    return input.toString();
  }
};
