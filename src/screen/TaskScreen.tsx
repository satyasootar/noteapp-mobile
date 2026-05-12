import { Ionicons } from "@expo/vector-icons"
import React,{ useState } from "react"
import {
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"
import { EmptyState } from "../components/EmptyState"
import { TaskItem } from "../components/TaskItem"
import { useTasks } from "../hooks/useTasks"
import { BorderRadius,Colors,Spacing,Typography } from "../themes"

export function TasksScreen() {
  const { tasks, loading, addTask, toggleTask, deleteTask } = useTasks()
  const [inputText, setInputText] = useState("")
  const [modalVisible, setModalVisible] = useState(false)

  const handleAdd = async () => {
    if (!inputText.trim()) return
    await addTask(inputText)
    setInputText("")
    setModalVisible(false)
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

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
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons
                  name="close"
                  size={24}
                  color={Colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="What needs to be done?"
              placeholderTextColor={Colors.textTertiary}
              value={inputText}
              onChangeText={setInputText}
              autoFocus
              onSubmitEditing={handleAdd}
              returnKeyType="done"
            />

            <TouchableOpacity
              style={[
                styles.saveBtn,
                !inputText.trim() && styles.saveBtnDisabled,
              ]}
              onPress={handleAdd}
              disabled={!inputText.trim()}
            >
              <Text style={styles.saveBtnText}>Add Task</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
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
    paddingTop: 60,
  },
  title: {
    ...Typography.screenTitle,
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
    backgroundColor: Colors.surface,
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
    color: Colors.text,
  },
  input: {
    backgroundColor: Colors.background,
    color: Colors.text,
    fontSize: 16,
    padding: Spacing.md,
    borderRadius: 12,
    marginBottom: Spacing.lg,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
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
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
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
  fabTextX: {
    fontSize: 36,
    marginTop: -4,
  },
})
