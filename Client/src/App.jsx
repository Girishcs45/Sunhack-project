import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";

import LandingPage from "./pages/Landingpage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MedicalForm from "./pages/MedicalForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page as the default route */}
        <Route path="/" element={<LandingPage />} />

        {/* Other pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/medical-form" element={<MedicalForm />} />
      </Routes>
    </Router>
  );
}

export default App;
