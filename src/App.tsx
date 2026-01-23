import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Focus from "./pages/Focus";
import { home, time } from "ionicons/icons";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

setupIonicReact();

const Tabs: React.FC = () => {
  const { user } = useAuth();

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <ProtectedRoute exact path="/home" component={Home} />
        <ProtectedRoute exact path="/focus" component={Focus} />

        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
      {user && (
        <IonTabBar slot="bottom">
          <IonTabButton tab="Home" href="/home">
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Focus" href="/focus">
            <IonIcon aria-hidden="true" icon={time} />
            <IonLabel>Focus</IonLabel>
          </IonTabButton>
        </IonTabBar>
      )}
    </IonTabs>
  );
};
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <AuthProvider>
        <Tabs />
      </AuthProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
