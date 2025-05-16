import { JSX } from "react";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("tokenProtocolApp");
  const isLoggedIn = !!token;

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute;
