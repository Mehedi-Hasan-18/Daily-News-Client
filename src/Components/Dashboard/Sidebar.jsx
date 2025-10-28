import {
  FiBarChart2,
  FiPackage,
  FiPlusCircle,
  FiShoppingCart,
  FiStar,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { FaNewspaper } from "react-icons/fa";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const Sidebar = () => {
  const { user } = useAuthContext();

  const customerMenus = [
    { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
  ];

  const adminMenues = [
    { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
    { to: "/latest", icon: FaNewspaper, label: "News" },
    { to: "/dashboard/news/add", icon: FiPlusCircle, label: "Add News" },
    { to: "/categories", icon: FiTag, label: "Categories" },
    { to: "/dashboard/category/add", icon: FiPlusCircle, label: "Add Category" },
    { to: "/dashboard/author/add", icon: FiPlusCircle, label: "Add Author" },
    { to: "#", icon: FiUsers, label: "Users" },
  ];

  const menuItems = user.is_staff ? adminMenues : customerMenus;

  return (
    <div className="drawer-side z-10">
      <label
        htmlFor="drawer-toggle"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <aside className="menu bg-base-200 w-64 min-h-full p-4 text-base-content">
        {/* Sidebar header */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-6 px-2">
            <div className="text-2xl font-extrabold">
              DAILY <span className="text-blue-500"> NEWS</span>
            </div>
          </Link>
        </div>

        {/* Sidebar menu */}
        <ul className="menu menu-md gap-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.to} className="flex items-center">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Sidebar footer */}
        <div className="mt-auto pt-6 text-xs text-base-content/70">
          © 2025 Daily News Admin
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
