import NoteCard from './NoteCard'
import './NotesGrid.css'

const NotesGrid = ({ notes, onNoteClick, onNoteDelete }) => {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <p>No notes yet. Add your first note above!</p>
      </div>
    )
  }

  return (
    <div className="notes-grid">
      {notes.map(note => (
        <NoteCard
          key={note.id}
          note={note}
          onNoteClick={onNoteClick}
          onNoteDelete={onNoteDelete}
        />
      ))}
    </div>
  )
}

export default NotesGrid
