const categories = [
  "Technology",
  "Design",
  "Business",
  "Fitness",
  "Languages",
  "Music",
  "Academics",
  "Personal Dev"
]

export default function Categories() {
  return (
    <section className="py-24 px-6 text-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Explore Categories</h2>
        <p className="text-gray-400">
          Find skills across dozens of categories
        </p>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-lg p-10 rounded-2xl border border-white/10 hover:scale-105 transition duration-300 text-center"
          >
            <h3 className="text-xl font-semibold">{cat}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}