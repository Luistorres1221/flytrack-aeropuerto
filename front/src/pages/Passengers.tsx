import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().trim().email("Correo inválido").max(255),
  password: z.string().min(6, "Mínimo 6 caracteres").max(100),
  full_name: z.string().trim().min(2).max(100),
  document_id: z.string().trim().min(3).max(50),
  phone: z.string().trim().max(30).optional(),
  date_of_birth: z.string().optional(),
});

type Row = {
  id: string;
  user_id: string;
  document_id: string;
  phone: string | null;
  date_of_birth: string | null;
  created_at: string;
};

const Passengers = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [emails, setEmails] = useState<Record<string, { email: string; full_name: string | null }>>({});
  const [form, setForm] = useState({
    email: "", password: "", full_name: "", document_id: "", phone: "", date_of_birth: "",
  });
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data: ps } = await supabase
      .from("passenger_profiles")
      .select("*")
      .order("created_at", { ascending: false });
    const list = (ps as Row[]) || [];
    setRows(list);
    if (list.length) {
      const ids = list.map((r) => r.user_id);
      const { data: profs } = await supabase
        .from("profiles").select("id,email,full_name").in("id", ids);
      const map: typeof emails = {};
      (profs ?? []).forEach((p: any) => { map[p.id] = { email: p.email, full_name: p.full_name }; });
      setEmails(map);
    }
  };

  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setBusy(true);
    const { data, error } = await supabase.functions.invoke("admin-create-passenger", {
      body: parsed.data,
    });
    setBusy(false);
    if (error || (data as any)?.error) {
      toast.error((data as any)?.error ?? error?.message ?? "Error");
      return;
    }
    toast.success("Pasajero creado");
    setForm({ email: "", password: "", full_name: "", document_id: "", phone: "", date_of_birth: "" });
    load();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Crear cuenta de pasajero</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Nombre completo</Label>
              <Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />
            </div>
            <div>
              <Label>Correo</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
              <Label>Contraseña temporal</Label>
              <Input type="text" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            </div>
            <div>
              <Label>Documento de identidad</Label>
              <Input value={form.document_id} onChange={(e) => setForm({ ...form, document_id: e.target.value })} required />
            </div>
            <div>
              <Label>Teléfono</Label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <Label>Fecha de nacimiento</Label>
              <Input type="date" value={form.date_of_birth} onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" disabled={busy}>{busy ? "Creando..." : "Crear pasajero"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Pasajeros ({rows.length})</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {rows.length === 0 && <p className="text-muted-foreground text-sm">Aún no hay pasajeros registrados.</p>}
          {rows.map((r) => (
            <div key={r.id} className="border border-border rounded-md p-4 grid md:grid-cols-4 gap-2 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Nombre</div>
                <div className="font-medium">{emails[r.user_id]?.full_name ?? "—"}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Correo</div>
                <div className="font-mono text-xs">{emails[r.user_id]?.email ?? "—"}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Documento</div>
                <div className="font-mono">{r.document_id}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Teléfono · Nac.</div>
                <div>{r.phone ?? "—"} · {r.date_of_birth ?? "—"}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Passengers;
