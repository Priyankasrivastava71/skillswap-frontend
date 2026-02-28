import { useEffect, useState } from "react"
import API from "../services/api"
import { toast } from "react-hot-toast"

export default function Browse() {
  const [matches, setMatches] = useState([])
  const [topRated, setTopRated] = useState([])

  const fetchMatches = async () => {
    try {
      const { data } = await API.get("/users/matches")
      setMatches(data.data)
    } catch {
      toast.error("No matches found")
    }
  }

  const fetchTopRated = async () => {
    try {
      const { data } = await API.get("/users/top-rated")
      setTopRated(data.data)
    } catch {
      toast.error("Failed to load top rated")
    }
  }

  useEffect(() => {
    fetchMatches()
    fetchTopRated()
  }, [])

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Browse Skills
      </h1>

      {/* MATCHES */}
      {matches.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl mb-4">
            🔥 Your Skill Matches
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {matches.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      )}

      {/* TOP RATED */}
      <div>
        <h2 className="text-2xl mb-4">
          ⭐ Top Rated Users
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topRated.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>

    </div>
  )
}

function UserCard({ user }) {
  return (
    <div className="bg-[#1B1F4A] p-6 rounded-2xl border border-white/10">
      <h3 className="font-semibold text-lg mb-2">
        {user.name}
      </h3>

      <p className="text-sm text-gray-400 mb-2">
        {user.bio || "No bio"}
      </p>

      <p className="text-sm mb-2">
        Offered: {user.skills_offered?.join(", ")}
      </p>

      <p className="text-sm mb-3">
        Wanted: {user.skills_wanted?.join(", ")}
      </p>

      <p className="text-sm">
        ⭐ {user.rating || 0}
      </p>
    </div>
  )
}