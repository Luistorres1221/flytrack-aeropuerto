import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

type Passenger = { document_id: string; phone: string | null; date_of_birth: string | null };

const Profile = () => {
  const { user, isAdmin } = useAuth();
  const [fullName, setFullName] = useState("");
  const [passenger, setPassenger] = useState<Passenger | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle()
      .then(({ data }) => setFullName(data?.full_name ?? ""));
    supabase.from("passenger_profiles").select("document_id, phone, date_of_birth").eq("user_id", user.id).maybeSingle()
      .then(({ data }) => setPassenger((data as Passenger) ?? null));
  }, [user]);

  const save = async () => {
    setBusy(true);
    const { error } = await supabase.from("profiles").update({ full_name: fullName.trim().slice(0, 100) }).eq("id", user!.id);
    setBusy(false);
    if (error) toast.error(error.message); else toast.success("Perfil actualizado");
  };

  return (
    <div className="container px-6 py-10 max-w-xl space-y-6">
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
          <p className="text-sm text-muted-foreground">Rol: <strong>{isAdmin ? "Administrador" : "Usuario"}</strong></p>
          <Button onClick={save} disabled={busy}>{busy ? "Guardando..." : "Guardar"}</Button>
        </CardContent>
      </Card>

      {passenger && (
        <Card>
          <CardHeader><CardTitle>Datos de pasajero</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Documento</span><span className="font-mono">{passenger.document_id}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Teléfono</span><span>{passenger.phone ?? "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Fecha de nacimiento</span><span>{passenger.date_of_birth ?? "—"}</span></div>
            <p className="text-xs text-muted-foreground pt-2">Para modificarlos contacta al administrador.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Profile;
