import { useUserStore } from "@/store/userStore";
import type { CreateMenuRequest } from "@/types/api/menu/create-menu";
import type { UpdateMenuRequest } from "@/types/api/menu/update-menu";
import { ENV } from "@/utils/env";

export const menuService = {
  getMenuItems: async (idUser: string) => {
    const token = useUserStore.getState().token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    return fetch(`${ENV.API_URL}/menu/user/${idUser}`, {
      method: "GET",
      headers,
    }).then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          useUserStore.getState().logout();
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener los menús");
      }
      return response.json();
    });
  },
  // Funciona igual que getMenuItems, pero retorna todos los menús incluso los inactivos
  getAllMenuItems: async () => {
    const token = useUserStore.getState().token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    return fetch(`${ENV.API_URL}/menu`, {
      method: "GET",
      headers,
    }).then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          useUserStore.getState().logout();
          return;
        }
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error al obtener todos los menús",
        );
      }
      return response.json();
    });
  },
  createMenu: async (menuData: CreateMenuRequest) => {
    const token = useUserStore.getState().token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    return fetch(`${ENV.API_URL}/menu`, {
      method: "POST",
      headers,
      body: JSON.stringify(menuData),
    }).then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          useUserStore.getState().logout();
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el menú");
      }
      return response.json();
    });
  },
  updateMenu: async (menuId: number, menuData: UpdateMenuRequest) => {
    const token = useUserStore.getState().token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    return fetch(`${ENV.API_URL}/menu/${menuId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(menuData),
    }).then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          useUserStore.getState().logout();
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el menú");
      }
      return response.json();
    });
  },
  deleteMenu: async (menuId: number) => {
    const token = useUserStore.getState().token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    return fetch(`${ENV.API_URL}/menu/${menuId}`, {
      method: "DELETE",
      headers,
    }).then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          useUserStore.getState().logout();
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el menú");
      }
      return response.json();
    });
  },
  addMenuAccessUser: async (userId: string, menuId: number) => {
    const token = useUserStore.getState().token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    return fetch(`${ENV.API_URL}/menu/${userId}/add-menu/${menuId}`, {
      method: "POST",
      headers,
    }).then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          useUserStore.getState().logout();
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al agregar acceso al menú");
      }
      return response.json();
    });
  },

  removeMenuAccessUser: async (userId: string, menuId: number) => {
    const token = useUserStore.getState().token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    return fetch(`${ENV.API_URL}/menu/${userId}/remove-menu/${menuId}`, {
      method: "DELETE",
      headers,
    }).then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          useUserStore.getState().logout();
          return;
        }
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error al eliminar acceso al menú",
        );
      }
      return response.json();
    });
  },
};
