import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, PackageSearch, PackageCheck, PackageX, Loader2, Radar } from "lucide-react";

const schema = z.object({
  numeroEtiqueta: z.string().trim().min(2).max(20),
  descripcion: z.string().trim().min(5).max(1000),
  vueloId: z.string().min(1),
  pasajeroId: z.string().min(1),
});

type Equipaje = {
  id: string;
  numeroEtiqueta: string;
  descripcion: string;
  estado: "PERDIDO" | "ENCONTRADO" | "ENTREGADO";
  vueloId: string;
  pasajeroId: string;
  fechaCreacion: string;
  fechaActualizacion: string;
};

const statusLabel = { PERDIDO: "Perdido", ENCONTRADO: "Encontrado", ENTREGADO: "Entregado" } as const;
const statusColor: Record<Equipaje["estado"], string> = {
  PERDIDO: "bg-red-500/15 text-red-500 border-red-500/30",
  ENCONTRADO: "bg-green-500/15 text-green-500 border-green-500/30",
  ENTREGADO: "bg-blue-500/15 text-blue-500 border-blue-500/30",
};

const STEPS: Equipaje["estado"][] = ["PERDIDO", "ENCONTRADO", "ENTREGADO"];

const Tracker = ({ r }: { r: Equipaje }) => {
  const currentIdx = STEPS.indexOf(r.estado);
  return (
    <div className="border border-border rounded-lg p-5 bg-card/50">
      <div className="flex justify-between items-start mb-4 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono font-bold text-primary">{r.numeroEtiqueta}</span>
            <Badge variant="outline" className={statusColor[r.estado]}>{statusLabel[r.estado]}</Badge>
          </div>
          <p className="text-xs text-muted-foreground font-mono">ID: {r.id.slice(0, 8).toUpperCase()}</p>
        </div>
        <p className="text-xs text-muted-foreground text-right">
          Actualizado<br />{new Date(r.fechaActualizacion).toLocaleString("es-ES")}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative flex justify-between mb-4">
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-border" />
        <div
          className="absolute top-4 left-4 h-0.5 bg-primary transition-all"
          style={{ width: `calc(${(currentIdx / (STEPS.length - 1)) * 100}% - ${currentIdx === 0 ? 0 : 16}px)` }}
        />
        {STEPS.map((s, i) => {
          const reached = i <= currentIdx;
          const Icon = s === "PERDIDO" ? PackageSearch : s === "ENCONTRADO" ? PackageCheck : PackageX;
          return (
            <div key={s} className="relative z-10 flex flex-col items-center gap-1.5" style={{ width: 80 }}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                reached ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border text-muted-foreground"
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-[10px] text-center font-medium ${reached ? "text-foreground" : "text-muted-foreground"}`}>
                {statusLabel[s]}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-sm text-muted-foreground border-t border-border pt-3">{r.descripcion}</p>
    </div>
  );
};

const Baggage = () => {
  const [equipajes, setEquipajes] = useState<Equipaje[]>([]);
  const [form, setForm] = useState({ numeroEtiqueta: "", descripcion: "", vueloId: "", pasajeroId: "" });
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");

  const load = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/equipajes`);
      if (!response.ok) throw new Error('Error al cargar equipajes');
      const data = await response.json();
      setEquipajes(data);
    } catch (error) {
      toast.error('Error al cargar equipajes');
      console.error(error);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return equipajes;
    return equipajes.filter(e =>
      e.numeroEtiqueta.toLowerCase().includes(q) ||
      e.id.toLowerCase().startsWith(q) ||
      e.descripcion.toLowerCase().includes(q)
    );
  }, [equipajes, query]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setBusy(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/equipajes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          numeroEtiqueta: parsed.data.numeroEtiqueta,
          descripcion: parsed.data.descripcion,
          vueloId: parseInt(parsed.data.vueloId),
          pasajeroId: parseInt(parsed.data.pasajeroId),
          estado: "PERDIDO"
        })
      });

      if (!response.ok) throw new Error('Error al registrar equipaje');
      toast.success("Equipaje registrado");
      setForm({ numeroEtiqueta: "", descripcion: "", vueloId: "", pasajeroId: "" });
      load();
    } catch (error) {
      toast.error('Error al registrar equipaje');
      console.error(error);
    } finally {
      setBusy(false);
    }
  };

  const stats = useMemo(() => ({
    total: equipajes.length,
    perdido: equipajes.filter(e => e.estado === "PERDIDO").length,
    encontrado: equipajes.filter(e => e.estado === "ENCONTRADO").length,
    entregado: equipajes.filter(e => e.estado === "ENTREGADO").length,
  }), [equipajes]);

  return (
    <div className="container px-6 py-10 space-y-8">
      <div className="flex items-center gap-3">
        <Radar className="w-7 h-7 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Rastreo de equipaje</h1>
          <p className="text-sm text-muted-foreground">Reporta y sigue en tiempo real el estado de tus maletas.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground font-medium">Equipajes totales</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold font-mono">{stats.total}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground font-medium">Perdidos</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold font-mono text-red-500">{stats.perdido}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground font-medium">Encontrados</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold font-mono text-green-500">{stats.encontrado}</p></CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Reportar equipaje perdido</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label>Número de etiqueta</Label>
                <Input value={form.numeroEtiqueta} onChange={(e) => setForm({ ...form, numeroEtiqueta: e.target.value })} placeholder="ABC123" required />
              </div>
              <div>
                <Label>ID del vuelo</Label>
                <Input value={form.vueloId} onChange={(e) => setForm({ ...form, vueloId: e.target.value })} placeholder="1" required />
              </div>
              <div>
                <Label>ID del pasajero</Label>
                <Input value={form.pasajeroId} onChange={(e) => setForm({ ...form, pasajeroId: e.target.value })} placeholder="1" required />
              </div>
              <div>
                <Label>Descripción del equipaje</Label>
                <Textarea rows={4} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} placeholder="Color, marca, contenido..." required />
              </div>
              <Button type="submit" disabled={busy}>{busy ? "Registrando..." : "Registrar equipaje"}</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seguimiento de equipajes</CardTitle>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por vuelo, ID o pasajero..."
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {filtered.length === 0 && (
              <p className="text-muted-foreground text-sm text-center py-8">
                {equipajes.length === 0 ? "Aún no hay equipajes registrados." : "No hay coincidencias para tu búsqueda."}
              </p>
            )}
            {filtered.map((r) => <Tracker key={r.id} r={r} />)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Baggage;
