function Flights() {
  const flights = [
    { id: 1, code: "AA100", from: "Nueva York", to: "Los Angeles", time: "14:30", duration: "5h 30m", passengers: 250 },
    { id: 2, code: "UA202", from: "Chicago", to: "Miami", time: "15:45", duration: "3h 15m", passengers: 180 },
    { id: 3, code: "DL303", from: "Atlanta", to: "Denver", time: "16:00", duration: "2h 45m", passengers: 220 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Vuelos</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Código</th>
                <th className="px-6 py-3 text-left font-semibold">Origen</th>
                <th className="px-6 py-3 text-left font-semibold">Destino</th>
                <th className="px-6 py-3 text-left font-semibold">Hora</th>
                <th className="px-6 py-3 text-left font-semibold">Duración</th>
                <th className="px-6 py-3 text-left font-semibold">Pasajeros</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr key={flight.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{flight.code}</td>
                  <td className="px-6 py-4">{flight.from}</td>
                  <td className="px-6 py-4">{flight.to}</td>
                  <td className="px-6 py-4">{flight.time}</td>
                  <td className="px-6 py-4">{flight.duration}</td>
                  <td className="px-6 py-4">{flight.passengers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Flights;
