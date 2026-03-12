import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Users,
  MessageSquare,
  Calendar,
  BookOpen,
  User,
  LogOut,
  Video,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Explore", icon: Users, path: "/explore" },
    { name: "Posts", icon: MessageSquare, path: "/posts" },
    { name: "Requests", icon: MessageSquare, path: "/requests" },
    { name: "Sessions", icon: Video, path: "/sessions" },
    { name: "Calendar", icon: Calendar, path: "/calendar" },
    { name: "Resources", icon: BookOpen, path: "/resources" },
    { name: "Profile", icon: User, path: "/profile" },
  ];

  useEffect(() => {
    if (setIsOpen) setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex ${
          collapsed ? "w-20" : "w-64"
        } fixed left-0 top-16 h-[calc(100vh-64px)] 
        bg-purple-50 dark:bg-slate-950 
        border-r border-purple-200 dark:border-purple-500/20 
        p-6 flex-col justify-between z-40 transition-all duration-300`}
      >
        {/* Menu */}
        <div className="space-y-3">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center ${
                  collapsed ? "justify-center" : "gap-3"
                } px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-purple-600/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 shadow-glow"
                    : "text-slate-700 dark:text-slate-400 hover:bg-purple-100 dark:hover:bg-slate-800 hover:text-black dark:hover:text-white"
                }`
              }
            >
              <item.icon size={20} className="min-w-[20px]" />
              {!collapsed && item.name}
            </NavLink>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="space-y-3">
          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`flex items-center ${
              collapsed ? "justify-center" : "gap-3"
            } px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 w-full`}
          >
            <LogOut size={20} className="min-w-[20px]" />
            {!collapsed && "Logout"}
          </button>

          {/* Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`flex items-center ${
              collapsed ? "justify-center px-0" : "gap-3 px-4"
            } py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-purple-100 dark:hover:bg-slate-800 w-full`}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            {!collapsed && "Collapse"}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <div
            className="absolute left-0 top-0 w-64 h-full 
          bg-purple-50 dark:bg-slate-950 
          p-6 space-y-4 border-r border-purple-200 dark:border-purple-500/20"
          >
            {menu.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    isActive
                      ? "bg-purple-600/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 shadow-glow"
                      : "text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-slate-800"
                  }`
                }
              >
                <item.icon size={20} />
                {item.name}
              </NavLink>
            ))}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 w-full"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
