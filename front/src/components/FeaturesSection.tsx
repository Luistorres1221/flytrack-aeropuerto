import { Clock, Bell, MapPin, Luggage } from "lucide-react";

const features = [
  { icon: Clock, title: "Itinerarios", desc: "Horarios de salida y llegada actualizados al instante.", num: "01" },
  { icon: Bell, title: "Alertas", desc: "Notificaciones push sobre retrasos, cancelaciones y cambios.", num: "02" },
  { icon: MapPin, title: "Navegación", desc: "Localiza tu puerta de embarque con indicaciones claras.", num: "03" },
  { icon: Luggage, title: "Equipaje", desc: "Reporta y rastrea el estado de tu equipaje en todo momento.", num: "04" },
];

const FeaturesSection = () => (
  <section className="py-24 border-t border-border">
    <div className="container px-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 max-w-[60px] bg-primary" />
        <span className="text-primary font-mono text-sm tracking-widest uppercase">Funcionalidades</span>
      </div>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16 max-w-lg">
        Todo bajo control en un solo lugar
      </h2>

      <div className="grid md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
        {features.map((f) => (
          <div key={f.title} className="group bg-background p-8 md:p-10 hover:bg-secondary/30 transition-colors">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                <f.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <span className="font-mono text-muted-foreground/40 text-2xl font-bold">{f.num}</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
