import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonInput,
  IonButton,
  IonItem,
  IonAlert,
  IonLoading,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { useState } from "react";
import { useAuth } from "../context/auth.provider";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import "./Login.css"; // Estilos personalizados

export const Login = () => {
  const { login } = useAuth();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const response = await login(username, password);
      setIsLoading(false);

      if (response?.access_token) {
        history.push("/citas/mis-citas");
      } else {
        setShowAlert(true);
      }
    } catch (error: unknown) {
      setIsLoading(false);

      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setShowAlert(true);
        } else {
          setShowAlert(true);
        }
      } else {
        setShowAlert(true);
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="login-container ion-padding">
          {/* Imagen central */}
          <div className="login-image">
            <img
              src="https://img.freepik.com/vector-premium/diseno-logotipo-lapiz-cita-agenda_585146-886.jpg" // Imagen más grande
              alt="Login"
              className="login-img"
            />
          </div>

          {/* Formulario de login */}
          <IonGrid>
            <IonRow>
              <IonCol size="12" className="ion-text-center">
                <IonItem>
                  <IonLabel position="floating">Username</IonLabel>
                  <IonInput
                    value={username}
                    onIonChange={(e) => setUsername(e.detail.value!)}
                    required
                    className="input-field"
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                    required
                    className="input-field"
                  />
                </IonItem>

                <IonButton
                  expand="block"
                  onClick={handleLogin}
                  className="login-btn ion-margin-top"
                >
                  Login
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <IonLoading isOpen={isLoading} message={"Iniciando sesión..."} />

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Error"}
          message={"Credenciales incorrectas. Inténtalo nuevamente."}
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};
