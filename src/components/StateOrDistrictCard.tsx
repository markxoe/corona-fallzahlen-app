import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import React from "react";
import { CoronaData } from "../api/types";
import { displayValue, showOrSkeleton } from "../functions/rendering";
import { close, star, starOutline } from "ionicons/icons";
import { getColorFromIncidence } from "../functions/incidence-color-generator";

const StateOrDistrictCard: React.FC<{
  stateordistrict?: CoronaData;
  isFavorite?: boolean;
  toggleFavorite?: () => any;
  showColor?: boolean;
}> = ({
  stateordistrict = undefined,
  toggleFavorite = () => {},
  isFavorite = false,
  showColor = true,
}) => {
  const showActionSheet = () => {
    const el = document.createElement("ion-action-sheet");
    el.header = "Aktionen";
    el.buttons = [
      {
        text: isFavorite ? "Favorit entfernen" : "Favorit erstellen",
        handler: () => toggleFavorite(),
        icon: isFavorite ? star : starOutline,
      },
      { text: "Abbrechen", role: "cancel", icon: close },
    ];
    el.present();
    document.body.appendChild(el);
  };

  return (
    <IonCard
      color={
        stateordistrict && showColor
          ? getColorFromIncidence(stateordistrict.weekIncidence)
          : ""
      }
      onClick={showActionSheet}
    >
      <IonCardHeader>
        <IonCardTitle>{showOrSkeleton(stateordistrict?.name)}</IonCardTitle>
        <IonCardSubtitle hidden={!isFavorite}>Favorit</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol>7-Tage Inzidenz</IonCol>
            <IonCol>
              {showOrSkeleton(stateordistrict?.weekIncidence, displayValue)}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Fälle gesamt</IonCol>
            <IonCol>
              {showOrSkeleton(stateordistrict?.cases, displayValue)}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Todesfälle gesamt</IonCol>
            <IonCol>
              {showOrSkeleton(stateordistrict?.deaths, displayValue)}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Neue Fälle</IonCol>
            <IonCol>
              {showOrSkeleton(stateordistrict?.delta.cases, displayValue)}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Neue Todesfälle</IonCol>
            <IonCol>
              {showOrSkeleton(stateordistrict?.delta.deaths, displayValue)}
            </IonCol>
          </IonRow>
          {stateordistrict?.r ? (
            <IonRow>
              <IonCol>R Wert</IonCol>
              <IonCol>
                {showOrSkeleton(stateordistrict?.r, displayValue)}
              </IonCol>
            </IonRow>
          ) : (
            ""
          )}
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default StateOrDistrictCard;
