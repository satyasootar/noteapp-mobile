import { useRouter } from "expo-router"
import React from "react"
import {
    Alert,
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native"
import { EmptyState } from "../components/EmptyState"
import { NoteCard } from "../components/NoteCard"
import { useNotes } from "../hooks/useNotes"
import { BorderRadius,Colors,Spacing,Typography } from "../themes"

export function NotesScreen() {
  const router = useRouter()
  const { notes, loading, deleteNote } = useNotes()

  const handleLongPress = (id: string, title: string) => {
    // Alert.alert is React Native's native dialog
    Alert.alert("Delete Note", `Delete "${title}"? This cannot be undone.`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteNote(id) },
    ])
  }

  const renderNote = ({ item, index }: any) => (
    <NoteCard
      note={item}
      onPress={() => router.push(`/editor?noteId=${item.id}`)}
      onLongPress={() => handleLongPress(item.id, item.title)}
    />
  )

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.title}>Notes</Text>

      {notes.length === 0 && !loading ? (
        <EmptyState
          icon="📝"
          message="No notes here yet"
        />
      ) : (
        <FlatList
          data={notes}
          renderItem={renderNote}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* FAB = Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/editor")}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 60, // Space for status bar
  },
  title: {
    ...Typography.screenTitle,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  list: {
    paddingHorizontal: Spacing.sm,
    paddingBottom: 100,
  },
  row: {
    justifyContent: "space-between",
  },
  fab: {
    position: "absolute", // Float on top of everything
    bottom: 32,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: BorderRadius.button,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    // Shadow for Android
    elevation: 8,
    // Shadow for iOS
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  fabText: {
    fontSize: 32,
    color: "#000",
    fontWeight: "300",
    marginTop: -2,
  },
})
