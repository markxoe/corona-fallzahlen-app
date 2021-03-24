import axios, { AxiosRequestConfig } from "axios";
import {
  APIStatesResponseType,
  APIResponseType,
  APIGermanyResponseType,
  APIDistrictsResponseType,
  APICacheType,
} from "./types";

export const baseURL = "https://api.corona-zahlen.org/";
export const axiosConfig: AxiosRequestConfig = { timeout: 1000 };
export const getStates = async (): Promise<
  APIResponseType<APIStatesResponseType>
> => {
  const response: APIResponseType<APIStatesResponseType> = await axios
    .get(baseURL + "states", axiosConfig)
    .then((r) => {
      if (r.status === 200) {
        return { ok: true, data: r.data };
      } else {
        return {};
      }
    })
    .catch(() => {
      return {};
    });

  return response;
};

export const getDistricts = async (): Promise<
  APIResponseType<APIDistrictsResponseType>
> => {
  const response: APIResponseType<APIDistrictsResponseType> = await axios
    .get(baseURL + "districts", axiosConfig)
    .then((r) => {
      if (r.status === 200) {
        return { data: r.data };
      } else {
        return {};
      }
    })
    .catch(() => {
      return {};
    });

  return response;
};

export const getGermany = async (): Promise<
  APIResponseType<APIGermanyResponseType>
> => {
  const response: APIResponseType<APIGermanyResponseType> = await axios
    .get(baseURL + "germany", axiosConfig)
    .then((r) => {
      if (r.status === 200) {
        return { data: r.data };
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
  console.log(Object.keys(districts.data?.data ?? {}).length);
  if (germany.data && districts.data && states.data)
    return {
      data: {
        districts: districts.data,
        germany: germany.data,
        states: states.data,
      },
    };
  else return {};
};
