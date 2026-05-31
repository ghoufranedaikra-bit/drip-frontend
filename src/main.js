import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import axios from 'axios'
import '@tabler/icons-webfont/dist/tabler-icons.min.css'

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

const token = localStorage.getItem('token')
if (token) {
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')