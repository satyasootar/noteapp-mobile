import { getNotes, saveNote } from "@/storage/storage"
import { Note } from "@/types"
import { useCallback,useEffect,useState } from "react"
import uuid from "react-native-uuid"

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

    useEffect(()=>{
        loadNotes()
    },[])

  const loadNotes = async () => {
    const notes = await getNotes()
    notes.sort((a, b) => b.updatedAt - a.updatedAt)
    setNotes(notes)
    setLoading(false)
  }

  const addNotes = useCallback(
    async (title: string, content: string) => {
      const newNote = {
        id: uuid.v4() as String,
        title: title.trim() || ("Untitled" as String),
        content,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      const updateNote = [newNote, ...notes]
      setNotes(updateNote)
      await saveNote(updateNote)
      return newNote
    },
    [notes],
  )

  const updateNote = useCallback(async(id:string, title:string, content:string)=>{
     const updated = notes.map(note =>
      note.id === id
        ? { ...note, title: title.trim() || 'Untitled', content, updatedAt: Date.now() }
        : note
    );
    updated.sort((a, b)=> a.updatedAt - b.updatedAt)
    setNotes(updated)
    await saveNote(updated)
  }, [notes])

  const deleteNote = useCallback(async(id:string)=>{
    const updated = notes.filter((note)=> note.id !== id)
    setNotes(updated)
    await saveNote(updated)
  },[notes])


  return [
    notes,
    loading, 
    addNotes,
    updateNote,
    deleteNote,
    loadNotes
]

}
