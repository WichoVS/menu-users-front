import type { User } from "@/types/common/user";
import { create } from "zustand";

type UsersState = {
  users: User[];
  setUsers: (users: User[]) => void;
};

const getInitialUsersState = (): UsersState => {
  return {
    users: [],
    setUsers: () => {}, // Placeholder, will be replaced by zustand
  };
};

export const useUsersStore = create<UsersState>((set) => ({
  ...getInitialUsersState(),
  setUsers: (users) => set({ users }),
}));
