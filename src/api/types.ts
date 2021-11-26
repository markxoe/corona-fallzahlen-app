//#region RAW API Types
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
  hospitalization: CoronaHospitalization;
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
    lastUpdate: Date;
  };
  hospitalization: CoronaHospitalization;
}

export interface APIVaccination {
  administeredVaccinations: number; // Sum of first and second dose
  vaccinated: number; // Number of fist dose
  delta: number; // New first dose vaccinations compared to yesterday
  quote: number; // Quote of first vaccinated people
  vaccination: {
    biontech: number; // Number of people who were vaccinated with BioNTech
    moderna: number; // Number of people who were vaccinated with Moderna
    astraZeneca: number; // Number of people who were vaccinated with AstraZeneca
    jannsen: number; // Number of people who were vaccinated with Janssen
  };
  secondVaccination: {
    vaccinated: number; // Number of people who got the second vaccination
    vaccination: {
      biontech: number; // Number of people who received their second dose of BioNTech
      moderna: number; // Number of people who received their second dose of Moderna
      astraZeneca: number; // Number of people who received their second dose of AstraZeneca
    };
    delta: number; // New second vaccinations compared to yesterday
    quote: number; // Quote of full vaccinated people
  };
  boosterVaccination: {
    vaccinated: number; // Number of people who received their booster dose
    vaccination: {
      biontech: number; // Number of people who received their booster dose of BioNTech
      moderna: number; // Number of people who received their booster dose of Moderna
      jannsen: number; // Number of people who received their booster dose of Janssen
    };
    delta: number; // New booster vaccinations compared to yesterday
    quote: number; // Quote of boosted people
  };
  latestDailyVaccinations: {
    date: string;
    vaccinated: number;
    firstVaccination: number;
    secondVaccination: string;
    boosterVaccination: number;
  };
}

export interface APIVaccinations extends APIVaccination {
  states: { [key: string]: APIVaccination };
}

//#endregion

//#region API Response Types

export interface APIGermanyResponseType extends APIGermanyType {
  meta: APIMetaType;
}

export type APIStatesResponseType = APIRawReturn<{
  [key: string]: APIStateType;
}>;

export type APIDistrictsResponseType = APIRawReturn<{
  [key: string]: APIDistrictType;
}>;

export type APIVaccinationsResponseType = APIRawReturn<APIVaccinations>;

export interface APIResponseType<T> {
  data?: T;
}

export interface APIRawReturn<T> {
  data: T;
  meta: APIMetaType;
}

//#endregion

export interface APICacheType {
  data?: {
    coronaData: CoronaData[];
    meta: APIMetaType;
    statesMap: string;
    districtsMap: string;
  };
}

export enum CoronaDataLocation {
  DISTRICT = "district",
  STATE = "state",
  GERMANY = "germany",
}

export interface CoronaHospitalization {
  cases7Days: number;
  incidence7Days: number;
  date: string;
  lastUpdate: string;
}

export interface CoronaData {
  name: string;
  nameToSort?: string;
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
  population?: number;
  hospitalization?: CoronaHospitalization;
}
