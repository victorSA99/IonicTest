import { Storage } from "@ionic/storage";

const storage = new Storage();

export const initializeStorage = async () => {
  await storage.create();
};

export const getToken = async (): Promise<string | null> => {
  const token = await storage.get("token");
  return token;
};

export const setToken = async (token: string): Promise<void> => {
  await storage.set("token", token);
};

export const removeToken = async (): Promise<void> => {
  await storage.remove("token");
};
