import { Button } from "@/components/ui/button";
import type { User } from "@/types/common/user";
import { Edit, Trash2, MenuSquare } from "lucide-react";

type UserTableRowProps = {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onEditMenuAccess: (user: User) => void;
};

export function UsuariosTableRow({
  user,
  onEdit,
  onDelete,
  onEditMenuAccess,
}: UserTableRowProps) {
  return (
    <>
      <div className="flex items-center bg-white border-b border-gray-200">
        <div className="flex-1 p-3">
          <div className="flex items-center">
            {user.firstName} {user.lastName}
          </div>
        </div>
        <div className="w-1/4 p-3">{user.email}</div>
        <div className="w-1/4 p-3">{user.roleName}</div>
        <div className="w-1/4 p-3 flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              onEditMenuAccess(user);
            }}
          >
            <MenuSquare className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onEdit(user)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(user)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
    </>
  );
}
