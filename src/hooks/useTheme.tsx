import React,{ createContext,useContext,useState } from "react"
import { useColorScheme } from "react-native"
import { Palette } from "../themes"

type ThemeContextType = {
  colors: typeof Palette.light
  isDark: boolean
  toggleTheme: () => void
  themeMode: "light" | "dark" | "system"
  setThemeMode: (mode: "light" | "dark" | "system") => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme()
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">(
    "system",
  )

  const isDark =
    themeMode === "system" ? systemColorScheme === "dark" : themeMode === "dark"

  const colors = isDark ? Palette.dark : Palette.light

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"))
  }

  return (
    <ThemeContext.Provider
      value={{ colors, isDark, toggleTheme, themeMode, setThemeMode }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
