import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
  IonItem,
  IonText,
  IonRefresher,
  IonRefresherContent,
  useIonViewDidEnter,
} from "@ionic/react";
import "./Tab1.css";
import { GetAppointmentWhitUser } from "../services/appointment.service";
import { AppointmentResponse, Appointment } from "../dtos/Appointment.dto";

const Tab1: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const fetchAppointment = async () => {
    const response = await GetAppointmentWhitUser();
    setAppointments(response.appointments);
  };

  const handleRefresh = async (event: CustomEvent) => {
    console.log("entre");
    await fetchAppointment();
    event.detail.complete();
  };

  useIonViewDidEnter(() => {
    fetchAppointment();
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmada":
        return "success"; // Verde
      case "cancelada":
        return "danger"; // Rojo
      case "pendiente":
        return "warning"; // Naranja
      default:
        return "medium"; // Gris por defecto
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Citas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* IonRefresher debe estar directamente bajo IonContent */}
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Citas</IonTitle>
          </IonToolbar>
        </IonHeader>
        {appointments?.map((Appointment) => (
          <IonCard key={Appointment.id} className="mb-4">
            <IonCardHeader
              className={`p-4 ${getStatusColor(Appointment.status)}`}
            >
              <IonCardTitle className="text-white">
                {Appointment.description}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem lines="none">
                <IonLabel>
                  <IonText color="medium">Fecha: </IonText>
                  <IonText>{Appointment.date || "Fecha no disponible"}</IonText>
                </IonLabel>
              </IonItem>
              <IonItem lines="none">
                <IonLabel>
                  <IonText color="medium">Hora: </IonText>
                  <IonText>{Appointment.time}</IonText>
                </IonLabel>
              </IonItem>
              <IonItem lines="none">
                <IonLabel>
                  <IonText color="medium">Estado: </IonText>
                  <IonText color={getStatusColor(Appointment.status)}>
                    {Appointment.status}
                  </IonText>
                </IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
