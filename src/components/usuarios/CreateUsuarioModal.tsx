import { useRoleStore } from "@/store/roleStore";
import z from "zod";
import { DialogContent } from "@radix-ui/react-dialog";
import InputFormField from "../forms/form-field/input.form-field";
import { Button } from "../ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectFormField from "../forms/form-field/select.form-field";
import type { CreateUserRequest } from "@/types/api/user/create-user";
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const userSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  email: z.email("Correo electrónico inválido"),
  roleId: z.number({ error: "El rol es requerido" }),
});

type CreateUsuarioModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CreateUserRequest) => void;
};

export default function CreateUsuarioModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateUsuarioModalProps) {
  const { roles } = useRoleStore((state) => state);
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      roleId: 0,
    },
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Nuevo Usuario</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <InputFormField fieldName="firstName" label="Nombre" isRequired />
              <InputFormField
                fieldName="lastName"
                label="Apellido"
                isRequired
              />
              <InputFormField
                fieldName="email"
                label="Correo Electrónico"
                type="email"
                isRequired
              />
              <SelectFormField
                fieldName="roleId"
                label="Rol"
                options={roles.map((role) => ({
                  value: role.id.toString(),
                  label: role.name,
                }))}
                isRequired
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Crear Usuario</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
