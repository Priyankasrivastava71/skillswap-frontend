import { useState } from 'react';
import api from './api/axios';
import { useAuth } from '../context/AuthContext';

const PostCard = ({ post, onDelete, refreshPosts }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    try {
      setLoading(true);
      await api.post('/comments', {
        post_id: post.id,
        content: comment.trim()
      });

      setComment("");

      // Refresh parent posts
      if (refreshPosts) refreshPosts();

    } catch (error) {
      console.error("Comment error:", error);
    } finally {
      setLoading(false);
    }
  };

  const isOwner = user?.id === post?.user?.id;

  return (
    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 p-6 rounded-2xl shadow-glow transition-all hover:border-purple-500/40">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg dark:text-white">
            {post?.title}
          </h3>
          <p className="text-sm text-slate-500">
            by {post?.user?.name}
          </p>
        </div>

        {isOwner && (
          <button
            onClick={() => onDelete?.(post.id)}
            className="text-xs text-red-400 hover:text-red-500"
          >
            Delete
          </button>
        )}
      </div>

      {/* Content */}
      <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
        {post?.content}
      </p>

      {/* Comments Section */}
      <div className="border-t border-purple-500/10 pt-4">

        <div className="space-y-3 mb-4">
          {Array.isArray(post?.comments) && post.comments.length > 0 ? (
            post.comments.map((c) => (
              <div
                key={c.id}
                className="text-sm bg-slate-100 dark:bg-slate-800 p-3 rounded-xl"
              >
                <span className="font-bold text-purple-400">
                  {c?.user?.name}:{" "}
                </span>
                <span className="dark:text-slate-300">
                  {c?.content}
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400">
              No comments yet.
            </p>
          )}
        </div>

        {/* Comment Form */}
        <form onSubmit={handleComment} className="flex gap-2">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 bg-transparent border border-purple-500/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500 dark:text-white"
          />

          <button
            disabled={loading}
            className="bg-purple-600 px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50 transition-all"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCard;