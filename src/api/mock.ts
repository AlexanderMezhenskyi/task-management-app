import MockAdapter from 'axios-mock-adapter'
import api from '@/api/axios'
import { useTaskStore } from '@/stores/taskStore'

export const setupMocks = () => {
  const mock = new MockAdapter(api as any, { delayResponse: 300 })

  // POST /login
  mock.onPost('/login').reply((config) => {
    const { email, password } = JSON.parse(config.data)

    if (email === 'john.doe@example.com' && password === 'johndoe-password') {
      const fakeToken = btoa(JSON.stringify({ userId: 1, email: 'john.doe@example.com' }))
      return [200, { token: fakeToken }]
    }

    return [401, { message: 'Invalid credentials' }]
  })

  // POST /logout
  mock.onPost('/logout').reply(() => {
    return [200]
  })

  // GET /tasks/:id
  mock.onGet(/\/tasks\/\d+/).reply((config) => {
    const taskId = Number(config.url?.split('/').pop())
    const store = useTaskStore()
    const task = store.tasks.find((task) => task.id === taskId)
    return task ? [200, task] : [404]
  })

  // GET /tasks/:id
  mock.onGet(/\/projects\/\d+\/tasks/).reply((config) => {
    const projectId = Number(config.url?.match(/\/projects\/(\d+)/)?.[1])
    const store = useTaskStore()
    const tasks = store.tasks.filter((task) => task.projectId === projectId)
    return [200, tasks]
  })

  // POST /tasks
  mock.onPost('/tasks').reply((config) => {
    const store = useTaskStore()
    const payload = JSON.parse(config.data)
    const created = store.createTask(payload)
    return [201, created]
  })

  // PUT /tasks/:id
  mock.onPut(/\/tasks\/\d+/).reply((config) => {
    const store = useTaskStore()
    const payload = JSON.parse(config.data)
    store.updateTask(payload)
    return [200]
  })

  // DELETE /tasks/:id
  mock.onDelete(/\/tasks\/\d+/).reply((config) => {
    const id = Number(config.url?.split('/').pop())
    const store = useTaskStore()
    store.removeTask(id)
    return [204]
  })
}
