import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleBrowse = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  const handleGetStarted = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* TOP BAR */}
      <div className="flex justify-between items-center px-8 py-6">
        <h1 className="text-2xl font-bold">SkillSwap</h1>

        <div className="flex gap-4 items-center">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-full"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="text-center px-6 py-24">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          Exchange Skills. Build Community.
        </h2>

        <p className="max-w-2xl mx-auto text-lg opacity-80 mb-10">
          SkillSwap allows users to send requests, schedule sessions,
          share resources, post in community, and grow together.
        </p>

        <div className="flex justify-center gap-6">
          {!isLoggedIn && (
            <button
              onClick={handleGetStarted}
              className="px-8 py-3 bg-[#6D5DF6] hover:bg-[#5a4be0] rounded-full transition"
            >
              Get Started
            </button>
          )}

          <button
            onClick={handleBrowse}
            className="px-8 py-3 border border-white/30 hover:bg-white/10 rounded-full transition"
          >
            Browse Skills
          </button>
        </div>
      </section>

      {/* EXPLORE SECTION */}
      <section className="px-10 pb-24">
        <div className="text-center mb-14">
          <h3 className="text-3xl font-bold mb-4">
            Explore What You Can Learn
          </h3>
          <p className="opacity-70">
            Discover skill categories available in the community
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            "Design",
            "Art",
            "Business",
            "Technology",
            "Fitness",
            "Languages",
            "Music",
            "Personal Development",
          ].map((skill, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl border border-white/10 hover:bg-white/5 transition text-center"
            >
              <h4 className="font-semibold">{skill}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="text-center pb-24">
        <div className="flex justify-center gap-20">
          <div>
            <h4 className="text-2xl font-bold">Active Users</h4>
            <p className="opacity-70">Community Members</p>
          </div>

          <div>
            <h4 className="text-2xl font-bold">Sessions</h4>
            <p className="opacity-70">Scheduled Exchanges</p>
          </div>

          <div>
            <h4 className="text-2xl font-bold">Posts</h4>
            <p className="opacity-70">Community Discussions</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      {!isLoggedIn && (
        <section className="bg-[#6D5DF6] py-16 text-center">
          <h3 className="text-3xl font-semibold mb-4">
            Join SkillSwap App
          </h3>
          <p className="mb-6 text-purple-100">
            Create your profile and start exchanging skills today.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-[#6D5DF6] px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Join Now
          </button>
        </section>
      )}
    </div>
  );
}