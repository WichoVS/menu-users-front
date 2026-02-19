import type { User } from "@/types/common/user";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

type GeneratePasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: User;
};

export const GeneratePasswordModal = ({
  isOpen,
  onClose,
  onConfirm,
  user,
}: GeneratePasswordModalProps) => {
  const [passwordGenerated, setPasswordGenerated] = useState<string | null>(
    null,
  );
  useEffect(() => {}, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Generar nueva contraseña</DialogTitle>
        <p className="text-sm text-muted-foreground">
          Se generará una nueva contraseña para el usuario. Esta acción no se
          puede deshacer.
        </p>

        {passwordGenerated && (
          <div className="mt-4 p-4 bg-green-100 rounded">
            <p className="text-sm text-green-800">
              Nueva contraseña para {user.firstName} {user.lastName}:
            </p>
            <p className="mt-2 font-mono text-lg text-green-900">
              <div>
                <Input
                  value={passwordGenerated}
                  readOnly
                  className="bg-green-50"
                />
              </div>
            </p>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button variant="destructive" className="" onClick={onConfirm}>
            {passwordGenerated ? "Aceptar" : "Generar Contraseña"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
