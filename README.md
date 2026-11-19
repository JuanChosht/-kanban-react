# Tablero Kanban (React + Vite)

Aplicación tipo Kanban/Jira para gestionar tareas en tres estados: **Pendiente**, **En progreso** y **Completado**.

## Funcionalidades

- Crear, editar y eliminar tareas.
- Cambiar el estado de una tarea con el selector o arrastrándola a otra columna.
- Persistencia en `localStorage`.

## Scripts

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo
npm test         # pruebas con Vitest
npm run build    # build de producción
```

## CI/CD

- **GitHub Actions** (`.github/workflows/ci.yml`): en cada `push` y `pull_request` hacia `main` instala dependencias, ejecuta las pruebas de Vitest y genera el build de producción.
- **Vercel**: despliegue automático vinculado al repositorio de GitHub.
