import api from '@/api/axios'

export const authApi = {
  async login(email: string, password: string): Promise<string> {
    const res = await api.post('/login', { email, password })
    return res.data.token
  },

  async logout(): Promise<void> {
    const res = await api.post('/logout')
    return res.data
  },
}
