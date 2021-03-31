import { Dispatch } from "react";
import { getCache } from "../api/api";
import {
  APIDistrictsResponseType,
  APIDistrictType,
  APIGermanyType,
  APIStatesResponseType,
  APIStateType,
  CoronaData,
  CoronaDataLocation,
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

export const ConvertStateToCoronaData = (state: APIStateType): CoronaData => {
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
    id: state.abbreviation,
    location: CoronaDataLocation.STATE,
  };
};

export const ConvertDistrictToCoronaData = (
  district: APIDistrictType
): CoronaData => {
  return {
    cases: district.cases,
    casesPer100k: district.casesPer100k,
    casesPerWeek: district.casesPerWeek,
    deaths: district.deaths,
    deathsPerWeek: district.deathsPerWeek,
    delta: district.delta,
    name: district.county,
    recovered: district.recovered,
    weekIncidence: district.weekIncidence,
    id: district.ags,
    location: CoronaDataLocation.DISTRICT,
  };
};

export const ConvertGermanyToCoronaData = (
  germany: APIGermanyType
): CoronaData => {
  return {
    cases: germany.cases,
    casesPer100k: germany.casesPer100k,
    casesPerWeek: germany.casesPerWeek,
    deaths: germany.deaths,
    delta: germany.delta,
    name: "Deutschland",
    recovered: germany.recovered,
    weekIncidence: germany.weekIncidence,
    id: "de",
    location: CoronaDataLocation.GERMANY,
    r: germany.r.value,
  };
};

export const convertAllDistricts = (
  data: APIDistrictsResponseType
): CoronaData[] => {
  return Object.keys(data.data).map((i) =>
    ConvertDistrictToCoronaData(data.data[i])
  );
};

export const convertAllStates = (data: APIStatesResponseType): CoronaData[] => {
  return Object.keys(data.data).map((i) =>
    ConvertStateToCoronaData(data.data[i])
  );
};
