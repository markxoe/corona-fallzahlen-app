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
  IonPage,
  IonProgressBar,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../db/Store";
import { displayValue, showOrSkeleton } from "../functions/rendering";

import packageJSON from "../../package.json";
import { StateOrDistrictData } from "../api/types";
import {
  ConvertDistrictToCoronaData,
  ConvertStateToCoronaData,
} from "../functions/data";
import { ActionRemoveFavorite } from "../db/Actions";
import StateOrDistrictCard from "../components/StateOrDistrictCard";

const PageHome: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [favorites, setFavorites] = useState<StateOrDistrictData[]>([]);

  useEffect(() => {
    let _data: StateOrDistrictData[] = [];

    if (state.temp.cache.data) {
      const stateKeys = Object.keys(state.temp.cache.data.states.data);
      const favoriteStatesKeys = stateKeys.filter((i) =>
        state.favorites.includes(i)
      );

      let _states: StateOrDistrictData[] = [];
      favoriteStatesKeys.forEach((i) => {
        const _state = state.temp.cache.data?.states.data[i];
        if (_state) _states = [..._states, ConvertStateToCoronaData(_state, i)];
      });

      const districtKeys = Object.keys(state.temp.cache.data.districts.data);
      console.log(districtKeys);
      const favoriteDistrictKeys = districtKeys.filter((i) =>
        state.favorites.includes(i)
      );

      let _districts: StateOrDistrictData[] = [];
      favoriteDistrictKeys.forEach((i) => {
        const _district = state.temp.cache.data?.districts.data[i];
        if (_district)
          _districts = [
            ..._districts,
            ConvertDistrictToCoronaData(_district, i),
          ];
      });

      _data = [..._states, ..._districts];
    }
    setFavorites(_data);
  }, [state.favorites, state.temp]);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Corona Fallzahlen</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Corona Fallzahlen</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonCardContent>
            {state.temp.cache.data?.germany
              ? "Daten vom " +
                new Date(
                  state.temp.cache.data.germany.meta.lastUpdate
                ).toLocaleDateString()
              : "Daten nicht geladen"}
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Favoriten</IonCardTitle>
          </IonCardHeader>
        </IonCard>

        {/* <IonCard>
          <IonCardHeader>
            <IonCardTitle>Favoriten</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <b>Name</b>
                </IonCol>
                <IonCol className="ion-text-end">Inzidenz</IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard> */}
        {favorites.map((i) => (
          <StateOrDistrictCard
            stateordistrict={i}
            isFavorite={true}
            toggleFavorite={() => dispatch(ActionRemoveFavorite(i.id ?? ""))}
          />
        ))}

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Deutschland</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>Fälle</IonCol>
                <IonCol>
                  {showOrSkeleton(
                    state.temp.cache.data?.germany.cases,
                    displayValue
                  )}
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Inzidenz</IonCol>
                <IonCol>
                  {showOrSkeleton(
                    state.temp.cache.data?.germany.weekIncidence,
                    displayValue
                  )}
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Neuinfektionen</IonCol>
                <IonCol>
                  {showOrSkeleton(
                    state.temp.cache.data?.germany.weekIncidence,
                    displayValue
                  )}
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Todesfälle</IonCol>
                <IonCol>
                  {showOrSkeleton(
                    state.temp.cache.data?.germany.delta.deaths,
                    displayValue
                  )}
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>R Wert</IonCol>
                <IonCol>
                  {showOrSkeleton(
                    state.temp.cache.data?.germany.r.value,
                    displayValue
                  )}
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonCard routerLink="/districts">
          <IonCardHeader>
            <IonCardTitle>Landkreise</IonCardTitle>
          </IonCardHeader>
          <img
            src="https://api.corona-zahlen.org/map/districts"
            className="lil-img-padding"
            alt="Corona Landkarte Landkreise"
          />
        </IonCard>
        <IonCard routerLink="/states">
          <IonCardHeader>
            <IonCardTitle>Bundesländer</IonCardTitle>
          </IonCardHeader>
          <img
            src="https://api.corona-zahlen.org/map/states"
            className="lil-img-padding"
            alt="Corona Landkarte Bundesländer"
          />
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Informationen</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>Kontakt</IonCol>
                <IonCol className="ion-text-end">
                  {showOrSkeleton(state.temp.cache.data?.germany.meta.contact)}
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Quelle</IonCol>
                <IonCol className="ion-text-end">
                  {showOrSkeleton(state.temp.cache.data?.germany.meta.source)}
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Source Code zur API</IonCol>
                <IonCol className="ion-text-end">
                  <a href={state.temp.cache.data?.germany.meta.info}>
                    {showOrSkeleton(state.temp.cache.data?.germany.meta.info)}
                  </a>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  Achtung: Die angezeigten Daten können von den tatsächlichen
                  Daten abweichen. Diese App sollte nicht für medizinische
                  Entscheidungen verwendet werden
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
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
      </IonContent>
      <IonFooter>
        <IonProgressBar hidden={!state.temp.loading} type="indeterminate" />
      </IonFooter>
    </IonPage>
  );
};

export default PageHome;
