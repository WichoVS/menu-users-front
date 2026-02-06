import type { Role } from "@/types/common/role";
import { create } from "zustand";

type RoleState = {
  roles: Role[];
  setRoles: (roles: Role[]) => void;
};

const getInitialState = (): RoleState => ({
  roles: [],
  setRoles: () => {},
});

export const useRoleStore = create<RoleState>((set) => ({
  ...getInitialState(),
  setRoles: (roles: Role[]) => set({ roles }),
}));
