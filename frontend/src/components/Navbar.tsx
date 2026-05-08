import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate("/")}>
            FlyTrack
          </h1>
          <div className="hidden md:flex gap-6">
            <NavLink to="/vuelos" label="Vuelos" />
            {token && (
              <>
                <NavLink to="/equipaje" label="Equipaje" />
                <NavLink to="/notificaciones" label="Notificaciones" />
                <NavLink to="/perfil" label="Perfil" />
              </>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          {token ? (
            <>
              {token && <NavLink to="/admin" label="Admin" />}
              <Button onClick={handleLogout} variant="outline">
                Cerrar sesión
              </Button>
            </>
          ) : (
            <Button onClick={() => navigate("/auth")}>
              Iniciar sesión
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, label }: { to: string; label: string }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className="text-gray-600 hover:text-blue-600 font-medium transition"
    >
      {label}
    </button>
  );
}

export default Navbar;
