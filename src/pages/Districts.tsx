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

const PageDistricts: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [districts, setDistricts] = useState<CoronaData[]>([]);
  const [districtsRender, setDistrictsRender] = useState<CoronaData[]>([]);
  const [infinityDisabled, setInfinityDisabled] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const loadMore = () => {
    console.log("Load More");
    setDistrictsRender([
      ...districtsRender,
      ...districts.slice(districtsRender.length, districtsRender.length + 5),
    ]);
    setInfinityDisabled(
      districtsRender.length + loadMoreCount >= districts.length
    );
  };

  useEffect(() => {
    if (state.temp.cache.data) {
      let _out = state.temp.cache.data.coronaData.filter(
        (i) => i.location === CoronaDataLocation.DISTRICT
      );

      if (search.length > 2) {
        _out = _out.filter((i) =>
          i.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      _out = _out.sort((a, b) => a.name.localeCompare(b.name));
      setDistricts(_out);
      setDistrictsRender([]);
    }
  }, [state, search]);

  useEffect(() => {
    if (districtsRender.length === 0) loadMore();
  }, [districtsRender]); // eslint-disable-line

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Landkreise</IonTitle>
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
        {districtsRender.map((i) => (
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

export default PageDistricts;
