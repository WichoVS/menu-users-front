import type { Role } from "@/types/common/role";
import { RoleTableRow } from "./RoleTableRow";

interface RoleListProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
}

export function RoleList({ roles, onEdit, onDelete }: RoleListProps) {
  return (
    <div className="border border-gray-200 rounded-lg">
      <div className="flex items-center p-3 font-bold bg-gray-50 border-b border-gray-200">
        <div className="flex-1">Nombre</div>
        <div className="w-1/4">Ruta</div>
        <div className="w-1/4 text-right">Acciones</div>
      </div>
      <div>
        {roles.map((role) => (
          <RoleTableRow
            key={role.id}
            role={role}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
