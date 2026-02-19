import { Button } from "@/components/ui/button";
import CreateUsuarioModal from "@/components/usuarios/CreateUsuarioModal";
import { DeleteUsuarioModal } from "@/components/usuarios/DeleteUsuarioModal";
import { EditMenuAccessModal } from "@/components/usuarios/EditMenuAccessModal";
import { EditUsuarioModal } from "@/components/usuarios/EditUsuarioModal";
import { GeneratePasswordModal } from "@/components/usuarios/GeneratePasswordModal";
import { UsuariosList } from "@/components/usuarios/UsuariosList";
import { menuService } from "@/services/menu.service";
import { roleService } from "@/services/role.service";
import { userService } from "@/services/user.service";
import { useMenuStore } from "@/store/menuStore";
import { useRoleStore } from "@/store/roleStore";
import { useUsersStore } from "@/store/usersStore";
import type { UpdateMenuAccessRequest } from "@/types/api/menu/assign-menu-user";
import type { CreateUserRequest } from "@/types/api/user/create-user";
import type { UpdateUserRequest } from "@/types/api/user/update-user";
import type { User } from "@/types/common/user";
import { useEffect, useState } from "react";

export default function UsuariosPage() {
  const { users, setUsers } = useUsersStore((state) => state);
  const { menus, setMenus } = useMenuStore((state) => state);
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
  const [generatePasswordModalOpen, setGeneratePasswordModalOpen] =
    useState(false);

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

  const handleFetchMenus = () => {
    menuService
      .getAllMenuItems()
      .then((data) => {
        if (data) {
          setMenus(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleUpdateUser = async (values: UpdateUserRequest) => {
    console.log(values, selectedUser);

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
    setSelectedUser(user);
    setEditMenuAccessModal(true);
  };

  const handleGeneratePassword = (user: User) => {
    setSelectedUser(user);
    setGeneratePasswordModalOpen(true);
  };

  const onEditMenuAccess = (values: UpdateMenuAccessRequest) => {
    console.log("Updating menu access with values:", values);
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
      handleFetchMenus();
    };

    fetchData();
  }, []);

  return (
    <main className="container mx-auto">
      <section className="flex justify-between mt-5 mb-4">
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
            onGeneratePassword={handleGeneratePassword}
          />
        )}
      </section>
      <CreateUsuarioModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateUser}
      />
      {selectedUser && (
        <EditUsuarioModal
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedUser(null);
          }}
          onSubmit={handleUpdateUser}
          user={selectedUser}
        />
      )}

      {selectedUser && (
        <EditMenuAccessModal
          isOpen={editMenuAccessModal}
          onClose={() => {
            setEditMenuAccessModal(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
        />
      )}

      {selectedUser && (
        <GeneratePasswordModal
          isOpen={generatePasswordModalOpen}
          onClose={() => {
            setGeneratePasswordModalOpen(false);
            setSelectedUser(null);
          }}
          onConfirm={() => {
            setGeneratePasswordModalOpen(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
        />
      )}

      <DeleteUsuarioModal
        isOpen={deleteAlertOpen}
        onClose={() => setDeleteAlertOpen(false)}
        onConfirm={confirmDelete}
        usuario={selectedUser}
      />
    </main>
  );
}
