import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function FlightBoard() {
  const navigate = useNavigate();

  const flights = [
    { code: "AA100", from: "NYC", to: "LAX", time: "14:30", status: "On Time" },
    { code: "UA202", from: "CHI", to: "MIA", time: "15:45", status: "Boarding" },
    { code: "DL303", from: "ATL", to: "DEN", time: "16:00", status: "Delayed" },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow p-6">
      <h3 className="text-2xl font-bold mb-6">Vuelos Próximos</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th className="pb-2">Código</th>
              <th className="pb-2">Origen</th>
              <th className="pb-2">Destino</th>
              <th className="pb-2">Hora</th>
              <th className="pb-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.code} className="border-b hover:bg-slate-50">
                <td className="py-3 font-semibold">{flight.code}</td>
                <td className="py-3">{flight.from}</td>
                <td className="py-3">{flight.to}</td>
                <td className="py-3">{flight.time}</td>
                <td className="py-3">
                  <span className={`px-3 py-1 rounded text-sm ${
                    flight.status === "On Time" ? "bg-green-100 text-green-800" :
                    flight.status === "Boarding" ? "bg-blue-100 text-blue-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {flight.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button className="mt-6" onClick={() => navigate("/vuelos")}>Ver todos los vuelos</Button>
    </div>
  );
}

export default FlightBoard;
