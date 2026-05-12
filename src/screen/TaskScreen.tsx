import { Ionicons } from "@expo/vector-icons"
import { useFocusEffect } from "expo-router"
import React,{ useCallback,useState } from "react"
import {
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native"
import { EmptyState } from "../components/EmptyState"
import { TaskItem } from "../components/TaskItem"
import { useTasks } from "../hooks/useTasks"
import { useTheme } from "../hooks/useTheme"
import { BorderRadius,Spacing,Typography } from "../themes"

export function TasksScreen() {
  const { colors, isDark } = useTheme()
  const { tasks, loading, addTask, toggleTask, deleteTask, loadTask } =
    useTasks()
  const [inputText, setInputText] = useState("")
  const [modalVisible, setModalVisible] = useState(false)

  useFocusEffect(
    useCallback(() => {
      loadTask()
    }, [loadTask]),
  )

  const styles = createStyles(colors)

  const handleAdd = async () => {
    if (!inputText.trim()) return
    await addTask(inputText)
    setInputText("")
    setModalVisible(false)
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <Text style={styles.title}>Tasks</Text>

      {/* Active tasks at top, completed at bottom */}
      {tasks.length === 0 && !loading ? (
        <EmptyState
          icon="✅"
          message="No tasks here yet"
        />
      ) : (
        <FlatList
          data={[
            ...tasks.filter((t) => !t.completed),
            ...tasks.filter((t) => t.completed),
          ]}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={() => toggleTask(item.id)}
              onDelete={() => deleteTask(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Task Creation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Task</Text>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
              >
                <Ionicons
                  name="close"
                  size={24}
                  color={colors.textSecondary}
                />
              </Pressable>
            </View>

            <TextInput
              style={styles.input}
              placeholder="What needs to be done?"
              placeholderTextColor={colors.textTertiary}
              value={inputText}
              onChangeText={setInputText}
              autoFocus
              onSubmitEditing={handleAdd}
              returnKeyType="done"
            />

            <Pressable
              style={({ pressed }) => [
                styles.saveBtn,
                !inputText.trim() && styles.saveBtnDisabled,
                { opacity: pressed ? 0.8 : inputText.trim() ? 1 : 0.5 },
              ]}
              onPress={handleAdd}
              disabled={!inputText.trim()}
            >
              <Text style={styles.saveBtnText}>Add Task</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* FAB */}
      <Pressable
        style={({ pressed }) => [
          styles.fab,
          {
            backgroundColor: colors.primary,
            opacity: pressed ? 0.8 : 1,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          },
        ]}
        onPress={() => setModalVisible(true)}
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
      paddingTop: 60,
    },
    title: {
      ...Typography.screenTitle,
      color: colors.text,
      paddingHorizontal: Spacing.md,
      marginBottom: Spacing.md,
    },
    list: {
      paddingBottom: 120,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: Spacing.lg,
      paddingBottom: Platform.OS === "ios" ? 40 : Spacing.lg,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: Spacing.md,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
    },
    input: {
      backgroundColor: colors.background,
      color: colors.text,
      fontSize: 16,
      padding: Spacing.md,
      borderRadius: 12,
      marginBottom: Spacing.lg,
    },
    saveBtn: {
      backgroundColor: colors.primary,
      paddingVertical: Spacing.md,
      borderRadius: 12,
      alignItems: "center",
    },
    saveBtnDisabled: {
      opacity: 0.5,
    },
    saveBtnText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
    },
    fab: {
      position: "absolute",
      bottom: 32,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: BorderRadius.button,
      alignItems: "center",
      justifyContent: "center",
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    fabText: {
      color: "#FFFFFF",
      fontSize: 32,
      fontWeight: "300",
    },
  })
