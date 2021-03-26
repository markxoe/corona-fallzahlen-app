import { Dispatch } from "react";
import { APICacheType } from "../api/types";

export interface StateType {
  temp: TempType;
  favorites: (string | number)[];
  dataLoadedFromStore: boolean;
}

export interface ContextType {
  state: StateType;
  dispatch: Dispatch<ActionType>;
}
export interface ActionType {
  type: string;
  payload?: any;
}

export interface TempType {
  cache: APICacheType;
  loading: boolean;
}
