import { APICacheType, APIVaccinations } from "../api/types";
import { ActionType, StateType } from "./types";

export const ActionSetTempLoading = (loaded: boolean): ActionType => ({
  type: "setTempLoading",
  payload: loaded,
});

export const ActionSetTempCache = (cache: APICacheType): ActionType => ({
  type: "setTempCache",
  payload: cache,
});

export const ActionAddFavorite = (name: string): ActionType => ({
  type: "addFavorite",
  payload: name,
});

export const ActionRemoveFavorite = (name: string): ActionType => ({
  type: "removeFavorite",
  payload: name,
});

export const ActionSetState = (state: StateType): ActionType => ({
  type: "setState",
  payload: state,
});

export const ActionSetLoaded = (loaded: boolean): ActionType => ({
  type: "setLoaded",
  payload: loaded,
});

export const ActionSetTempVaccinations = (
  vaccinations?: APIVaccinations
): ActionType => ({
  type: "setTempVaccinations",
  payload: vaccinations,
});
