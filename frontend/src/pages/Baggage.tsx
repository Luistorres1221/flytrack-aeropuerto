function Baggage() {
  const baggage = [
    { id: 1, trackingNumber: "BAG-001", flightCode: "AA100", status: "Loaded", location: "Cargo Hold A" },
    { id: 2, trackingNumber: "BAG-002", flightCode: "AA100", status: "In Transit", location: "Terminal B" },
    { id: 3, trackingNumber: "BAG-003", flightCode: "UA202", status: "Delivered", location: "Baggage Claim 5" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Equipaje</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Número de Seguimiento</th>
                <th className="px-6 py-3 text-left font-semibold">Vuelo</th>
                <th className="px-6 py-3 text-left font-semibold">Estado</th>
                <th className="px-6 py-3 text-left font-semibold">Ubicación</th>
              </tr>
            </thead>
            <tbody>
              {baggage.map((bag) => (
                <tr key={bag.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{bag.trackingNumber}</td>
                  <td className="px-6 py-4">{bag.flightCode}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded text-sm ${
                      bag.status === "Loaded" ? "bg-green-100 text-green-800" :
                      bag.status === "In Transit" ? "bg-blue-100 text-blue-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {bag.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{bag.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Baggage;
