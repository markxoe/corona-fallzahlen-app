import React, { useContext, useEffect } from "react";
import { cacheDataFromAPI } from "../functions/data";
import { ActionSetState } from "./Actions";
import { AppContext, isTempFromToday, loadData, saveData } from "./Store";

const Loader: React.FC = ({ children }) => {
  useLoadState();

  return <>{children}</>;
};

export const useLoadState = () => {
  const { state, dispatch } = useContext(AppContext);
  const load = async () => {
    await loadData().then((d) => {
      dispatch(ActionSetState({ ...d, dataLoadedFromStore: true }));
    });
  };
  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const run = async () => {
      await cacheDataFromAPI(dispatch);
    };
    if (state.dataLoadedFromStore) {
      if (!isTempFromToday(state.temp)) if (!state.temp.loaded) run();
    }
  }, [state.dataLoadedFromStore, state.temp.loaded]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (state.dataLoadedFromStore) saveData(state);
  }, [state]);
};

export default Loader;
