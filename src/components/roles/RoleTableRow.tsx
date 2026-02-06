import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import type { Role } from "@/types/common/role";

interface RoleTableRowProps {
  role: Role;
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
}

export function RoleTableRow({ role, onEdit, onDelete }: RoleTableRowProps) {
  return (
    <>
      <div className="flex items-center bg-white border-b border-gray-200">
        <div className="flex-1 p-3">
          <div className="flex items-center">
            <div className="w-6 mr-2"></div>
            {role.name}
          </div>
        </div>
        <div className="w-1/4 p-3">{role.hierarchy}</div>
        <div className="w-1/4 p-3 flex justify-end gap-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(role)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(role)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
    </>
  );
}
