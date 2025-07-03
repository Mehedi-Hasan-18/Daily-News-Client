import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router";

const Navber = ({ sidebarOpen }) => {
  return (
    <div className="navbar bg-base-100 border-b">
      <div className="flex-none lg:hidden">
        <label htmlFor="drawer-toggle" className="btn btn-square btn-ghost">
          {sidebarOpen ? (
            <FiX className="h-5 w-5" />
          ) : (
            <FiMenu className="h-5 w-5" />
          )}
        </label>
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-extrabold">Dashboard</h2>
      </div>
    </div>
  );
};

export default Navber;