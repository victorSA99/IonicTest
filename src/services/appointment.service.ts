import {
  Appointment,
  AppointmentDto,
  AppointmentResponse,
} from "../dtos/Appointment.dto";
import axiosRequest from "../utils/axios.request";

export async function GetAppointmentWhitUser(): Promise<AppointmentResponse> {
  return (
    await axiosRequest.get<AppointmentResponse>("/appointment/appointmentsUser")
  ).data;
}

export async function CreateAppointment(
  data: AppointmentDto
): Promise<Appointment> {
  return (await axiosRequest.post<Appointment>("/appointment/add", data)).data;
}
