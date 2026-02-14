import { useMenuStore } from "@/store/menuStore";
import type { UpdateMenuAccessRequest } from "@/types/api/menu/assign-menu-user";
import type { User } from "@/types/common/user";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import type { Menu } from "@/types/common/menu";
import { menuService } from "@/services/menu.service";

type EditMenuAccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onChange: (values: UpdateMenuAccessRequest) => void;
  user: User;
};

const EditMenuAccessModal = ({
  isOpen,
  onClose,
  onChange,
  user,
}: EditMenuAccessModalProps) => {
  const { menus } = useMenuStore((state) => state);
  const [menusCurrentSelected, setMenusCurrentSelected] = useState<Menu[]>([]);

  useEffect(() => {
    menuService
      .getMenuItems(user.id)
      .then((data) => {
        setMenusCurrentSelected(data);
      })
      .catch((error) => {
        console.error("Error fetching user's menu access:", error);
      });
  }, [user]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent aria-description="Aquí puedes editar los accesos a los menús para el usuario seleccionado.">
        <DialogHeader>
          <DialogTitle>
            Editar los accesos del usuario {user.firstName} {user.lastName}
          </DialogTitle>
        </DialogHeader>
        <div className="border border-gray-100">
          {menus
            .filter((x) => x.isMain)
            .map((menu) => (
              <div
                key={menu.idMenu}
                className="flex items-center justify-between border-b border-gray-100 p-4"
              >
                <span>{menu.name}</span>
                <Button
                  variant="outline"
                  onClick={() =>
                    onChange({ userId: user.id, menuId: menu.idMenu })
                  }
                >
                  {`${false ? "Revocar acceso" : "Conceder acceso"}`}
                </Button>
              </div>
            ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { EditMenuAccessModal };
