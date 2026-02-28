import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Wait for auth check to finish
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 text-purple-500">
        Loading...
      </div>
    );
  }

  // If no authenticated user → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;