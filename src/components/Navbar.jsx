import { Menu, Bell, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { dark, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-950 border-b border-purple-500/20 flex items-center justify-between px-4 lg:px-8 z-50">

      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden text-purple-500">
          <Menu size={24} />
        </button>

        <h1
          onClick={() => navigate("/dashboard")}
          className="text-xl font-bold text-purple-600 dark:text-purple-400 cursor-pointer"
        >
          SkillSwap
        </h1>
      </div>

      <div className="flex items-center gap-6">

        <button
          onClick={() => navigate("/notifications")}
          className="text-purple-500 hover:text-purple-400"
        >
          <Bell size={22} />
        </button>

        <button
          onClick={toggleTheme}
          className="text-purple-500 hover:text-purple-400"
        >
          {dark ? <Sun size={22}/> : <Moon size={22}/>}
        </button>

      </div>

    </nav>
  );
};

export default Navbar;