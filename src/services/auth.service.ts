import { AuthResponse, LoginResponseDTO, LoginUserDTO } from "../dtos/auth.dto";
import axiosRequest from "../utils/axios.request";

export async function login(
  credentials: Partial<LoginUserDTO>
): Promise<LoginResponseDTO> {
  return (await axiosRequest.post<LoginResponseDTO>("/auth/login", credentials))
    .data;
}
export async function GetDataAuth(): Promise<AuthResponse> {
  return (await axiosRequest.post<AuthResponse>("/auth/me")).data;
}
