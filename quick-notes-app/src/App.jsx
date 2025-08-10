import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import AddNoteForm from './components/AddNoteForm'
import NotesGrid from './components/NotesGrid'
import NoteModal from './components/NoteModal'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [opened, { open, close }] = useDisclosure(false)

  const handleAddNote = (newNote) => {
    setNotes([...notes, newNote])
  }

  const handleNoteClick = (note) => {
    setSelectedNote(note)
    open()
  }

  const handleNoteDelete = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId))
  }

  const handleNoteUpdate = (updatedNote) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    ))
    setSelectedNote(updatedNote)
  }

  const handleModalClose = () => {
    close()
    setSelectedNote(null)
  }

  return (
    <div className="app">
      <h1>Quick Notes App</h1>
      <AddNoteForm onAddNote={handleAddNote} />
      <NotesGrid 
        notes={notes}
        onNoteClick={handleNoteClick}
        onNoteDelete={handleNoteDelete}
      />
      <NoteModal
        note={selectedNote}
        isOpen={opened}
        onClose={handleModalClose}
        onNoteUpdate={handleNoteUpdate}
      />
    </div>
  )
}

export default App
