<template>
  <div class="confirm-page">
    <div class="confirm-hero">
      <div class="confirm-hero-inner">
        <div class="check-anim">
          <i class="ti ti-circle-check"></i>
        </div>
        <h1>ORDER CONFIRMED!</h1>
        <p>Thank you for shopping with DRIP 🔥</p>
      </div>
    </div>

    <div class="page">
      <div class="confirm-layout" v-if="order">
        <div class="order-details">
          <div class="detail-header">
            <div>
              <p class="detail-label">ORDER NUMBER</p>
              <h2>#{{ String(order.id).padStart(5, '0') }}</h2>
            </div>
            <span class="status-pill">{{ order.status }}</span>
          </div>

          <div class="order-items">
            <div v-for="item in order.items" :key="item.id" class="confirm-item">
              <div class="ci-info">
                <p class="ci-name">{{ item.product.name }}</p>
                <p class="ci-qty">Qty: {{ item.quantity }}</p>
              </div>
              <p class="ci-price">{{ item.price }} DA</p>
            </div>
          </div>

          <div class="order-totals">
            <div class="total-row">
              <span>Subtotal</span>
              <span>{{ orderTotal }} DA</span>
            </div>
            <div class="total-row">
              <span>Delivery</span>
              <span class="free">FREE</span>
            </div>
            <div class="total-row grand">
              <span>Total</span>
              <span>{{ orderTotal }} DA</span>
            </div>
          </div>
        </div>

        <div class="confirm-sidebar">
          <div class="info-card">
            <i class="ti ti-mail" style="font-size:2rem; color:var(--blue);"></i>
            <h3>CHECK YOUR EMAIL</h3>
            <p>Order details sent to <strong>{{ userEmail }}</strong></p>
          </div>

          <div class="info-card delivery">
            <i class="ti ti-truck-delivery" style="font-size:2rem; color:white;"></i>
            <h3>CASH ON DELIVERY</h3>
            <p>Pay when your order arrives at your door 🇩🇿</p>
          </div>

          <div class="confirm-actions">
            <router-link to="/orders" class="btn" style="text-decoration:none; display:block; text-align:center;">
              Track My Order
            </router-link>
            <router-link to="/" class="btn-outline" style="text-decoration:none; display:block; text-align:center;">
              Continue Shopping
            </router-link>
          </div>
        </div>
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
  return order.value.items.reduce((sum, item) =>
    sum + parseFloat(item.price) * item.quantity, 0
  ).toFixed(2)
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
.confirm-hero {
  background: linear-gradient(135deg, #060e1a 0%, #0D47A1 100%);
  padding: 5rem 2rem;
  text-align: center;
}

.confirm-hero-inner {
  max-width: 600px;
  margin: 0 auto;
}

.check-anim {
  font-size: 5rem;
  color: #4caf50;
  margin-bottom: 1.5rem;
  animation: pop 0.5s ease;
}

@keyframes pop {
  0% { transform: scale(0); opacity: 0; }
  70% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}

.confirm-hero h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 4rem;
  letter-spacing: 4px;
  color: white;
  margin-bottom: 0.5rem;
}

.confirm-hero p { color: rgba(255,255,255,0.7); font-size: 1rem; }

.confirm-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 3rem;
  align-items: start;
}

.order-details {
  background: white;
  border: 1px solid #eee;
  border-radius: 16px;
  overflow: hidden;
}

.detail-header {
  background: #060e1a;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  font-size: 0.7rem;
  letter-spacing: 3px;
  color: rgba(255,255,255,0.5);
  margin-bottom: 4px;
}

.detail-header h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem;
  letter-spacing: 3px;
  color: white;
}

.status-pill {
  background: rgba(76,175,80,0.2);
  color: #4caf50;
  border: 1px solid rgba(76,175,80,0.4);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.order-items { padding: 1.5rem 2rem; }

.confirm-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f5f5f5;
}

.ci-name { font-weight: 600; font-size: 0.95rem; margin-bottom: 4px; }
.ci-qty { font-size: 0.8rem; color: var(--text-muted); }
.ci-price { font-weight: 700; color: var(--blue-dark); }

.order-totals {
  background: var(--off-white);
  padding: 1.5rem 2rem;
  border-top: 1px solid #eee;
}

.total-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 10px;
}

.free { color: #4caf50; font-weight: 700; }

.total-row.grand {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  border-top: 1px solid #eee;
  padding-top: 1rem;
  margin-top: 0.5rem;
}

.confirm-sidebar { display: flex; flex-direction: column; gap: 1rem; }

.info-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.info-card h3 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.2rem;
  letter-spacing: 2px;
}

.info-card p { font-size: 0.85rem; color: var(--text-muted); }

.info-card.delivery {
  background: var(--blue-dark);
  border-color: var(--blue-dark);
  color: white;
}

.info-card.delivery h3 { color: white; }
.info-card.delivery p { color: rgba(255,255,255,0.7); }

.confirm-actions { display: flex; flex-direction: column; gap: 10px; }

@media (max-width: 768px) {
  .confirm-layout { grid-template-columns: 1fr; }
  .confirm-hero h1 { font-size: 2.5rem; }
}
</style>