import { ENV } from "@/utils/env";

export const authService = {
  login: async (email: string, password: string) => {
    const headers = { "Content-Type": "application/json" };

    return fetch(`${ENV.API_URL}/auth/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, password }),
    }).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }
      return response.json();
    });
  },
  signin: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    const headers = { "Content-Type": "application/json" };

    return fetch(`${ENV.API_URL}/auth/signin`, {
      method: "POST",
      headers,
      body: JSON.stringify({ firstName, lastName, email, password }),
    }).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar usuario");
      }
      return response.json();
    });
  },
};
