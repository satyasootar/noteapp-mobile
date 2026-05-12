import { Ionicons } from "@expo/vector-icons"
import { useFocusEffect,useRouter } from "expo-router"
import React,{ useCallback,useState } from "react"
import {
    Alert,
    FlatList,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native"
import { EmptyState } from "../components/EmptyState"
import { NoteCard } from "../components/NoteCard"
import { useNotes } from "../hooks/useNotes"
import { useTheme } from "../hooks/useTheme"
import { BorderRadius,Spacing,Typography } from "../themes"

export function NotesScreen() {
  const router = useRouter()
  const { colors, isDark } = useTheme()
  const { notes, loading, deleteNote, loadNotes } = useNotes()
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  useFocusEffect(
    useCallback(() => {
      loadNotes()
    }, [loadNotes]),
  )

  const isSelectionMode = selectedIds.length > 0

  const styles = createStyles(colors)

  const handleLongPress = (id: string) => {
    if (!isSelectionMode) {
      setSelectedIds([id])
    }
  }

  const handlePress = (id: string) => {
    if (isSelectionMode) {
      toggleSelection(id)
    } else {
      router.push(`/editor?noteId=${id}`)
    }
  }

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )
  }

  const clearSelection = () => setSelectedIds([])

  const handleDeleteSelected = () => {
    Alert.alert(
      "Delete Notes",
      `Are you sure you want to delete ${selectedIds.length} notes?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            for (const id of selectedIds) {
              await deleteNote(id)
            }
            clearSelection()
          },
        },
      ],
    )
  }

  const renderNote = ({ item }: any) => (
    <NoteCard
      note={item}
      onPress={() => handlePress(item.id)}
      onLongPress={() => handleLongPress(item.id)}
      isSelected={selectedIds.includes(item.id)}
      selectionMode={isSelectionMode}
    />
  )

  return (
    <View style={styles.screen}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {isSelectionMode ? (
        <View style={styles.selectionHeader}>
          <Pressable
            onPress={clearSelection}
            style={({ pressed }) => [
              styles.headerIcon,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <Ionicons
              name="close"
              size={28}
              color={colors.text}
            />
          </Pressable>
          <Text style={styles.selectionCount}>
            {selectedIds.length} selected
          </Text>
          <Pressable
            onPress={handleDeleteSelected}
            style={({ pressed }) => [
              styles.headerIcon,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <Ionicons
              name="trash-outline"
              size={26}
              color={colors.textSecondary}
            />
          </Pressable>
        </View>
      ) : (
        <Text style={styles.title}>Notes</Text>
      )}

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
      <Pressable
        style={({ pressed }) => [
          styles.fab,
          {
            backgroundColor: colors.primary,
            opacity: pressed ? 0.8 : 1,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          },
        ]}
        onPress={() => router.push("/editor")}
      >
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  )
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: 60, // Space for status bar
    },
    title: {
      ...Typography.screenTitle,
      color: colors.text,
      paddingHorizontal: Spacing.md,
      marginBottom: Spacing.md,
    },
    selectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: Spacing.md,
      height: 50,
      marginBottom: Spacing.md,
      backgroundColor: colors.surface, // Selection bar background
      borderRadius: 12,
      marginHorizontal: Spacing.md,
    },
    selectionCount: {
      flex: 1,
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
      marginLeft: Spacing.md,
    },
    headerIcon: {
      padding: 8,
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
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      // Shadow for Android
      elevation: 8,
      // Shadow for iOS
      shadowColor: colors.primary,
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
