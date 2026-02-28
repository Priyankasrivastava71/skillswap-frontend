import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import UserCard from '../components/UserCard';
import DashboardStats from '../components/DashboardStats';


const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [matches, setMatches] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [mRes, tRes] = await Promise.all([
          api.get('/users/matches'),
          api.get('/users/top-rated')
        ]);

        setMatches(mRes.data?.data || []);
        setTopRated(tRes.data?.data || []);
      } catch (err) {
        console.error('Dashboard load error:', err);
        setMatches([]);
        setTopRated([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-purple-500 animate-pulse">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10">

      {/* ===== Stats Section ===== */}
      <DashboardStats
        stats={{
          rating: user?.rating || 0,
          completed: 0, // Replace later if you add stats endpoint
          pending: 0,
          matches: matches.length
        }}
      />

      {/* ===== Matches Section ===== */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-purple-100 flex items-center gap-2">
          <span className="w-2 h-8 bg-purple-500 rounded-full inline-block shadow-glow"></span>
          Perfect Skill Matches
        </h2>

        {matches.length === 0 ? (
          <p className="text-slate-500 italic">
            No matches found. Update your skills to get better results.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((u) => (
              <UserCard key={u.id} user={u} />
            ))}
          </div>
        )}
      </section>

      {/* ===== Top Rated Section ===== */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-purple-100 flex items-center gap-2">
          <span className="w-2 h-8 bg-fuchsia-500 rounded-full inline-block"></span>
          Top Rated Experts
        </h2>

        {topRated.length === 0 ? (
          <p className="text-slate-500 italic">
            No top-rated users yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRated.map((u) => (
              <div
                key={u.id}
                className="min-w-[280px] bg-white dark:bg-slate-900 p-6 rounded-2xl border border-purple-500/10 shadow-xl"
              >
                <h3 className="font-bold">{u.name}</h3>

                <p className="text-purple-500 text-sm">
                  {u.skills_offered?.join(' • ') || 'No skills listed'}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-yellow-500">
                    {u.rating || 0} ★
                  </span>

                  <button className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full hover:bg-purple-700">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default Dashboard;