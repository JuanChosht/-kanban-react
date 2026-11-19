import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

async function addTask(user, title) {
  await user.type(screen.getByLabelText('Título de la tarea'), title)
  await user.click(screen.getByRole('button', { name: 'Agregar tarea' }))
}

describe('App Kanban', () => {
  it('muestra las tres columnas', () => {
    render(<App />)
    expect(screen.getByRole('region', { name: 'Pendiente' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'En progreso' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Completado' })).toBeInTheDocument()
  })

  it('crea una tarea en la columna Pendiente', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addTask(user, 'Escribir informe')
    const pendiente = screen.getByRole('region', { name: 'Pendiente' })
    expect(within(pendiente).getByText('Escribir informe')).toBeInTheDocument()
  })

  it('muestra un error si el título está vacío', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Agregar tarea' }))
    expect(screen.getByRole('alert')).toHaveTextContent('El título es obligatorio')
  })

  it('cambia el estado de una tarea a En progreso', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addTask(user, 'Revisar PR')
    await user.selectOptions(screen.getByLabelText('Estado de Revisar PR'), 'in-progress')
    const enProgreso = screen.getByRole('region', { name: 'En progreso' })
    expect(within(enProgreso).getByText('Revisar PR')).toBeInTheDocument()
  })

  it('edita una tarea existente', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addTask(user, 'Tarea vieja')
    await user.click(screen.getByRole('button', { name: 'Editar' }))
    const input = screen.getByLabelText('Editar título')
    await user.clear(input)
    await user.type(input, 'Tarea nueva')
    await user.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(screen.getByText('Tarea nueva')).toBeInTheDocument()
    expect(screen.queryByText('Tarea vieja')).not.toBeInTheDocument()
  })

  it('elimina una tarea', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addTask(user, 'Borrar esto')
    await user.click(screen.getByRole('button', { name: 'Eliminar' }))
    expect(screen.queryByText('Borrar esto')).not.toBeInTheDocument()
  })
})
