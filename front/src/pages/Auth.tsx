import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const ADMIN_EMAIL = "admin@flytrack.com";
const ADMIN_PASSWORD = "admin123*";

const schema = z.object({
  email: z.string().trim().email("Correo inválido").max(255),
  password: z.string().min(6, "Mínimo 6 caracteres").max(100),
  fullName: z.string().trim().max(100).optional(),
});

const Auth = () => {
  const { user, loginLocalAdmin } = useAuth();
  const nav = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (user) nav("/"); }, [user, nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password, fullName });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setBusy(true);
    try {
      if (!isSupabaseConfigured) {
        if (mode === "signup") {
          toast.error("El registro con correo requiere configurar Supabase en el despliegue.");
          return;
        }
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          loginLocalAdmin();
          toast.success("Bienvenido administrador");
          nav("/");
          return;
        }
        toast.error("Inicio de sesión con correo requiere Supabase. Usa la cuenta de administrador local o configura las variables VITE_SUPABASE_*.");
        return;
      }

      if (mode === "signup") {
        if (email === ADMIN_EMAIL) {
          toast.error("La cuenta de administrador ya está protegida y no puede registrarse aquí.");
          return;
        }

        const { error } = await supabase.auth.signUp({
          email, password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        toast.success("Cuenta creada. Ya puedes iniciar sesión.");
        setMode("login");
      } else {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          loginLocalAdmin();
          toast.success("Bienvenido administrador");
          nav("/");
          return;
        }

        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bienvenido");
        nav("/");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Error de autenticación");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{mode === "login" ? "Iniciar sesión" : "Crear cuenta"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <Label htmlFor="fullName">Nombre completo</Label>
                <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
            )}
            <div>
              <Label htmlFor="email">Correo</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" disabled={busy} className="w-full">
              {busy ? "Procesando..." : mode === "login" ? "Entrar" : "Registrarse"}
            </Button>
            <button type="button" className="text-sm text-primary underline w-full text-center"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}>
              {mode === "login" ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
