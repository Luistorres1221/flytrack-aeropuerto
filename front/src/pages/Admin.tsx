import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Passengers from "./Passengers";

type Flight = {
  id: string; flight_number: string; origin: string; destination: string;
  departure_time: string; arrival_time: string; gate: string | null;
  status: "on_time" | "delayed" | "cancelled" | "boarding" | "departed";
};
type Report = {
  id: string; flight_number: string; passenger_name: string; description: string;
  status: "open" | "investigating" | "found" | "closed"; admin_notes: string | null; created_at: string;
};

const Admin = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [reports, setReports] = useState<Report[]>([]);

  const loadFlights = async () => {
    const { data } = await supabase.from("flights").select("*").order("departure_time");
    setFlights((data as Flight[]) || []);
  };
  const loadReports = async () => {
    const { data } = await supabase.from("baggage_reports").select("*").order("created_at", { ascending: false });
    setReports((data as Report[]) || []);
  };

  useEffect(() => { loadFlights(); loadReports(); }, []);

  const updateFlight = async (id: string, patch: Partial<Flight>) => {
    const { error } = await supabase.from("flights").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Vuelo actualizado");
    loadFlights();
  };

  const updateReport = async (id: string, patch: Partial<Report>) => {
    const { error } = await supabase.from("baggage_reports").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Reporte actualizado");
    loadReports();
  };

  return (
    <div className="container px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Administración</h1>
      <Tabs defaultValue="flights">
        <TabsList>
          <TabsTrigger value="flights">Vuelos</TabsTrigger>
          <TabsTrigger value="reports">Reportes equipaje</TabsTrigger>
          <TabsTrigger value="passengers">Pasajeros</TabsTrigger>
        </TabsList>

        <TabsContent value="passengers" className="mt-6">
          <Passengers />
        </TabsContent>

        <TabsContent value="flights" className="space-y-4 mt-6">
          {flights.map((f) => (
            <Card key={f.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-mono">{f.flight_number} · {f.origin} → {f.destination}</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Puerta</label>
                  <Input defaultValue={f.gate ?? ""} onBlur={(e) => e.target.value !== (f.gate ?? "") && updateFlight(f.id, { gate: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Estado</label>
                  <Select defaultValue={f.status} onValueChange={(v) => updateFlight(f.id, { status: v as Flight["status"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="on_time">A tiempo</SelectItem>
                      <SelectItem value="delayed">Retrasado</SelectItem>
                      <SelectItem value="boarding">Abordando</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                      <SelectItem value="departed">Despegó</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-xs text-muted-foreground self-end">
                  Salida: {new Date(f.departure_time).toLocaleString("es-ES")}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="reports" className="space-y-4 mt-6">
          {reports.length === 0 && <p className="text-muted-foreground">No hay reportes.</p>}
          {reports.map((r) => (
            <Card key={r.id}>
              <CardHeader className="pb-2 flex-row justify-between items-center">
                <CardTitle className="text-base">{r.passenger_name} · <span className="font-mono">{r.flight_number}</span></CardTitle>
                <Badge>{r.status}</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">{r.description}</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <Select defaultValue={r.status} onValueChange={(v) => updateReport(r.id, { status: v as Report["status"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Abierto</SelectItem>
                      <SelectItem value="investigating">En investigación</SelectItem>
                      <SelectItem value="found">Encontrado</SelectItem>
                      <SelectItem value="closed">Cerrado</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea placeholder="Nota interna" defaultValue={r.admin_notes ?? ""}
                    onBlur={(e) => e.target.value !== (r.admin_notes ?? "") && updateReport(r.id, { admin_notes: e.target.value })} />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
