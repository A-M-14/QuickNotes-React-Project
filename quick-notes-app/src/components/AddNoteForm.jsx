import { useState } from 'react'
import './AddNoteForm.css'

const AddNoteForm = ({ onAddNote }) => {
  const [noteText, setNoteText] = useState('')
  const [noteTitle, setNoteTitle] = useState('')

  const handleSubmit = () => {
    if (noteText.trim() !== '') {
      const newNote = {
        id: Date.now(),
        title: noteTitle.trim(),
        text: noteText,
        createdAt: new Date()
      }
      onAddNote(newNote)
      setNoteText('')
      setNoteTitle('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit()
    }
  }

  return (
    <div className="add-note-form">
      <input
        type="text"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        placeholder="Title"
        className="title-input"
      />
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Your note..."
        rows={6}
        className="note-input"
      />
      <button onClick={handleSubmit} className="add-button">
        Add
      </button>
    </div>
  )
}

export default AddNoteForm
