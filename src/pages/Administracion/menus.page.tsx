import { menuService } from "@/services/menu.service";
import type { Menu } from "@/types/common/menu";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MenuList } from "@/components/menus/MenuList";
import { CreateMenuModal } from "@/components/menus/CreateMenuModal";
import { EditMenuModal } from "@/components/menus/EditMenuModal";
import { DeleteMenuAlert } from "@/components/menus/DeleteMenuAlert";
import { roleService } from "@/services/role.service";
import type { Role } from "@/types/common/role";
import type { UpdateMenuRequest } from "@/types/api/menu/update-menu";
import type { CreateMenuRequest } from "@/types/api/menu/create-menu";
import { useMenuStore } from "@/store/menuStore";
import { useRoleStore } from "@/store/roleStore";

export default function MenusPage() {
  const { menus, setMenus } = useMenuStore((state) => state);
  const { setRoles } = useRoleStore((state) => state);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    menus: true,
    roles: true,
  });
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

  const fetchMenus = () => {
    setLoading((prev) => ({ ...prev, menus: true }));
    menuService
      .getAllMenuItems()
      .then((data: Menu[]) => {
        if (data) {
          setMenus(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, menus: false }));
      });
  };

  const fetchRoles = () => {
    setLoading((prev) => ({ ...prev, roles: true }));
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
        setLoading((prev) => ({ ...prev, roles: false }));
      });
  };

  useEffect(() => {
    const handleDataFetching = () => {
      fetchMenus();
      fetchRoles();
    };

    handleDataFetching();
  }, []);

  const handleCreateMenu = async (values: CreateMenuRequest) => {
    await menuService.createMenu(values);
    fetchMenus();
    setCreateModalOpen(false);
  };

  const handleEditMenu = (menu: Menu) => {
    setSelectedMenu(menu);
    setEditModalOpen(true);
  };

  const handleUpdateMenu = async (values: UpdateMenuRequest) => {
    if (!selectedMenu) return;
    await menuService.updateMenu(selectedMenu.idMenu, values);
    fetchMenus();
    setEditModalOpen(false);
    setSelectedMenu(null);
  };

  const handleDeleteMenu = (menu: Menu) => {
    setSelectedMenu(menu);
    setDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedMenu) return;
    await menuService.deleteMenu(selectedMenu.idMenu);
    fetchMenus();
    setDeleteAlertOpen(false);
    setSelectedMenu(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Gestión de Menús</h1>
        <Button onClick={() => setCreateModalOpen(true)}>Crear Menú</Button>
      </div>
      <p className="mb-6">
        Aquí puedes administrar los menús de la aplicación.
      </p>

      {loading.menus || loading.roles ? (
        <p>Cargando menús...</p>
      ) : (
        <MenuList
          menus={menus}
          onEdit={handleEditMenu}
          onDelete={handleDeleteMenu}
        />
      )}

      <CreateMenuModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateMenu}
      />

      {selectedMenu && (
        <EditMenuModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedMenu(null);
          }}
          onSubmit={handleUpdateMenu}
          menu={selectedMenu}
        />
      )}

      <DeleteMenuAlert
        isOpen={isDeleteAlertOpen}
        onClose={() => {
          setDeleteAlertOpen(false);
          setSelectedMenu(null);
        }}
        onConfirm={confirmDelete}
        menu={selectedMenu}
      />
    </div>
  );
}
