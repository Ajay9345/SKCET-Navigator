import { motion, AnimatePresence } from "framer-motion"
import { X, Building2, Users, FlaskConical, DoorOpen, Layers, CalendarDays, Star, Tag } from "lucide-react"

const categoryColors = {
  academic: "bg-blue-100 text-blue-700",
  hostel:   "bg-purple-100 text-purple-700",
  amenity:  "bg-yellow-100 text-yellow-700",
  sports:   "bg-green-100 text-green-700",
  block:    "bg-gray-100 text-gray-700",
}

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
    <span className="text-blue-400 mt-0.5">{icon}</span>
    <div>
      <p className="text-xs text-white/30 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  </div>
)

const BuildingProfileModal = ({ buildingName, profile, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-end bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-[#0d1a35] border-l border-white/8 h-full w-full max-w-sm shadow-2xl overflow-y-auto"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-[#0d1a35] z-10 px-5 py-4 border-b border-white/8 flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="h-5 w-5 text-blue-400" />
                <h2 className="text-lg font-bold text-white leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>{buildingName}</h2>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${categoryColors[profile.category]}`}>
                <Tag className="inline h-3 w-3 mr-1" />{profile.category}
              </span>
            </div>
            <button onClick={onClose} className="text-white/30 hover:text-white mt-1 transition-colors flex-shrink-0"><X className="h-5 w-5" /></button>
          </div>

          <div className="px-5 py-4 space-y-5">
            <p className="text-sm text-white/50 leading-relaxed">{profile.description}</p>

            <div className="bg-[#060d1f] rounded-xl p-4 space-y-1">
              {profile.established && <InfoRow icon={<CalendarDays className="h-4 w-4" />} label="Established" value={profile.established} />}
              {profile.floors !== undefined && <InfoRow icon={<Layers className="h-4 w-4" />} label="Floors" value={profile.floors} />}
              {profile.capacity !== undefined && <InfoRow icon={<Users className="h-4 w-4" />} label="Capacity" value={`${profile.capacity} people`} />}
              {profile.rooms !== undefined && <InfoRow icon={<DoorOpen className="h-4 w-4" />} label="Rooms" value={profile.rooms} />}
              {profile.facultyCount !== undefined && <InfoRow icon={<Users className="h-4 w-4" />} label="Faculty Count" value={profile.facultyCount} />}
              {profile.hod && <InfoRow icon={<Users className="h-4 w-4" />} label="Head of Department" value={profile.hod} />}
            </div>

            {profile.labs && profile.labs.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FlaskConical className="h-4 w-4 text-blue-400" />
                  <h3 className="text-sm font-semibold text-white/70">Labs & Facilities</h3>
                </div>
                <ul className="space-y-1">
                  {profile.labs.map((lab) => (
                    <li key={lab} className="text-sm text-white/50 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />{lab}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {profile.highlights && profile.highlights.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-amber-400" />
                  <h3 className="text-sm font-semibold text-white/70">Highlights</h3>
                </div>
                <ul className="space-y-1">
                  {profile.highlights.map((h) => (
                    <li key={h} className="text-sm text-white/50 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />{h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default BuildingProfileModal
