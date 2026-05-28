import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ user, children }) {
  if(!user || !user.role) return <Navigate to={'/'}/>
  if(user.role !== "admin") return <Navigate to={'/'}/>
  return children
}