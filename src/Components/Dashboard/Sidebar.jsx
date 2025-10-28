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
import { Link, useLocation } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const Sidebar = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  const customerMenus = [
    { to: "/dashboard", icon: FiBarChart2, label: "Dashboard", color: "from-blue-500 to-cyan-500" },
  ];

  const adminMenues = [
    { to: "/dashboard", icon: FiBarChart2, label: "Dashboard", color: "from-blue-500 to-cyan-500" },
    { to: "/latest", icon: FaNewspaper, label: "News", color: "from-purple-500 to-pink-500" },
    { to: "/dashboard/news/add", icon: FiPlusCircle, label: "Add News", color: "from-green-500 to-emerald-500" },
    { to: "/categories", icon: FiTag, label: "Categories", color: "from-orange-500 to-red-500" },
    { to: "/dashboard/category/add", icon: FiPlusCircle, label: "Add Category", color: "from-yellow-500 to-orange-500" },
    { to: "/dashboard/author/add", icon: FiPlusCircle, label: "Add Author", color: "from-indigo-500 to-purple-500" },
    { to: "#", icon: FiUsers, label: "Users", color: "from-pink-500 to-rose-500" },
  ];

  const menuItems = adminMenues;

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="drawer-side z-10">
      <label
        htmlFor="drawer-toggle"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <aside className="min-h-full w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl flex flex-col">
        {/* Sidebar header */}
        <div className="p-6 border-b border-gray-700/50">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FaNewspaper className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold">
                DAILY{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  NEWS
                </span>
              </div>
              <div className="text-xs text-gray-400">Admin Portal</div>
            </div>
          </Link>
        </div>

        {/* User Info */}
        {user && (
          <div className="px-6 py-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {user.username?.charAt(0).toUpperCase() || "A"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{user.username}</p>
                <p className="text-xs text-gray-400">
                  {user.is_staff ? "Administrator" : "User"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar menu */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.to);

              return (
                <li key={index}>
                  <Link
                    to={item.to}
                    className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      active
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30"
                        : "hover:bg-gray-800/50"
                    }`}
                  >
                    {/* Active Indicator */}
                    {active && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-full"></div>
                    )}

                    {/* Icon */}
                    <div
                      className={`relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        active
                          ? "bg-white/20"
                          : "bg-gray-800 group-hover:bg-gradient-to-br group-hover:" + item.color
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 transition-all duration-300 ${
                          active
                            ? "text-white"
                            : "text-gray-400 group-hover:text-white"
                        }`}
                      />
                    </div>

                    {/* Label */}
                    <span
                      className={`font-medium transition-colors duration-300 ${
                        active
                          ? "text-white"
                          : "text-gray-300 group-hover:text-white"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Hover Effect */}
                    {!active && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 transition-all duration-300"></div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar footer */}
        <div className="p-6 border-t border-gray-700/50">
          <div className="text-center">
            <p className="text-xs text-gray-500">© 2025 Daily News</p>
            <p className="text-xs text-gray-600 mt-1">Admin Dashboard v2.0</p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;