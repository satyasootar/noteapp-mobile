import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { Pressable,StyleSheet,Text,View } from "react-native"
import { useTheme } from "../hooks/useTheme"
import { BorderRadius,Spacing,Typography } from "../themes"
import { Note } from "../types"

interface Props {
  note: Note
  onPress: () => void
  onLongPress: () => void
  isSelected?: boolean
  selectionMode?: boolean
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function truncate(text: string, maxLength = 100): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + "..."
}

export function NoteCard({
  note,
  onPress,
  onLongPress,
  isSelected,
  selectionMode,
}: Props) {
  const { colors, isDark } = useTheme()
  const styles = createStyles(colors)

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        isSelected && styles.cardSelected,
        { opacity: pressed ? 0.8 : 1 },
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={styles.cardHeader}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {note.title}
        </Text>
        {selectionMode && (
          <View
            style={[styles.checkbox, isSelected && styles.checkboxSelected]}
          >
            {isSelected && (
              <Ionicons
                name="checkmark"
                size={14}
                color={isDark ? "#000" : "#FFF"}
              />
            )}
          </View>
        )}
      </View>
      {note.content ? (
        <Text
          style={styles.preview}
          numberOfLines={4}
        >
          {truncate(note.content)}
        </Text>
      ) : null}
      <Text style={styles.date}>{formatDate(note.updatedAt)}</Text>
    </Pressable>
  )
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.card,
      padding: Spacing.md,
      flex: 1,
      margin: Spacing.xs,
      minHeight: 130,
      justifyContent: "space-between",
      borderWidth: 2,
      borderColor: "transparent",
    },
    cardSelected: {
      borderColor: colors.primary,
      backgroundColor: colors.surface, // Or a slightly different shade
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.textSecondary,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxSelected: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    title: {
      ...Typography.cardTitle,
      color: colors.text,
      marginBottom: Spacing.xs,
    },
    preview: {
      ...Typography.cardBody,
      color: colors.textSecondary,
      flex: 1,
      marginBottom: Spacing.sm,
    },
    date: {
      ...Typography.caption,
      color: colors.textTertiary,
      marginTop: Spacing.xs,
    },
  })
