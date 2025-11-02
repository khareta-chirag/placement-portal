import { Navigate } from "react-router-dom";
import { decodeToken } from "../utils/auth";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  const user = decodeToken(token);
  if (!user) { localStorage.removeItem("token"); return <Navigate to="/login" replace />; }
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
