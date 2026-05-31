import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    async login(username, password) {
  const res = await axios.post('/users/login/', { username, password })
  this.token = res.data.access
  localStorage.setItem('token', this.token)
  axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
},
    async login(username, password) {
  const res = await axios.post('/users/login/', { username, password })
  this.token = res.data.access
  localStorage.setItem('token', this.token)
  axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
},
    async register(username, email, password) {
      await axios.post('/users/register/', { username, email, password })
    },
    logout() {
      this.token = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    }
  }
})