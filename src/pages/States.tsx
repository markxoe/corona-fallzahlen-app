import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { StateOrDistrictData } from "../api/types";
import StateOrDistrictCard from "../components/StateOrDistrictCard";
import { ActionAddFavorite, ActionRemoveFavorite } from "../db/Actions";
import { AppContext } from "../db/Store";
import { ConvertStateToCoronaData } from "../functions/data";

const PageStates: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [states, setStates] = useState<StateOrDistrictData[]>([]);

  useEffect(() => {
    if (state.temp.cache.data) {
      const keys = Object.keys(state.temp.cache.data.states.data);
      let _out: StateOrDistrictData[] = [];
      keys.forEach((i) => {
        const _state = state.temp.cache.data?.states.data[i];
        if (_state) _out = [..._out, ConvertStateToCoronaData(_state)];
      });
      _out = _out.sort((a, b) => a.name.localeCompare(b.name));
      setStates(_out);
    }
  }, [state]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton routerAnimation={undefined} defaultHref="/home" />
          </IonButtons>
          <IonTitle>Bundesländer</IonTitle>
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
