import type { User } from "@/types/common/user";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { userService } from "@/services/user.service";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { Copy, CopyCheck } from "lucide-react";

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
  const [copiedPassword, copyToClipboard] = useCopyToClipboard();
  const [isLoading, setIsLoading] = useState(false);

  const handleOnGeneratePassword = () => {
    setIsLoading(true);
    userService
      .generatedPassword(user.id)
      .then((response) => {
        setPasswordGenerated(response.generatedPassword);
      })
      .catch((error) => {
        console.error("Error generating password:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
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
              <InputGroup>
                <InputGroupInput
                  placeholder={passwordGenerated}
                  readOnly
                  value={passwordGenerated}
                />
                <InputGroupAddon align={"inline-end"}>
                  <InputGroupButton
                    size={"sm"}
                    onClick={() => copyToClipboard(passwordGenerated)}
                    aria-label="Copiar contraseña"
                  >
                    {copiedPassword === passwordGenerated ? (
                      <CopyCheck />
                    ) : (
                      <Copy />
                    )}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </p>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button
            variant="destructive"
            className=""
            onClick={passwordGenerated ? onConfirm : handleOnGeneratePassword}
            disabled={isLoading}
          >
            {passwordGenerated ? "Aceptar" : "Generar Contraseña"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
