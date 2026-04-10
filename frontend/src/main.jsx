import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { StateProvider } from "./context/StateContext"
import { ThemeProvider } from "./shared/components/theme-provider"
import "./App.css"

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <StateProvider>
      <App />
    </StateProvider>
  </ThemeProvider>
)
