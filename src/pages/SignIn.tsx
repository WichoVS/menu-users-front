import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFormField from "@/components/forms/form-field/input.form-field";
import { authService } from "@/services/auth.service";
import { useUserStore } from "@/store/userStore";

const signInFormSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  email: z.email("Correo electrónico inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export default function SignIn() {
  const { login } = useUserStore();
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data: z.infer<typeof signInFormSchema>) => {
    console.log({ ...data, roleId: 3 });
    authService
      .signin(data.firstName, data.lastName, data.email, data.password)
      .then((response) => {
        alert("Usuario registrado exitosamente");
        console.log(response);
        login(
          {
            id: response.id,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            roleId: response.role,
          },
          response.token,
        );

        navigate("/dashboard");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Registrarse
          </h2>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <InputFormField fieldName="firstName" label="Nombre(s)" />
              <InputFormField fieldName="lastName" label="Apellido(s)" />
              <InputFormField
                fieldName="email"
                label="Correo Electrónico"
                type="email"
              />
              <InputFormField
                fieldName="password"
                label="Contraseña"
                type="password"
              />
              <Button type="submit" className="w-full">
                Registrarse
              </Button>
            </form>
          </FormProvider>
        </div>
      </main>
    </div>
  );
}
