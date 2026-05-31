<template>
  <div class="auth-page">
    <div class="auth-wrapper">
      
      <!-- Left Side: Clean, Modern Form Container -->
      <div class="auth-form-side">
        <div class="form-header">
          <!-- Reference verbatim to your image asset located in the public/ directory -->
          <img src="/logo.webp" alt="DRIP Logo" class="form-logo-img" />
          <h1 class="form-title">Welcome Back</h1>
          <p class="form-subtitle">Enter your details to access your drip.</p>
        </div>

        <form @submit.prevent="login" class="form-body">
          <!-- Username Input Block -->
          <div class="field">
            <label for="username">Username</label>
            <div class="input-wrapper">
              <i class="ti ti-user input-icon"></i>
              <input 
                id="username"
                v-model="username" 
                type="text" 
                placeholder="your_username" 
                required
              />
            </div>
          </div>

          <!-- Password Input Block -->
          <div class="field">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <i class="ti ti-lock input-icon"></i>
              <input 
                id="password"
                v-model="password" 
                type="password" 
                placeholder="••••••••" 
                required
              />
            </div>
          </div>

          <!-- Error Feedback System Banner -->
          <Transition name="fade">
            <div class="error-banner" v-if="error">
              <i class="ti ti-alert-circle"></i>
              <span>{{ error }}</span>
            </div>
          </Transition>

          <!-- Core Action Handle Trigger -->
          <button type="submit" class="btn btn-submit">
            <span>Sign In</span>
            <i class="ti ti-arrow-narrow-right"></i>
          </button>
        </form>

        <p class="switch">
          Don't have an account? 
          <router-link to="/register">Register</router-link>
        </p>
      </div>

      <!-- Right Side: Immersive Visual Streetwear Side -->
      <div class="auth-visual-side">
        <div class="visual-overlay"></div>
        <div class="visual-content">
          <span class="visual-tag">NEW DROP 2026</span>
          <h2>WEAR THE<br>STREETS</h2>
          <p>Premium streetwear for those who move different. Authentic drops delivered straight to your door all over Algeria 🇩🇿</p>
        </div>
      </div>

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
  error.value = ''
  try {
    await auth.login(username.value, password.value)
    router.push('/')
  } catch {
    error.value = 'Invalid username or password'
  }
}
</script>

<style scoped>
/* 1. Base Structure - Screen Calculation Constraints */
.auth-page {
  min-height: calc(100vh - 85px); /* Perfectly respects your new fixed navigation height offset */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9ff;
  padding: 3rem 2rem;
}

/* Master Layout Grid Container */
.auth-wrapper {
  background: #ffffff;
  width: 100%;
  max-width: 960px;
  min-height: 580px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(13, 71, 161, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: grid;
  grid-template-columns: 1.1fr 1fr;
}

/* 2. Left Column Form Fields Layout Style */
.auth-form-side {
  padding: 3.5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-header {
  margin-bottom: 2rem;
}

.form-logo-img {
  height: 50px;
  width: auto;
  object-fit: contain;
  margin-bottom: 1.25rem;
}

.form-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #0a0a0a;
  letter-spacing: -0.5px;
  margin-bottom: 0.25rem;
}

.form-subtitle {
  color: #666666;
  font-size: 0.9rem;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #1a1a1a;
}

/* Structural Wrapper Container Injecting Vector Icons Inside Input Field box */
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  font-size: 1.25rem;
  color: #999999;
  pointer-events: none;
  transition: color 0.2s ease;
}

.input-wrapper input {
  width: 100%;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 14px 12px 42px; /* Shifts text to the right to clean room for icon element */
  font-size: 0.95rem;
  font-family: 'Inter', sans-serif;
  outline: none;
  color: #0a0a0a;
  background: #ffffff;
  transition: all 0.2s ease;
}

.input-wrapper input:focus {
  border-color: #1565C0;
  box-shadow: 0 0 0 4px rgba(21, 101, 192, 0.1);
}

/* Highlights vector icon on input selection focus state change */
.input-wrapper input:focus + .input-icon,
.input-wrapper:focus-within .input-icon {
  color: #1565C0;
}

/* 3. High Visibility Dynamic Error Display Banner */
.error-banner {
  background: #fef2f2;
  border: 1px solid #fee2e2;
  color: #ef4444;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.error-banner i {
  font-size: 1.1rem;
}

/* Custom Overrides on Standard Button Styles */
.btn-submit {
  width: 100%;
  margin-top: 0.5rem;
  padding: 14px;
  border-radius: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.btn-submit i {
  font-size: 1.1rem;
  transition: transform 0.2s ease;
}

.btn-submit:hover i {
  transform: translateX(4px);
}

.switch {
  text-align: center;
  margin-top: 1.75rem;
  font-size: 0.85rem;
  color: #666666;
}

.switch a {
  color: #1565C0;
  text-decoration: none;
  font-weight: 600;
  margin-left: 4px;
  transition: color 0.2s ease;
}

.switch a:hover {
  color: #0D47A1;
  text-decoration: underline;
}

/* 4. Right Side Immersive Brand Content Panel */
.auth-visual-side {
  position: relative;
  background: linear-gradient(135deg, #0D47A1 0%, #1565C0 50%, #1976D2 100%);
  padding: 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
}

/* Giant background typography watermark */
.auth-visual-side::before {
  content: 'DRIP';
  position: absolute;
  right: -30px;
  top: 10%;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 180px;
  color: rgba(255, 255, 255, 0.04);
  line-height: 1;
  pointer-events: none;
  letter-spacing: 4px;
}

.visual-content {
  position: relative;
  z-index: 2;
  color: #ffffff;
}

.visual-tag {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 3px;
  background: rgba(255, 255, 255, 0.15);
  padding: 4px 10px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 1.25rem;
}

.visual-content h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3.5rem;
  line-height: 0.95;
  letter-spacing: 2px;
  margin-bottom: 1rem;
}

.visual-content p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.6;
  font-weight: 300;
}

/* Vue Single Component Transition Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 5. Fluid Responsive Media Breakpoint Layout Adjustments */
@media (max-width: 840px) {
  .auth-wrapper {
    grid-template-columns: 1fr;
    max-width: 480px;
  }

  .auth-visual-side {
    display: none; /* Safely strips background layout panel on portable mobile frames */
  }

  .auth-form-side {
    padding: 3rem 2rem;
  }
}

@media (max-width: 480px) {
  .auth-page {
    padding: 1rem;
  }
  
  .auth-form-side {
    padding: 2.5rem 1.5rem;
  }

  .form-title {
    font-size: 1.5rem;
  }
}
</style>