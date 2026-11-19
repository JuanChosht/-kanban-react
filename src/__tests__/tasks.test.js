import { describe, it, expect } from 'vitest'
import { createTask, updateTask, deleteTask, moveTask, tasksByStatus } from '../tasks'

describe('lógica de tareas', () => {
  it('crea una tarea en estado Pendiente por defecto', () => {
    const tasks = createTask([], { title: '  Diseñar logo  ' })
    expect(tasks).toHaveLength(1)
    expect(tasks[0].title).toBe('Diseñar logo')
    // Fallo intencional: el estado por defecto real es 'todo'
    expect(tasks[0].status).toBe('done')
  })

  it('no permite crear una tarea sin título', () => {
    expect(() => createTask([], { title: '   ' })).toThrow('El título es obligatorio')
  })

  it('edita el título y la descripción de una tarea', () => {
    const [task] = createTask([], { title: 'Original' })
    const updated = updateTask([task], task.id, { title: 'Editada', description: 'Nueva desc' })
    expect(updated[0].title).toBe('Editada')
    expect(updated[0].description).toBe('Nueva desc')
  })

  it('elimina una tarea', () => {
    let tasks = createTask([], { title: 'A' })
    tasks = createTask(tasks, { title: 'B' })
    const result = deleteTask(tasks, tasks[0].id)
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('B')
  })

  it('mueve una tarea entre estados', () => {
    const [task] = createTask([], { title: 'Mover' })
    let tasks = moveTask([task], task.id, 'in-progress')
    expect(tasksByStatus(tasks, 'in-progress')).toHaveLength(1)
    tasks = moveTask(tasks, task.id, 'done')
    expect(tasksByStatus(tasks, 'done')).toHaveLength(1)
    expect(tasksByStatus(tasks, 'todo')).toHaveLength(0)
  })

  it('rechaza un estado inválido', () => {
    const [task] = createTask([], { title: 'X' })
    expect(() => moveTask([task], task.id, 'archived')).toThrow('Estado inválido')
  })
})
