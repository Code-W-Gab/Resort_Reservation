import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import SkeletonLoading from "./SkeletonLoading";

function ProtectedRoute({allowedRoles, children}) {
  const { user, loading } = useAuth();

  if (loading) return <SkeletonLoading />;
  if (!user) return (<Navigate to="/auth/login"/>);

  if (allowedRoles && !allowedRoles.includes(user.role)) return ( <Navigate to="/"/>);

  return children;
}

export default ProtectedRoute;