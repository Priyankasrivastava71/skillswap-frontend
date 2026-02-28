import { TrendingUp, CheckCircle, Clock, Star } from 'lucide-react';

const colorClasses = {
  purple: "bg-purple-500/10 text-purple-400",
  fuchsia: "bg-fuchsia-500/10 text-fuchsia-400",
  indigo: "bg-indigo-500/10 text-indigo-400",
  violet: "bg-violet-500/10 text-violet-400",
};

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white dark:bg-slate-900 p-6 flex items-center gap-5 rounded-2xl border border-purple-500/20 shadow-glow hover:scale-[1.02] transition-transform cursor-default">
    
    <div className={`p-4 rounded-2xl ${colorClasses[color] || colorClasses.purple}`}>
      <Icon size={28} />
    </div>

    <div>
      <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">
        {title}
      </p>
      <h3 className="text-3xl font-bold dark:text-white mt-1">
        {value}
      </h3>
    </div>
  </div>
);

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      
      <StatCard 
        title="Average Rating" 
        value={`${stats?.rating ? stats.rating.toFixed(1) : 0} / 5`} 
        icon={Star} 
        color="purple" 
      />

      <StatCard 
        title="Swaps Completed" 
        value={stats?.completed || 0} 
        icon={CheckCircle} 
        color="fuchsia" 
      />

      <StatCard 
        title="Pending Requests" 
        value={stats?.pending || 0} 
        icon={Clock} 
        color="indigo" 
      />

      <StatCard 
        title="Skill Matches" 
        value={stats?.matches || 0} 
        icon={TrendingUp} 
        color="violet" 
      />

    </div>
  );
};

export default DashboardStats;