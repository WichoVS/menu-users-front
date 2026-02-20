import { create } from "zustand";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
  roleName: string;
};

type UserState = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
};

const getInitialState = (): UserState => {
  if (typeof window !== "undefined") {
    const storedUser = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken || null,
      login: () => {}, // Placeholder, will be replaced by zustand
      logout: () => {}, // Placeholder, will be replaced by zustand
    };
  }
  return {
    user: null,
    token: null,
    login: () => {},
    logout: () => {},
  };
};

export const useUserStore = create<UserState>((set) => ({
  ...getInitialState(),
  login: (user, token) => {
    set({ user, token });
    if (typeof window !== "undefined") {
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("token", token);
    }
  },
  logout: () => {
    set({ user: null, token: null });
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    }
  },
}));
