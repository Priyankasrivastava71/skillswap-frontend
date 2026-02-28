import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { Save, User } from 'lucide-react';

const Profile = () => {
  const { user: loggedInUser, setUser } = useAuth();
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const isOwnProfile = !id || id === loggedInUser?.id;

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    skills_offered: "",
    skills_wanted: ""
  });

  // ==============================
  // FETCH PROFILE
  // ==============================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        let res;

        if (isOwnProfile) {
          res = await api.get("/users/profile");
        } else {
          res = await api.get(`/users/${id}`);
        }

        const data = res.data.data;

        setProfile(data);

        setFormData({
          name: data.name || "",
          bio: data.bio || "",
          skills_offered: data.skills_offered?.join(", ") || "",
          skills_wanted: data.skills_wanted?.join(", ") || ""
        });
      } catch (err) {
        console.error("Profile fetch error:", err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    if (loggedInUser) {
      fetchProfile();
    }
  }, [id, loggedInUser]);

  // ==============================
  // FETCH FEEDBACK
  // ==============================
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const targetId = id || loggedInUser?.id;
        if (!targetId) return;

        const res = await api.get(`/feedback/user/${targetId}`);
        setFeedbacks(res.data?.data || []);
      } catch (err) {
        console.error("Feedback error:", err);
        setFeedbacks([]);
      }
    };

    fetchFeedback();
  }, [id, loggedInUser]);

  // ==============================
  // UPDATE PROFILE
  // ==============================
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!isOwnProfile) return;

    try {
      setLoading(true);

      const updatedData = {
        name: formData.name,
        bio: formData.bio,
        skills_offered: formData.skills_offered
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        skills_wanted: formData.skills_wanted
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      };

      const res = await api.put("/users/profile", updatedData);

      setUser(res.data.data);
      setProfile(res.data.data);
      setIsEditing(false);

      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // LOADING STATE
  // ==============================
  if (loading) {
    return (
      <div className="text-center py-20 text-purple-500 animate-pulse">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-20 text-red-400">
        User not found.
      </div>
    );
  }
  return (
  <div className="max-w-4xl mx-auto px-4 lg:px-0">

    <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-purple-500/20 shadow-glow">

      {/* Header Banner */}
      <div className="h-40 bg-gradient-to-r from-purple-900 to-fuchsia-900 relative">

        {/* Avatar */}
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 lg:left-10 lg:translate-x-0">
          <div className="w-28 h-28 rounded-full bg-slate-800 border-4 border-purple-500/30 flex items-center justify-center shadow-lg">
            <User size={42} className="text-purple-400" />
          </div>
        </div>

      </div>

      {/* Profile Content */}
      <div className="pt-20 px-6 lg:px-10 pb-10">

        {/* Name + Rating + Edit */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-8">

          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold dark:text-white">
              {profile.name}
            </h1>

            <p className="text-purple-400 text-sm">
              {profile.email}
            </p>

            <p className="text-yellow-400 font-semibold mt-2">
              {profile.rating?.toFixed(1) || "0.0"} ★ Rating
            </p>
          </div>

          {isOwnProfile && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-5 py-2 border border-purple-500/40 rounded-xl hover:bg-purple-500/10 transition"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          )}
        </div>

        {/* FORM SECTION */}
        <form onSubmit={handleUpdate} className="space-y-6">

          {/* About */}
          <div>
            <h3 className="text-sm uppercase text-purple-400 mb-2">
              About Me
            </h3>

            <textarea
              disabled={!isEditing}
              rows="3"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="w-full bg-slate-100 dark:bg-slate-800 border border-purple-500/20 p-3 rounded-xl disabled:opacity-60"
            />
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div>
              <h3 className="text-sm uppercase text-purple-400 mb-2">
                Skills Offered
              </h3>

              <input
                disabled={!isEditing}
                value={formData.skills_offered}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skills_offered: e.target.value
                  })
                }
                className="w-full bg-slate-100 dark:bg-slate-800 border border-purple-500/20 p-3 rounded-xl disabled:opacity-60"
              />
            </div>

            <div>
              <h3 className="text-sm uppercase text-purple-400 mb-2">
                Skills Wanted
              </h3>

              <input
                disabled={!isEditing}
                value={formData.skills_wanted}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skills_wanted: e.target.value
                  })
                }
                className="w-full bg-slate-100 dark:bg-slate-800 border border-purple-500/20 p-3 rounded-xl disabled:opacity-60"
              />
            </div>

          </div>

          {isEditing && (
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl shadow-glow transition"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          )}
        </form>

      </div>
    </div>

    {/* Feedback Section */}
    <div className="mt-10 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-purple-500/20 shadow-glow">

      <h2 className="text-xl font-bold text-purple-400 mb-6">
        User Feedback
      </h2>

      {feedbacks.length === 0 ? (
        <p className="text-slate-400">No feedback yet.</p>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl"
            >
              <p className="text-yellow-400 font-semibold">
                {fb.rating} ★
              </p>
              <p className="text-slate-500 dark:text-slate-300 text-sm">
                {fb.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>

  </div>
);
}
export default Profile;