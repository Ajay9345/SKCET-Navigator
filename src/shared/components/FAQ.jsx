import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

const faqs = [
  { q: "How do I find a faculty member's cabin?", a: "Use the Faculty Finder feature from the home screen. Search by name, department, or subject — you'll instantly see the cabin number, block, floor, and contact details.", value: "faq-1" },
  { q: "Does outdoor navigation work in real time?", a: "Yes. The outdoor map uses Google Maps with your live GPS location to provide accurate walking directions between any two points on campus.", value: "faq-2" },
  { q: "Can I see if a building is currently open?", a: "Yes. The Building Details page shows real-time open/closed status for every building based on working hours (Mon–Sat, 8am–5pm).", value: "faq-3" },
  { q: "Is indoor navigation available for all buildings?", a: "Indoor navigation is available for major academic blocks. We are continuously adding more buildings to the system.", value: "faq-4" },
  { q: "Is SKCET Navigator free to use?", a: "Yes, SKCET Navigator is completely free for all students, faculty, and visitors of Sri Krishna College of Engineering and Technology.", value: "faq-5" },
]

export const FAQ = () => {
  return (
    <section id="faq" className="bg-[#060d1f] py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">FAQ</span>
          <h2 className="text-4xl font-bold text-white mt-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map(({ q, a, value }, i) => (
            <motion.div key={value} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
              <AccordionItem value={value} className="glass rounded-xl border-0 px-5 overflow-hidden">
                <AccordionTrigger className="text-white/90 hover:text-white text-left py-4 text-sm font-medium hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="text-white/50 text-sm pb-4 leading-relaxed">{a}</AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
