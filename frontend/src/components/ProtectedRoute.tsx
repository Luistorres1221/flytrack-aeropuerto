import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  adminOnly?: boolean;
}

const getAuthToken = () => localStorage.getItem("authToken");

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const token = getAuthToken();
  
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
