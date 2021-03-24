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
