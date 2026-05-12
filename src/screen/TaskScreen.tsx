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
    useWindowDimensions,
    View,
} from "react-native"
import { EmptyState } from "../components/EmptyState"
import { TaskItem } from "../components/TaskItem"
import { ThemeToggle } from "../components/ThemeToggle"
import { useTasks } from "../hooks/useTasks"
import { useTheme } from "../hooks/useTheme"
import { BorderRadius,Spacing,Typography } from "../themes"

export function TasksScreen() {
  const { width, height } = useWindowDimensions()
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

  const styles = createStyles(colors, width, height)

  const handleAdd = async () => {
    if (!inputText.trim()) return
    await addTask(inputText)
    setInputText("")
    setModalVisible(false)
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
        <ThemeToggle />
      </View>

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
    list: {
      paddingBottom: 120,
      paddingHorizontal: isTablet ? Spacing.xl : 0,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end",
      alignItems: isTablet ? "center" : "stretch",
    },
    modalContent: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: isTablet ? 20 : 0,
      borderBottomRightRadius: isTablet ? 20 : 0,
      padding: Spacing.lg,
      paddingBottom: Platform.OS === "ios" ? 40 : Spacing.lg,
      width: isTablet ? 500 : "100%",
      marginBottom: isTablet ? height * 0.1 : 0,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: Spacing.md,
    },
    modalTitle: {
      fontSize: isTablet ? 22 : 18,
      fontWeight: "700",
      color: colors.text,
    },
    input: {
      backgroundColor: colors.background,
      color: colors.text,
      fontSize: isTablet ? 18 : 16,
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
      color: "#000",
      fontSize: isTablet ? 18 : 16,
      fontWeight: "700",
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
