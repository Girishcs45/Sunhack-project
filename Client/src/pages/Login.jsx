import { useState } from "react";
import { Mail, Lock, LogIn, LayoutDashboard } from 'lucide-react';

// A simple routing function to switch between pages
const createNavigator = (setRoute) => {
  return (path) => {
    switch (path) {
      case 'dashboard':
        setRoute('dashboard');
        break;
      case 'login':
      default:
        setRoute('login');
        break;
    }
  };
};

/**
 * The login form component with enhanced styling and icons.
 */
function Login({ navigate }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setMessage('Logging in...');
    console.log("Login data:", formData);

    // Simulate a network request
    setTimeout(() => {
      setMessage('Login successful!');
      setIsLoggingIn(false);
      navigate("dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-white font-sans text-gray-800">
      {/* Container */}
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-4xl mx-4 my-8">
        
        {/* Left side - animated gradient background */}
        <div className="hidden md:flex md:w-1/2 relative items-center justify-center bg-gradient-to-tr from-sky-400 to-emerald-500 p-8">
          <img 
            src="https://placehold.co/500x500/bbf7d0/16a34a?text=Welcome+Back" 
            alt="Welcome Illustration" 
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Right side - form */}
        <div className="w-full md:w-1/2 p-10 sm:p-12 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">Welcome Back!</h2>
          <p className="text-gray-500 mb-8 text-center">Please log in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username/Email Input */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username or Email" 
                className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password" 
                className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
                required
              />
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition font-semibold text-lg shadow-md disabled:bg-green-400"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Status message */}
          {message && (
            <p className="mt-6 text-center text-sm font-medium text-green-600">
              {message}
            </p>
          )}

          {/* Signup link */}
          <p className="mt-6 text-center text-gray-500">
            Don't have an account?{" "}
            <span className="text-green-600 font-semibold cursor-pointer hover:underline">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * A simple dashboard component to demonstrate successful login navigation.
 */
function Dashboard({ navigate }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="text-center p-10 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-md border border-white/30">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Dashboard!</h2>
        <p className="text-lg text-gray-600">You have successfully logged in.</p>
        <button
          onClick={() => navigate('login')}
          className="mt-6 py-2 px-6 bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-xl font-semibold shadow-lg hover:from-sky-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

/**
 * Main App component to handle the routing logic.
 */
export default function App() {
  const [route, setRoute] = useState('login');
  const navigate = createNavigator(setRoute);

  switch (route) {
    case 'login':
      return <Login navigate={navigate} />;
    case 'dashboard':
      return <Dashboard navigate={navigate} />;
    default:
      return <Login navigate={navigate} />;
  }
}
