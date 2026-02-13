import { FormProvider, useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFormField from "../forms/form-field/input.form-field";
import SelectFormField from "../forms/form-field/select.form-field";
import { useRoleStore } from "@/store/roleStore";
import type { UpdateUserRequest } from "@/types/api/user/update-user";
import type { User } from "@/types/common/user";
import { useEffect } from "react";
import { Button } from "../ui/button";

const editUsuarioSchema = z.object({
  id: z.uuid(),
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  email: z.email(),
  roleId: z.number().gt(0),
});

type EditUsuarioModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: UpdateUserRequest) => void;
  user: User;
};

const EditUsuarioModal = ({
  isOpen,
  onClose,
  onSubmit,
  user,
}: EditUsuarioModalProps) => {
  const { roles } = useRoleStore((state) => state);
  const form = useForm<z.infer<typeof editUsuarioSchema>>({
    resolver: zodResolver(editUsuarioSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roleId: user.roleId,
      id: user.id,
    },
  });
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    form.reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roleId: user.roleId,
      id: user.id,
    });
  }, [user, form]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogTitle>Editar Usuario</DialogTitle>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <InputFormField
                fieldName="firstName"
                label="Nombre"
                isRequired
                value={user.firstName}
              />
              <InputFormField
                fieldName="lastName"
                label="Apellido"
                isRequired
                value={user.lastName}
              />
              <InputFormField
                fieldName="email"
                label="Email"
                isRequired
                value={user.email}
              />
              <SelectFormField
                fieldName="roleId"
                label="Rol"
                isRequired
                value={user.roleId.toString()}
                options={roles.map((role) => ({
                  label: role.name,
                  value: role.id.toString(),
                }))}
                onChange={(value) => {
                  form.setValue("roleId", parseInt(value));
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
};

export { EditUsuarioModal };
