import React, { useContext, useEffect } from "react";
import { cacheDataFromAPI } from "../functions/data";
import { ActionSetLoaded, ActionSetState } from "./Actions";
import { AppContext, loadData, saveData } from "./Store";

const Loader: React.FC = ({ children }) => {
  useLoadState();

  return <>{children}</>;
};

export const useLoadState = () => {
  const { state, dispatch } = useContext(AppContext);
  const load = async () => {
    await loadData().then((d) => {
      dispatch(ActionSetState(d));
      dispatch(ActionSetLoaded(true));
    });
    await cacheDataFromAPI(dispatch);
  };
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.dataLoadedFromStore) saveData(state);
  }, [state]);
};

export default Loader;
