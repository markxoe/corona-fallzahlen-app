import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonProgressBar,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../db/Store";
import { showOrSkeleton } from "../functions/rendering";

import packageJSON from "../../package.json";
import { CoronaData, CoronaDataLocation } from "../api/types";
import { cacheDataFromAPI } from "../functions/data";
import StateOrDistrictCard from "../components/StateOrDistrictCard";
import { arrowForward, map } from "ionicons/icons";
import VaccinationCard from "../components/VaccinationCard";
import { baseURL } from "../api/api";

const PageHome: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [favorites, setFavorites] = useState<CoronaData[]>([]);
  const [imagesError, setImagesError] = useState(false);

  useEffect(() => {
    let _data: CoronaData[] = [];

    if (state.temp.cache.data) {
      _data = state.temp.cache.data.coronaData;
    }
    _data = _data.filter((i) => state.favorites.includes(i.id));
    _data = _data.sort(
      (a, b) =>
        state.favorites.indexOf(a.id ?? "") -
        state.favorites.indexOf(b.id ?? "")
    );
    setFavorites(_data);
  }, [state.favorites, state.temp]);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Einfache Fallzahlen</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Einfache Fallzahlen</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRefresher
          slot="fixed"
          onIonRefresh={(e) => {
            cacheDataFromAPI(dispatch).then(() => e.detail.complete());
          }}
          pullFactor={0.5}
          pullMin={100}
          pullMax={300}
        >
          <IonRefresherContent />
        </IonRefresher>

        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12">
              <IonCard>
                <IonCardContent>
                  {state.temp.cache.data?.meta
                    ? "Daten vom " +
                      new Date(
                        state.temp.cache.data?.meta.lastUpdate
                      ).toLocaleDateString()
                    : "Daten nicht geladen"}
                </IonCardContent>
              </IonCard>
            </IonCol>

            {favorites.map((i) => (
              <IonCol key={i.id} size="auto" sizeLg="4" sizeSm="6" sizeXs="12">
                <StateOrDistrictCard stateordistrict={i} />
              </IonCol>
            ))}
            <IonCol size="auto" sizeLg="4" sizeSm="6" sizeXs="12">
              <StateOrDistrictCard
                showColor={false}
                stateordistrict={state.temp.cache.data?.coronaData.find(
                  (i) => i.location === CoronaDataLocation.GERMANY
                )}
              />
            </IonCol>
            <IonCol size="auto" sizeLg="4" sizeSm="6" sizeXs="12">
              <VaccinationCard vaccination={state.temp.vaccination} />
            </IonCol>
            <IonCol size="auto" sizeLg="4" sizeSm="6" sizeXs="12">
              <IonCard routerLink="/districts">
                <IonCardHeader>
                  <IonCardTitle>
                    Landkreise <IonIcon icon={arrowForward} size="small" />
                  </IonCardTitle>
                </IonCardHeader>
                {!imagesError ? (
                  <img
                    onError={() => setImagesError(true)}
                    src={baseURL + "map/districts"}
                    className="lil-img-padding"
                    alt="Corona Landkarte Landkreise"
                  />
                ) : (
                  <IonCardContent>
                    <IonIcon icon={map} size="large" />
                  </IonCardContent>
                )}
              </IonCard>
            </IonCol>
            <IonCol size="auto" sizeLg="4" sizeSm="6" sizeXs="12">
              <IonCard routerLink="/states">
                <IonCardHeader>
                  <IonCardTitle>
                    Bundesländer <IonIcon icon={arrowForward} size="small" />
                  </IonCardTitle>
                </IonCardHeader>
                {!imagesError ? (
                  <img
                    src={baseURL + "map/states"}
                    className="lil-img-padding"
                    alt="Corona Landkarte Bundesländer"
                  />
                ) : (
                  <IonCardContent>
                    <IonIcon icon={map} size="large" />
                  </IonCardContent>
                )}
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" sizeSm="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Informationen</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol>Kontaktperson der API</IonCol>
                      <IonCol className="ion-text-end">
                        {showOrSkeleton(state.temp.cache.data?.meta.contact)}
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>Datenquelle</IonCol>
                      <IonCol className="ion-text-end">
                        {showOrSkeleton(state.temp.cache.data?.meta.source)}
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>Source Code zur API</IonCol>
                      <IonCol className="ion-text-end">
                        <a href={state.temp.cache.data?.meta.info}>
                          {showOrSkeleton(state.temp.cache.data?.meta.info)}
                        </a>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        Achtung: Die angezeigten Daten können von den
                        tatsächlichen Daten abweichen. Diese App sollte nicht
                        für medizinische Entscheidungen verwendet werden
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeSm="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Über</IonCardTitle>
                  <IonCardSubtitle>Über die App</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>
                    Fehler gefunden? Verbesserungsvorschläge? Diese App ist
                    OpenSource!{" "}
                    <a href="https://github.com/markxoe/corona-fallzahlen-app">
                      Zum Projekt
                    </a>
                  </p>
                  <p>App Version: {packageJSON.version}</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonProgressBar hidden={state.temp.loaded} type="indeterminate" />
      </IonFooter>
    </IonPage>
  );
};

export default PageHome;
