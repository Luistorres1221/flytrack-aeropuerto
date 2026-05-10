import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Plane, LogOut } from "lucide-react";

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
    isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent"
  }`;

const Navbar = () => {
  const { user, isAdmin, signOut } = useAuth();
  const nav = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur">
      <div className="container flex items-center justify-between h-16 px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <Plane className="text-primary" />
          <span>FlyTrack</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={linkCls}>Vuelos</NavLink>
          {user && <NavLink to="/equipaje" className={linkCls}>Equipaje</NavLink>}
          {user && <NavLink to="/notificaciones" className={linkCls}>Notificaciones</NavLink>}
          {user && <NavLink to="/perfil" className={linkCls}>Perfil</NavLink>}
          {isAdmin && <NavLink to="/admin" className={linkCls}>Admin</NavLink>}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <Button variant="ghost" size="sm" onClick={async () => { await signOut(); nav("/"); }}>
              <LogOut className="w-4 h-4 mr-2" /> Salir
            </Button>
          ) : (
            <Button size="sm" onClick={() => nav("/auth")}>Iniciar sesión</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
