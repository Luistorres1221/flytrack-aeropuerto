function Notifications() {
  const notifications = [
    { id: 1, type: "Flight", message: "Tu vuelo AA100 partirá en 2 horas", time: "Hace 5 min" },
    { id: 2, type: "Baggage", message: "Tu equipaje ha sido cargado", time: "Hace 15 min" },
    { id: 3, type: "System", message: "Actualización del sistema completada", time: "Hace 1 hora" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Notificaciones</h1>
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div key={notif.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-lg">{notif.type}</p>
                  <p className="text-gray-700 mt-2">{notif.message}</p>
                </div>
                <span className="text-sm text-gray-500">{notif.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
