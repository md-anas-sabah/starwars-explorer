import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
