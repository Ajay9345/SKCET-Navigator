import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

const highlights = [
  "Established in 1994, NAAC 'A' Grade accredited institution",
  "Over 5000 students across 15+ engineering & management programs",
  "State-of-the-art labs, library, and sports facilities",
  "Strong industry tie-ups with top MNCs for placements",
]

export const About = () => {
  return (
    <section id="about" className="bg-[#080f24] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img src="https://careerpaathshala.com/wp-content/uploads/2023/06/1-65.jpg" alt="SKCET Campus Building" className="w-full h-80 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-transparent rounded-2xl" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-36 rounded-xl overflow-hidden border-2 border-[#080f24] shadow-2xl">
              <img src="https://skcet.ac.in/wp-content/uploads/2023/12/Campus-tour-skcet.jpg" alt="Campus Life" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-4 left-4 glass rounded-xl px-3 py-2">
              <p className="text-white text-xs font-semibold">Est. 1994</p>
              <p className="text-white/50 text-xs">Coimbatore, TN</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div>
              <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">About SKCET</span>
              <h2 className="text-4xl font-bold text-white mt-3 leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
                Sri Krishna College of{" "}<span className="gradient-text">Engineering & Technology</span>
              </h2>
            </div>
            <p className="text-white/60 leading-relaxed">
              SKCET is one of Tamil Nadu's premier engineering institutions, offering world-class education in engineering, technology, and management. The sprawling campus houses modern infrastructure, cutting-edge research facilities, and a vibrant student community.
            </p>
            <ul className="space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-white/70 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>
            <a href="https://skcet.ac.in" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20">
              Visit Official Website
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
