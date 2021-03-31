import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonProgressBar,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { CoronaData, CoronaDataLocation } from "../api/types";
import StateOrDistrictCard from "../components/StateOrDistrictCard";
import { ActionAddFavorite, ActionRemoveFavorite } from "../db/Actions";
import { AppContext } from "../db/Store";

const PageStates: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [states, setStates] = useState<CoronaData[]>([]);

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (state.temp.cache.data) {
      let _out = state.temp.cache.data.coronaData.filter(
        (i) => i.location === CoronaDataLocation.STATE
      );
      if (search.length > 0) {
        _out = _out.filter((i) =>
          i.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      _out = _out.sort((a, b) => a.name.localeCompare(b.name));
      setStates(_out);
    }
  }, [state, search]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton routerAnimation={undefined} defaultHref="/home" />
          </IonButtons>
          <IonTitle>Bundesländer</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            onIonChange={(e) => {
              setSearch(e.detail.value ?? "");
            }}
            placeholder="Suche"
            value={search}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {states.map((i) => (
          <StateOrDistrictCard
            stateordistrict={i}
            isFavorite={state.favorites.includes(i.id ?? "")}
            toggleFavorite={() =>
              state.favorites.includes(i.id ?? "")
                ? dispatch(ActionRemoveFavorite(i.id ?? ""))
                : dispatch(ActionAddFavorite(i.id ?? ""))
            }
          />
        ))}
      </IonContent>
      <IonFooter>
        <IonProgressBar hidden={!state.temp.loading} type="indeterminate" />
      </IonFooter>
    </IonPage>
  );
};

export default PageStates;
