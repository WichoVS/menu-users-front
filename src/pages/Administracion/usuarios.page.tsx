import { Button } from "@/components/ui/button";
import CreateUsuarioModal from "@/components/usuarios/CreateUsuarioModal";
import { UsuariosList } from "@/components/usuarios/UsuariosList";
import { roleService } from "@/services/role.service";
import { userService } from "@/services/user.service";
import { useRoleStore } from "@/store/roleStore";
import { useUsersStore } from "@/store/usersStore";
import type { CreateUserRequest } from "@/types/api/user/create-user";
import type { UpdateUserRequest } from "@/types/api/user/update-user";
import type { User } from "@/types/common/user";
import { useEffect, useState } from "react";

export default function UsuariosPage() {
  const { users, setUsers } = useUsersStore((state) => state);
  const { setRoles } = useRoleStore((state) => state);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<{
    users: boolean;
    roles: boolean;
  }>({ users: true, roles: true });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [editMenuAccessModal, setEditMenuAccessModal] = useState(false);

  const handleFetchUsers = () => {
    setIsLoading((prev) => ({ users: true, roles: prev.roles }));
    userService
      .getAll()
      .then((data: User[]) => {
        if (data) {
          setUsers(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setIsLoading((prev) => ({ users: false, roles: prev.roles }));
      });
  };

  const handleFetchRoles = () => {
    setIsLoading((prev) => ({ users: prev.users, roles: true }));
    roleService
      .getAllRoles()
      .then((data) => {
        if (data) {
          setRoles(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      })
      .finally(() => {
        setIsLoading((prev) => ({ users: prev.users, roles: false }));
      });
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleUpdateUser = async (values: UpdateUserRequest) => {
    if (!selectedUser) return;
    await userService.update(selectedUser.id, values);
    handleFetchUsers();
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setDeleteAlertOpen(true);
  };

  const handleEditMenuAccess = (user: User) => {
    console.log("Edit menu access for user:", user);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    await userService.delete(selectedUser.id);
    handleFetchUsers();
    setDeleteAlertOpen(false);
    setSelectedUser(null);
  };

  const handleCreateUser = async (values: CreateUserRequest) => {
    await userService.create(values);
    handleFetchUsers();
    setCreateModalOpen(false);
  };

  useEffect(() => {
    const fetchData = () => {
      handleFetchUsers();
      handleFetchRoles();
    };

    fetchData();
  }, []);

  return (
    <main className="container mx-auto">
      <section className="prose flex justify-between mt-5 mb-10">
        <h2 className="text-3xl font-semibold ml-10">Usuarios</h2>
        <Button
          onClick={() => {
            setCreateModalOpen(true);
          }}
        >
          Crear Usuario
        </Button>
      </section>
      <section>
        {isLoading.users || isLoading.roles ? (
          <p>Cargando usuarios...</p>
        ) : (
          <UsuariosList
            usuarios={users}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onEditMenuAccess={handleEditMenuAccess}
          />
        )}
      </section>
      <CreateUsuarioModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateUser}
      />
    </main>
  );
}
