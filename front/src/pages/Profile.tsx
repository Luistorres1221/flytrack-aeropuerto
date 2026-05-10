import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

type Passenger = { document_id: string; phone: string | null; date_of_birth: string | null };
type FlightHistory = { flight_number: string; status: string; created_at: string };

const Profile = () => {
  const { user, isAdmin } = useAuth();
  const [fullName, setFullName] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [passengerExists, setPassengerExists] = useState(false);
  const [history, setHistory] = useState<FlightHistory[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;

    supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle()
      .then(({ data }) => setFullName(data?.full_name ?? ""));

    supabase.from("passenger_profiles").select("document_id, phone, date_of_birth").eq("user_id", user.id).maybeSingle()
      .then(({ data }) => {
        if (data) {
          setPassengerExists(true);
          setDocumentId(data.document_id);
          setPhone(data.phone ?? "");
          setDateOfBirth(data.date_of_birth ?? "");
        }
      });

    supabase.from("baggage_reports").select("flight_number, status, created_at").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setHistory((data as FlightHistory[]) || []));
  }, [user]);

  const save = async () => {
    if (!user) return;
    setBusy(true);

    const profileUpdate = supabase.from("profiles").upsert({ id: user.id, email: user.email ?? "", full_name: fullName.trim().slice(0, 100) });
    const profileSave = await profileUpdate;
    let passengerSave;

    if (passengerExists) {
      passengerSave = await supabase.from("passenger_profiles").update({ document_id: documentId.trim(), phone: phone.trim() || null, date_of_birth: dateOfBirth || null }).eq("user_id", user.id);
    } else {
      passengerSave = await supabase.from("passenger_profiles").insert({ user_id: user.id, document_id: documentId.trim(), phone: phone.trim() || null, date_of_birth: dateOfBirth || null });
    }

    setBusy(false);
    if (profileSave.error || passengerSave.error) {
      toast.error(profileSave.error?.message ?? passengerSave.error?.message ?? "Error al guardar perfil");
      return;
    }

    setPassengerExists(true);
    toast.success("Perfil actualizado");
  };

  return (
    <div className="container px-6 py-10 max-w-3xl space-y-6">
      <Card>
        <CardHeader><CardTitle>Mi cuenta</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Correo</Label>
            <Input value={user?.email ?? ""} disabled />
          </div>
          <div>
            <Label>Nombre completo</Label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} maxLength={100} />
          </div>
          <div>
            <Label>Documento</Label>
            <Input value={documentId} onChange={(e) => setDocumentId(e.target.value)} maxLength={30} />
          </div>
          <div>
            <Label>Teléfono</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={20} />
          </div>
          <div>
            <Label>Fecha de nacimiento</Label>
            <Input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
          </div>
          <p className="text-sm text-muted-foreground">Rol: <strong>{isAdmin ? "Administrador" : "Usuario"}</strong></p>
          <Button onClick={save} disabled={busy}>{busy ? "Guardando..." : "Guardar"}</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Historial de vuelos</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {history.length === 0 ? (
            <p className="text-sm text-muted-foreground">No se han registrado vuelos asociados a tu cuenta todavía.</p>
          ) : (
            history.map((item) => (
              <div key={`${item.flight_number}-${item.created_at}`} className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Vuelo {item.flight_number}</span>
                  <span className="text-xs text-muted-foreground">{new Date(item.created_at).toLocaleDateString("es-ES", { dateStyle: "medium" })}</span>
                </div>
                <div className="text-sm text-muted-foreground">Estado de registro: {item.status}</div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
