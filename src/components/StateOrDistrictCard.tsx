import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import React from "react";
import { CoronaData } from "../api/types";
import {
  displayValue,
  numberToStringWithThousands,
  showOrSkeleton,
} from "../functions/rendering";
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
        <IonCardTitle>
          {showOrSkeleton(stateordistrict?.name)}{" "}
          <span>
            <IonIcon size="small" icon={isFavorite ? star : starOutline} />
          </span>{" "}
        </IonCardTitle>
        <IonCardSubtitle hidden={!stateordistrict?.population}>
          {numberToStringWithThousands(stateordistrict?.population ?? 0)}{" "}
          Einwohner
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol>7-Tage Inzidenz</IonCol>
            <IonCol className="ion-text-end">
              {showOrSkeleton(stateordistrict?.weekIncidence, displayValue)}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Fälle gesamt</IonCol>
            <IonCol className="ion-text-end">
              {showOrSkeleton(
                stateordistrict?.cases,
                numberToStringWithThousands
              )}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Todesfälle gesamt</IonCol>
            <IonCol className="ion-text-end">
              {showOrSkeleton(
                stateordistrict?.deaths,
                numberToStringWithThousands
              )}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Neue Fälle</IonCol>
            <IonCol className="ion-text-end">
              {showOrSkeleton(
                stateordistrict?.delta.cases,
                numberToStringWithThousands
              )}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Neue Todesfälle</IonCol>
            <IonCol className="ion-text-end">
              {showOrSkeleton(
                stateordistrict?.delta.deaths,
                numberToStringWithThousands
              )}
            </IonCol>
          </IonRow>
          {stateordistrict?.r ? (
            <IonRow>
              <IonCol>R Wert</IonCol>
              <IonCol className="ion-text-end">
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
