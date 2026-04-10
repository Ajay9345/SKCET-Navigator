import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react"

const BuildingGallery = ({ buildingName, photos, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const prev = () => setActiveIndex((i) => (i - 1 + photos.length) % photos.length)
  const next = () => setActiveIndex((i) => (i + 1) % photos.length)

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-[#0d1a35] border border-white/10 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
            <div className="flex items-center gap-2 text-blue-400 font-semibold">
              <Images className="h-5 w-5" />{buildingName}
            </div>
            <button onClick={onClose} className="text-white/30 hover:text-white transition-colors"><X className="h-5 w-5" /></button>
          </div>

          <div className="relative w-full h-72 bg-gray-100">
            <motion.img
              key={activeIndex}
              src={photos[activeIndex]}
              alt={`${buildingName} photo ${activeIndex + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
            />
            {photos.length > 1 && (
              <>
                <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition-colors">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition-colors">
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
            <span className="absolute bottom-2 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
              {activeIndex + 1} / {photos.length}
            </span>
          </div>

          {photos.length > 1 && (
            <div className="flex gap-2 p-3 overflow-x-auto bg-[#060d1f]">
              {photos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${i === activeIndex ? "border-blue-500 scale-105" : "border-transparent opacity-40 hover:opacity-80"}`}
                >
                  <img src={photo} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default BuildingGallery
