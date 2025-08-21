import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-white font-extrabold text-3xl tracking-wide">
            Health
          </span>
          <span className="text-yellow-200 font-extrabold text-3xl tracking-wide">
            Lock
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 text-lg font-semibold text-white">
          <Link to="/" className="hover:text-yellow-200 transition">Home</Link>
          <Link to="/upload" className="hover:text-yellow-200 transition">Upload</Link>
          <Link to="/doctor" className="hover:text-yellow-200 transition">Doctor</Link>
          <Link to="/logs" className="hover:text-yellow-200 transition">Logs</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-3xl focus:outline-none"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-green-600 border-t border-green-500">
          <nav className="flex flex-col p-6 gap-4 text-white text-lg font-semibold">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/upload" onClick={() => setIsOpen(false)}>Upload</Link>
            <Link to="/doctor" onClick={() => setIsOpen(false)}>Doctor</Link>
            <Link to="/logs" onClick={() => setIsOpen(false)}>Logs</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
