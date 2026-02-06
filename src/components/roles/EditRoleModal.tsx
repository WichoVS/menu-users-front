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
import InputFormField from "../forms/form-field/input.form-field";
import type { UpdateRoleRequest } from "@/types/api/role/update-role";
import type { Role } from "@/types/common/role";

const roleSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  hierarchy: z.number().min(0, "La jerarquía mínima es 0"),
});

interface EditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: UpdateRoleRequest) => void;
  role: Role;
}

export function EditRoleModal({
  isOpen,
  onClose,
  onSubmit,
  role,
}: EditRoleModalProps) {
  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: role.name,
      hierarchy: role.hierarchy,
    },
  });

  useEffect(() => {
    if (role) {
      form.reset({
        name: role.name,
        hierarchy: role.hierarchy,
      });
    }
  }, [role, form.reset]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Rol</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <InputFormField
                fieldName="name"
                label="Nombre"
                isRequired
                value={role.name}
              />
              <InputFormField
                fieldName="hierarchy"
                label="Jerarquía"
                isRequired
                value={role.hierarchy.toString()}
                onChange={(value) => {
                  form.setValue("hierarchy", Number(value));
                }}
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
