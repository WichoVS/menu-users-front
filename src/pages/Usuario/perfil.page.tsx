import { useUserStore } from "@/store/userStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateNewPasswordModal } from "@/components/profile/CreateNewPasswordModal";

export default function PerfilPage() {
  const { user } = useUserStore();
  const [isGeneratePasswordModalOpen, setIsGeneratePasswordModalOpen] =
    useState(false);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold">Perfil de Usuario</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nombre</Label>
          <Input id="firstName" value={user?.firstName || ""} readOnly />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Apellido</Label>
          <Input id="lastName" value={user?.lastName || ""} readOnly />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input id="email" value={user?.email || ""} readOnly />
      </div>
      <div className="space-y-2">
        <Label htmlFor="roleId">Rol</Label>
        <Input id="roleId" value={user?.roleId.toString() || ""} readOnly />
      </div>

      <div>
        <Button onClick={() => setIsGeneratePasswordModalOpen(true)}>
          Crear nueva contraseña
        </Button>
      </div>

      {user && (
        <CreateNewPasswordModal
          isOpen={isGeneratePasswordModalOpen}
          onClose={() => setIsGeneratePasswordModalOpen(false)}
          onConfirm={() => setIsGeneratePasswordModalOpen(false)}
          user={user}
        />
      )}
    </div>
  );
}
