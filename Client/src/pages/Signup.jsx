import { useState } from "react";
import { User, Mail, Lock, Calendar, Home } from 'lucide-react'; // Importing icons from Lucide

// Main React component for the signup form
function App() {
  // State to hold all form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    dob: "",
    address: ""
  });

  // Handle changes to form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup form submitted:", formData);
    // Here you would typically send the data to a server for user creation
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-white font-sans text-gray-800">
      {/* Container */}
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-4xl mx-4 my-8">
        
        {/* Left side - illustration */}
        <div className="hidden md:flex md:w-1/2 bg-green-100 items-center justify-center p-8">
          <img 
            src="https://placehold.co/500x500/bbf7d0/16a34a?text=Join+Us" 
            alt="Health Illustration" 
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Right side - form */}
        <div className="w-full md:w-1/2 p-10 sm:p-12 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">Create Account</h2>
          <p className="text-gray-500 mb-8 text-center">Unlock your health journey</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name" 
                className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email" 
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
            
            {/* Date of Birth Input */}
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="date" 
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
                required
              />
            </div>

            {/* Address Input */}
            <div className="relative">
              <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address" 
                className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
                required
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition font-semibold text-lg shadow-md"
            >
              Sign Up
            </button>
          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-gray-500">
            Already have an account?{" "}
            <span className="text-green-600 font-semibold cursor-pointer hover:underline">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
