import { APICacheType } from "../api/types";
import { ActionType } from "./types";

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
