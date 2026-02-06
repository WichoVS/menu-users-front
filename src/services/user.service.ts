import { useUserStore } from "@/store/userStore";
import type { CreateUserRequest } from "@/types/api/user/create-user";
import { ENV } from "@/utils/env";

const userService = {
  getAll: async () => {
    const token = useUserStore.getState().token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    return fetch(`${ENV.API_URL}/user`, {
      method: "GET",
      headers,
    }).then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          useUserStore.getState().logout();
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener los usuarios");
      }
      return response.json();
    });
  },
  getById: async (userId: string) => {
    const token = useUserStore.getState().token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    return fetch(`${ENV.API_URL}/user/${userId}`, {
      method: "GET",
      headers,
    }).then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          useUserStore.getState().logout();
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener el usuario");
      }
      return response.json();
    });
  },
  create: async (userData: CreateUserRequest) => {
    const token = useUserStore.getState().token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    return fetch(`${ENV.API_URL}/user`, {
      method: "POST",
      headers,
      body: JSON.stringify(userData),
    }).then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          useUserStore.getState().logout();
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el usuario");
      }
      return response.json();
    });
  },
  update: async (userId: string, userData: Partial<CreateUserRequest>) => {
    const token = useUserStore.getState().token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    return fetch(`${ENV.API_URL}/user/${userId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(userData),
    }).then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          useUserStore.getState().logout();
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el usuario");
      }
      return response.json();
    });
  },
  delete: async (userId: string) => {
    const token = useUserStore.getState().token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    return fetch(`${ENV.API_URL}/user/${userId}`, {
      method: "DELETE",
      headers,
    }).then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          useUserStore.getState().logout();
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el usuario");
      }
      return response.json();
    });
  },
  generatedPassword: async (userId: string) => {
    const token = useUserStore.getState().token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    return fetch(`${ENV.API_URL}/user/${userId}/generate-password`, {
      method: "POST",
      headers,
    }).then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          useUserStore.getState().logout();
          return;
        }
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error al generar la contraseña del usuario",
        );
      }
      return response.json();
    });
  },
};

export { userService };
