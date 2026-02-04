import Header from '@/components/Header';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold">¡Bienvenido a la página principal!</h1>
      </main>
    </div>
  );
}
