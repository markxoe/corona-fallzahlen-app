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
  APIVaccinations,
  APIRawReturn,
} from "./types";

export const baseURL = "https://api.cfz.toastbrot.org/";
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

export const getVaccinations = async () => {
  return axios
    .get<APIRawReturn<APIVaccinations>>(baseURL + "germany", axiosConfig)
    .catch(() => {
      return undefined;
    });
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
