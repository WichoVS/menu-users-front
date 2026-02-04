import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import InputFormField from "@/components/forms/form-field/input.form-field";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "@/services/auth.service";

const loginFormSchema = z.object({
  email: z.email({ message: "Correo electrónico inválido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

export default function Login() {
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const loginUser = useUserStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
    // In a real application, you would send this data to your API
    console.log(data);

    authService
      .login(data.email, data.password)
      .then((response) => {
        const { id, firstName, lastName, email, role, token } = response;
        loginUser({ id, firstName, lastName, email, roleId: role }, token);
        navigate("/dashboard");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Iniciar Sesión
          </h2>
          <FormProvider {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <InputFormField
                fieldName="email"
                label="Correo Electrónico"
                type="email"
                isRequired={true}
              />
              <InputFormField
                fieldName="password"
                label="Contraseña"
                type="password"
                isRequired={true}
              />
              <Button type="submit" className="w-full">
                Iniciar Sesión
              </Button>
            </form>
          </FormProvider>
        </div>
      </main>
    </div>
  );
}
