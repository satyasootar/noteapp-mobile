import React from "react"
import { StyleSheet,Text,TouchableOpacity } from "react-native"
import { BorderRadius,Colors,Spacing,Typography } from "../themes"
import { Note } from "../types"

interface Props {
  note: Note
  onPress: () => void
  onLongPress: () => void
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

export function NoteCard({ note, onPress, onLongPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
    >
      <Text
        style={styles.title}
        numberOfLines={2}
      >
        {note.title}
      </Text>
      {note.content ? (
        <Text
          style={styles.preview}
          numberOfLines={4}
        >
          {truncate(note.content)}
        </Text>
      ) : null}
      <Text style={styles.date}>{formatDate(note.updatedAt)}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.card,
    padding: Spacing.md,
    flex: 1,
    margin: Spacing.xs,
    minHeight: 130,
    justifyContent: "space-between",
  },
  title: {
    ...Typography.cardTitle,
    marginBottom: Spacing.xs,
  },
  preview: {
    ...Typography.cardBody,
    flex: 1,
    marginBottom: Spacing.sm,
  },
  date: {
    ...Typography.caption,
    marginTop: Spacing.xs,
  },
})
