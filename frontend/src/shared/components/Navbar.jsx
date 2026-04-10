import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, MapPin, Navigation } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "#faq", label: "FAQ" },
]

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === "/"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#060d1f]/90 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Navigation className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-lg text-white tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
            SKCET <span className="text-blue-400">Navigator</span>
          </span>
        </Link>

        {isHome && (
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="px-4 py-2 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                {link.label}
              </a>
            ))}
          </nav>
        )}

        <div className="hidden md:flex items-center gap-3">
          <Link to="/home" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-blue-600/25">
            <MapPin className="h-4 w-4" />
            Explore Campus
          </Link>
        </div>

        <button className="md:hidden text-white/80 hover:text-white p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#060d1f]/95 backdrop-blur-xl border-t border-white/5 px-4 pb-4"
          >
            {isHome && navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setIsOpen(false)} className="block py-3 text-white/70 hover:text-white border-b border-white/5 text-sm">
                {link.label}
              </a>
            ))}
            <Link to="/home" onClick={() => setIsOpen(false)} className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg">
              <MapPin className="h-4 w-4" />
              Explore Campus
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
