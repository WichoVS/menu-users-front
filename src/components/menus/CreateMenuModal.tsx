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
import type { CreateMenuRequest } from "@/types/api/menu/create-menu";
import InputFormField from "../forms/form-field/input.form-field";
import SelectFormField from "../forms/form-field/select.form-field";
import SwitchFormField from "../forms/form-field/switch.form-field";
import { useRoleStore } from "@/store/roleStore";
import { useMenuStore } from "@/store/menuStore";

const menuSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  isMain: z.boolean(),
  parentId: z.number().nullable(),
  url: z.string().min(1, "La ruta es requerida"),
  minHierarchy: z.number(),
});

interface CreateMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CreateMenuRequest) => void;
}

export function CreateMenuModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateMenuModalProps) {
  const { roles } = useRoleStore();
  const { menus } = useMenuStore();
  const form = useForm<z.infer<typeof menuSchema>>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: "",
      isMain: true,
      parentId: null,
      url: "",
      minHierarchy: 0,
    },
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      onClose();
    }
  };

  const isMain = form.watch("isMain");

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Nuevo Menú</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <InputFormField fieldName="name" label="Nombre" isRequired />
              <InputFormField fieldName="url" label="Ruta" isRequired />
              <SwitchFormField fieldName="isMain" label="¿Es Menú Principal?" />
              {!isMain && (
                <SelectFormField
                  fieldName="parentId"
                  label="Menú Padre"
                  onChange={(value) => {
                    form.setValue("parentId", parseInt(value));
                  }}
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
                label="Jerarquía Mínima"
                onChange={(value) => {
                  form.setValue("minHierarchy", parseInt(value));
                }}
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
              <Button type="submit">Crear Menú</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
