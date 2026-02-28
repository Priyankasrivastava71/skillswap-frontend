import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex min-h-screen 
                bg-gray-100 dark:bg-[#0F122A]
                text-black dark:text-white">
      
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>

    </div>
  );
}