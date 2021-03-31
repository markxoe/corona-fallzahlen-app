import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
  IonProgressBar,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { CoronaData, CoronaDataLocation } from "../api/types";
import StateOrDistrictCard from "../components/StateOrDistrictCard";
import { loadMoreCount } from "../const";
import { ActionAddFavorite, ActionRemoveFavorite } from "../db/Actions";
import { AppContext } from "../db/Store";

const PageStates: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [states, setStates] = useState<CoronaData[]>([]);

  const [search, setSearch] = useState<string>("");

  const [statesRender, setStatesRender] = useState<CoronaData[]>([]);
  const [infinityDisabled, setInfinityDisabled] = useState<boolean>(false);

  const loadMore = () => {
    setStatesRender([
      ...statesRender,
      ...states.slice(statesRender.length, statesRender.length + 5),
    ]);
    setInfinityDisabled(statesRender.length + loadMoreCount >= states.length);
  };

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
    setStatesRender([]);
  }, [state, search]);

  useEffect(() => {
    if (statesRender.length === 0) loadMore();
  }, [statesRender]); // eslint-disable-line

  return (
    <IonPage>
      <IonHeader translucent>
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
      <IonContent fullscreen>
        {statesRender.map((i) => (
          <StateOrDistrictCard
            key={i.id}
            stateordistrict={i}
            isFavorite={state.favorites.includes(i.id ?? "")}
            toggleFavorite={() =>
              state.favorites.includes(i.id ?? "")
                ? dispatch(ActionRemoveFavorite(i.id ?? ""))
                : dispatch(ActionAddFavorite(i.id ?? ""))
            }
          />
        ))}
        <IonInfiniteScroll
          disabled={infinityDisabled}
          onIonInfinite={(e) => {
            loadMore();
            (e.target as HTMLIonInfiniteScrollElement).complete();
          }}
        >
          <IonInfiniteScrollContent />
        </IonInfiniteScroll>
        <IonButton
          hidden={infinityDisabled}
          expand="full"
          onClick={() => loadMore()}
        >
          Weitere Laden
        </IonButton>
      </IonContent>
      <IonFooter>
        <IonProgressBar hidden={!state.temp.loading} type="indeterminate" />
      </IonFooter>
    </IonPage>
  );
};

export default PageStates;
