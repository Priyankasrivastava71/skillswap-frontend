import { useNavigate } from "react-router-dom";
import {
  Users,
  Calendar,
  Zap,
  Star,
  Code,
  Palette,
  Camera,
  Music,
  Globe,
  Dumbbell,
  Mic,
  BarChart,
  Brush
} from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0516] text-slate-900 dark:text-white">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-purple-500/10 via-transparent to-fuchsia-500/10">
        <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-12">

          <div className="flex-1 space-y-6">

            <h1 className="text-5xl font-bold leading-tight">
              Learn Anything.
              <br />
              <span className="text-purple-600 dark:text-purple-400">
                Teach What You Know.
              </span>
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-lg">
              SkillSwap connects people who want to learn new skills with those
              willing to teach. Exchange knowledge, schedule sessions and grow together.
            </p>

            <div className="flex gap-4">

              <button
                onClick={() => navigate("/register")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-lg"
              >
                Get Started
              </button>

              <button
                onClick={() => navigate("/explore")}
                className="border border-purple-500 text-purple-600 dark:text-purple-400 px-6 py-3 rounded-xl hover:bg-purple-500/10"
              >
                Explore Skills
              </button>

            </div>

          </div>

          <div className="flex-1">
            <img
              src="https://illustrations.popsy.co/gray/team-work.svg"
              alt="Skill exchange"
              className="w-full max-w-md mx-auto"
            />
          </div>

        </div>
      </section>


      {/* EXPLORE CATEGORIES */}
      <section className="py-20 bg-white dark:bg-slate-900">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            Explore Categories
          </h2>

          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Discover skills across multiple categories and start learning from experts.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 mt-12">

            <Category icon={<Code size={32} />} title="Programming" />
            <Category icon={<Palette size={32} />} title="Design" />
            <Category icon={<Camera size={32} />} title="Photography" />
            <Category icon={<Music size={32} />} title="Music" />
            <Category icon={<Globe size={32} />} title="Languages" />
            <Category icon={<Mic size={32} />} title="Public Speaking" />
            <Category icon={<BarChart size={32} />} title="Marketing" />
            <Category icon={<Brush size={32} />} title="Art" />
            <Category icon={<Dumbbell size={32} />} title="Fitness" />

          </div>

        </div>

      </section>


      {/* FEATURES */}
      <section className="py-20">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            Platform Features
          </h2>

          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Everything you need to connect, learn and grow with the community.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

            <Feature
              icon={<Users size={36} />}
              title="Skill Matching"
              text="Discover people who can teach the skills you want to learn."
            />

            <Feature
              icon={<Calendar size={36} />}
              title="Session Scheduling"
              text="Book and manage learning sessions easily."
            />

            <Feature
              icon={<Zap size={36} />}
              title="Live Sessions"
              text="Connect using meeting links and learn in real time."
            />

            <Feature
              icon={<Star size={36} />}
              title="Ratings & Feedback"
              text="Build trust through reviews and ratings."
            />

          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}
      <section className="py-20 bg-white dark:bg-slate-900">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            How SkillSwap Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">

            <Feature
              icon={<Users size={36} />}
              title="Create Profile"
              text="Add skills you can teach and skills you want to learn."
            />

            <Feature
              icon={<Zap size={36} />}
              title="Find Matches"
              text="Discover people with complementary skills."
            />

            <Feature
              icon={<Calendar size={36} />}
              title="Schedule Session"
              text="Book sessions and exchange knowledge easily."
            />

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="py-20 text-center space-y-6">

        <h2 className="text-3xl font-bold">
          Start Your Learning Journey Today
        </h2>

        <p className="text-slate-500">
          Join SkillSwap and exchange knowledge with people worldwide.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl"
        >
          Create Free Account
        </button>

      </section>


      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-center py-6 text-sm">
        © 2026 SkillSwap • Built with React, Node.js, Supabase
      </footer>

    </div>
  );
};


/* CATEGORY CARD */

const Category = ({ icon, title }) => (
  <div className="flex flex-col items-center justify-center text-center p-6 h-32 rounded-2xl border border-purple-500/20 hover:shadow-glow hover:-translate-y-1 transition">

    <div className="text-purple-500 mb-3 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]">
      {icon}
    </div>

    <p className="text-sm font-medium">{title}</p>

  </div>
);


/* FEATURE CARD */

const Feature = ({ icon, title, text }) => (
  <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-purple-500/20 hover:shadow-glow hover:-translate-y-1 transition">

    <div className="text-purple-500 mb-4 flex items-center justify-center">
      {icon}
    </div>

    <h3 className="font-semibold">{title}</h3>

    <p className="text-sm text-slate-500 mt-2">
      {text}
    </p>

  </div>
);


export default HomePage;