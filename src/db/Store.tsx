import { createContext, FC, useReducer } from "react";
import { ActionType, ContextType, StateType } from "./types";

import { Storage } from "@capacitor/storage";

export const AppContext = createContext<ContextType>({} as ContextType);

export const initialState: StateType = {
  temp: {
    loading: true,
    cache: {},
  },
  favorites: [],
  dataLoadedFromStore: false,
};

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "setTempLoading": {
      return { ...state, temp: { ...state.temp, loading: action.payload } };
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
        temp: state.temp,
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
  const toSave: StateType = { ...state, temp: initialState.temp };

  Storage.set({
    key: "corona-fallzahlen-app-state",
    value: JSON.stringify(toSave),
  });
};

export const loadData = async (): Promise<StateType> => {
  return await Storage.get({ key: "corona-fallzahlen-app-state" })
    .then((d) => {
      if (d.value && d.value !== "") {
        return { ...initialState, ...JSON.parse(d.value) };
      } else {
        return initialState;
      }
    })
    .catch(() => {
      return initialState;
    });
};
