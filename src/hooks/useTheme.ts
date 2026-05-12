import { useColorScheme } from "react-native"
import { Palette } from "../themes"

export function useTheme() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"
  const colors = isDark ? Palette.dark : Palette.light

  return {
    colors,
    isDark,
    colorScheme,
  }
}
