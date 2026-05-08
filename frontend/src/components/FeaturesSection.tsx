import { Button } from "@/components/ui/button";

function FeaturesSection() {
  const features = [
    { icon: "✈️", title: "Vuelos", description: "Gestión completa de vuelos" },
    { icon: "🎫", title: "Reservas", description: "Reserva de pasajes simplificada" },
    { icon: "🧳", title: "Equipaje", description: "Seguimiento de equipaje en tiempo real" },
  ];

  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Características</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
