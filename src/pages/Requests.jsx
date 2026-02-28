import { useState, useEffect } from "react";
import api from "../api/axios";
import ScheduleModal from "../components/ScheduleModal";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("incoming");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [feedbackRequest, setFeedbackRequest] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/requests");
      setRequests(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/requests/${id}`, { status });
      fetchRequests();
    } catch (err) {
      alert("Failed to update request");
    }
  };

  const filtered = requests.filter((req) =>
    activeTab === "incoming" ? req.isReceiver : req.isSender,
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-purple-500">Skill Requests</h1>

      {/* Tabs */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab("incoming")}
          className={`px-4 py-2 rounded-xl ${
            activeTab === "incoming"
              ? "bg-purple-600 text-white"
              : "bg-slate-800 text-slate-400"
          }`}
        >
          Incoming
        </button>

        <button
          onClick={() => setActiveTab("sent")}
          className={`px-4 py-2 rounded-xl ${
            activeTab === "sent"
              ? "bg-purple-600 text-white"
              : "bg-slate-800 text-slate-400"
          }`}
        >
          Sent
        </button>
      </div>

      {/* Requests List */}
      <div className="grid gap-6">
        {filtered.map((req) => (
          <div
            key={req.id}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-purple-500/20 shadow-glow flex flex-col md:flex-row justify-between gap-6"
          >
            <div>
              <h3 className="font-bold text-lg">{req.otherUser?.name}</h3>
              <p className="text-slate-400 text-sm">
                Skill: {req.skill_requested}
              </p>
              <p className="text-xs text-slate-500">Status: {req.status}</p>
            </div>

            <div className="flex gap-3 flex-wrap">
              {/* Accept / Reject */}
              {activeTab === "incoming" && req.status === "pending" && (
                <>
                  <button
                    onClick={() => handleStatusUpdate(req.id, "accepted")}
                    className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleStatusUpdate(req.id, "rejected")}
                    className="bg-red-500/20 text-red-400 px-4 py-2 rounded-xl"
                  >
                    Reject
                  </button>
                </>
              )}

              {/* Schedule AFTER accepted */}
              {req.status === "accepted" &&
                req.session_status !== "scheduled" && (
                  <button
                    onClick={() => setSelectedRequest(req.id)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-xl"
                  >
                    Schedule Session
                  </button>
                )}

              {/* Scheduled */}
              {req.session_status === "scheduled" && (
                <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-xl">
                  Scheduled
                </span>
              )}

              {/* Give Feedback AFTER completed */}
              {req.session_status === "completed" && (
                <button
                  onClick={() => setFeedbackRequest(req.id)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl"
                >
                  Give Feedback
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedRequest && (
        <ScheduleModal
          requestId={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onRefresh={fetchRequests}
        />
      )}

      {feedbackRequest && (
  <FeedbackModal
    requestId={feedbackRequest}
    onClose={() => setFeedbackRequest(null)}
    onRefresh={fetchRequests}
  />
)}
    </div>
  );
};

export default Requests;
