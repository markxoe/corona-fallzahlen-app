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
import React, { useContext } from "react";
import { CoronaData, CoronaDataLocation } from "../api/types";
import {
  displayValue,
  numberToStringWithThousands,
  showOrSkeleton,
} from "../functions/rendering";
import { close, star, starOutline } from "ionicons/icons";
import { getColorFromIncidence } from "../functions/incidence-color-generator";
import { AppContext } from "../db/Store";
import { ActionAddFavorite, ActionRemoveFavorite } from "../db/Actions";

const StateOrDistrictCard: React.FC<{
  stateordistrict?: CoronaData;
  showColor?: boolean;
}> = ({ stateordistrict = undefined, showColor = true }) => {
  const { state, dispatch } = useContext(AppContext);

  const isFavorite = state.favorites.find((i) => i === stateordistrict?.id);

  const showActionSheet = () => {
    if (
      stateordistrict?.location === CoronaDataLocation.DISTRICT ||
      stateordistrict?.location === CoronaDataLocation.STATE
    ) {
      const el = document.createElement("ion-action-sheet");
      el.header = "Aktionen";
      el.buttons = [
        {
          text: stateordistrict
            ? isFavorite
              ? "Favorit entfernen"
              : "Favorit erstellen"
            : "Nicht geladen",
          handler: () =>
            stateordistrict &&
            dispatch(
              isFavorite
                ? ActionRemoveFavorite(stateordistrict.id)
                : ActionAddFavorite(stateordistrict.id)
            ),
          icon: isFavorite ? star : starOutline,
        },
        { text: "Abbrechen", role: "cancel", icon: close },
      ];
      el.present();
      document.body.appendChild(el);
    }
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
          <span
            hidden={
              stateordistrict?.location !== CoronaDataLocation.DISTRICT &&
              stateordistrict?.location !== CoronaDataLocation.STATE
            }
          >
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
            <IonCol>Fälle</IonCol>
            <IonCol className="ion-text-end">
              <p>
                {showOrSkeleton(
                  stateordistrict?.cases,
                  numberToStringWithThousands
                )}
              </p>
              <p>
                +{" "}
                {showOrSkeleton(
                  stateordistrict?.delta.cases,
                  numberToStringWithThousands
                )}
              </p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Todesfälle</IonCol>
            <IonCol className="ion-text-end">
              <p>
                {showOrSkeleton(
                  stateordistrict?.deaths,
                  numberToStringWithThousands
                )}
              </p>
              <p>
                +{" "}
                {showOrSkeleton(
                  stateordistrict?.delta.deaths,
                  numberToStringWithThousands
                )}
              </p>
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
