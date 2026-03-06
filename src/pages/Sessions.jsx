import { useEffect, useState } from "react";
import api from "../api/axios";
import FeedbackModal from "../components/FeedbackModal";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [feedbackRequest, setFeedbackRequest] = useState(null);
  const [meetingLinks, setMeetingLinks] = useState({});

  const fetchSessions = async () => {
    try {
      const res = await api.get("/requests");
      const all = res.data.data || [];

      const filtered = all.filter(
        (req) =>
          req.session_status === "scheduled" ||
          req.session_status === "completed",
      );

      setSessions(filtered);
    } catch (err) {
      console.error("Failed to load sessions", err);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const markComplete = async (id) => {
    try {
      await api.put(`/requests/complete/${id}`);
      fetchSessions();
    } catch (err) {
      alert("Failed to mark session complete");
    }
  };

  const saveMeetingLink = async (id) => {
    try {
      const meeting_link = meetingLinks[id];

      if (!meeting_link) {
        alert("Please enter meeting link");
        return;
      }

      await api.put(`/requests/${id}/schedule`, {
        meeting_link,
      });

      fetchSessions();
    } catch (err) {
      alert("Failed to save meeting link");
    }
  };

  if (sessions.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-purple-500 mb-6">
          Your Sessions
        </h1>
        <p className="text-slate-400 italic">No sessions scheduled yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-purple-500">Your Sessions</h1>

      <div className="grid gap-6">
        {sessions.map((session) => {
          const feedbackExists = session.feedback?.length > 0;

          return (
            <div
              key={session.id}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-purple-500/20 shadow-glow flex flex-col md:flex-row justify-between gap-6"
            >
              <div>
                <h3 className="font-bold text-lg">
                  {session.otherUser?.name || "User"}
                </h3>

                <p className="text-slate-400 text-sm">
                  Skill: {session.skill_requested}
                </p>

                <p className="text-xs text-slate-500">
                  Date: {session.session_date} | Time: {session.session_time}
                </p>

                {/* Add Meeting Link */}
                {session.session_status === "scheduled" &&
                  !session.meeting_link && (
                    <div className="flex gap-2 mt-3">
                      <input
                        type="text"
                        placeholder="Paste Google Meet link"
                        className="bg-slate-100 dark:bg-slate-800 border border-purple-500/20 px-3 py-1 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                        value={meetingLinks[session.id] || ""}
                        onChange={(e) =>
                          setMeetingLinks({
                            ...meetingLinks,
                            [session.id]: e.target.value,
                          })
                        }
                      />

                      <button
                        onClick={() => saveMeetingLink(session.id)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Save
                      </button>
                    </div>
                  )}

                {session.session_status === "completed" && (
                  <p className="text-xs text-green-400 mt-2">
                    Session completed
                  </p>
                )}
              </div>

              <div className="flex gap-3 flex-wrap">
                {/* Join Meeting */}
                {session.meeting_link &&
                  session.session_status === "scheduled" && (
                    <a
                      href={session.meeting_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
                    >
                      Join Meeting
                    </a>
                  )}

                {/* Mark Complete */}
                {session.session_status === "scheduled" &&
                  session.meeting_link && (
                    <button
                      onClick={() => markComplete(session.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
                    >
                      Mark Complete
                    </button>
                  )}

                {/* Feedback */}
                {session.session_status === "completed" && !feedbackExists && (
                  <button
                    onClick={() => setFeedbackRequest(session.id)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl"
                  >
                    Give Feedback
                  </button>
                )}

                {session.session_status === "completed" && feedbackExists && (
                  <span className="bg-green-500/20 text-green-400 px-4 py-1 rounded-xl self-center h-fit">
                    ✓ Feedback Submitted
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {feedbackRequest && (
        <FeedbackModal
          requestId={feedbackRequest}
          onClose={() => setFeedbackRequest(null)}
          onRefresh={fetchSessions}
        />
      )}
    </div>
  );
};

export default Sessions;
