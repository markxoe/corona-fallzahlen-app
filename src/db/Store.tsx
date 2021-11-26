import { createContext, FC, useReducer } from "react";
import { ActionType, ContextType, StateType } from "./types";

import { Storage } from "@capacitor/storage";
import moment from "moment";

export const AppContext = createContext<ContextType>({} as ContextType);

export const initialState: StateType = {
  temp: {
    loaded: false,
    cache: {},
  },
  favorites: [],
  dataLoadedFromStore: false,
};

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "setTempLoaded": {
      return { ...state, temp: { ...state.temp, loaded: action.payload } };
    }
    case "setTempCache": {
      return { ...state, temp: { ...state.temp, cache: action.payload } };
    }
    case "addFavorite": {
      return { ...state, favorites: [...state.favorites, action.payload] };
    }
    case "removeFavorite": {
      return {
        ...state,
        favorites: state.favorites.filter((i) => i !== action.payload),
      };
    }
    case "setState": {
      return {
        ...action.payload,
      };
    }
    case "setLoaded": {
      return { ...state, dataLoadedFromStore: action.payload };
    }

    case "setTempVaccinations":
      return { ...state, temp: { ...state.temp, vaccination: action.payload } };
  }
  return state;
};

export const AppContextProvider: FC = (props: any) => {
  let [state, dispatch] = useReducer(reducer, initialState);
  let value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export const saveData = (state: StateType) => {
  const toSave: StateType = { ...state };

  Storage.set({
    key: "corona-fallzahlen-app-state",
    value: JSON.stringify(toSave),
  });
};

export const isTempFromToday = (temp: StateType["temp"]): boolean => {
  if (!temp.loaded) return false;
  if (!temp.cache.data) return false;
  if (!temp.vaccination) return false;
  const date = temp.cache.data.meta.lastUpdate;
  return moment(date).isSame(moment(), "date");
};

export const loadData = async (): Promise<StateType> => {
  return await Storage.get({ key: "corona-fallzahlen-app-state" })
    .then((d) => {
      if (d.value && d.value !== "") {
        const newData = JSON.parse(d.value) as StateType;

        if (!isTempFromToday(newData.temp)) newData.temp = initialState.temp;

        return { ...initialState, ...newData };
      } else {
        return initialState;
      }
    })
    .catch(() => {
      return initialState;
    });
};
