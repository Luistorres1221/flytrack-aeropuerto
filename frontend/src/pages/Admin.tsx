function Admin() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Panel Administrativo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Vuelos Activos", value: "12" },
            { label: "Pasajeros Totales", value: "2,450" },
            { label: "Equipaje Procesado", value: "3,820" },
            { label: "Sistema Status", value: "Online" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm font-semibold">{stat.label}</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Usuarios Recientes</h2>
            <div className="space-y-3">
              {["Juan García", "María López", "Carlos Ruiz"].map((user, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                  <div className="w-10 h-10 bg-blue-400 rounded-full"></div>
                  <p className="font-semibold">{user}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Acciones Rápidas</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Crear Vuelo
              </button>
              <button className="w-full px-4 py-2 border-2 border-blue-600 text-blue-600 rounded hover:bg-blue-50">
                Gestionar Usuarios
              </button>
              <button className="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Ver Reportes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
