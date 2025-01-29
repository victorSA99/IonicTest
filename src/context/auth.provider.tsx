import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { GetDataAuth, login as loginService } from "../services/auth.service";
import { AuthResponse, LoginResponseDTO } from "../dtos/auth.dto";
import {
  initializeStorage,
  getToken,
  setToken,
  removeToken,
} from "../services/initializeStorage.service"; // Importa las funciones
import { IonLoading } from "@ionic/react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthResponse | null;
  login: (
    email: string,
    password: string
  ) => Promise<LoginResponseDTO | undefined>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const initialize = async () => {
    await initializeStorage();
    const token = await getToken();
    if (token) {
      try {
        const userInfo = await GetDataAuth();
        setUser(userInfo);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
        logout();
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    initialize();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<LoginResponseDTO | undefined> => {
    try {
      const response = await loginService({ email, password });
      const { access_token } = response;
      console.log("Access Token:", access_token);
      await setToken(access_token);
      setIsAuthenticated(true);
      initialize();
      return response;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  if (loading) {
    return <IonLoading isOpen={loading} message={"Cragando..."} />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
