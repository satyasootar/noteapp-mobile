import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams,useRouter } from "expo-router"
import React,{ useEffect,useRef,useState } from "react"
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"
import { useNotes } from "../hooks/useNotes"
import { Colors,Spacing } from "../themes"

export function NoteEditorScreen() {
  const router = useRouter()
  const { noteId } = useLocalSearchParams<{ noteId?: string }>() // Did we come here with an existing note?

  const { notes, addNote, updateNote, deleteNote } = useNotes()

  // Find the note if editing an existing one
  const existingNote = notes.find((n) => n.id === noteId)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    if (existingNote) {
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
    // KeyboardAvoidingView pushes content up when keyboard appears
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            handleSave()
            router.back()
          }}
          style={styles.backBtn}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color={Colors.primary}
          />
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => {
              handleSave()
              router.back()
            }}
            style={styles.actionBtn}
          >
            <Ionicons
              name="checkmark"
              size={28}
              color={Colors.success || "#4CAF50"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            style={styles.actionBtn}
          >
            <Ionicons
              name="trash-outline"
              size={26}
              color={Colors.danger}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title input */}
      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        placeholderTextColor={Colors.textTertiary}
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
        placeholderTextColor={Colors.textTertiary}
        value={content}
        onChangeText={setContent}
        multiline // Allow multiple lines
        textAlignVertical="top" // Start text from top (Android)
        scrollEnabled
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
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
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    paddingHorizontal: Spacing.md,
    lineHeight: 24,
  },
})
