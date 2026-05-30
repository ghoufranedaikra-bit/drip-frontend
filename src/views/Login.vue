<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="auth-logo">DRIP</h1>
      <p class="auth-sub">Welcome back</p>
      <div class="field">
        <label>Username</label>
        <input v-model="username" type="text" placeholder="your_username" />
      </div>
      <div class="field">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="••••••••" />
      </div>
      <p class="error" v-if="error">{{ error }}</p>
      <button class="btn" style="width:100%" @click="login">Login</button>
      <p class="switch">Don't have an account? <router-link to="/register">Register</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const auth = useAuthStore()
const router = useRouter()

const login = async () => {
  try {
    await auth.login(username.value, password.value)
    router.push('/')
  } catch {
    error.value = 'Invalid username or password'
  }
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--off-white);
  padding: 2rem;
}

.auth-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 3rem;
  width: 100%;
  max-width: 420px;
}

.auth-logo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3rem;
  letter-spacing: 6px;
  color: var(--blue-dark);
  text-align: center;
  margin-bottom: 4px;
}

.auth-sub {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.field { margin-bottom: 1.25rem; }

.field label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 6px;
}

.field input {
  width: 100%;
  border: 1.5px solid #e0e0e0;
  border-radius: 6px;
  padding: 12px 14px;
  font-size: 0.95rem;
  font-family: 'Inter', sans-serif;
  outline: none;
  transition: border-color 0.2s;
}

.field input:focus { border-color: var(--blue); }

.error {
  color: #e53935;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.switch {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.switch a { color: var(--blue); text-decoration: none; font-weight: 600; }
</style>