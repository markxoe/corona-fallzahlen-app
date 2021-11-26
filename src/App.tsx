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

import PageHome from "./pages/Home";
import PageStatesOrDistricts from "./pages/StatesOrDistricts";
import Loader from "./db/loadingComponent";

const App: React.FC = () => (
  <Loader>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/home" component={PageHome} />
          <Route exact path="/states">
            <PageStatesOrDistricts statesOrDistricts="states" />
          </Route>
          <Route exact path="/districts">
            <PageStatesOrDistricts statesOrDistricts="districts" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </Loader>
);

export default App;
