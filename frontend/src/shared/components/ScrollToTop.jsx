import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { ArrowUpToLine } from "lucide-react"

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <Button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-4 right-4 opacity-90 shadow-md z-50"
      size="icon"
      aria-label="Scroll to top"
    >
      <ArrowUpToLine className="h-4 w-4" />
    </Button>
  )
}
