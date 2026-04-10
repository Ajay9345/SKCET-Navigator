import { motion } from "framer-motion"
import { Map, Navigation, Users, Building2, Compass, Zap } from "lucide-react"

const features = [
  { icon: <Map className="h-6 w-6" />, title: "Outdoor Navigation", description: "Google Maps-powered campus navigation with walking directions between any two buildings on campus.", color: "blue" },
  { icon: <Compass className="h-6 w-6" />, title: "Indoor Navigation", description: "Floor-by-floor indoor maps to help you find classrooms, labs, and offices inside every building.", color: "purple" },
  { icon: <Building2 className="h-6 w-6" />, title: "Building Details", description: "Real-time open/closed status, photo galleries, and detailed profiles for every campus building.", color: "amber" },
  { icon: <Users className="h-6 w-6" />, title: "Faculty Finder", description: "Search any faculty member by name, department, or subject and instantly find their cabin location.", color: "green" },
  { icon: <Navigation className="h-6 w-6" />, title: "Voice Guidance", description: "Hands-free turn-by-turn voice instructions so you can navigate without looking at your screen.", color: "rose" },
  { icon: <Zap className="h-6 w-6" />, title: "Instant Search", description: "Find any location, department, or faculty in seconds with our smart search and filter system.", color: "cyan" },
]

const colorMap = {
  blue:   "bg-blue-500/10 text-blue-400 border-blue-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  amber:  "bg-amber-500/10 text-amber-400 border-amber-500/20",
  green:  "bg-green-500/10 text-green-400 border-green-500/20",
  rose:   "bg-rose-500/10 text-rose-400 border-rose-500/20",
  cyan:   "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
}

export const HowItWorks = () => {
  return (
    <section id="features" className="bg-[#060d1f] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">What We Offer</span>
          <h2 className="text-4xl font-bold text-white mt-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            Everything You Need to{" "}<span className="gradient-text">Navigate SKCET</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">A complete smart campus system built for students, faculty, and visitors.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-2xl p-6 card-lift group">
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${colorMap[f.color]}`}>{f.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
