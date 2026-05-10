import { useEffect, useState } from "react";
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

const Admin = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [equipajes, setEquipajes] = useState<Equipaje[]>([]);

  const loadFlights = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/vuelos`);
      if (!response.ok) throw new Error('Error al cargar vuelos');
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
    } catch (error) {
      toast.error('Error al cargar vuelos');
      console.error(error);
    }
  };

  const loadEquipajes = async () => {
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

  useEffect(() => { loadFlights(); loadEquipajes(); }, []);

  const updateFlight = async (id: string, patch: Partial<Flight>) => {
    try {
      // Convertir el patch al formato esperado por la API
      const apiPatch: any = {};
      if (patch.gate !== undefined) apiPatch.puerta = patch.gate;
      if (patch.terminal !== undefined) apiPatch.terminal = patch.terminal;
      if (patch.status !== undefined) apiPatch.estado = patch.status;

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/vuelos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPatch)
      });

      if (!response.ok) throw new Error('Error al actualizar vuelo');
      toast.success("Vuelo actualizado");
      loadFlights();
    } catch (error) {
      toast.error('Error al actualizar vuelo');
      console.error(error);
    }
  };

  const updateEquipaje = async (id: string, patch: Partial<Equipaje>) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/equipajes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch)
      });

      if (!response.ok) throw new Error('Error al actualizar equipaje');
      toast.success("Equipaje actualizado");
      loadEquipajes();
    } catch (error) {
      toast.error('Error al actualizar equipaje');
      console.error(error);
    }
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
                <CardTitle className="text-base">
                  <div className="font-mono">{f.flight_number}</div>
                  <div className="text-sm text-muted-foreground">{f.airline}</div>
                  <div className="text-sm">{f.origin} → {f.destination}</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Puerta</label>
                  <Input defaultValue={f.gate ?? ""} onBlur={(e) => e.target.value !== (f.gate ?? "") && updateFlight(f.id, { gate: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Terminal</label>
                  <Input defaultValue={f.terminal ?? ""} onBlur={(e) => e.target.value !== (f.terminal ?? "") && updateFlight(f.id, { terminal: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Estado</label>
                  <Select defaultValue={f.status} onValueChange={(v) => updateFlight(f.id, { status: v as Flight["status"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PROGRAMADO">Programado</SelectItem>
                      <SelectItem value="EN_VUELO">En vuelo</SelectItem>
                      <SelectItem value="ABORDANDO">Abordando</SelectItem>
                      <SelectItem value="RETRASADO">Retrasado</SelectItem>
                      <SelectItem value="CANCELADO">Cancelado</SelectItem>
                      <SelectItem value="COMPLETADO">Completado</SelectItem>
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
          {equipajes.length === 0 && <p className="text-muted-foreground">No hay equipajes registrados.</p>}
          {equipajes.map((e) => (
            <Card key={e.id}>
              <CardHeader className="pb-2 flex-row justify-between items-center">
                <CardTitle className="text-base">
                  <span className="font-mono">{e.numeroEtiqueta}</span> · Vuelo ID: {e.vueloId}
                </CardTitle>
                <Badge variant={e.estado === 'PERDIDO' ? 'destructive' : e.estado === 'ENCONTRADO' ? 'default' : 'secondary'}>
                  {e.estado}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">{e.descripcion}</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <Select defaultValue={e.estado} onValueChange={(v) => updateEquipaje(e.id, { estado: v as Equipaje["estado"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PERDIDO">Perdido</SelectItem>
                      <SelectItem value="ENCONTRADO">Encontrado</SelectItem>
                      <SelectItem value="ENTREGADO">Entregado</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-xs text-muted-foreground">
                    Creado: {new Date(e.fechaCreacion).toLocaleString("es-ES")}
                  </div>
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
