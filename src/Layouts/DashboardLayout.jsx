import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../Components/Dashboard/Sidebar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="drawer lg:drawer-open">
      {/* Mobile drawer checkbox */}
      <input
        id="drawer-toggle"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={toggleSidebar}
      />

      {/* Page content */}
      <div className="drawer-content flex flex-col">

        {/* Main content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;