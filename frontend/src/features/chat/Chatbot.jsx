// import { useState, useRef, useEffect } from "react"
// import Groq from "groq-sdk"
// import { motion, AnimatePresence } from "framer-motion"
// import { Send, X, MessageCircle } from "lucide-react"
// // import { CHATBOT_CONTEXT } from "../../data/chatbotContext"

// const groq = new Groq({
//   apiKey: import.meta.env.VITE_GROQ_API_KEY,
//   dangerouslyAllowBrowser: true,
// })

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [messages, setMessages] = useState([
//     { text: "Hi! Ask me anything about SKCET campus.", sender: "bot" },
//   ])
//   const [input, setInput] = useState("")
//   const [loading, setLoading] = useState(false)

//   const cleanText = (text) =>
//     text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/^[*•-]\s+/gm, "→ ").replace(/\*/g, "").trim()
//   const bottomRef = useRef(null)

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   const sendMessage = async () => {
//     const text = input.trim()
//     if (!text || loading) return

//     setMessages((prev) => [...prev, { text, sender: "user" }])
//     setInput("")
//     setLoading(true)

//     try {
//       const history = messages.map((m) => ({
//         role: m.sender === "user" ? "user" : "assistant",
//         content: m.text,
//       }))

//       const response = await groq.chat.completions.create({
//         model: "llama-3.3-70b-versatile",
//         messages: [
//           { role: "system", content: CHATBOT_CONTEXT },
//           ...history,
//           { role: "user", content: text },
//         ],
//       })
//       const raw = response.choices[0]?.message?.content ?? "No response received."
//       setMessages((prev) => [...prev, { text: cleanText(raw), sender: "bot" }])
//     } catch (err) {
//       console.error("Groq error:", err)
//       setMessages((prev) => [...prev, { text: "Sorry, something went wrong. Please try again.", sender: "bot" }])
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.85, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.85, y: 20 }}
//             className="w-80 sm:w-96 h-[480px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
//           >
//             <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white">
//               <div className="flex items-center gap-2">
//                 <MessageCircle className="h-5 w-5" />
//                 <span className="font-semibold text-sm">SKCET Assistant</span>
//               </div>
//               <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">
//                 <X className="h-4 w-4" />
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
//               {messages.map((msg, i) => (
//                 <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
//                   <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${msg.sender === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm"}`}>
//                     {msg.text}
//                   </div>
//                 </div>
//               ))}
//               {loading && (
//                 <div className="flex justify-start">
//                   <div className="bg-white border border-gray-200 rounded-xl rounded-bl-none px-3 py-2 shadow-sm">
//                     <span className="flex gap-1">
//                       {[0, 1, 2].map((i) => (
//                         <span key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
//                       ))}
//                     </span>
//                   </div>
//                 </div>
//               )}
//               <div ref={bottomRef} />
//             </div>

//             <div className="p-3 border-t border-gray-200 bg-white flex gap-2">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                 placeholder="Ask about campus..."
//                 className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
//               />
//               <button onClick={sendMessage} disabled={!input.trim() || loading} className="p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-lg transition-colors">
//                 <Send className="h-4 w-4" />
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.button
//         onClick={() => setIsOpen(!isOpen)}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         className="w-14 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-xl shadow-blue-600/30 flex items-center justify-center transition-colors"
//         aria-label="Toggle chatbot"
//       >
//         {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
//       </motion.button>
//     </div>
//   )
// }

// export default Chatbot
