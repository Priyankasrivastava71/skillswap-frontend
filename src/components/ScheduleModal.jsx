import { useState } from "react";
import api from "../api/axios";

const ScheduleModal = ({ requestId, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    session_date: "",
    session_time: "",
    duration: 60,
    session_mode: "video",
    meeting_link: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put(`/requests/${requestId}/schedule`, {
        ...formData,
        duration: Number(formData.duration),
      });

      if (onRefresh) onRefresh();
      if (onClose) onClose();
    } catch (err) {
      console.error("Schedule error:", err);
      alert("Failed to schedule session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 p-8 w-full max-w-md rounded-2xl border border-slate-200 dark:border-purple-500/30 shadow-glow">

        <h2 className="text-2xl font-bold mb-6 text-purple-600 dark:text-purple-400">
          Schedule Session
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Date */}
          <div>
            <label className="block text-sm mb-1 text-slate-700 dark:text-slate-300">
              Date
            </label>

            <input
              type="date"
              required
              className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-purple-500/20 p-2 rounded-lg focus:outline-none focus:border-purple-500"
              value={formData.session_date}
              onChange={(e) =>
                setFormData({ ...formData, session_date: e.target.value })
              }
            />
          </div>

          {/* Time & Duration */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm mb-1 text-slate-700 dark:text-slate-300">
                Time
              </label>

              <input
                type="time"
                required
                className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-purple-500/20 p-2 rounded-lg focus:outline-none focus:border-purple-500"
                value={formData.session_time}
                onChange={(e) =>
                  setFormData({ ...formData, session_time: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-slate-700 dark:text-slate-300">
                Duration (min)
              </label>

              <input
                type="number"
                min="15"
                required
                className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-purple-500/20 p-2 rounded-lg focus:outline-none focus:border-purple-500"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: Number(e.target.value),
                  })
                }
              />
            </div>

          </div>

          {/* Mode */}
          <div>
            <label className="block text-sm mb-1 text-slate-700 dark:text-slate-300">
              Mode
            </label>

            <select
              className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-purple-500/20 p-2 rounded-lg focus:outline-none focus:border-purple-500"
              value={formData.session_mode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  session_mode: e.target.value,
                })
              }
            >
              <option value="video">Video</option>
              <option value="audio">Audio</option>
              <option value="in-person">In Person</option>
            </select>
          </div>

          {/* Meeting Link */}
          <div>
            <label className="block text-sm mb-1 text-slate-700 dark:text-slate-300">
              Meeting Link
            </label>

            <input
              type="text"
              placeholder="Paste Google Meet / Zoom link"
              className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-purple-500/20 p-2 rounded-lg focus:outline-none focus:border-purple-500"
              value={formData.meeting_link}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  meeting_link: e.target.value,
                })
              }
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-glow disabled:opacity-50 transition"
            >
              {loading ? "Scheduling..." : "Confirm"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default ScheduleModal;