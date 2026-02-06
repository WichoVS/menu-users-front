import { useUserStore } from "@/store/userStore";
import type { CreateRoleRequest } from "@/types/api/role/create-role";
import type { UpdateRoleRequest } from "@/types/api/role/update-role";
import { ENV } from "@/utils/env";

const roleService = {
  getAllRoles: async () => {
    const token = useUserStore.getState().token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    return fetch(`${ENV.API_URL}/role`, {
      method: "GET",
      headers,
    }).then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          useUserStore.getState().logout();
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener los roles");
      }
      return response.json();
    });
  },
  createRole: async (roleData: CreateRoleRequest) => {
    const token = useUserStore.getState().token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    return fetch(`${ENV.API_URL}/role`, {
      method: "POST",
      headers,
      body: JSON.stringify(roleData),
    }).then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          useUserStore.getState().logout();
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el rol");
      }
      return response.json();
    });
  },
  updateRole: async (roleId: number, roleData: UpdateRoleRequest) => {
    const token = useUserStore.getState().token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    return fetch(`${ENV.API_URL}/role/${roleId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(roleData),
    }).then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          useUserStore.getState().logout();
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el rol");
      }
      return response.json();
    });
  },
  deleteRole: async (roleId: number) => {
    const token = useUserStore.getState().token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    return fetch(`${ENV.API_URL}/role/${roleId}`, {
      method: "DELETE",
      headers,
    }).then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          useUserStore.getState().logout();
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el rol");
      }
      return response.json();
    });
  },
  getRoleById: async (roleId: number) => {
    const token = useUserStore.getState().token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    return fetch(`${ENV.API_URL}/role/${roleId}`, {
      method: "GET",
      headers,
    }).then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          useUserStore.getState().logout();
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener el rol");
      }
      return response.json();
    });
  },
};

export { roleService };
