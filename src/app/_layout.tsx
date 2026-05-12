import { Stack } from "expo-router"
import { useTheme } from "../hooks/useTheme"

export default function RootLayout() {
  const { colors } = useTheme()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="editor" />
    </Stack>
  )
}
