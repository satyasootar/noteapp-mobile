import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { Pressable,StyleSheet,View } from "react-native"
import { useTheme } from "../hooks/useTheme"

export function ThemeToggle() {
  const { colors, isDark, toggleTheme } = useTheme()

  return (
    <Pressable onPress={toggleTheme}>
      <View
        style={[
          styles.track,
          { backgroundColor: isDark ? colors.primary + "40" : colors.border },
        ]}
      >
        <View
          style={[
            styles.thumb,
            {
              backgroundColor: isDark ? colors.primary : colors.surface,
              transform: [{ translateX: isDark ? 24 : 0 }],
            },
          ]}
        >
          <Ionicons
            name={isDark ? "moon" : "sunny"}
            size={14}
            color={isDark ? "#000" : "#FDB813"}
          />
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  track: {
    width: 48,
    height: 24,
    borderRadius: 12,
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
})
