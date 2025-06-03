import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1">
        <Navbar sidebarCollapsed={collapsed} />
        <main className="p-6 mt-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
