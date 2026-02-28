export default function WhySection() {
  return (
    <section className="py-24 px-6 text-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Why SkillSwap?</h2>
        <p className="text-gray-400">
          Built for structured and secure skill exchange
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          "Secure Authentication",
          "Skill-Based Profiles",
          "Exchange Requests",
          "Session Scheduling",
          "Verified Feedback",
          "Realtime Notifications",
          "Community Posts & Comments",
          "Resource Sharing"
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:scale-105 transition"
          >
            <h3 className="text-lg font-semibold">{feature}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}