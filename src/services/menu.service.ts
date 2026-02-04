import { useUserStore } from "@/store/userStore";
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
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener el menú");
      }
      return response.json();
    });
  },
  createMenu: async (menuData: any) => {},
  updateMenu: async (menuId: string, menuData: any) => {},
  deleteMenu: async (menuId: string) => {},
};
