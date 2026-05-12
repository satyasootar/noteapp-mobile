export const Palette = {
  light: {
    background: "#F2F2F7",
    surface: "#FFFFFF",
    surfaceHover: "#E5E5EA",
    primary: "#007AFF",
    text: "#000000",
    textSecondary: "#3C3C43",
    textTertiary: "#8E8E93",
    border: "#C6C6C8",
    danger: "#FF3B30",
    success: "#34C759",
  },
  dark: {
    background: "#000000",
    surface: "#1C1C1E",
    surfaceHover: "#2C2C2E",
    primary: "#FF9F0A",
    text: "#FFFFFF",
    textSecondary: "#8E8E93",
    textTertiary: "#48484A",
    border: "#38383A",
    danger: "#FF453A",
    success: "#30D158",
  },
}

// Default export back to Colors but we'll use a dynamic approach in hooks or contexts
// DO NOT USE THESE DIRECTLY IN COMPONENTS - USE useTheme() HOOK INSTEAD
export const Colors = Palette.dark

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
}

export const Typography = {
  screenTitle: {
    fontSize: 34,
    fontWeight: "700" as const,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600" as const,
  },
  cardBody: {
    fontSize: 13,
    lineHeight: 18,
  },
  caption: {
    fontSize: 12,
  },
}

export const BorderRadius = {
  card: 12,
  button: 50,
}
