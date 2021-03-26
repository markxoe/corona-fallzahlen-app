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
const StateOrDistrictCard: React.FC<{
  stateordistrict: StateOrDistrictData;
}> = ({ stateordistrict }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{stateordistrict.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol>Inzidenz</IonCol>
            <IonCol>{displayValue(stateordistrict.weekIncidence)}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Fälle</IonCol>
            <IonCol>{stateordistrict.cases}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Todesfälle</IonCol>
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
