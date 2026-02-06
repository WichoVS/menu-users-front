import type { Menu } from "@/types/common/menu";
import { MenuTableRow } from "./MenuTableRow";

interface MenuListProps {
  menus: Menu[];
  onEdit: (menu: Menu) => void;
  onDelete: (menu: Menu) => void;
}

export function MenuList({ menus, onEdit, onDelete }: MenuListProps) {
  return (
    <div className="border border-gray-200 rounded-lg">
      <div className="flex items-center p-3 font-bold bg-gray-50 border-b border-gray-200">
        <div className="flex-1">Nombre</div>
        <div className="w-1/4">Ruta</div>
        <div className="w-1/4 text-right">Acciones</div>
      </div>
      <div>
        {menus
          .filter((menu) => menu.isMain)
          .map((menu) => (
            <MenuTableRow
              key={menu.idMenu}
              menu={menu}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
      </div>
    </div>
  );
}
