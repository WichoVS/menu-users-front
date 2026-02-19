import type { User } from "@/types/common/user";
import { UsuariosTableRow } from "./UsuarioTableRow";

type UsuarioListProps = {
  usuarios: User[];
  onEdit: (usuario: User) => void;
  onDelete: (usuario: User) => void;
  onEditMenuAccess: (usuario: User) => void;
  onGeneratePassword: (usuario: User) => void;
};

export function UsuariosList({
  usuarios,
  onEdit,
  onDelete,
  onEditMenuAccess,
  onGeneratePassword,
}: UsuarioListProps) {
  return (
    <div className="border border-gray-200 rounded-lg">
      <div className="flex items-center p-3 font-bold bg-gray-50 border-b border-gray-200">
        <div className="flex-1">Nombre</div>
        <div className="w-1/4">Ruta</div>
        <div className="w-1/4 text-right">Acciones</div>
      </div>
      <div>
        {usuarios.map((usuario) => (
          <UsuariosTableRow
            key={usuario.id}
            user={usuario}
            onEdit={onEdit}
            onDelete={onDelete}
            onEditMenuAccess={onEditMenuAccess}
            onGeneratePassword={onGeneratePassword}
          />
        ))}
      </div>
    </div>
  );
}
