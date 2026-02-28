import { useEffect, useState } from "react";
import API from "../services/api";

export default function Feedback() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchCompletedSessions();
  }, []);

  // =========================
  // FETCH COMPLETED SESSIONS
  // =========================

  const fetchCompletedSessions = async () => {
    try {
      const res = await API.get("/requests");

      // Only sessions that are completed
      const completed = res.data.data.filter(
        (req) => req.session_status === "completed"
      );

      setRequests(completed);

    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // =========================
  // SUBMIT FEEDBACK
  // =========================

  const submitFeedback = async (e) => {
    e.preventDefault();

    try {
      await API.post("/feedback", {
        request_id: selectedRequest.id,
        rating,
        comment
      });

      alert("Feedback submitted successfully");

      setSelectedRequest(null);
      setRating(0);
      setComment("");

      fetchCompletedSessions();

    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit");
    }
  };

  return (
    <div>
      <h2>Give Feedback</h2>

      {requests.length === 0 && (
        <p>No completed sessions yet.</p>
      )}

      {requests.map((req) => (
        <div
          key={req.id}
          style={{
            border: "1px solid gray",
            padding: 15,
            marginBottom: 15
          }}
        >
          <p>
            <strong>
              {req.otherUser?.name}
            </strong>
          </p>

          <p>Skill: {req.skill_requested}</p>
          <p>Date: {req.session_date}</p>
          <p>Status: {req.session_status}</p>

          <button
            onClick={() => setSelectedRequest(req)}
          >
            Give Feedback
          </button>
        </div>
      ))}

      {/* =========================
         FEEDBACK MODAL
      ========================= */}

      {selectedRequest && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={{
              background: "white",
              padding: 20,
              width: 400
            }}
          >
            <h3>
              Feedback for {selectedRequest.otherUser?.name}
            </h3>

            <form onSubmit={submitFeedback}>

              {/* STAR RATING */}
              <div style={{ marginBottom: 15 }}>
                {[1,2,3,4,5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    style={{
                      fontSize: 25,
                      cursor: "pointer",
                      color: star <= rating ? "gold" : "gray"
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              <textarea
                placeholder="Write your feedback..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                style={{ width: "100%" }}
              />

              <br /><br />

              <button type="submit" disabled={rating === 0}>
                Submit
              </button>

              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                style={{ marginLeft: 10 }}
              >
                Cancel
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}