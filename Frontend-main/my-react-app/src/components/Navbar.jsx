import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ sidebarCollapsed }) => {
  return (
    <header
      className={`bg-white shadow-md dark:bg-gray-900 transition-all duration-300 ${
        sidebarCollapsed ? "pl-20" : "pl-60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700 dark:text-white">
          Smart Vehicle System
        </h1>

        <nav className="space-x-6 text-lg">
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/implementation"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
          >
            Implementation
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
