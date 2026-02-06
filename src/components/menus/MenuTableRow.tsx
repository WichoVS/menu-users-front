import { useState } from "react";
import type { Menu } from "@/types/common/menu";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Edit, Trash2 } from "lucide-react";

interface MenuTableRowProps {
  menu: Menu;
  level?: number;
  onEdit: (menu: Menu) => void;
  onDelete: (menu: Menu) => void;
}

export function MenuTableRow({
  menu,
  level = 0,
  onEdit,
  onDelete,
}: MenuTableRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = menu.children && menu.children.length > 0;

  return (
    <>
      <div
        className="flex items-center bg-white border-b border-gray-200"
        style={{ paddingLeft: `${level * 2}rem` }}
      >
        <div className="flex-1 p-3">
          <div className="flex items-center">
            {hasChildren ? (
              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                  <button onClick={() => setIsOpen(!isOpen)} className="mr-2">
                    {isOpen ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                </CollapsibleTrigger>
              </Collapsible>
            ) : (
              <div className="w-6 mr-2"></div>
            )}
            {menu.name}
          </div>
        </div>
        <div className="w-1/4 p-3">{menu.url}</div>
        <div className="w-1/4 p-3 flex justify-end gap-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(menu)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(menu)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
      {hasChildren && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleContent>
            {menu.children.map((child) => (
              <MenuTableRow
                key={child.idMenu}
                menu={child}
                level={level + 1}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </>
  );
}
