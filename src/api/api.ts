import axios, { AxiosRequestConfig } from "axios";
import {
  convertAllDistricts,
  convertAllStates,
  ConvertGermanyToCoronaData,
} from "../functions/data";
import {
  APIStatesResponseType,
  APIResponseType,
  APIGermanyResponseType,
  APIDistrictsResponseType,
  APICacheType,
  CoronaData,
  APIMetaType,
  APIVaccinationsResponseType,
} from "./types";

export const baseURL = "https://api.cfz.toastbrot.org/";
export const axiosConfig: AxiosRequestConfig = { timeout: 3000 };

//#region API Raw functions

export const getStates = () =>
  axios
    .get<APIStatesResponseType>(baseURL + "states", axiosConfig)
    .catch(() => undefined);

export const getDistricts = () =>
  axios
    .get<APIDistrictsResponseType>(baseURL + "districts", axiosConfig)
    .catch(() => undefined);

export const getGermany = async () => {
  return axios
    .get<APIGermanyResponseType>(baseURL + "germany", axiosConfig)
    .catch(() => undefined);
};

export const getVaccinations = async () => {
  return axios
    .get<APIVaccinationsResponseType>(baseURL + "vaccinations", axiosConfig)
    .catch(() => undefined);
};

//#endregion

//#region API Converters
export const getStatesCoronaData = async (): Promise<
  APIResponseType<CoronaData[]>
> => {
  const states = await getStates();
  if (!states) return {};
  return { data: convertAllStates(states.data) };
};

export const getDistrictsCoronaData = async (): Promise<
  APIResponseType<CoronaData[]>
> => {
  const districts = await getDistricts();
  if (!districts) return {};
  return { data: convertAllDistricts(districts.data) };
};

export const getGermanyCoronaData = async (): Promise<
  APIResponseType<CoronaData>
> => {
  const germany = await getGermany();
  console.log({ germany });
  if (!germany) return {};
  return { data: ConvertGermanyToCoronaData(germany.data) };
};

export const getMeta = async (): Promise<APIResponseType<APIMetaType>> => {
  const germany = await getGermany();
  if (!germany) return {};
  return { data: germany.data.meta };
};

//#endregion

export const getCache = async (): Promise<APICacheType> => {
  const germany = await getGermanyCoronaData();
  const districts = await getDistrictsCoronaData();
  const states = await getStatesCoronaData();
  const meta = await getMeta();

  const statesMap = await getMap("states");
  const districtsMap = await getMap("districts");

  if (
    germany.data &&
    districts.data &&
    states.data &&
    meta.data &&
    statesMap.data &&
    districtsMap.data
  )
    return {
      data: {
        coronaData: [germany.data, ...districts.data, ...states.data],
        meta: meta.data,
        districtsMap: districtsMap.data,
        statesMap: statesMap.data,
      },
    };
  else return {};
};

export const getMap = async (
  stateOrDistrict: "states" | "districts"
): Promise<APIResponseType<string>> => {
  return await axios
    .get(baseURL + "map/" + stateOrDistrict, {
      responseType: "arraybuffer",
    })
    .then((r) => {
      if (r.status === 200)
        return {
          data:
            "data:image/jpeg;base64," + Buffer.from(r.data).toString("base64"),
        };
      else return {};
    })
    .catch(() => ({}));
};
