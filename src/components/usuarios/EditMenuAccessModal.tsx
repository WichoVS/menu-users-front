import { useMenuStore } from "@/store/menuStore";
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
import { menuService } from "@/services/menu.service";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Field, FieldGroup } from "../ui/field";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import type { UserMenus } from "@/types/common/user-menus";
import { ChevronDownIcon } from "lucide-react";

type EditMenuAccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
};

const EditMenuAccessModal = ({
  isOpen,
  onClose,
  user,
}: EditMenuAccessModalProps) => {
  const { menus } = useMenuStore((state) => state);
  const [menusCurrentSelected, setMenusCurrentSelected] = useState<UserMenus>({
    userId: user.id,
    menu: [],
  });

  const checkUserHasMenu = (menuId: number): boolean => {
    //Tenemos que recorrer los children de los menús para verificar si el usuario tiene acceso a alguno de ellos,
    //  ya que el acceso se asigna a los menús hijos cuando isMain es false

    for (const menu of menusCurrentSelected.menu) {
      if (menu.idMenu === menuId && menu.isMain) {
        return true;
      }
      if (menu.children && menu.children.length > 0) {
        for (const child of menu.children) {
          if (child.idMenu === menuId) {
            return true;
          }
        }
      }
    }

    return false;
  };

  const fetchUserMenus = () => {
    menuService
      .getMenuItems(user.id)
      .then((data) => {
        setMenusCurrentSelected(data);
      })
      .catch((error) => {
        console.error("Error fetching user's menu access:", error);
      });
  };

  const handleCheckboxChange = (menuId: number, checked: boolean) => {
    if (checked) {
      menuService
        .addMenuAccessUser(user.id, menuId)
        .then(() => {
          fetchUserMenus();
        })
        .catch((error) => {
          console.error("Error updating menu access:", error);
        });
    } else {
      menuService
        .removeMenuAccessUser(user.id, menuId)
        .then(() => {
          fetchUserMenus();
        })
        .catch((error) => {
          console.error("Error updating menu access:", error);
        });
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserMenus();
    }
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
            .map((menu) =>
              menu.children.length > 0 ? (
                <Collapsible key={menu.idMenu}>
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between border-b border-gray-200 p-4 cursor-pointer group bg-gray-100 border">
                      <h3 className="text-lg font-semibold">{menu.name}</h3>
                      <ChevronDownIcon className="h-4 w-4 group-data-[state=open]:rotate-180" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent key={menu.idMenu}>
                    {menu.children.map((child) => (
                      <div
                        key={child.idMenu}
                        className="flex items-center justify-between border-b border-gray-100 p-4 px-10"
                      >
                        <FieldGroup className="">
                          <Field
                            orientation={"horizontal"}
                            className="flex flex-row items-center justify-between"
                          >
                            <Label
                              htmlFor={`checkbox-${child.idMenu}`}
                              className="mr-2 text-lg cursor-pointer"
                            >
                              {child.name}
                            </Label>
                            <Checkbox
                              id={`checkbox-${child.idMenu}`}
                              name={`checkbox-${child.idMenu}`}
                              className="w-4 cursor-pointer"
                              checked={checkUserHasMenu(child.idMenu)}
                              onCheckedChange={(checked) => {
                                handleCheckboxChange(
                                  child.idMenu,
                                  checked as boolean,
                                );
                              }}
                            />
                          </Field>
                        </FieldGroup>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <div
                  key={menu.idMenu}
                  className="flex items-center justify-between border-b border-gray-100 p-4"
                >
                  <FieldGroup className="">
                    <Field
                      orientation={"horizontal"}
                      className="flex flex-row items-center"
                    >
                      <Label
                        htmlFor={`checkbox-${menu.idMenu}`}
                        className="mr-2 text-lg cursor-pointer"
                      >
                        {menu.name}
                      </Label>
                      <Checkbox
                        id={`checkbox-${menu.idMenu}`}
                        name={`checkbox-${menu.idMenu}`}
                        className="w-4 cursor-pointer"
                        checked={checkUserHasMenu(menu.idMenu)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(menu.idMenu, checked as boolean)
                        }
                      />
                    </Field>
                  </FieldGroup>
                </div>
              ),
            )}
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
