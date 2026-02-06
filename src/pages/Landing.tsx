import Header from "@/components/Header";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="relative grow flex items-center justify-center bg-red-500">
        <div className="absolute w-screen top-0 z-0 h-full bg-red-200">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            preload="auto"
          >
            <source src="/video-landing.mp4" type="video/mp4" />
          </video>
        </div>
        <h1 className="text-4xl font-bold z-10 text-white text-shadow-black text-shadow-lg">
          ¡Bienvenido a la página principal!
        </h1>
      </main>
    </div>
  );
}
