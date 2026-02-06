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
import type { CreateRoleRequest } from "@/types/api/role/create-role";

const roleSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  hierarchy: z.number().min(0, "La jerarquía mínima es 0"),
});

interface CreateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CreateRoleRequest) => void;
}

export function CreateRoleModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateRoleModalProps) {
  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      hierarchy: 0,
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
          <DialogTitle>Crear Nuevo Rol</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <InputFormField fieldName="name" label="Nombre" isRequired />
              <InputFormField
                fieldName="hierarchy"
                label="Jerarquía"
                isRequired
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
              <Button type="submit">Crear Rol</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
