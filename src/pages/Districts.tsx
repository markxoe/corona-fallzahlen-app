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

const PageDistricts: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [districts, setDistricts] = useState<CoronaData[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (state.temp.cache.data) {
      let _out = state.temp.cache.data.coronaData.filter(
        (i) => i.location === CoronaDataLocation.DISTRICT
      );

      if (search.length > 2) {
        _out = _out.filter((i) =>
          i.name.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        _out = [];
      }
      _out = _out.sort((a, b) => a.name.localeCompare(b.name));
      setDistricts(_out);
    }
  }, [state, search]);

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
        {search.length <= 2 ? (
          <p className="ion-padding">
            Suchbegriff länger als 3 Zeichen eingeben
          </p>
        ) : districts.length === 0 ? (
          <p className="ion-padding">Kennt man nicht</p>
        ) : (
          ""
        )}
        {districts.map((i) => (
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

export default PageDistricts;
