import { Navigate } from "react-router-dom";

export default function UserProtectedRoute({ user, children }) {
  if(!user) return <Navigate to={'/'}/>
  if(user.role !== "user") return <Navigate to={'/'}/>
  return children
}