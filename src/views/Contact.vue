<template>
  <div class="page">
    <div class="contact-layout">
      <div class="contact-info">
        <p class="contact-sub">GET IN TOUCH</p>
        <h1 class="contact-title">WE GOT<br>YOU.</h1>
        <p class="contact-desc">Having an issue with your order? Want to give feedback? Hit us up and we'll get back to you ASAP.</p>
        <div class="info-items">
          <div class="info-item">
            <i class="ti ti-mail"></i>
            <span>drip.support@gmail.com</span>
          </div>
          <div class="info-item">
            <i class="ti ti-map-pin"></i>
            <span>Algeria 🇩🇿</span>
          </div>
          <div class="info-item">
            <i class="ti ti-clock"></i>
            <span>Response within 24 hours</span>
          </div>
        </div>
      </div>

      <div class="contact-form" v-if="!submitted">
        <div class="field">
          <label>Full Name</label>
          <input v-model="form.name" placeholder="Your name" />
        </div>
        <div class="field">
          <label>Email</label>
          <input v-model="form.email" type="email" placeholder="you@email.com" />
        </div>
        <div class="field">
          <label>Subject</label>
          <select v-model="form.subject">
            <option value="">Select a subject</option>
            <option>Order Issue</option>
            <option>Wrong Item Received</option>
            <option>Damaged Product</option>
            <option>Delivery Problem</option>
            <option>Refund Request</option>
            <option>General Feedback</option>
            <option>Other</option>
          </select>
        </div>
        <div class="field">
          <label>Message</label>
          <textarea v-model="form.message" rows="5" placeholder="Describe your issue in detail..."></textarea>
        </div>
        <p class="error" v-if="error">{{ error }}</p>
        <button class="btn" style="width:100%" @click="submit" :disabled="loading">
          {{ loading ? 'Sending...' : 'Send Message' }}
        </button>
      </div>

      <div class="success-card" v-else>
        <div class="check-circle">
          <i class="ti ti-circle-check"></i>
        </div>
        <h2>MESSAGE SENT!</h2>
        <p>We received your complaint and will get back to you within 24 hours.</p>
        <router-link to="/" class="btn" style="text-decoration:none;">Back to Shop</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const submitted = ref(false)
const loading = ref(false)
const error = ref('')

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submit = async () => {
  if (!form.value.name || !form.value.email || !form.value.subject || !form.value.message) {
    error.value = 'Please fill in all fields.'
    return
  }
  loading.value = true
  error.value = ''
  try {
    await axios.post('/contact/', form.value)
    submitted.value = true
  } catch {
    error.value = 'Something went wrong. Please try again.'
  }
  loading.value = false
}
</script>

<style scoped>
.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 4rem;
  align-items: start;
}

.contact-sub {
  font-size: 0.75rem;
  letter-spacing: 4px;
  color: var(--blue);
  font-weight: 600;
  margin-bottom: 1rem;
}

.contact-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 5rem;
  line-height: 0.9;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
  color: var(--blue-dark);
}

.contact-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.info-items { display: flex; flex-direction: column; gap: 1rem; }

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.info-item i { color: var(--blue); font-size: 1.2rem; }

.contact-form {
  background: white;
  border: 1px solid #eee;
  border-radius: 16px;
  padding: 2.5rem;
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

.field input,
.field select,
.field textarea {
  width: 100%;
  border: 1.5px solid #e0e0e0;
  border-radius: 6px;
  padding: 12px 14px;
  font-size: 0.95rem;
  font-family: 'Inter', sans-serif;
  outline: none;
  transition: border-color 0.2s;
  resize: none;
}

.field input:focus,
.field select:focus,
.field textarea:focus { border-color: var(--blue); }

.error { color: #e53935; font-size: 0.85rem; margin-bottom: 1rem; }

.success-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 16px;
  padding: 3rem 2.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.check-circle {
  width: 80px;
  height: 80px;
  background: #E8F5E9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: #2e7d32;
}

.success-card h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem;
  letter-spacing: 3px;
  color: var(--blue-dark);
}

.success-card p {
  color: var(--text-muted);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .contact-layout { grid-template-columns: 1fr; gap: 2rem; }
  .contact-title { font-size: 3.5rem; }
}
</style>