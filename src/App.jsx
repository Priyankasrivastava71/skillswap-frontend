import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";


// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ExploreUsers from "./pages/ExploreUsers";
import Requests from "./pages/Requests";
import Calendar from "./pages/Calendar";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Posts from "./pages/Posts";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>

        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0516] dark:text-white transition-colors duration-300">

          {/* Navbar */}
          <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />

          {/* Sidebar */}
          <Sidebar isOpen={isOpen} 
          setIsOpen={setIsOpen}/>

          {/* Main Content */}
          <main className="pt-20 lg:ml-64 px-6 pb-10">
            <Routes>

              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/explore"
                element={
                  <ProtectedRoute>
                    <ExploreUsers />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/posts"
                element={
                  <ProtectedRoute>
                    <Posts />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/requests"
                element={
                  <ProtectedRoute>
                    <Requests />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/calendar"
                element={
                  <ProtectedRoute>
                    <Calendar />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/resources"
                element={
                  <ProtectedRoute>
                    <Resources />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route path="/profile/:id" element={
                <ProtectedRoute>
                  <Profile/>
                </ProtectedRoute>
              }/>

              <Route path="/" element={<Navigate to="/dashboard" />} />
              
            </Routes>
          </main>
          
        </div>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;