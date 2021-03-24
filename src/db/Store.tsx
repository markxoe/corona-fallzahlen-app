import { createContext, FC, useReducer } from "react";
import { ActionType, ContextType, StateType } from "./types";

export const AppContext = createContext<ContextType>({} as ContextType);

export const initialState: StateType = {
  temp: {
    loading: true,
    cache: {},
  },
};

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "setTempLoading": {
      return { ...state, temp: { ...state.temp, loading: action.payload } };
    }
    case "setTempCache": {
      return { ...state, temp: { ...state.temp, cache: action.payload } };
    }
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
