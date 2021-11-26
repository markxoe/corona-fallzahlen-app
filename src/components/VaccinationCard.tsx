import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
} from "@ionic/react";
import { FC } from "react";
import { APIVaccination } from "../api/types";
import {
  displayPercent,
  numberToStringWithThousands,
  showOrSkeleton,
} from "../functions/rendering";

const VaccinationCard: FC<{ vaccination?: APIVaccination }> = ({
  vaccination,
}) => (
  <IonCard>
    <IonCardHeader>
      <IonCardTitle>Impfungen</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      <IonGrid>
        <IonRow>
          <IonCol>Doppelt geimpft</IonCol>
          <IonCol className="ion-text-end">
            <p>
              {showOrSkeleton(
                vaccination?.secondVaccination.vaccinated,
                numberToStringWithThousands
              )}
              &nbsp;&nbsp;
              <IonText color="success">
                +
                {showOrSkeleton(
                  vaccination?.secondVaccination.delta,
                  numberToStringWithThousands
                )}
              </IonText>
            </p>
            <p>
              <IonText color="secondary">
                {showOrSkeleton(
                  vaccination?.secondVaccination.quote,
                  displayPercent
                )}
              </IonText>
            </p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>Einfach geimpft</IonCol>
          <IonCol className="ion-text-end">
            <p>
              {showOrSkeleton(
                vaccination?.vaccinated,
                numberToStringWithThousands
              )}
              &nbsp;&nbsp;
              <IonText color="success">
                +
                {showOrSkeleton(
                  vaccination?.delta,
                  numberToStringWithThousands
                )}
              </IonText>
            </p>
            <p>
              <IonText color="secondary">
                {showOrSkeleton(vaccination?.quote, displayPercent)}
              </IonText>
            </p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>Geboostet</IonCol>
          <IonCol className="ion-text-end">
            <p>
              {showOrSkeleton(
                vaccination?.boosterVaccination.vaccinated,
                numberToStringWithThousands
              )}
              &nbsp;&nbsp;
              <IonText color="success">
                +
                {showOrSkeleton(
                  vaccination?.boosterVaccination.delta,
                  numberToStringWithThousands
                )}
              </IonText>
            </p>
            <p>
              <IonText color="secondary">
                {showOrSkeleton(
                  vaccination?.boosterVaccination.quote,
                  displayPercent
                )}
              </IonText>
            </p>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCardContent>
  </IonCard>
);

export default VaccinationCard;
