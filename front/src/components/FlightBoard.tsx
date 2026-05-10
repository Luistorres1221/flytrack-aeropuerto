const flights = [
  { code: "AS-201", dest: "Ciudad de México", iata: "MEX", time: "08:30", gate: "A3", status: "A tiempo", dot: "bg-primary" },
  { code: "AS-415", dest: "Bogotá", iata: "BOG", time: "10:15", gate: "B7", status: "Retrasado", dot: "bg-accent" },
  { code: "AS-302", dest: "Lima", iata: "LIM", time: "12:00", gate: "A1", status: "A tiempo", dot: "bg-primary" },
  { code: "AS-508", dest: "Buenos Aires", iata: "EZE", time: "14:45", gate: "C2", status: "Abordando", dot: "bg-chart-4" },
  { code: "AS-119", dest: "Santiago", iata: "SCL", time: "16:20", gate: "B4", status: "A tiempo", dot: "bg-primary" },
];

const FlightBoard = () => (
  <section className="py-24 border-t border-border">
    <div className="container px-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 max-w-[60px] bg-primary" />
        <span className="text-primary font-mono text-sm tracking-widest uppercase">En vivo</span>
      </div>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16 max-w-lg">
        Panel de vuelos
      </h2>

      <div className="space-y-3">
        {flights.map((f) => (
          <div
            key={f.code}
            className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-0 bg-card border border-border rounded-lg p-5 md:p-6 hover:border-primary/30 transition-colors"
          >
            <div className="md:w-28 font-mono font-bold text-lg text-foreground">{f.code}</div>
            <div className="md:flex-1">
              <span className="text-foreground font-medium">{f.dest}</span>
              <span className="text-muted-foreground ml-2 font-mono text-sm">({f.iata})</span>
            </div>
            <div className="md:w-24 font-mono text-muted-foreground">{f.time}</div>
            <div className="md:w-20">
              <span className="text-xs font-mono text-muted-foreground">GATE</span>
              <span className="ml-2 font-mono font-semibold text-foreground">{f.gate}</span>
            </div>
            <div className="md:w-32 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${f.dot}`} />
              <span className="text-sm font-medium text-muted-foreground">{f.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FlightBoard;
