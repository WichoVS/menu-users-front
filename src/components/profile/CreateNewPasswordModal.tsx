import type { User } from "@/types/common/user";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import InputFormField from "../forms/form-field/input.form-field";
import { userService } from "@/services/user.service";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const newPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z
      .string()
      .min(8, "La confirmación de contraseña debe tener al menos 8 caracteres"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
  });

type CreateNewPasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: User;
};

export const CreateNewPasswordModal = ({
  isOpen,
  onClose,
  onConfirm,
  user,
}: CreateNewPasswordModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleOnSubmit = (data: z.infer<typeof newPasswordSchema>) => {
    setIsLoading(true);
    userService
      .updatePassword(user.id, data.newPassword)
      .then((response) => {
        onConfirm();
      })
      .catch((error) => {
        console.error("Error updating password:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Crear nueva contraseña</DialogTitle>
        <p className="text-sm text-muted-foreground">
          Se creará una nueva contraseña para el usuario. Esta acción no se
          puede deshacer.
        </p>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleOnSubmit)}>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <InputFormField
                  fieldName="newPassword"
                  label="Nueva contraseña"
                  type="password"
                />
              </div>
              <div className="col-span-12">
                <InputFormField
                  fieldName="confirmPassword"
                  label="Confirmar contraseña"
                  type="password"
                />
              </div>
            </div>
            <Button disabled={isLoading} type="submit" className="mt-4">
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Crear nueva contraseña"
              )}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
      <DialogFooter></DialogFooter>
    </Dialog>
  );
};
