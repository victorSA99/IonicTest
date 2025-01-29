export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface AuthResponse {
  id: number;
  name: string;
  rol: string;
  email: string;
  email_verified_at: null;
  created_at: Date;
  updated_at: Date;
}
