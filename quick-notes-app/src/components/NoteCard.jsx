import { formatDate } from '../utils/dateUtils'
import './NoteCard.css'

const NoteCard = ({ note, onNoteClick, onNoteDelete }) => {
  const handleDelete = (e) => {
    e.stopPropagation()
    const isConfirmed = window.confirm("Are you sure you want to delete your note?")
    if (isConfirmed) {
      onNoteDelete(note.id)
    }
  }

  return (
    <div className="note-card" onClick={() => onNoteClick(note)}>
      <div className="note-header">
        <div className="note-dates">
          <div className="note-date">Created: {formatDate(note.createdAt)}</div>
          {note.updatedAt && (
            <div className="note-date">Updated: {formatDate(note.updatedAt)}</div>
          )}
        </div>
        <button 
          className="delete-button" 
          onClick={handleDelete}
          title="Delete note"
        >
          ×
        </button>
      </div>
      {note.title && <div className="note-title">{note.title}</div>}
      <div className="note-text">{note.text}</div>
    </div>
  )
}

export default NoteCard
