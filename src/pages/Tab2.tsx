import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonLabel,
  IonDatetime,
  IonTextarea,
  IonItem,
  IonToast, // Importa el IonToast
} from "@ionic/react";
import { useState, useEffect } from "react";
import "./Tab2.css";
import { CreateAppointment } from "../services/appointment.service";

const Tab2: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const [dateTime, setDateTime] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false); // Estado para controlar el Toast

  useEffect(() => {
    const currentDate = new Date().toISOString();
    setDateTime(currentDate);
  }, []);

  const handleSubmit = async () => {
    const newAppointment = {
      date: dateTime.split("T")[0],
      time: dateTime.split("T")[1].substring(0, 5),
      description,
      status: "pendiente",
    };

    const response = await CreateAppointment(newAppointment);

    if (response) {
      setShowToast(true);
      setDescription("");
      setDescription("");
    }
  };

  const handleDateTimeChange = (e: any) => {
    const value = e.detail.value;
    if (typeof value === "string") {
      setDateTime(value);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agendar Cita</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Agendar Cita</IonTitle>
          </IonToolbar>
        </IonHeader>

        <form className="ion-padding">
          <IonItem>
            <IonLabel position="stacked">Descripción</IonLabel>
            <IonTextarea
              value={description}
              onIonChange={(e) => setDescription(e.detail.value!)}
              placeholder="Ingresa una descripción"
            />
          </IonItem>

          <IonItem>
            <IonDatetime
              value={dateTime}
              onIonChange={handleDateTimeChange}
              hourCycle="h24"
            >
              <span slot="time-label">Hora</span>
            </IonDatetime>
          </IonItem>

          <IonButton expand="full" onClick={handleSubmit}>
            Agendar Cita
          </IonButton>
        </form>

        <IonToast
          isOpen={showToast}
          message="Cita agregada con éxito!"
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
