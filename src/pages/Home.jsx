import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Map, Navigation, Building2, Users, ArrowRight, MapPin, Clock, ChevronRight } from "lucide-react"
import { Footer } from "../shared/components/Footer"

const services = [
  { title: "Indoor Navigation", description: "Navigate inside buildings floor by floor. Find classrooms, labs, and offices instantly.", icon: Navigation, link: "/indoor", accent: "#3b82f6", accentBg: "rgba(59,130,246,0.12)", tag: "Popular", tagColor: "bg-blue-500/20 text-blue-300" },
  { title: "Outdoor Navigation", description: "GPS walking directions between any two campus locations with voice guidance.", icon: Map, link: "/map", accent: "#a855f7", accentBg: "rgba(168,85,247,0.12)", tag: "Live GPS", tagColor: "bg-purple-500/20 text-purple-300" },
  { title: "Building Details", description: "Real-time open/closed status, photo galleries, and full profiles for every building.", icon: Building2, link: "/b", accent: "#f59e0b", accentBg: "rgba(245,158,11,0.12)", tag: "Real-time", tagColor: "bg-amber-500/20 text-amber-300" },
  { title: "Faculty Finder", description: "Find any faculty's cabin, contact, and availability by name, subject, or department.", icon: Users, link: "/faculty", accent: "#10b981", accentBg: "rgba(16,185,129,0.12)", tag: "300+ Faculty", tagColor: "bg-emerald-500/20 text-emerald-300" },
]

const quickStats = [
  { label: "Buildings", value: "35+", icon: Building2, color: "#3b82f6" },
  { label: "Departments", value: "15+", icon: Map, color: "#a855f7" },
  { label: "Faculty", value: "300+", icon: Users, color: "#10b981" },
  { label: "Students", value: "5000+", icon: Navigation, color: "#f59e0b" },
]

const now = new Date()
const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
const dateStr = now.toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })

const Home = () => (
  <div className="min-h-screen bg-[#060d1f]">
    <div className="bg-[#060d1f]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Navigation className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-lg text-white" style={{ fontFamily: "Sora, sans-serif" }}>
            SKCET <span className="text-blue-400">Navigator</span>
          </span>
        </Link>
        <div className="hidden sm:flex items-center gap-1.5 text-white/30 text-xs">
          <Clock className="h-3.5 w-3.5" />
          <span>{timeStr} · {dateStr}</span>
        </div>
        <div className="flex items-center gap-1.5 text-white/30 text-xs">
          <MapPin className="h-3.5 w-3.5 text-blue-400" />
          <span className="hidden sm:inline">Coimbatore, TN</span>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-3xl overflow-hidden mb-10" style={{ background: "linear-gradient(135deg, #0d1f42 0%, #0a1628 60%, #0d1a35 100%)" }}>
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 dot-pattern opacity-40" />

        <div className="relative flex flex-col sm:flex-row items-center gap-6 p-8 sm:p-10">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-medium">Campus system online</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "Sora, sans-serif" }}>
              Welcome to <span className="gradient-text">SKCET Navigator</span>
            </h1>
            <p className="text-white/50 text-sm max-w-md leading-relaxed">
              Your smart guide to Sri Krishna College of Engineering & Technology. Navigate buildings, find faculty, and explore the campus.
            </p>
            <Link to="/map" className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/25 group">
              <MapPin className="h-4 w-4" />
              Open Campus Map
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0">
            {quickStats.map((s) => (
              <div key={s.label} className="glass rounded-xl px-4 py-3 text-center min-w-[90px]">
                <p className="text-xl font-bold text-white" style={{ fontFamily: "Sora, sans-serif", color: s.color }}>{s.value}</p>
                <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-white/25 text-xs uppercase tracking-widest font-semibold">Services</p>
          <h2 className="text-white font-bold text-xl mt-0.5" style={{ fontFamily: "Sora, sans-serif" }}>Choose a service</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
        {services.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Link to={s.link} className="group block h-full">
                <div className="relative h-full rounded-2xl border border-white/8 overflow-hidden transition-all duration-300 group-hover:border-white/20 group-hover:shadow-2xl" style={{ background: "#0b1730" }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 10% 50%, ${s.accent}18, transparent)` }} />
                  <div className="relative p-6 flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ background: s.accentBg, border: `1px solid ${s.accent}30` }}>
                      <Icon className="h-6 w-6" style={{ color: s.accent }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="text-white font-bold text-lg" style={{ fontFamily: "Sora, sans-serif" }}>{s.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.tagColor}`}>{s.tag}</span>
                      </div>
                      <p className="text-white/45 text-sm leading-relaxed">{s.description}</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" style={{ background: s.accentBg }}>
                      <ChevronRight className="h-4 w-4" style={{ color: s.accent }} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${s.accent}, transparent)` }} />
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5">
        <div className="w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center shrink-0">
          <MapPin className="h-5 w-5 text-blue-400" />
        </div>
        <div className="text-center sm:text-left">
          <p className="text-white font-semibold text-sm" style={{ fontFamily: "Sora, sans-serif" }}>Sri Krishna College of Engineering & Technology</p>
          <p className="text-white/35 text-xs mt-0.5">Kuniamuthur, Coimbatore – 641 008 · Est. 1994 · NAAC 'A' Grade · Autonomous Institution</p>
        </div>
        <a href="https://skcet.ac.in" target="_blank" rel="noreferrer" className="sm:ml-auto shrink-0 flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/8 text-white/60 hover:text-white text-xs font-medium rounded-lg transition-all">
          Official Website <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </motion.div>
    </div>

    <Footer />
  </div>
)

export default Home
