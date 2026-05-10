import { useEffect, useState } from "react";
import { apiUrl } from "@/lib/apiUrl";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane } from "lucide-react";

type Flight = {
  id: string;
  flight_number: string;
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  gate: string | null;
  terminal: string | null;
  boarding_time: string | null;
  airline: string;
  status: "PROGRAMADO" | "EN_VUELO" | "ABORDANDO" | "RETRASADO" | "CANCELADO" | "COMPLETADO";
};

const statusLabel: Record<Flight["status"], string> = {
  PROGRAMADO: "A tiempo",
  EN_VUELO: "En vuelo",
  ABORDANDO: "Abordando",
  RETRASADO: "Retrasado",
  CANCELADO: "Cancelado",
  COMPLETADO: "Completado",
};
const statusVariant: Record<Flight["status"], "default" | "destructive" | "secondary" | "outline"> = {
  PROGRAMADO: "default",
  EN_VUELO: "secondary",
  ABORDANDO: "secondary",
  RETRASADO: "destructive",
  CANCELADO: "destructive",
  COMPLETADO: "outline",
};

const fmt = (iso: string) => new Date(iso.replace(" ", "T")).toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" });

const Flights = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [q, setQ] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const response = await fetch(apiUrl("/api/vuelos"));
      if (!response.ok) {
        const message = `Error ${response.status}: ${response.statusText}`;
        setError(message);
        console.error(message);
        return;
      }
      const data = await response.json();
      const mappedFlights = data.map((v: any) => ({
        id: v.id.toString(),
        flight_number: v.codigoVuelo,
        origin: v.origen,
        destination: v.destino,
        departure_time: v.fechaSalida,
        arrival_time: v.fechaLlegada,
        gate: v.puerta ?? null,
        terminal: v.terminal ?? null,
        boarding_time: v.horaAbordaje ?? null,
        airline: v.aerolinea,
        status: (v.estado as Flight['status']) ?? 'PROGRAMADO'
      }));
      setFlights(mappedFlights);
      setError(null);
    } catch (error) {
      console.error("Error loading flights:", error);
      setError("No se pudo cargar la lista de vuelos. Revisa la conexión con el backend.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = flights.filter((f) => {
    const matchQ = !q || `${f.flight_number} ${f.origin} ${f.destination}`.toLowerCase().includes(q.toLowerCase());
    const matchD = !date || f.departure_time.startsWith(date);
    return matchQ && matchD;
  });

  return (
    <div className="container px-6 py-10">
      <div className="flex items-center gap-3 mb-2">
        <Plane className="text-primary" />
        <h1 className="text-3xl font-bold">Consulta de vuelos</h1>
      </div>
      <p className="text-muted-foreground mb-6">Información actualizada en tiempo real.</p>

      <div className="grid md:grid-cols-3 gap-3 mb-6">
        <Input placeholder="Número de vuelo, origen o destino" value={q} onChange={(e) => setQ(e.target.value)} />
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <div className="text-sm text-muted-foreground self-center">{filtered.length} vuelo(s)</div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((f) => (
          <Card key={f.id} className="p-5 flex flex-col md:flex-row md:items-center gap-4">
            <div className="md:w-28">
              <div className="font-mono font-bold text-lg">{f.flight_number}</div>
              <div className="text-xs text-muted-foreground">{f.airline}</div>
            </div>
            <div className="md:flex-1">
              <div className="font-medium">{f.origin} → {f.destination}</div>
              <div className="text-xs text-muted-foreground font-mono">
                Salida {fmt(f.departure_time)} · Llegada {fmt(f.arrival_time)}
              </div>
              <div className="text-xs text-muted-foreground font-mono mt-2">
                Puerta {f.gate ?? "—"} · Terminal {f.terminal ?? "—"}
              </div>
              {f.boarding_time && (
                <div className="text-xs text-muted-foreground font-mono">
                  Abordaje {fmt(f.boarding_time)}
                </div>
              )}
            </div>
            <div className="md:w-28 text-sm">
              <span className="text-xs text-muted-foreground">PUERTA</span>
              <div className="font-mono font-semibold">{f.gate ?? "—"}</div>
              <div className="text-xs text-muted-foreground">Terminal {f.terminal ?? "—"}</div>
            </div>
            <Badge variant={statusVariant[f.status]}>{statusLabel[f.status]}</Badge>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-10">Sin vuelos para los filtros.</p>
        )}
      </div>
    </div>
  );
};

export default Flights;
