import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonAvatar,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./Tab3.css";
import { useAuth } from "../context/auth.provider";

const Tab3: React.FC = () => {
  const history = useHistory();
  const { user, logout } = useAuth();

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout();
    history.push("/login"); // Redirigir al login
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-text-center tab3-content">
        {/* Información del cliente */}
        <IonGrid className="ion-padding">
          <IonRow className="ion-justify-content-center">
            <IonCol size="12">
              <img
                src="https://img.freepik.com/vector-premium/icono-perfil-simple-color-blanco-icono_1076610-50204.jpg?semt=ais_hybrid"
                alt="Avatar"
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                  width: "60%",
                  height: "60%",
                  maxHeight: "250px",
                  maxWidth: "250px",
                }}
              />

              <h2 className="ion-margin-bottom">{user?.name}</h2>
              <h2 className="ion-margin-bottom">{user?.email}</h2>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      {/* Botón de cerrar sesión */}
      <IonFooter>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton
                expand="full"
                color="danger"
                onClick={handleLogout}
                className="ion-margin-top"
              >
                Cerrar sesión
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default Tab3;
