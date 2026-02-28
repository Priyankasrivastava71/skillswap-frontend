import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Code,
  Palette,
  Globe,
  Music,
  Dumbbell,
  Briefcase,
  Heart,
  BookOpen,
  ArrowRight,
} from "lucide-react";

const categories = [
  { icon: Code, label: "Technology" },
  { icon: Palette, label: "Design" },
  { icon: Globe, label: "Languages" },
  { icon: Music, label: "Music" },
  { icon: Dumbbell, label: "Fitness" },
  { icon: Briefcase, label: "Business" },
  { icon: Heart, label: "Personal Dev" },
  { icon: BookOpen, label: "Academics" },
];

export default function Index() {
  return (
    <div className="relative min-h-screen subtle-bg text-white overflow-hidden">
      

      {/* Content Wrapper */}
      <div className="relative z-10 px-6 md:px-16 py-20">

        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            Swap Skills, <br />
            Grow Together
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Exchange your expertise with others. Teach what you know, learn what
            you love — no money involved.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3 rounded-full bg-indigo-500 hover:bg-indigo-600 transition duration-300 flex items-center justify-center gap-2 font-medium"
            >
              Get Started <ArrowRight size={18} />
            </Link>

            <Link
              to="/browse"
              className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 transition duration-300 font-medium"
            >
              Browse Skills
            </Link>
          </div>
        </motion.div>

        {/* EXPLORE CATEGORIES */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-24 max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
            Explore Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/10 transition duration-300"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500/20 mb-4">
                    <Icon size={22} />
                  </div>
                  <p className="font-medium">{category.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-32 max-w-4xl mx-auto text-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-12"
        >
          <h3 className="text-3xl font-semibold mb-6">
            Ready to Start Swapping?
          </h3>
          <p className="text-gray-300 mb-8">
            Join thousands of learners sharing knowledge and growing together.
          </p>

          <Link
            to="/register"
            className="px-10 py-3 rounded-full bg-indigo-500 hover:bg-indigo-600 transition duration-300 font-medium"
          >
            Join SkillSwap
          </Link>
        </motion.div>

      </div>
    </div>
  );
};