import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, PackageSearch, PackageCheck, PackageX, Loader2, Radar } from "lucide-react";

const schema = z.object({
  flight_number: z.string().trim().min(2).max(20),
  passenger_name: z.string().trim().min(2).max(100),
  description: z.string().trim().min(5).max(1000),
});

type Report = {
  id: string;
  flight_number: string;
  passenger_name: string;
  description: string;
  status: "open" | "investigating" | "found" | "closed";
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

const statusLabel = { open: "Abierto", investigating: "En investigación", found: "Encontrado", closed: "Cerrado" } as const;
const statusColor: Record<Report["status"], string> = {
  open: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30",
  investigating: "bg-blue-500/15 text-blue-500 border-blue-500/30",
  found: "bg-green-500/15 text-green-500 border-green-500/30",
  closed: "bg-muted text-muted-foreground border-border",
};

const STEPS: Report["status"][] = ["open", "investigating", "found", "closed"];

const Tracker = ({ r }: { r: Report }) => {
  const currentIdx = STEPS.indexOf(r.status);
  return (
    <div className="border border-border rounded-lg p-5 bg-card/50">
      <div className="flex justify-between items-start mb-4 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono font-bold text-primary">{r.flight_number}</span>
            <Badge variant="outline" className={statusColor[r.status]}>{statusLabel[r.status]}</Badge>
          </div>
          <p className="text-xs text-muted-foreground font-mono">ID: {r.id.slice(0, 8).toUpperCase()}</p>
        </div>
        <p className="text-xs text-muted-foreground text-right">
          Actualizado<br />{new Date(r.updated_at).toLocaleString("es-ES")}
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
          const Icon = s === "open" ? PackageSearch : s === "investigating" ? Loader2 : s === "found" ? PackageCheck : PackageX;
          return (
            <div key={s} className="relative z-10 flex flex-col items-center gap-1.5" style={{ width: 80 }}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                reached ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border text-muted-foreground"
              }`}>
                <Icon className={`w-4 h-4 ${s === "investigating" && r.status === "investigating" ? "animate-spin" : ""}`} />
              </div>
              <span className={`text-[10px] text-center font-medium ${reached ? "text-foreground" : "text-muted-foreground"}`}>
                {statusLabel[s]}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-sm text-muted-foreground border-t border-border pt-3">{r.description}</p>
      {r.admin_notes && (
        <div className="mt-3 p-3 rounded-md bg-primary/5 border border-primary/20">
          <p className="text-xs font-semibold text-primary mb-1">Nota del personal</p>
          <p className="text-sm">{r.admin_notes}</p>
        </div>
      )}
    </div>
  );
};

const Baggage = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [form, setForm] = useState({ flight_number: "", passenger_name: "", description: "" });
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");

  const load = async () => {
    const { data } = await supabase.from("baggage_reports").select("*").eq("user_id", user!.id).order("created_at", { ascending: false });
    setReports((data as Report[]) || []);
  };
  useEffect(() => { if (user) load(); /* eslint-disable-next-line */ }, [user]);

  // Realtime updates so the tracker reflects admin changes live
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel("baggage-tracker")
      .on("postgres_changes", { event: "*", schema: "public", table: "baggage_reports", filter: `user_id=eq.${user.id}` }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
    // eslint-disable-next-line
  }, [user]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return reports;
    return reports.filter(r =>
      r.flight_number.toLowerCase().includes(q) ||
      r.id.toLowerCase().startsWith(q) ||
      r.passenger_name.toLowerCase().includes(q)
    );
  }, [reports, query]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setBusy(true);
    const { error } = await supabase.from("baggage_reports").insert([{
      flight_number: parsed.data.flight_number,
      passenger_name: parsed.data.passenger_name,
      description: parsed.data.description,
      user_id: user!.id,
    }]);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Reporte enviado");
    setForm({ flight_number: "", passenger_name: "", description: "" });
    load();
  };

  const stats = useMemo(() => ({
    total: reports.length,
    active: reports.filter(r => r.status === "open" || r.status === "investigating").length,
    found: reports.filter(r => r.status === "found").length,
  }), [reports]);

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
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground font-medium">Reportes totales</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold font-mono">{stats.total}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground font-medium">En seguimiento</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold font-mono text-yellow-500">{stats.active}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground font-medium">Encontradas</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold font-mono text-green-500">{stats.found}</p></CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Reportar equipaje perdido</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label>Número de vuelo</Label>
                <Input value={form.flight_number} onChange={(e) => setForm({ ...form, flight_number: e.target.value })} placeholder="AS-201" required />
              </div>
              <div>
                <Label>Nombre del pasajero</Label>
                <Input value={form.passenger_name} onChange={(e) => setForm({ ...form, passenger_name: e.target.value })} required />
              </div>
              <div>
                <Label>Descripción del equipaje</Label>
                <Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Color, marca, contenido..." required />
              </div>
              <Button type="submit" disabled={busy}>{busy ? "Enviando..." : "Enviar reporte"}</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seguimiento en vivo</CardTitle>
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
                {reports.length === 0 ? "Aún no tienes reportes. Crea uno para empezar a rastrearlo." : "No hay coincidencias para tu búsqueda."}
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
