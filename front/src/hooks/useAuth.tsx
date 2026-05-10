import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

const ADMIN_EMAIL = "admin@flytrack.com";
const ADMIN_PASSWORD = "admin123*";
const LOCAL_ADMIN_STORAGE_KEY = "flytrack_local_admin";

type AuthCtx = {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  loginLocalAdmin: () => void;
};

const Ctx = createContext<AuthCtx>({} as AuthCtx);

const createLocalAdminUser = (): User => ({
  id: "local-admin",
  email: ADMIN_EMAIL,
  aud: "authenticated",
  role: "authenticated",
  app_metadata: {},
  user_metadata: { full_name: "Administrador FlyTrack" },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  confirmed_at: new Date().toISOString(),
  email_confirmed_at: new Date().toISOString(),
  confirmation_sent_at: null,
  phone: null,
}) as unknown as User;

const restoreLocalAdmin = (): User | null => {
  if (typeof localStorage === "undefined") return null;
  return localStorage.getItem(LOCAL_ADMIN_STORAGE_KEY) === "true" ? createLocalAdminUser() : null;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const loginLocalAdmin = () => {
    const adminUser = createLocalAdminUser();
    localStorage.setItem(LOCAL_ADMIN_STORAGE_KEY, "true");
    setSession(null);
    setUser(adminUser);
    setIsAdmin(true);
    setLoading(false);
  };

  const signOut = async () => {
    localStorage.removeItem(LOCAL_ADMIN_STORAGE_KEY);
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setIsAdmin(false);
  };

  useEffect(() => {
    const localUser = restoreLocalAdmin();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (s?.user) {
        localStorage.removeItem(LOCAL_ADMIN_STORAGE_KEY);
        setSession(s);
        setUser(s.user);
        setIsAdmin(false);
        setLoading(false);
        setTimeout(async () => {
          const { data } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", s.user.id)
            .eq("role", "admin")
            .maybeSingle();
          setIsAdmin(!!data);
        }, 0);
      } else if (!localUser) {
        setSession(null);
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
      }
    });

    if (localUser) {
      setSession(null);
      setUser(localUser);
      setIsAdmin(true);
      setLoading(false);
    } else {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        if (session?.user) {
          setTimeout(async () => {
            const { data } = await supabase
              .from("user_roles")
              .select("role")
              .eq("user_id", session.user.id)
              .eq("role", "admin")
              .maybeSingle();
            setIsAdmin(!!data);
          }, 0);
        } else {
          setIsAdmin(false);
        }
      });
    }

    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <Ctx.Provider value={{ user, session, isAdmin, loading, signOut, loginLocalAdmin }}>
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => useContext(Ctx);
