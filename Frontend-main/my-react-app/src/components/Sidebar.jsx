import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, LogOut, User, FileSearch, Upload } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [darkMode, setDarkMode] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const navItems = [
    {
      to: "/Dashboard",
      icon: <User size={18} />,
      text: "Dashboard",
    },
    {
      to: "/VehicleSearch",
      icon: <FileSearch size={18} />,
      text: "Vehicle Lookup",
    },
    {
      to: "/implementation",
      icon: <Upload size={18} />,
      text: "Upload Image",
    },
  ];

  return (
    <aside
      className={`h-screen ${
        collapsed ? "w-20" : "w-60"
      } transition-all duration-300 fixed bg-white border-r dark:bg-gray-900 dark:border-gray-700 p-5 flex flex-col justify-between`}
    >
      <div>
        {/* Collapse/Expand Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mb-6 text-blue-600 dark:text-white"
        >
          {collapsed ? "»" : "«"}
        </button>

        {/* Welcome message */}
        {!collapsed && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-blue-700 dark:text-white">
              Welcome, {user?.name || "Guest"}
            </h2>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all 
                ${
                  location.pathname === item.to
                    ? "bg-blue-100 text-blue-700 dark:bg-gray-700 dark:text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
            >
              {item.icon}
              {!collapsed && <span>{item.text}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="space-y-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-200 hover:text-blue-600"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          {!collapsed && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
        </button>

        {/* Logout Button */}
        <button
          onClick={signOut}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-200 hover:text-red-600"
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
