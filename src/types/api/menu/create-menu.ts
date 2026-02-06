export interface CreateMenuRequest {
  name: string;
  isMain: boolean;
  parentId?: number | null;
  url: string;
  minHierarchy: number;
}
