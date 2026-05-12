import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams,useRouter } from "expo-router"
import React,{ useEffect,useRef,useState } from "react"
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    TextInput,
    useWindowDimensions,
    View,
} from "react-native"
import { useNotes } from "../hooks/useNotes"
import { useTheme } from "../hooks/useTheme"
import { Spacing } from "../themes"

export function NoteEditorScreen() {
  const router = useRouter()
  const { width, height } = useWindowDimensions()
  const { colors, isDark } = useTheme()
  const { noteId } = useLocalSearchParams<{ noteId?: string }>()

  const { notes, addNote, updateNote, deleteNote } = useNotes()

  // Find the note if editing an existing one
  const existingNote = notes.find((n) => n.id === noteId)

  const [title, setTitle] = useState(existingNote?.title || "")
  const [content, setContent] = useState(existingNote?.content || "")

  const styles = createStyles(colors, width, height)

  useEffect(() => {
    // Only update if current state is empty and existingNote is found (initial load)
    if (existingNote && !title && !content) {
      setTitle(existingNote.title)
      setContent(existingNote.content)
    }
  }, [existingNote])

  const contentRef = useRef<TextInput>(null)

  // Save when navigating away (auto-save behavior)
  // Note: Handling auto-save on back navigation usually requires a manual "Back" button
  // since expo-router doesn't have a direct 'beforeRemove' equivalent in all cases.
  // For now, we'll keep the logic but let's ensure we save on exit.

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) return // Don't save empty notes

    if (existingNote) {
      await updateNote(existingNote.id, title, content)
    } else {
      await addNote(title, content)
    }
  }

  const handleDelete = () => {
    if (!existingNote) {
      router.back()
      return
    }
    Alert.alert("Delete Note", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteNote(existingNote.id)
          router.back()
        },
      },
    ])
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            handleSave()
            router.back()
          }}
          style={({ pressed }) => [
            styles.backBtn,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color={colors.primary}
          />
        </Pressable>

        <View style={styles.headerActions}>
          <Pressable
            onPress={() => {
              handleSave()
              router.back()
            }}
            style={({ pressed }) => [
              styles.actionBtn,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <Ionicons
              name="checkmark"
              size={28}
              color={colors.textSecondary}
            />
          </Pressable>
          <Pressable
            onPress={handleDelete}
            style={({ pressed }) => [
              styles.actionBtn,
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
      </View>

      {/* Inputs */}
      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        placeholderTextColor={colors.textTertiary}
        value={title}
        onChangeText={setTitle}
        returnKeyType="next"
        onSubmitEditing={() => contentRef.current?.focus()}
        maxLength={100}
      />

      {/* Body input */}
      <TextInput
        ref={contentRef}
        style={styles.contentInput}
        placeholder="Start writing..."
        placeholderTextColor={colors.textTertiary}
        value={content}
        onChangeText={setContent}
        multiline // Allow multiple lines
        textAlignVertical="top" // Start text from top (Android)
        scrollEnabled
      />
    </KeyboardAvoidingView>
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
    backBtn: {
      padding: 4,
    },
    headerActions: {
      flexDirection: "row",
      alignItems: "center",
    },
    actionBtn: {
      padding: 8,
      marginLeft: Spacing.sm,
    },
    titleInput: {
      fontSize: isTablet ? 40 : 28,
      fontWeight: "700",
      color: colors.text,
      paddingHorizontal: isTablet ? Spacing.xl : Spacing.md,
      marginBottom: Spacing.sm,
    },
    contentInput: {
      flex: 1,
      fontSize: isTablet ? 20 : 16,
      color: colors.text,
      paddingHorizontal: isTablet ? Spacing.xl : Spacing.md,
      lineHeight: isTablet ? 30 : 24,
    },
  })
}
