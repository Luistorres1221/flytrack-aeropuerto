import { ArrowRight, Radar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    {/* Animated grid background */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
      backgroundSize: '60px 60px'
    }} />
    {/* Glow orbs */}
    <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />

    <div className="container relative z-10 px-6 py-20">
      <div className="max-w-4xl">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 text-primary px-4 py-1.5 rounded-full text-sm font-mono tracking-wide mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          SISTEMA ACTIVO
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-6">
          <span className="text-foreground">Fly</span>
          <span className="text-primary">Track</span>
          <br />
          <span className="text-muted-foreground text-4xl md:text-5xl font-medium">Control de vuelos</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10 font-light">
          Monitoreo inteligente de itinerarios, notificaciones en tiempo real y gestión de equipaje para AeroPuerto Smart.
        </p>

        <div className="flex flex-wrap gap-4">
          <button onClick={() => navigate("/vuelos")} className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-md font-semibold text-base hover:brightness-110 transition-all">
            Ver panel de vuelos
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={() => navigate("/equipaje")} className="inline-flex items-center gap-3 border border-border text-foreground px-8 py-4 rounded-md font-semibold text-base hover:bg-secondary transition-colors">
            <Radar className="w-5 h-5" />
            Rastrear equipaje
          </button>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-12 mt-16 pt-10 border-t border-border">
          {[
            { val: "142", label: "Vuelos hoy" },
            { val: "99.2%", label: "Puntualidad" },
            { val: "12", label: "Aerolíneas" },
            { val: "24/7", label: "Monitoreo" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-bold font-mono text-primary">{s.val}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  );
};

export default HeroSection;
