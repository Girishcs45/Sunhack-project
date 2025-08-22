import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Key, Eye, EyeOff } from "lucide-react";

export default function DoctorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "doctor@example.com" && password === "123456") {
      localStorage.setItem("doctorAuth", "true");
      navigate("/doctor");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-green-500 to-emerald-700 text-white p-12">
        <h1 className="text-4xl font-bold mb-4">Welcome Back, Doctor 👨‍⚕</h1>
        <p className="text-lg text-green-100 max-w-md text-center">
          Securely access your patient dashboard and manage medical records
          with HealthLock.
        </p>
        <div className="mt-8">
          <Lock size={80} className="text-white opacity-80" />
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="flex-1 flex items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
            Doctor Login
          </h2>

          {/* Email */}
          <div className="relative mb-5">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="relative mb-6">
            <Key className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition font-medium text-lg"
          >
            Login
          </button>

          {/* Switch */}
          <p className="text-sm text-center mt-6 text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/doctor/signup")}
              className="text-blue-600 cursor-pointer hover:underline font-medium"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}