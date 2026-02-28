import { useEffect, useState } from "react";
import api from "../api/axios";
import { Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const CommentSection = ({ postId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/${postId}`);
      setComments(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch comments");
      setComments([]);
    }
  };

  useEffect(() => {
    if (postId) fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!content.trim()) return;

    try {
      setLoading(true);
      await api.post("/comments", {
        post_id: postId,
        content,
      });

      setContent("");
      fetchComments();
    } catch (err) {
      alert("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/comments/${id}`);
      fetchComments();
    } catch (err) {
      alert("Failed to delete comment");
    }
  };

  return (
    <div className="mt-6 border-t border-purple-500/10 pt-4 space-y-4">
      <h4 className="text-sm font-semibold text-purple-400">
        Comments
      </h4>

      {/* Existing Comments */}
      {comments.length === 0 ? (
        <p className="text-xs text-slate-500">
          No comments yet.
        </p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl flex justify-between items-start"
          >
            <div>
              <p className="text-xs font-semibold text-purple-500">
                {comment.user?.name}
              </p>

              <p className="text-sm text-slate-700 dark:text-slate-300">
                {comment.content}
              </p>
            </div>

            {comment.user_id === user?.id && (
              <button
                onClick={() => handleDelete(comment.id)}
                className="text-red-500 hover:text-red-600 transition"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))
      )}

      {/* Add Comment */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 bg-slate-100 dark:bg-slate-800 border border-purple-500/20 p-2 rounded-xl focus:outline-none focus:border-purple-500"
        />

        <button
          onClick={handleAddComment}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition disabled:opacity-50"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CommentSection;