import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRoute {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRoute> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("tokenProtocolApp");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
