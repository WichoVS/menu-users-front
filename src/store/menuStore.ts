import type { Menu } from "@/types/common/menu";
import { create } from "zustand";

type MenuState = {
  menus: Menu[];
  menusUser: Menu[];
  setMenus: (menus: Menu[]) => void;
  setMenusUser: (menusUser: Menu[]) => void;
};

const getInitialState = (): MenuState => ({
  menus: [],
  menusUser: [],
  setMenus: () => {},
  setMenusUser: () => {},
});

export const useMenuStore = create<MenuState>((set) => ({
  ...getInitialState(),
  setMenus: (menus: Menu[]) => set({ menus }),
  setMenusUser: (menusUser: Menu[]) => set({ menusUser }),
}));
