import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, Phone, Mail, BookOpen, Clock, X, User, ArrowLeft, Filter } from "lucide-react"
import { Link } from "react-router-dom"
import { FACULTIES, DEPARTMENTS } from "../../data/facultyData"

const FacultyCard = ({ faculty, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    whileHover={{ y: -4 }}
    onClick={onClick}
    className="bg-[#0d1a35] border border-white/8 hover:border-blue-500/30 rounded-2xl p-5 cursor-pointer transition-all group"
  >
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center shrink-0">
        <User className="h-5 w-5 text-blue-400" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-white truncate group-hover:text-blue-300 transition-colors" style={{ fontFamily: 'Sora, sans-serif' }}>{faculty.name}</p>
        <p className="text-sm text-blue-400/80 mt-0.5">{faculty.designation}</p>
        <span className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/8">{faculty.department}</span>
        <div className="flex items-center gap-1.5 mt-3 text-xs text-green-400/80">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">{faculty.cabin} · {faculty.block}</span>
        </div>
      </div>
    </div>
  </motion.div>
)

const FacultyDetailModal = ({ faculty, onClose }) => (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-[#0d1a35] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{faculty.name}</p>
              <p className="text-sm text-blue-400">{faculty.designation}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors p-1"><X className="h-5 w-5" /></button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-blue-600/8 border border-blue-500/15 rounded-xl p-4">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">Cabin Location</p>
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-white">{faculty.cabin}</p>
                <p className="text-sm text-white/40 mt-0.5">{faculty.block} · {faculty.floor}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a href={`tel:${faculty.phone}`} className="flex items-center gap-2.5 bg-white/4 hover:bg-white/8 border border-white/8 rounded-xl p-3.5 transition-colors">
              <Phone className="h-4 w-4 text-blue-400 shrink-0" />
              <div className="min-w-0"><p className="text-xs text-white/30">Phone</p><p className="text-sm text-white truncate">{faculty.phone}</p></div>
            </a>
            <a href={`mailto:${faculty.email}`} className="flex items-center gap-2.5 bg-white/4 hover:bg-white/8 border border-white/8 rounded-xl p-3.5 transition-colors">
              <Mail className="h-4 w-4 text-blue-400 shrink-0" />
              <div className="min-w-0"><p className="text-xs text-white/30">Email</p><p className="text-sm text-white truncate">{faculty.email}</p></div>
            </a>
          </div>

          <div className="flex items-center gap-2.5 bg-white/4 border border-white/8 rounded-xl p-3.5">
            <Clock className="h-4 w-4 text-amber-400 shrink-0" />
            <div><p className="text-xs text-white/30">Availability</p><p className="text-sm text-white">{faculty.availability}</p></div>
          </div>

          <div className="bg-white/4 border border-white/8 rounded-xl p-3.5">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-purple-400" />
              <p className="text-xs text-white/30">Subjects</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {faculty.subjects.map((s) => (
                <span key={s} className="bg-purple-500/10 text-purple-300 text-xs px-2.5 py-1 rounded-full border border-purple-500/20">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
)

const FacultyFinder = () => {
  const [query, setQuery] = useState("")
  const [selectedDept, setSelectedDept] = useState("All")
  const [selectedFaculty, setSelectedFaculty] = useState(null)

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return FACULTIES.filter((f) => {
      const matchesDept = selectedDept === "All" || f.department === selectedDept
      const matchesQuery = !q || f.name.toLowerCase().includes(q) || f.department.toLowerCase().includes(q) ||
        f.subjects.some((s) => s.toLowerCase().includes(q)) || f.cabin.toLowerCase().includes(q) || f.block.toLowerCase().includes(q)
      return matchesDept && matchesQuery
    })
  }, [query, selectedDept])

  return (
    <div className="min-h-screen bg-[#060d1f] dot-pattern">
      <div className="bg-[#060d1f]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          <Link to="/home" className="text-white/40 hover:text-white transition-colors"><ArrowLeft className="h-5 w-5" /></Link>
          <div>
            <h1 className="text-white font-bold text-lg leading-none" style={{ fontFamily: 'Sora, sans-serif' }}>Faculty Finder</h1>
            <p className="text-white/30 text-xs mt-0.5">Find faculty cabins & contact info</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              type="text"
              placeholder="Search by name, subject, cabin, or department..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-[#0d1a35] border border-white/8 rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-blue-500/50 transition-colors text-sm"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="relative">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="pl-10 pr-4 py-3 bg-[#0d1a35] border border-white/8 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-colors text-sm appearance-none cursor-pointer"
            >
              <option value="All">All Departments</option>
              {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <p className="text-white/30 text-sm mb-5">{filtered.length} faculty member{filtered.length !== 1 ? "s" : ""} found</p>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((f) => (
              <FacultyCard key={f.id} faculty={f} onClick={() => setSelectedFaculty(f)} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/20">
            <User className="h-14 w-14 mx-auto mb-4 opacity-20" />
            <p className="text-lg">No faculty found</p>
            <p className="text-sm mt-1">Try a different name, subject, or department</p>
          </div>
        )}
      </div>

      {selectedFaculty && <FacultyDetailModal faculty={selectedFaculty} onClose={() => setSelectedFaculty(null)} />}
    </div>
  )
}

export default FacultyFinder
