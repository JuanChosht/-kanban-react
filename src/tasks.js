export const STATUSES = [
  { id: 'todo', label: 'Pendiente' },
  { id: 'in-progress', label: 'En progreso' },
  { id: 'done', label: 'Completado' },
]

const STATUS_IDS = STATUSES.map((s) => s.id)

export function isValidStatus(status) {
  return STATUS_IDS.includes(status)
}

let counter = 0
function generateId() {
  counter += 1
  return `${Date.now().toString(36)}-${counter}`
}

export function createTask(tasks, { title, description = '', status = 'todo' }) {
  const cleanTitle = (title ?? '').trim()
  if (!cleanTitle) throw new Error('El título es obligatorio')
  if (!isValidStatus(status)) throw new Error(`Estado inválido: ${status}`)
  const task = {
    id: generateId(),
    title: cleanTitle,
    description: description.trim(),
    status,
    createdAt: new Date().toISOString(),
  }
  return [...tasks, task]
}

export function updateTask(tasks, id, changes) {
  if (changes.title !== undefined && !changes.title.trim()) {
    throw new Error('El título es obligatorio')
  }
  if (changes.status !== undefined && !isValidStatus(changes.status)) {
    throw new Error(`Estado inválido: ${changes.status}`)
  }
  return tasks.map((t) =>
    t.id === id
      ? {
          ...t,
          ...changes,
          title: changes.title !== undefined ? changes.title.trim() : t.title,
          description:
            changes.description !== undefined ? changes.description.trim() : t.description,
        }
      : t,
  )
}

export function deleteTask(tasks, id) {
  return tasks.filter((t) => t.id !== id)
}

export function moveTask(tasks, id, status) {
  return updateTask(tasks, id, { status })
}

export function tasksByStatus(tasks, status) {
  return tasks.filter((t) => t.status === status)
}
