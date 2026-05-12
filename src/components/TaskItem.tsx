import React from "react"
import { Pressable,StyleSheet,Text,View } from "react-native"
import { useTheme } from "../hooks/useTheme"
import { Spacing,Typography } from "../themes"
import { Task } from "../types"

interface Props {
  task: Task
  onToggle: () => void
  onDelete: () => void
}

export function TaskItem({ task, onToggle, onDelete }: Props) {
  const { colors, isDark } = useTheme()
  const styles = createStyles(colors)

  return (
    <View style={styles.container}>
      {/* Checkbox */}
      <Pressable
        style={({ pressed }) => [
          styles.checkbox,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={onToggle}
      >
        <View
          style={[
            styles.checkboxInner,
            task.completed && styles.checkboxChecked,
          ]}
        >
          {task.completed && (
            <Text
              style={[styles.checkmark, { color: isDark ? "#000" : "#FFF" }]}
            >
              ✓
            </Text>
          )}
        </View>
      </Pressable>

      {/* Task text */}
      <Text
        style={[styles.text, task.completed && styles.textCompleted]}
        onPress={onToggle}
      >
        {task.text}
      </Text>

      {/* Delete button */}
      <Pressable
        onPress={onDelete}
        style={({ pressed }) => [
          styles.deleteBtn,
          { opacity: pressed ? 0.6 : 1 },
        ]}
      >
        <Text style={styles.deleteText}>✕</Text>
      </Pressable>
    </View>
  )
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row", // Children side by side (horizontal)
      alignItems: "center",
      paddingVertical: Spacing.sm + 4,
      paddingHorizontal: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    checkbox: {
      marginRight: Spacing.md,
    },
    checkboxInner: {
      width: 22,
      height: 22,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: colors.textSecondary,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxChecked: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    checkmark: {
      fontSize: 13,
      fontWeight: "700",
    },
    text: {
      ...Typography.cardTitle,
      color: colors.text,
      flex: 1,
    },
    textCompleted: {
      textDecorationLine: "line-through",
      color: colors.textSecondary,
    },
    deleteBtn: {
      padding: Spacing.sm,
    },
    deleteText: {
      color: colors.textSecondary,
      fontSize: 16,
    },
  })
