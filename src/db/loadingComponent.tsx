import React, { useContext, useEffect } from "react";
import { cacheDataFromAPI } from "../functions/data";
import { AppContext } from "./Store";

const Loader: React.FC = ({ children }) => {
  const { dispatch } = useContext(AppContext);
  useEffect(() => {
    cacheDataFromAPI(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
};
export default Loader;
