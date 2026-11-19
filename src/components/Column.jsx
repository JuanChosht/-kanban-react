import { useState } from 'react'
import TaskCard from './TaskCard'

export default function Column({ status, tasks, onUpdate, onDelete, onMove }) {
  const [isOver, setIsOver] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setIsOver(false)
    const id = e.dataTransfer.getData('text/plain')
    if (id) onMove(id, status.id)
  }

  return (
    <section
      className={`column column-${status.id}${isOver ? ' is-over' : ''}`}
      aria-label={status.label}
      onDragOver={(e) => {
        e.preventDefault()
        setIsOver(true)
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
    >
      <h2 className="column-title">
        {status.label} <span className="count">{tasks.length}</span>
      </h2>
      <div className="column-body">
        {tasks.length === 0 && <p className="empty">Sin tareas</p>}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onMove={onMove}
          />
        ))}
      </div>
    </section>
  )
}
