export default function Hero() {
  return (
    <section className="text-center text-white py-24 px-6">
      <div className="mb-6 inline-block px-4 py-2 bg-purple-600/20 text-purple-300 rounded-full text-sm">
        Skill Exchange Platform
      </div>

      <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
        Swap Skills, Grow Together
      </h1>

      <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-10">
        Exchange your expertise with others. Teach what you know,
        learn what you love — no money involved.
      </p>

      <div className="flex justify-center gap-6">
        <button className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-full transition">
          Get Started →
        </button>
        <button className="border border-white/20 px-6 py-3 rounded-full hover:bg-white/10 transition">
          Browse Skills
        </button>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-16 mt-16 text-center">
        <div>
          <h2 className="text-2xl font-bold">12K+</h2>
          <p className="text-gray-400">Active Users</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">4.5K+</h2>
          <p className="text-gray-400">Skills Shared</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">8.5K+</h2>
          <p className="text-gray-400">Sessions Done</p>
        </div>
      </div>
    </section>
  )
}