import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "../pages/Homepage";
import LandingPage from "../pages/Landingpage";
import DoctorDashboard from "../pages/DoctorDashboard";
import MainLayout from "../layouts/MainLayout";
import DoctorLogin from "../pages/DoctorLogin";
import DoctorSignup from "../pages/DoctorSignup";

// PrivateRoute wrapper
function PrivateRoute({ children }) {
  const isAuth = localStorage.getItem("doctorAuth") === "true";
  return isAuth ? children : <Navigate to="/doctor/login" />;
}

export default function Routers() {
  return (
    <Routes>
      {/* Public pages (with layout) */}
      <Route path="/home" element={<MainLayout><Homepage /></MainLayout>} />
      <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />

      {/* Doctor auth pages (no layout, full page forms) */}
      <Route path="/doctor/login" element={<DoctorLogin />} />
      <Route path="/doctor/signup" element={<DoctorSignup />} />

      {/* Doctor Dashboard (protected) */}
      <Route
        path="/doctor"
        element={
          <PrivateRoute>
            <MainLayout>
              <DoctorDashboard />
            </MainLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
