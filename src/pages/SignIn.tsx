import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log({ ...data, roleId: 3 }); // roleId is always 3
    // In a real application, you would send this data to your API
    navigate('/login'); // Redirect to login after successful sign-in
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-900">Registrarse</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                id="firstName"
                type="text"
                {...register('firstName', { required: 'El nombre es requerido' })}
                className={cn({ 'border-red-500': errors.firstName })}
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message as string}</p>}
            </div>
            <div>
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                type="text"
                {...register('lastName', { required: 'El apellido es requerido' })}
                className={cn({ 'border-red-500': errors.lastName })}
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message as string}</p>}
            </div>
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                {...register('email', { required: 'El correo electrónico es requerido' })}
                className={cn({ 'border-red-500': errors.email })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>}
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                {...register('password', { required: 'La contraseña es requerida' })}
                className={cn({ 'border-red-500': errors.password })}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>}
            </div>
            <Button type="submit" className="w-full">
              Registrarse
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
