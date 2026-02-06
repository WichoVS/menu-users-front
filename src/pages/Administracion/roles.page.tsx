"use client";

import { CreateRoleModal } from "@/components/roles/CreateRoleModal";
import { DeleteRoleAlert } from "@/components/roles/DeleteRoleModal";
import { EditRoleModal } from "@/components/roles/EditRoleModal";
import { RoleList } from "@/components/roles/RolesList";
import { Button } from "@/components/ui/button";
import { roleService } from "@/services/role.service";
import { useRoleStore } from "@/store/roleStore";
import type { CreateRoleRequest } from "@/types/api/role/create-role";
import type { UpdateRoleRequest } from "@/types/api/role/update-role";
import type { Role } from "@/types/common/role";
import { useEffect, useState } from "react";

export default function RolesPage() {
  const { roles, setRoles } = useRoleStore((state) => state);
  const [isLoading, setIsLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

  const handleFetchRoles = () => {
    setIsLoading(true);
    roleService
      .getAllRoles()
      .then((data: Role[]) => {
        if (data) {
          setRoles(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setEditModalOpen(true);
  };

  const handleUpdateRole = async (values: UpdateRoleRequest) => {
    if (!selectedRole) return;
    await roleService.updateRole(selectedRole.id, values);
    handleFetchRoles();
    setEditModalOpen(false);
    setSelectedRole(null);
  };

  const handleDeleteRole = (role: Role) => {
    setSelectedRole(role);
    setDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedRole) return;
    await roleService.deleteRole(selectedRole.id);
    handleFetchRoles();
    setDeleteAlertOpen(false);
    setSelectedRole(null);
  };

  const handleCreateRole = async (values: CreateRoleRequest) => {
    await roleService.createRole(values);
    handleFetchRoles();
    setCreateModalOpen(false);
  };

  useEffect(() => {
    const fetchData = () => {
      handleFetchRoles();
    };

    fetchData();
  }, []);

  return (
    <main className="container mx-auto">
      <section className="prose flex justify-between mt-5 mb-10">
        <h2 className="text-3xl font-semibold ml-10">Roles</h2>
        <Button
          onClick={() => {
            setCreateModalOpen(true);
          }}
        >
          Crear Rol
        </Button>
      </section>
      <section>
        {isLoading ? (
          <p>Cargando menús...</p>
        ) : (
          <RoleList
            roles={roles}
            onEdit={handleEditRole}
            onDelete={handleDeleteRole}
          />
        )}
      </section>
      <CreateRoleModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateRole}
      />

      {selectedRole && (
        <EditRoleModal
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedRole(null);
          }}
          onSubmit={handleUpdateRole}
          role={selectedRole}
        />
      )}

      <DeleteRoleAlert
        isOpen={deleteAlertOpen}
        onClose={() => {
          setDeleteAlertOpen(false);
          setSelectedRole(null);
        }}
        onConfirm={confirmDelete}
        role={selectedRole}
      />
    </main>
  );
}
