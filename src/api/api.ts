import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
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
} from "./types";

export const baseURL = "https://api.corona-zahlen.org/";
export const axiosConfig: AxiosRequestConfig = { timeout: 3000 };

export const getStates = async (): Promise<APIResponseType<CoronaData[]>> => {
  const response: APIResponseType<APIStatesResponseType> = await axios
    .get(baseURL + "states", axiosConfig)
    .then((r: AxiosResponse<APIStatesResponseType>) => {
      if (r.status === 200) {
        return { ok: true, data: r.data };
      } else {
        return {};
      }
    })
    .catch(() => {
      return {};
    });

  return response.data ? { data: convertAllStates(response.data) } : {};
};

export const getDistricts = async (): Promise<
  APIResponseType<CoronaData[]>
> => {
  const response: APIResponseType<APIDistrictsResponseType> = await axios
    .get(baseURL + "districts", axiosConfig)
    .then((r: AxiosResponse<APIDistrictsResponseType>) => {
      if (r.status === 200) {
        return { data: r.data };
      } else {
        return {};
      }
    })
    .catch(() => {
      return {};
    });

  return response.data ? { data: convertAllDistricts(response.data) } : {};
};

export const getGermany = async (): Promise<APIResponseType<CoronaData>> => {
  const response: APIResponseType<CoronaData> = await axios
    .get(baseURL + "germany", axiosConfig)
    .then((r: AxiosResponse<APIGermanyResponseType>) => {
      if (r.status === 200) {
        return { data: ConvertGermanyToCoronaData(r.data) };
      } else {
        return {};
      }
    })
    .catch(() => {
      return {};
    });

  return response;
};

export const getMeta = async (): Promise<APIResponseType<APIMetaType>> => {
  const response: APIResponseType<APIMetaType> = await axios
    .get(baseURL + "germany", axiosConfig)
    .then((r: AxiosResponse<APIGermanyResponseType>) => {
      if (r.status === 200) {
        return { data: r.data.meta };
      } else {
        return {};
      }
    })
    .catch(() => {
      return {};
    });

  return response;
};

export const getCache = async (): Promise<APICacheType> => {
  const germany = await getGermany();
  const districts = await getDistricts();
  const states = await getStates();
  const meta = await getMeta();

  if (germany.data && districts.data && states.data && meta.data)
    return {
      data: {
        coronaData: [germany.data, ...districts.data, ...states.data],
        meta: meta.data,
      },
    };
  else return {};
};
