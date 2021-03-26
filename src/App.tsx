import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import "./style/custom.css";
import "./style/incidences.css";

import { AppContextProvider } from "./db/Store";

import PageHome from "./pages/Home";
import PageStates from "./pages/States";
import PageDistricts from "./pages/Districts";
import Loader from "./db/loadingComponent";

const App: React.FC = () => (
  <AppContextProvider>
    <Loader>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/home" component={PageHome} />
            <Route exact path="/states" component={PageStates} />
            <Route exact path="/districts" component={PageDistricts} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </Loader>
  </AppContextProvider>
);

export default App;
