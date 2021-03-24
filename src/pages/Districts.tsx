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
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { APIDistrictType } from "../api/types";
import { AppContext } from "../db/Store";
import { displayValue } from "../functions/rendering";

const PageDistricts: React.FC = () => {
  const { state } = useContext(AppContext);
  const [districts, setDistricts] = useState<APIDistrictType[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (state.temp.cache.data) {
      const keys = Object.keys(state.temp.cache.data.districts.data);
      let _out: APIDistrictType[] = [];

      keys.forEach((i) => {
        const _state = state.temp.cache.data?.districts.data[i];
        if (_state) _out = [..._out, _state];
      });
      if (search.length > 3) {
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
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Landkreise</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            onIonChange={(e) => {
              setSearch(e.detail.value ?? "");
            }}
            value={search}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {search.length <= 3 ? (
          <p className="ion-padding">
            Suchbegriff länger als 3 Zeichen eingeben
          </p>
        ) : districts.length === 0 ? (
          <p className="ion-padding">Kennt man nicht</p>
        ) : (
          ""
        )}
        {districts.map((i) => (
          <OneDistrict district={i} />
        ))}
      </IonContent>
      <IonFooter>
        <IonProgressBar hidden={!state.temp.loading} type="indeterminate" />
      </IonFooter>
    </IonPage>
  );
};

const OneDistrict: React.FC<{ district: APIDistrictType }> = ({ district }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{district.name}</IonCardTitle>
        <IonCardSubtitle>
          Inzidenz: {displayValue(district.weekIncidence)}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol>Fälle</IonCol>
            <IonCol className="">{district.cases}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Todesfälle</IonCol>
            <IonCol>{district.deaths}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Neue Fälle</IonCol>
            <IonCol>{district.delta.cases}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Neue Todesfälle</IonCol>
            <IonCol>{district.delta.deaths}</IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default PageDistricts;
