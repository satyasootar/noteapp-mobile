export const Colors = {
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
}

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
    color: Colors.text,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  cardBody: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  caption: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
}

export const BorderRadius = {
  card: 12,
  button: 50,
}
