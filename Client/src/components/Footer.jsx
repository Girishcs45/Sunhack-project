import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-8 py-10 grid md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Health<span className="text-green-400">Lock</span></h2>
          <p className="text-sm leading-relaxed">
            Secure. Temporary. Role-based access to health records.  
            Your data, your control.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2 text-sm">
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <Link to="/" className="hover:text-green-400 transition">Home</Link>
          <Link to="/upload" className="hover:text-green-400 transition">Upload</Link>
          <Link to="/doctor" className="hover:text-green-400 transition">Doctor</Link>
          <Link to="/logs" className="hover:text-green-400 transition">Logs</Link>
        </div>

        {/* Contact / Social */}
        <div className="flex flex-col gap-2 text-sm">
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
          <p>Email: support@healthlock.io</p>
          <p>Phone: +91 98765 43210</p>
          <div className="flex gap-4 mt-3">
            <a href="#" className="hover:text-green-400">🐦</a>
            <a href="#" className="hover:text-green-400">📘</a>
            <a href="#" className="hover:text-green-400">💼</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} HealthLock. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
