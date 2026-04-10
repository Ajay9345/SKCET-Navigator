import { Navigation, MapPin, Phone, Mail, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"

const services = [
  { label: "Indoor Navigation", to: "/indoor" },
  { label: "Outdoor Navigation", to: "/map" },
  { label: "Building Details", to: "/b" },
  { label: "Faculty Finder", to: "/faculty" },
]

const quickLinks = [
  { label: "About SKCET", href: "https://skcet.ac.in/about-us/" },
  { label: "Departments", href: "https://skcet.ac.in/departments/" },
  { label: "Admissions", href: "https://skcet.ac.in/admissions/" },
  { label: "Placements", href: "https://skcet.ac.in/placements/" },
]

export const Footer = () => {
  return (
    <footer className="bg-[#040a18] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Navigation className="h-4 w-4 text-white" /></div>
              <span className="font-bold text-white text-lg" style={{ fontFamily: 'Sora, sans-serif' }}>SKCET <span className="text-blue-400">Navigator</span></span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">The official smart campus navigation system for Sri Krishna College of Engineering and Technology.</p>
            <div className="space-y-2 text-sm text-white/40">
              <div className="flex items-start gap-2"><MapPin className="h-4 w-4 shrink-0 mt-0.5 text-blue-400" /><span>Kuniamuthur, Coimbatore – 641 008, Tamil Nadu</span></div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-blue-400" /><span>0422 – 2666 666</span></div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-blue-400" /><span>principal@skcet.ac.in</span></div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (<li key={s.label}><Link to={s.to} className="text-white/40 hover:text-blue-400 text-sm transition-colors">{s.label}</Link></li>))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noreferrer" className="text-white/40 hover:text-blue-400 text-sm transition-colors flex items-center gap-1 group">
                    {l.label}<ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest">Campus</h4>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <img src="https://skcet.ac.in/wp-content/uploads/2023/12/Campus-tour-skcet.jpg" alt="SKCET Campus" className="w-full h-32 object-cover opacity-70 hover:opacity-100 transition-opacity" />
            </div>
            <a href="https://skcet.ac.in" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors">
              Visit skcet.ac.in <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="section-divider mt-12 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/25 text-xs">
          <p>© {new Date().getFullYear()} SKCET Navigator. Built for Sri Krishna College of Engineering and Technology.</p>
          <p>Coimbatore, Tamil Nadu, India</p>
        </div>
      </div>
    </footer>
  )
}
