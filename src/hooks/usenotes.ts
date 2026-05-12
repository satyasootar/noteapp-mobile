import { getNotes,saveNote } from "@/storage/storage"
import { Note } from "@/types"
import { useCallback,useEffect,useState } from "react"
import uuid from "react-native-uuid"

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadNotes()
  }, [])

  const loadNotes = async () => {
    const notes = await getNotes()
    notes.sort((a, b) => b.updatedAt - a.updatedAt)
    setNotes(notes)
    setLoading(false)
  }

  const addNotes = useCallback(async (title: string, content: string) => {
    const newNote: Note = {
      id: uuid.v4() as string,
      title: title.trim() || "Untitled",
      content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    setNotes((prevNotes) => {
      const updatedNotes = [newNote, ...prevNotes]
      saveNote(updatedNotes)
      return updatedNotes
    })
    return newNote
  }, [])

  const updateNote = useCallback(
    async (id: string, title: string, content: string) => {
      setNotes((prevNotes) => {
        const updated = prevNotes.map((note) =>
          note.id === id
            ? {
                ...note,
                title: title.trim() || "Untitled",
                content,
                updatedAt: Date.now(),
              }
            : note,
        )
        updated.sort((a, b) => b.updatedAt - a.updatedAt)
        saveNote(updated)
        return updated
      })
    },
    [],
  )

  const deleteNote = useCallback(async (id: string) => {
    setNotes((prevNotes) => {
      const updated = prevNotes.filter((note) => note.id !== id)
      saveNote(updated)
      return updated
    })
  }, [])

  return {
    notes,
    loading,
    addNote: addNotes,
    updateNote,
    deleteNote,
    loadNotes,
  }
}
