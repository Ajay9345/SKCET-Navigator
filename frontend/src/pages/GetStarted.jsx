import { Navbar } from "../shared/components/Navbar"
import { Hero } from "../shared/components/Hero"
import { About } from "../shared/components/About"
import { HowItWorks } from "../shared/components/HowItWorks"
import { FAQ } from "../shared/components/FAQ"
import { Footer } from "../shared/components/Footer"

const GetStarted = () => (
  <div className="w-full min-h-screen bg-[#060d1f]">
    <Navbar />
    <Hero />
    <About />
    <HowItWorks />
    <FAQ />
    <Footer />
  </div>
)

export default GetStarted
