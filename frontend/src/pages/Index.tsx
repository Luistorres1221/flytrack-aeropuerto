function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="min-h-[600px] bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-center px-6">
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

      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Características</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "✈️", title: "Vuelos", description: "Gestión completa de vuelos" },
              { icon: "🎫", title: "Reservas", description: "Reserva de pasajes simplificada" },
              { icon: "🧳", title: "Equipaje", description: "Seguimiento de equipaje en tiempo real" },
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2026 FlyTrack. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default Index;
