import { useEffect, useState } from "react";
import api from "../api/axios";
import { Bell, CheckCircle } from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data.data || []);
    } catch (err) {
      console.error("Notification error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}`);
      fetchNotifications();
    } catch (err) {
      console.error("Mark read error:", err);
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-purple-500 animate-pulse">
        Loading notifications...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">

      <div className="flex items-center gap-4">
        <Bell size={32} className="text-purple-500" />
        <h1 className="text-3xl font-bold text-purple-500">
          Notifications
        </h1>
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-10 rounded-2xl border border-purple-500/20 text-center">
          <p className="text-slate-400">No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-6 rounded-2xl border transition-all shadow-glow ${
                n.is_read
                  ? "bg-slate-800 border-slate-700"
                  : "bg-purple-900/20 border-purple-500/40"
              }`}
            >
              <div className="flex justify-between items-center">

                <div>
                  <p className="text-white font-medium">
                    {n.message}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(n.created_at).toLocaleString()}
                  </p>
                </div>

                {!n.is_read && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm"
                  >
                    <CheckCircle size={18} />
                    Mark Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;