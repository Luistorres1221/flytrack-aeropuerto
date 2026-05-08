function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Bienvenido a FlyTrack</h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-8">
          La plataforma integral para gestión de aeropuertos
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition">
            Comenzar
          </button>
          <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            Aprender más
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
