import { Dispatch } from "react";
import { getCache } from "../api/api";
import {
  APIDistrictType,
  APIStateType,
  StateOrDistrictData,
} from "../api/types";
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

export const ConvertStateToCoronaData = (
  state: APIStateType
): StateOrDistrictData => {
  return {
    cases: state.cases,
    casesPer100k: state.casesPer100k,
    casesPerWeek: state.casesPerWeek,
    deaths: state.deaths,
    deathsPerWeek: state.deathsPerWeek,
    delta: state.delta,
    name: state.name,
    recovered: state.recovered,
    weekIncidence: state.weekIncidence,
  };
};

export const ConvertDistrictToCoronaData = (
  district: APIDistrictType
): StateOrDistrictData => {
  return {
    cases: district.cases,
    casesPer100k: district.casesPer100k,
    casesPerWeek: district.casesPerWeek,
    deaths: district.deaths,
    deathsPerWeek: district.deathsPerWeek,
    delta: district.delta,
    name: district.name,
    recovered: district.recovered,
    weekIncidence: district.weekIncidence,
  };
};
