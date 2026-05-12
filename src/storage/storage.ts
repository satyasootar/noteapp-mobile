import { Note,Task } from "@/types"
import AsyncStorage from "@react-native-async-storage/async-storage"

const NOTE_KEY = "notekey"
const TASK_KEY = "taskkey"

export const getNotes = async (): Promise<Note[]> => {
  try {
    const data = await AsyncStorage.getItem(NOTE_KEY)
    if (data) {
      return JSON.parse(data)
    } else {
      return []
    }
  } catch (error) {
    console.log("Failed to get Notes: ", error)
    return []
  }
}

export const saveNote = async (notes: Note[]) => {
  try {
    await AsyncStorage.setItem(NOTE_KEY, JSON.stringify(notes))
  } catch (error) {
    console.log("Failed to save notes: ", error)
  }
}

export const getTask = async (): Promise<Task[]> => {
  try {
    const data = await AsyncStorage.getItem(TASK_KEY)

    if (data) {
      return JSON.parse(data)
    } else {
      return []
    }
  } catch (error) {
    console.log("Failed to get task: ", error)
    return []
  }
}

export const saveTask = async (task: Task[]) => {
  try {
    await AsyncStorage.setItem(TASK_KEY, JSON.stringify(task))
  } catch (error) {
    console.log("Failed to save task: ", error)
  }
}
