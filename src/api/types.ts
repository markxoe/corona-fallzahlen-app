export interface APIMetaType {
  source: string;
  contact: string;
  info: string;
  lastUpdate: Date;
  lastCheckedForUpdate: Date;
}

export interface APIStateType {
  id: number;
  name: string;
  population: number;
  cases: number;
  deaths: number;
  casesPerWeek: number;
  deathsPerWeek: number;
  recovered: number;
  abbreviation: string;
  weekIncidence: number;
  casesPer100k: number;
  delta: { cases: number; deaths: number; recovered: number };
}

export interface APIDistrictType {
  ags: string;
  name: string;
  county: string;
  population: number;
  cases: number;
  deaths: number;
  casesPerWeek: number;
  deathsPerWeek: number;
  recovered: number;
  weekIncidence: number;
  casesPer100k: number;
  delta: { cases: number; deaths: number; recovered: number };
}

export interface APIGermanyType {
  cases: number;
  deaths: number;
  recovered: number;
  weekIncidence: number;
  casesPer100k: number;
  casesPerWeek: number;
  delta: {
    cases: number;
    deaths: number;
    recovered: number;
  };
  r: {
    value: number;
    date: Date;
  };
}

export interface APIGermanyResponseType extends APIGermanyType {
  meta: APIMetaType;
}

export interface APIStatesResponseType {
  meta: APIMetaType;
  data: {
    [key: string]: APIStateType;
  };
}

export interface APIDistrictsResponseType {
  meta: APIMetaType;
  data: {
    [key: string]: APIDistrictType;
  };
}

export interface APIResponseType<T> {
  data?: T;
}

export interface APICacheType {
  data?: {
    coronaData: CoronaData[];
    meta: APIMetaType;
  };
}

export enum CoronaDataLocation {
  DISTRICT = "district",
  STATE = "state",
  GERMANY = "germany",
}

export interface CoronaData {
  name: string;
  delta: {
    cases: number;
    deaths: number;
    recovered: number;
  };
  cases: number;
  deaths: number;
  casesPerWeek: number;
  deathsPerWeek?: number;
  recovered: number;
  weekIncidence: number;
  casesPer100k: number;
  id: string;
  location: CoronaDataLocation;
  r?: number;
}
