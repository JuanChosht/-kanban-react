import { useState } from 'react'
import { STATUSES } from '../tasks'

export default function TaskCard({ task, onUpdate, onDelete, onMove }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)

  const startEdit = () => {
    setTitle(task.title)
    setDescription(task.description)
    setIsEditing(true)
  }

  const save = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onUpdate(task.id, { title, description })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <form className="card editing" onSubmit={save}>
        <input
          aria-label="Editar título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <textarea
          aria-label="Editar descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="card-actions">
          <button type="submit">Guardar</button>
          <button type="button" className="secondary" onClick={() => setIsEditing(false)}>
            Cancelar
          </button>
        </div>
      </form>
    )
  }

  return (
    <article
      className="card"
      draggable
      onDragStart={(e) => e.dataTransfer.setData('text/plain', task.id)}
    >
      <h3 className="card-title">{task.title}</h3>
      {task.description && <p className="card-desc">{task.description}</p>}
      <div className="card-actions">
        <select
          aria-label={`Estado de ${task.title}`}
          value={task.status}
          onChange={(e) => onMove(task.id, e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
        <button type="button" className="secondary" onClick={startEdit}>
          Editar
        </button>
        <button type="button" className="danger" onClick={() => onDelete(task.id)}>
          Eliminar
        </button>
      </div>
    </article>
  )
}
