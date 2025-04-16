import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ sidebarCollapsed }) => {
  const { user, signIn, signOut } = useAuth();

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
          <Link
            to="/predict"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
          >
            Predict
          </Link>
        </nav>

        <div>
          {user ? (
            <button
              onClick={signOut}
              className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={signIn}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
