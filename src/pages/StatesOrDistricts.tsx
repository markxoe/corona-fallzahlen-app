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

const PageStatesOrDistricts: React.FC<{
  statesOrDistricts: "states" | "districts";
}> = ({ statesOrDistricts = "states" }) => {
  const { state, dispatch } = useContext(AppContext);
  const [statesOrDistrictsData, setstatesOrDistrictsData] = useState<
    CoronaData[]
  >([]);

  const [search, setSearch] = useState<string>("");

  const [
    statesOrDistrictsDataRender,
    setstatesOrDistrictsDataRender,
  ] = useState<CoronaData[]>([]);
  const [infinityDisabled, setInfinityDisabled] = useState<boolean>(false);

  const loadMore = () => {
    setstatesOrDistrictsDataRender([
      ...statesOrDistrictsDataRender,
      ...statesOrDistrictsData.slice(
        statesOrDistrictsDataRender.length,
        statesOrDistrictsDataRender.length + 5
      ),
    ]);
    setInfinityDisabled(
      statesOrDistrictsDataRender.length + loadMoreCount >=
        statesOrDistrictsData.length
    );
  };

  useEffect(() => {
    let statesOrDistrictsDataTemp: CoronaData[] = statesOrDistrictsData;
    if (state.temp.cache.data) {
      let _out = state.temp.cache.data.coronaData.filter(
        (i) =>
          i.location ===
          (statesOrDistricts === "states"
            ? CoronaDataLocation.STATE
            : CoronaDataLocation.DISTRICT)
      );
      if (search.length > 0) {
        _out = _out.filter((i) =>
          i.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      _out = _out.sort((a, b) =>
        (a.nameToSort ?? a.name).localeCompare(b.nameToSort ?? b.name)
      );
      setstatesOrDistrictsData(_out);
      statesOrDistrictsDataTemp = _out;
    }
    setstatesOrDistrictsDataRender(
      statesOrDistrictsDataTemp.slice(0, statesOrDistrictsDataRender.length)
    );
  }, [state, search, statesOrDistricts]); // eslint-disable-line

  useEffect(() => {
    if (statesOrDistrictsDataRender.length === 0) loadMore();
  }, [statesOrDistrictsDataRender]); // eslint-disable-line

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton routerAnimation={undefined} defaultHref="/home" />
          </IonButtons>
          <IonTitle>
            {statesOrDistricts === "states" ? "Bundesländer" : "Landkreise"}
          </IonTitle>
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
        {statesOrDistrictsDataRender.map((i) => (
          <StateOrDistrictCard
            key={i.id}
            stateordistrict={i}
            isFavorite={state.favorites.includes(i.id ?? "")}
            toggleFavorite={() => {
              state.favorites.includes(i.id ?? "")
                ? dispatch(ActionRemoveFavorite(i.id ?? ""))
                : dispatch(ActionAddFavorite(i.id ?? ""));
            }}
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

export default PageStatesOrDistricts;
