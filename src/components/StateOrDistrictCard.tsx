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
import { StateOrDistrictData } from "../api/types";
import { displayValue } from "../functions/rendering";
import { close, star, starOutline } from "ionicons/icons";
import { getColorFromIncidence } from "../functions/incidence-color-generator";

const StateOrDistrictCard: React.FC<{
  stateordistrict: StateOrDistrictData;
  isFavorite?: boolean;
  toggleFavorite?: () => any;
}> = ({ stateordistrict, toggleFavorite = () => {}, isFavorite = false }) => {
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
      color={getColorFromIncidence(stateordistrict.weekIncidence)}
      onClick={showActionSheet}
    >
      <IonCardHeader>
        <IonCardTitle>{stateordistrict.name}</IonCardTitle>
        <IonCardSubtitle hidden={!isFavorite}>Favorit</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol>7-Tage Inzidenz</IonCol>
            <IonCol>{displayValue(stateordistrict.weekIncidence)}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Fälle gesamt</IonCol>
            <IonCol>{stateordistrict.cases}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Todesfälle gesamt</IonCol>
            <IonCol>{stateordistrict.deaths}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Neue Fälle</IonCol>
            <IonCol>{stateordistrict.delta.cases}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Neue Todesfälle</IonCol>
            <IonCol>{stateordistrict.delta.deaths}</IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default StateOrDistrictCard;
