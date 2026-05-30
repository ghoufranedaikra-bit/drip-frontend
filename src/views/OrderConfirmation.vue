<template>
  <div class="confirm-page">
    <div class="confirm-card">
      <div class="check-circle">
        <i class="ti ti-circle-check"></i>
      </div>
      <h1>ORDER PLACED!</h1>
      <p class="sub">Thank you for shopping with DRIP 🔥</p>
      <p class="email-note">Order details have been sent to <strong>{{ userEmail }}</strong></p>

      <div class="order-summary" v-if="order">
        <h2>ORDER #{{ order.id }}</h2>
        <div class="order-items">
          <div v-for="item in order.items" :key="item.id" class="confirm-item">
            <span>{{ item.product.name }}</span>
            <span>x{{ item.quantity }}</span>
            <span>{{ item.price }} DA</span>
          </div>
        </div>
        <div class="confirm-total">
          <span>Total</span>
          <span>{{ orderTotal }} DA</span>
        </div>
        <div class="delivery-note">
          <i class="ti ti-truck-delivery"></i>
          <span>Cash on Delivery — Pay when your order arrives</span>
        </div>
      </div>

      <div class="confirm-actions">
        <router-link to="/orders" class="btn" style="text-decoration:none;">View My Orders</router-link>
        <router-link to="/" class="btn-outline" style="text-decoration:none;">Continue Shopping</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const order = ref(null)
const userEmail = ref('')

const orderTotal = computed(() => {
  if (!order.value) return 0
  return order.value.items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2)
})

onMounted(async () => {
  const orders = await axios.get('/orders/')
  const list = orders.data
  order.value = list[list.length - 1]

  try {
    const user = await axios.get('/users/me/')
    userEmail.value = user.data.email
  } catch {
    userEmail.value = 'your email'
  }
})
</script>

<style scoped>
.confirm-page {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--off-white);
  padding: 2rem;
}

.confirm-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 16px;
  padding: 3rem;
  width: 100%;
  max-width: 560px;
  text-align: center;
}

.check-circle {
  width: 80px;
  height: 80px;
  background: #E8F5E9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2.5rem;
  color: #2e7d32;
}

h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3rem;
  letter-spacing: 4px;
  color: var(--blue-dark);
  margin-bottom: 0.5rem;
}

.sub {
  color: var(--text-muted);
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.email-note {
  font-size: 0.85rem;
  color: var(--text-muted);
  background: var(--blue-light);
  padding: 10px 16px;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.order-summary {
  background: var(--off-white);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: left;
}

.order-summary h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.3rem;
  letter-spacing: 3px;
  margin-bottom: 1rem;
  color: var(--blue-dark);
}

.confirm-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.confirm-total {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1rem;
  padding-top: 1rem;
  margin-top: 0.5rem;
}

.delivery-note {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 1rem;
  font-size: 0.82rem;
  color: var(--blue);
  font-weight: 600;
}

.confirm-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 480px) {
  .confirm-card { padding: 2rem 1.25rem; }
  h1 { font-size: 2.2rem; }
}
</style>