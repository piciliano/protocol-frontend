import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login";
import Layout from "../components/layout";
import { HomePage } from "../pages/home";
import RequestPage from "../pages/request";
import ProtectedRoute from "./protectRoute";
import RegisterPage from "../pages/register";
import ModeratorPage from "../pages/moderator";
import RecoveryPage from "../pages/recovery";
import PublicRoute from "./publicRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/request"
          element={
            <ProtectedRoute>
              <RequestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mod"
          element={
            <ProtectedRoute>
              <ModeratorPage />
            </ProtectedRoute>
          }
        />
        <Route path="/recovery" element={<RecoveryPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
