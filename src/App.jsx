import { useEffect, useState } from 'react'
import {
  STATUSES,
  createTask,
  deleteTask,
  filterTasks,
  moveTask,
  tasksByStatus,
  updateTask,
} from './tasks'
import TaskForm from './components/TaskForm'
import Column from './components/Column'

const STORAGE_KEY = 'kanban-tasks'

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [query, setQuery] = useState('')
  const visibleTasks = filterTasks(tasks, query)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      /* almacenamiento no disponible */
    }
  }, [tasks])

  const handleCreate = (data) => setTasks((prev) => createTask(prev, data))
  const handleUpdate = (id, changes) => setTasks((prev) => updateTask(prev, id, changes))
  const handleDelete = (id) => setTasks((prev) => deleteTask(prev, id))
  const handleMove = (id, status) => setTasks((prev) => moveTask(prev, id, status))

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tablero Kanban</h1>
        <p className="subtitle">{tasks.length} tareas en total</p>
      </header>

      <TaskForm onCreate={handleCreate} />

      <input
        type="search"
        className="search"
        aria-label="Buscar tareas"
        placeholder="Buscar tareas por título o descripción…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <main className="board">
        {STATUSES.map((status) => (
          <Column
            key={status.id}
            status={status}
            tasks={tasksByStatus(visibleTasks, status.id)}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onMove={handleMove}
          />
        ))}
      </main>
    </div>
  )
}
