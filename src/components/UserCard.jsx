import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-purple-500/20 shadow-lg">
      <h3 className="text-xl font-bold mb-2 dark:text-white">
        {user.name}
      </h3>

      <p className="text-slate-400 text-sm mb-4">
        {user.bio || "No bio available"}
      </p>

      <div className="mb-3">
        <p className="text-xs font-semibold text-purple-400 uppercase mb-1">
          Skills Offered:
        </p>

        <div className="flex flex-wrap gap-2">
          {user.skills_offered?.map((skill, index) => (
            <span
              key={index}
              className="bg-purple-500/10 text-purple-300 text-xs px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1 text-yellow-400">
          <Star size={16} />
          <span>{user.rating || 0}</span>
        </div>

        <button
          onClick={() =>{console.log("fjei",u.id)}}

          className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full hover:bg-purple-700 transition"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default UserCard;