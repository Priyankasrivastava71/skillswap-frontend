import { useState, useEffect } from "react";
import { Menu, Bell, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  // Initialize from localStorage
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Sync dark class with state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-950 border-b border-purple-500/20 flex items-center justify-between px-4 lg:px-8 z-50 transition-colors duration-300">

      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-purple-500"
        >
          <Menu size={24} />
        </button>

        <h1
          onClick={() => navigate("/dashboard")}
          className="text-xl font-bold text-purple-600 dark:text-purple-400 cursor-pointer"
        >
          SkillSwap
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <button
          onClick={() => navigate("/notifications")}
          className="text-purple-500 hover:text-purple-400 transition"
        >
          <Bell size={22} />
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(prev => !prev)}
          className="text-purple-500 hover:text-purple-400 transition"
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

      </div>

    </nav>
  );
};

export default Navbar;