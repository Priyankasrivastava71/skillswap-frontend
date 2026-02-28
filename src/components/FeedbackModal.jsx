import { useState } from 'react';
import api from './api/axios';
import { Star } from 'lucide-react';

const FeedbackModal = ({ requestId, onClose, onRefresh }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!requestId) return;
    if (rating === 0) return alert("Please select a rating");

    try {
      setLoading(true);

      await api.post('/feedback', {
        request_id: requestId,
        rating,
        comment
      });

      alert("Feedback submitted! User rating updated.");

      if (onRefresh) onRefresh();
      if (onClose) onClose();

    } catch (err) {
      console.error("Feedback error:", err);
      alert(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "You have already left feedback or something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      
      <div className="bg-white dark:bg-slate-900 p-8 w-full max-w-md rounded-2xl border border-purple-500/40 shadow-glow">

        <h2 className="text-2xl font-bold mb-2 text-center text-purple-500">
          Rate Your Experience
        </h2>

        <p className="text-slate-400 text-center text-sm mb-6">
          How was your skill swap session?
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Star Rating */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="transition-transform active:scale-90"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <Star
                  size={36}
                  className={`${
                    (hover || rating) >= star
                      ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]'
                      : 'text-slate-600'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2 text-purple-400">
              Your Review (optional)
            </label>

            <textarea
              rows="3"
              placeholder="Tell others about the teaching style and helpfulness..."
              value={comment}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-purple-500/20 p-3 rounded-xl focus:outline-none focus:border-purple-500 text-sm"
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-slate-400 font-medium hover:text-white transition-colors"
            >
              Skip
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl shadow-glow disabled:opacity-50 transition-all"
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default FeedbackModal;