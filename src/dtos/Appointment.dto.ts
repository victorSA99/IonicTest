export interface AppointmentResponse {
  appointments: Appointment[];
}

export interface Appointment {
  id: number;
  date: string;
  time: string;
  description: string;
  user_id: number;
  status: "confirmada" | "pendiente" | "cancelada";
  created_at: Date;
  updated_at: Date;
}

export interface AppointmentDto
  extends Omit<
    Appointment,
    "id" | "user_id" | "status" | "created_at" | "updated_at"
  > {
  // Solo las propiedades que quieres conservar
}
