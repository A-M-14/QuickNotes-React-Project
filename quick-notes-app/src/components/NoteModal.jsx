import { useState } from 'react'
import { Modal, TextInput, Textarea } from '@mantine/core'
import { formatDate } from '../utils/dateUtils'
import './NoteModal.css'

const NoteModal = ({ note, isOpen, onClose, onNoteUpdate }) => {
  const [editingField, setEditingField] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editText, setEditText] = useState('')

  const startEditingTitle = () => {
    setEditTitle(note.title || '')
    setEditingField('title')
  }

  const startEditingText = () => {
    setEditText(note.text)
    setEditingField('text')
  }

  const cancelEditing = () => {
    setEditingField(null)
    setEditTitle('')
    setEditText('')
  }

  const saveEdit = (field) => {
    if (field === 'title' || (field === 'text' && editText.trim() !== '')) {
      const updatedNote = {
        ...note,
        title: field === 'title' ? editTitle.trim() : note.title,
        text: field === 'text' ? editText : note.text,
        updatedAt: new Date()
      }
      
      onNoteUpdate(updatedNote)
      setEditingField(null)
      setEditTitle('')
      setEditText('')
    }
  }

  const handleKeyPress = (e, field) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      saveEdit(field)
    } else if (e.key === 'Escape') {
      cancelEditing()
    }
  }

  const handleClose = () => {
    setEditingField(null)
    setEditTitle('')
    setEditText('')
    onClose()
  }

  if (!note) return null

  return (
    <Modal 
      opened={isOpen} 
      onClose={handleClose}
      title={
        editingField === 'title' ? (
          <TextInput
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, 'title')}
            onBlur={() => saveEdit('title')}
            placeholder="Title"
            variant="unstyled"
            size="lg"
            style={{ fontWeight: 600 }}
            autoFocus
          />
        ) : (
          <span 
            onClick={startEditingTitle}
            className="modal-title-text"
            title="Click to edit title"
          >
            {note.title || "Note"}
          </span>
        )
      } 
      centered 
      size="md"
    >
      <div className="modal-content">
        <div className="modal-dates">
          <div className="modal-date">
            Created: {formatDate(note.createdAt)}
          </div>
          {note.updatedAt && (
            <div className="modal-date">
              Updated: {formatDate(note.updatedAt)}
            </div>
          )}
        </div>
        
        {editingField === 'text' ? (
          <Textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, 'text')}
            onBlur={() => saveEdit('text')}
            placeholder="Your note..."
            rows={6}
            variant="unstyled"
            size="md"
            autoFocus
            style={{ fontSize: '16px', lineHeight: '1.5' }}
          />
        ) : (
          <div 
            className="modal-text clickable-text"
            onClick={startEditingText}
            title="Click to edit content"
          >
            {note.text}
          </div>
        )}
      </div>
    </Modal>
  )
}

export default NoteModal
