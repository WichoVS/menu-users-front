import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Menu } from "@/types/common/menu";
import type { UpdateMenuRequest } from "@/types/api/menu/update-menu";
import InputFormField from "../forms/form-field/input.form-field";
import SwitchFormField from "../forms/form-field/switch.form-field";
import SelectFormField from "../forms/form-field/select.form-field";
import { useRoleStore } from "@/store/roleStore";
import { useMenuStore } from "@/store/menuStore";

const menuSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  isMain: z.boolean(),
  parentId: z.number().nullable(),
  url: z.string().min(1, "La ruta es requerida"),
  minHierarchy: z.number(),
});

interface EditMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: UpdateMenuRequest) => void;
  menu: Menu;
}

export function EditMenuModal({
  isOpen,
  onClose,
  onSubmit,
  menu,
}: EditMenuModalProps) {
  const { menus } = useMenuStore();
  const { roles } = useRoleStore();

  const form = useForm<z.infer<typeof menuSchema>>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: menu.name,
      isMain: menu.isMain,
      parentId: menu.parentId,
      url: menu.url,
      minHierarchy: menu.minHierarchy,
    },
  });

  useEffect(() => {
    if (menu) {
      form.reset({
        name: menu.name,
        url: menu.url,
        isMain: menu.isMain,
        parentId: menu.parentId,
        minHierarchy: menu.minHierarchy,
      });
    }
  }, [menu, form.reset]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const isMain = form.watch("isMain");

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Menú</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <InputFormField
                fieldName="name"
                label="Nombre"
                isRequired
                value={menu.name}
              />
              <InputFormField
                fieldName="url"
                label="Ruta"
                isRequired
                value={menu.url}
              />
              <SwitchFormField fieldName="isMain" label="¿Es Menú Principal?" />
              {!isMain && (
                <SelectFormField
                  fieldName="parentId"
                  label="Menú Padre"
                  value={menu.parentId?.toString() || ""}
                  options={menus
                    .filter((menu) => menu.isMain)
                    .map((menu) => ({
                      value: menu.idMenu.toString(),
                      label: menu.name,
                    }))}
                />
              )}
              <SelectFormField
                fieldName="minHierarchy"
                value={menu.minHierarchy.toString()}
                label="Jerarquía Mínima"
                options={roles.map((role) => ({
                  value: role.hierarchy.toString(),
                  label: role.name,
                }))}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Guardar Cambios</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
