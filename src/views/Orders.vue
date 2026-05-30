<template>
  <div class="page">
    <h1 class="page-title">MY ORDERS</h1>
    <div v-if="orders.length">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
          <div>
            <span class="order-id">Order #{{ order.id }}</span>
            <span class="order-date">{{ formatDate(order.created_at) }}</span>
          </div>
          <span class="status-badge" :class="order.status">{{ order.status }}</span>
        </div>
        <div class="order-items">
          <div v-for="item in order.items" :key="item.id" class="order-item">
            <p>{{ item.product.name }} x{{ item.quantity }} — {{ item.price }} DA</p>
          </div>
        </div>
      </div>
    </div>
    <div class="empty-state" v-else>
      <i class="ti ti-package" style="font-size:4rem; color:#1565C0;"></i>
      <h2>No orders yet</h2>
      <router-link to="/" class="btn" style="text-decoration:none;">Start Shopping</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const orders = ref([])

const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

onMounted(async () => {
  const res = await axios.get('/orders/')
  orders.value = res.data
})
</script>

<style scoped>
.page-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3rem;
  letter-spacing: 4px;
  margin-bottom: 2.5rem;
}

.order-card {
  border: 1px solid #eee;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background: var(--off-white);
  border-bottom: 1px solid #eee;
}

.order-id {
  font-weight: 700;
  font-size: 0.95rem;
  margin-right: 1rem;
}

.order-date { color: var(--text-muted); font-size: 0.85rem; }

.status-badge {
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.status-badge.pending { background: #FFF8E1; color: #F57F17; }
.status-badge.shipped { background: #E3F2FD; color: #1565C0; }
.status-badge.delivered { background: #E8F5E9; color: #2E7D32; }

.order-items { padding: 1rem 1.5rem; }

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 0.9rem;
  border-bottom: 1px solid #f5f5f5;
}

.empty-state {
  text-align: center;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  color: var(--text-muted);
}
</style>