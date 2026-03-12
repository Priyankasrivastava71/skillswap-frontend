import { useEffect, useState } from "react";
import api from "../api/axios";
import { Calendar as CalendarIcon, Clock, User } from "lucide-react";

const Calendar = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await api.get("/requests");

        const scheduledSessions = res.data.data.filter(
          (req) => req.session_status === "scheduled"
        );

        setSessions(scheduledSessions);
      } catch (err) {
        console.error("Calendar error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading)
    return (
      <div className="text-center py-20 text-purple-500 animate-pulse">
        Loading calendar...
      </div>
    );

  if (sessions.length === 0)
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-slate-900 p-12 rounded-2xl border border-slate-200 dark:border-purple-500/20 text-center shadow-lg">
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            No scheduled sessions yet.
          </p>
        </div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">

      {/* Header */}
      <div className="flex items-center gap-4">
        <CalendarIcon size={32} className="text-purple-600 dark:text-purple-400" />
        <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400">
          Your Scheduled Sessions
        </h1>
      </div>

      {/* Sessions */}
      <div className="grid gap-6">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-purple-500/20 shadow-lg hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >

            {/* Session Info */}
            <div className="space-y-2">

              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <User size={18} />
                <span>
                  With {session.otherUser?.name}
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Clock size={18} />
                {session.session_date} | {session.session_time}
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Duration: {session.duration} mins
              </p>

            </div>

            {/* Status Badge */}
            <div className="bg-purple-600/10 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-full text-sm font-medium">
              Scheduled
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;