import { Dispatch } from "react";
import { getCache } from "../api/api";
import { ActionSetTempCache, ActionSetTempLoading } from "../db/Actions";
import { ActionType } from "../db/types";
import { makeToast } from "./rendering";

export const cacheDataFromAPI = async (dispatch: Dispatch<ActionType>) => {
  dispatch(ActionSetTempLoading(true));
  const _data = await getCache();
  dispatch(ActionSetTempCache(_data));
  dispatch(ActionSetTempLoading(false));

  if (!_data.data)
    makeToast("Fehler beim Laden, versuch's später wieder", [
      { text: "Ok schade" },
    ]);
};
