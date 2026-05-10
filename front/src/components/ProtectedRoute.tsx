import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = ({ children, adminOnly = false }: { children: JSX.Element; adminOnly?: boolean }) => {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <div className="p-10 text-center text-muted-foreground">Cargando...</div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
