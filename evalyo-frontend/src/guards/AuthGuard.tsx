import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function AuthGuard() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/connect/login" />;
}
