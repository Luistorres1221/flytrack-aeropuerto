import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Sub = {
  id?: string;
  enabled: boolean;
  notify_gate_change: boolean;
  notify_delay: boolean;
  notify_cancellation: boolean;
};

const defaults: Sub = { enabled: true, notify_gate_change: true, notify_delay: true, notify_cancellation: true };

const Notifications = () => {
  const { user } = useAuth();
  const [sub, setSub] = useState<Sub>(defaults);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("notification_subscriptions").select("*").eq("user_id", user.id).maybeSingle()
      .then(({ data }) => { if (data) setSub(data as Sub); });
  }, [user]);

  const save = async () => {
    if (!user) return;
    setBusy(true);
    const { error } = await supabase.from("notification_subscriptions").upsert({
      user_id: user.id, email: user.email!, ...sub,
    }, { onConflict: "user_id" });
    setBusy(false);
    if (error) toast.error(error.message); else toast.success("Preferencias guardadas");
  };

  return (
    <div className="container px-6 py-10 max-w-xl">
      <Card>
        <CardHeader><CardTitle>Notificaciones por correo</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Te avisaremos a <strong>{user?.email}</strong>.</p>

          <div className="flex items-center justify-between border-b border-border pb-3">
            <Label htmlFor="enabled">Activar notificaciones</Label>
            <Switch id="enabled" checked={sub.enabled} onCheckedChange={(v) => setSub({ ...sub, enabled: v })} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Cambio de puerta</Label>
            <Switch checked={sub.notify_gate_change} onCheckedChange={(v) => setSub({ ...sub, notify_gate_change: v })} disabled={!sub.enabled} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Retrasos</Label>
            <Switch checked={sub.notify_delay} onCheckedChange={(v) => setSub({ ...sub, notify_delay: v })} disabled={!sub.enabled} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Cancelaciones</Label>
            <Switch checked={sub.notify_cancellation} onCheckedChange={(v) => setSub({ ...sub, notify_cancellation: v })} disabled={!sub.enabled} />
          </div>

          <Button onClick={save} disabled={busy} className="w-full">{busy ? "Guardando..." : "Guardar"}</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
