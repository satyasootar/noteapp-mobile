import { getTask,saveTask } from "@/storage/storage"
import { Task } from "@/types"
import { useCallback,useState } from "react"
import uuid from "react-native-uuid"

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  const loadTask = async () => {
    try {
      const tasks = await getTask()
      setTasks(tasks)
      setLoading(false)
    } catch (error) {
      console.log("error: ", error)
    }
  }

  const addTask = useCallback(
    async (text: string): Promise<void> => {
      const newTask: Task = {
        id: uuid.v4().toString(),
        text: text.trim(),
        completed: false,
        createdAt: Date.now(),
      }

      const update: Task[] = [newTask, ...tasks]
      setTasks(update)
      await saveTask(update)
    },
    [tasks],
  )

  const toggleTask = useCallback(
    async (id: string) => {
      const update = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      )
      setTasks(update)
      await saveTask(update)
    },
    [tasks],
  )

  const deleteTask = useCallback(
    async (id: string) => {
      const updatedTasks = tasks.filter((task) => task.id !== id)
      setTasks(updatedTasks)
      await saveTask(updatedTasks)
    },
    [tasks],
  )

  return {
    tasks,
    loading,
    addTask,
    toggleTask,
    deleteTask,
    loadTask,
  }
}
