import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { calendar, cog, ellipse, list, square, triangle } from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import { Login } from "./pages/Login"; // Asegúrate de importar la página de Login

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
import { SplashScreen } from "@capacitor/splash-screen";
import { useEffect } from "react";
import { AuthProvider } from "./context/auth.provider";
import { initializeStorage } from "./services/initializeStorage.service";

setupIonicReact();

const App: React.FC = () => {
  const initStorage = async () => {
    await initializeStorage(); // Espera a que la inicialización del almacenamiento termine
  };

  useEffect(() => {
    showSplash();
    initStorage();
  }, []);

  const showSplash = async () => {
    await SplashScreen.show({
      showDuration: 2000,
      autoHide: true,
    });
  };

  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            {/* Ruta para la página de Login */}
            <Route exact path="/login">
              <Login /> {/* Aquí se renderiza el login */}
            </Route>

            {/* Páginas protegidas o pestañas */}
            <Route
              path="/citas"
              render={() => (
                <IonTabs>
                  <IonRouterOutlet>
                    <Route exact path="/citas/mis-citas">
                      <Tab1 />
                    </Route>
                    <Route exact path="/citas/agendar-cita">
                      <Tab2 />
                    </Route>
                    <Route path="/citas/configuracion">
                      <Tab3 />
                    </Route>
                    <Route exact path="/citas">
                      <Redirect to="/citas/mis-citas" />{" "}
                      {/* Redirige a la primera pestaña */}
                    </Route>
                  </IonRouterOutlet>
                  <IonTabBar slot="bottom">
                    <IonTabButton tab="mis-citas" href="/citas/mis-citas">
                      <IonIcon aria-hidden="true" icon={list} />

                      <IonLabel>Mis Citas</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="agendar-cita" href="/citas/agendar-cita">
                      <IonIcon aria-hidden="true" icon={calendar} />

                      <IonLabel>Agendar Cita</IonLabel>
                    </IonTabButton>
                    <IonTabButton
                      tab="configuracion"
                      href="/citas/configuracion"
                    >
                      <IonIcon aria-hidden="true" icon={cog} />
                      <IonLabel>Configuración</IonLabel>
                    </IonTabButton>
                  </IonTabBar>
                </IonTabs>
              )}
            />
            {/* Redirige a login si no está autenticado */}
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthProvider>
    </IonApp>
  );
};

export default App;
