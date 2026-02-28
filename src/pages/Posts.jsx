import { useState, useEffect } from "react";
import api from "../api/axios";
import { Plus, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import CommentSection from "../components/CommentSection";

const Posts = () => {
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  const fetchPosts = async (pageNumber = 1) => {
    try {
      const res = await api.get(`/posts?page=${pageNumber}&limit=5`);

      const responseData = res.data.data;

      setPosts(responseData.posts || []);
      setTotalPages(responseData.totalPages || 1);
      setPage(responseData.currentPage || 1);

    } catch (err) {
      console.error("Error fetching posts", err);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.content) return;

    try {
      setLoading(true);
      await api.post("/posts", formData);

      setShowModal(false);
      setFormData({ title: "", content: "" });

      fetchPosts(1);
    } catch (err) {
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      fetchPosts(page);
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400">
          Community Posts
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl flex items-center gap-2 shadow-glow transition"
        >
          <Plus size={18} />
          Create Post
        </button>
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          No posts yet.
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-purple-500/20 shadow-lg hover:shadow-purple-500/20 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  {post.title && (
                    <h2 className="text-xl font-bold mb-2 dark:text-white">
                      {post.title}
                    </h2>
                  )}

                  <p className="text-slate-600 dark:text-slate-400 mb-3">
                    {post.content}
                  </p>

                  <p className="text-xs text-purple-400">
                    Posted by {post.user?.name}
                  </p>
                </div>

                {post.user_id === user?.id && (
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <CommentSection postId={post.id}/>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 pt-6">
          <button
            disabled={page === 1}
            onClick={() => fetchPosts(page - 1)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-purple-400 font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => fetchPosts(page + 1)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md p-8 rounded-2xl border border-purple-500/30 shadow-glow">

            <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-6">
              Create Post
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="Title (optional)"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border border-purple-500/20 focus:border-purple-500 outline-none"
              />

              <textarea
                rows="4"
                placeholder="Write something..."
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border border-purple-500/20 focus:border-purple-500 outline-none"
              />

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 text-slate-400 hover:text-white transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl shadow-glow transition"
                >
                  {loading ? "Posting..." : "Post"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;