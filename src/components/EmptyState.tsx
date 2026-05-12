import React from "react"
import { StyleSheet,Text,View } from "react-native"
import { useTheme } from "../hooks/useTheme"
import { Spacing } from "../themes"

interface Props {
  icon: string
  message: string
}

export function EmptyState({ icon, message }: Props) {
  const { colors } = useTheme()
  const styles = createStyles(colors)

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  )
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 80,
    },
    icon: {
      fontSize: 52,
      marginBottom: Spacing.md,
      opacity: 0.3,
    },
    message: {
      fontSize: 16,
      color: colors.textSecondary,
    },
  })
