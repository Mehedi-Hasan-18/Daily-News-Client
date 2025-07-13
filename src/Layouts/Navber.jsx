import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user,logoutUser } = useAuthContext();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="w-11/12 mx-auto sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-extrabold">
          DAILY <span className="text-blue-500"> NEWS</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-white font-medium">
          <a href="/" className="hover:text-red-600">
            Home
          </a>
          <a href="/categories" className="hover:text-red-600">
            Categories
          </a>
          <a href="/latest" className="hover:text-red-600">
            Latest News
          </a>
          <a href="/about" className="hover:text-red-600">
            About
          </a>
          <a href="/contactus" className="hover:text-red-600">
            Contact
          </a>
          {user ? (
            <div className="flex gap-3">
              <Link className="hover:text-red-600" to={"/dashboard"}>Dashboard</Link>
              <Link className="hover:text-red-600" onClick={logoutUser}>LogOut</Link>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link className="btn btn-primary" to={"register"}>
                Register
              </Link>
              <Link className="btn btn-primary" to={"login"}>
                Login
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <a href="/" className="block text-white hover:text-red-600">
            Home
          </a>
          <a href="/categories" className="block text-white hover:text-red-600">
            Categories
          </a>
          <Link to={"/latest"} className="block text-white hover:text-red-600">
            Latest News
          </Link>
          <a href="/about" className="block text-white hover:text-red-600">
            About
          </a>
          <a href="/contact" className="block text-white hover:text-red-600">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
