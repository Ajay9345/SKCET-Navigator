import { createContext, useState, useContext } from "react"

const StateContext = createContext(undefined)

export const StateProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <StateContext.Provider value={{ isLogin, setIsLogin, loading, setLoading }}>
      {children}
    </StateContext.Provider>
  )
}

export const useAppState = () => {
  const ctx = useContext(StateContext)
  if (!ctx) throw new Error("useAppState must be used inside StateProvider")
  return ctx
}
