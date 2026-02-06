export type Menu = {
  idMenu: number;
  name: string;
  url: string;
  isMain: boolean;
  parentId: number | null;
  minHierarchy: number;
  children: Menu[];
};
