import {
  IonBackButton,
  IonButtons,
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
import React, { useContext, useEffect, useState } from "react";
import { APIStateType } from "../api/types";
import { AppContext } from "../db/Store";
import { displayValue } from "../functions/rendering";

const PageStates: React.FC = () => {
  const { state } = useContext(AppContext);
  const [states, setStates] = useState<APIStateType[]>([]);

  useEffect(() => {
    if (state.temp.cache.data) {
      const keys = Object.keys(state.temp.cache.data.states.data);
      let _out: APIStateType[] = [];
      keys.forEach((i) => {
        const _state = state.temp.cache.data?.states.data[i];
        if (_state) _out = [..._out, _state];
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
            <IonBackButton />
          </IonButtons>
          <IonTitle>Bundesländer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {states.map((i) => (
          <OneState state={i} />
        ))}
      </IonContent>
      <IonFooter>
        <IonProgressBar hidden={!state.temp.loading} type="indeterminate" />
      </IonFooter>
    </IonPage>
  );
};

const OneState: React.FC<{ state: APIStateType }> = ({ state }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{state.name}</IonCardTitle>
        <IonCardSubtitle>
          Inzidenz: {displayValue(state.weekIncidence)}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol>Fälle</IonCol>
            <IonCol className="">{state.cases}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Todesfälle</IonCol>
            <IonCol>{state.deaths}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Neue Fälle</IonCol>
            <IonCol>{state.delta.cases}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Neue Todesfälle</IonCol>
            <IonCol>{state.delta.deaths}</IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default PageStates;
