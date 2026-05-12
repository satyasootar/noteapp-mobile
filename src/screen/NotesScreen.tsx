import { Ionicons } from "@expo/vector-icons"
import { useFocusEffect,useRouter } from "expo-router"
import React,{ useCallback,useState } from "react"
import {
    Alert,
    FlatList,
    Platform,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native"
import { EmptyState } from "../components/EmptyState"
import { NoteCard } from "../components/NoteCard"
import { ThemeToggle } from "../components/ThemeToggle"
import { useNotes } from "../hooks/useNotes"
import { useTheme } from "../hooks/useTheme"
import { BorderRadius,Spacing,Typography } from "../themes"

export function NotesScreen() {
  const router = useRouter()
  const { width, height } = useWindowDimensions()
  const { colors, isDark } = useTheme()
  const { notes, loading, deleteNote, loadNotes } = useNotes()
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  useFocusEffect(
    useCallback(() => {
      loadNotes()
    }, [loadNotes]),
  )

  const isSelectionMode = selectedIds.length > 0
  const isTablet = width > 768
  const numColumns = isTablet ? 3 : 2
  const styles = createStyles(colors, width, height)

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
        <View style={styles.header}>
          <Text style={styles.title}>Notes</Text>
          <ThemeToggle />
        </View>
      )}

      {notes.length === 0 && !loading ? (
        <EmptyState
          icon="📝"
          message="No notes here yet"
        />
      ) : (
        <FlatList
          key={numColumns}
          data={notes}
          renderItem={renderNote}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
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

const createStyles = (colors: any, width: number, height: number) => {
  const isTablet = width > 768
  const headerPaddingTop = Platform.OS === "ios" ? (height > 800 ? 60 : 40) : 20

  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: headerPaddingTop,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: isTablet ? Spacing.xl : Spacing.md,
      marginBottom: Spacing.md,
    },
    title: {
      ...Typography.screenTitle,
      color: colors.text,
      fontSize: isTablet ? 42 : 32,
    },
    selectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: Spacing.md,
      height: 56,
      marginBottom: Spacing.md,
      backgroundColor: colors.surface,
      borderRadius: 12,
      marginHorizontal: isTablet ? Spacing.xl : Spacing.md,
    },
    selectionCount: {
      flex: 1,
      fontSize: isTablet ? 22 : 18,
      fontWeight: "700",
      color: colors.text,
      marginLeft: Spacing.md,
    },
    headerIcon: {
      padding: 8,
    },
    list: {
      paddingHorizontal: isTablet ? Spacing.lg : Spacing.sm,
      paddingBottom: 100,
    },
    row: {
      justifyContent: "flex-start",
      gap: isTablet ? Spacing.lg : Spacing.sm,
      marginBottom: isTablet ? Spacing.lg : Spacing.sm, // Added consistency for vertical spacing
    },
    fab: {
      position: "absolute",
      bottom: isTablet ? 48 : 32,
      right: isTablet ? 48 : 24,
      width: isTablet ? 72 : 56,
      height: isTablet ? 72 : 56,
      borderRadius: isTablet ? 36 : BorderRadius.button,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      elevation: 8,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
    },
    fabText: {
      fontSize: isTablet ? 40 : 32,
      color: "#000",
      fontWeight: "300",
      marginTop: -2,
    },
  })
}
