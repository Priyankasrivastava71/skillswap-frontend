import { useState, useEffect } from "react";
import api from "../api/axios";
import { Search, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExploreUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (query = "") => {
    try {
      const endpoint = query
        ? `/users/search?skill=${query}`
        : "/users";
      const res = await api.get(endpoint);
      setUsers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRequest = async (receiverId) => {
  try {
    await api.post("/requests", {
      receiver_id: receiverId,
      skill_requested: "General Skill Swap",
      scheduled_date: new Date().toISOString()  // 🔥 REQUIRED
    });

    alert("Request sent successfully!");
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert(err.response?.data?.message || "Failed to send request");
  }
};
  return (
    <div className="p-6 space-y-10">

      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-purple-500 mb-6">
          Discover Experts
        </h1>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
          <input
            type="text"
            placeholder="Search by skill..."
            className="w-full p-4 pl-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-purple-500/30"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchUsers(search)}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-purple-500/20 shadow-glow"
          >
            <h3 className="text-xl font-bold mb-2 dark:text-white">
              {user.name}
            </h3>

            <p className="text-sm text-slate-400 mb-4">
              {user.bio || "No bio"}
            </p>

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => navigate(`/profile/${user.id}`)}
                className="text-purple-500 text-sm"
              >
                View Profile
              </button>

              <button
                onClick={() => handleRequest(user.id)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                <UserPlus size={16} />
                Request
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreUsers;