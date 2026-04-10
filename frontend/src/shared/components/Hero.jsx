import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { MapPin, Navigation, Building2, Users, ArrowRight } from "lucide-react"

const stats = [
  { value: "35+", label: "Buildings" },
  { value: "15+", label: "Departments" },
  { value: "5000+", label: "Students" },
  { value: "300+", label: "Faculty" },
]

export const Hero = () => {
  return (
    <section className="hero-bg dot-pattern min-h-screen flex flex-col justify-center pt-16 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-blue-300 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Smart Campus Navigation System
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
                Navigate{" "}<span className="gradient-text">SKCET</span><br />Like Never Before
              </h1>
              <p className="text-lg text-white/60 leading-relaxed max-w-lg">
                Sri Krishna College of Engineering and Technology's official smart navigation system. Find buildings, faculty cabins, departments, and get real-time directions across campus.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/home" className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-xl shadow-blue-600/25 group">
                <MapPin className="h-4 w-4" />
                Explore Campus
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#features" className="flex items-center gap-2 px-6 py-3 glass text-white/80 hover:text-white font-medium rounded-xl transition-all">
                Learn More
              </a>
            </div>

            <div className="grid grid-cols-4 gap-4 pt-4">
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="text-center">
                  <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
                  <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img src="https://skcet.ac.in/wp-content/uploads/2023/12/Campus-tour-skcet.jpg" alt="SKCET Campus" className="w-full h-auto object-contain" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060d1f] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold text-sm">Sri Krishna College of Engineering & Technology</p>
                  <p className="text-white/50 text-xs mt-0.5 flex items-center gap-1"><MapPin className="h-3 w-3" /> Coimbatore, Tamil Nadu</p>
                </div>
              </div>

              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-6 -right-6 glass rounded-xl p-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/30 flex items-center justify-center"><Building2 className="h-4 w-4 text-blue-400" /></div>
                  <div><p className="text-white text-xs font-semibold">35+ Buildings</p><p className="text-white/40 text-xs">Mapped & Navigable</p></div>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute -bottom-6 -left-6 glass rounded-xl p-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center"><Users className="h-4 w-4 text-amber-400" /></div>
                  <div><p className="text-white text-xs font-semibold">300+ Faculty</p><p className="text-white/40 text-xs">Find Any Cabin</p></div>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-1/2 -right-10 glass rounded-xl p-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center"><Navigation className="h-4 w-4 text-green-400" /></div>
                  <div><p className="text-white text-xs font-semibold">Live Navigation</p><p className="text-white/40 text-xs">Turn-by-turn</p></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#060d1f] to-transparent pointer-events-none" />
    </section>
  )
}

export default Hero
