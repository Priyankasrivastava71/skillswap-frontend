import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Calendar,
  BookOpen,
  User,
  LogOut
} from "lucide-react";
import { useEffect } from "react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Explore", icon: Users, path: "/explore" },
    { name: "Posts", icon: MessageSquare, path: "/posts" },
    { name: "Requests", icon: MessageSquare, path: "/requests" },
    { name: "Calendar", icon: Calendar, path: "/calendar" },
    { name: "Resources", icon: BookOpen, path: "/resources" },
    { name: "Profile", icon: User, path: "/profile" },
  ];

  // 🔥 Auto close sidebar on route change (mobile fix)
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 fixed left-0 top-16 h-[calc(100vh-64px)] bg-slate-950 border-r border-purple-500/20 p-6 flex-col justify-between">

        <div className="space-y-3">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-purple-600/20 text-purple-400 border border-purple-500/30 shadow-glow"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <item.icon size={20} />
              {item.name}
            </NavLink>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40">
          <div className="w-64 bg-slate-950 h-full p-6 space-y-4 border-r border-purple-500/20">

            {menu.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}   // 🔥 Close on click
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
              >
                <item.icon size={20} />
                {item.name}
              </NavLink>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10"
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