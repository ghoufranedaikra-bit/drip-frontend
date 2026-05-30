<template>
  <div class="page">
    <h1 class="page-title">YOUR BAG</h1>
    <div class="cart-layout" v-if="cartStore.cart?.items?.length">
      <div class="cart-items">
        <div v-for="item in cartStore.cart.items" :key="item.id" class="cart-item">
          <div class="item-img">
           <img :src="item.product.image" v-if="item.product.image" />
            <div v-else class="img-placeholder"><i class="ti ti-shirt"></i></div>
          </div>
          <div class="item-info">
            <h3>{{ item.product.name }}</h3>
            <p class="item-price">{{ item.product.price }} DA</p>
            <p class="item-qty">Qty: {{ item.quantity }}</p>
          </div>
          <button class="remove-btn" @click="cartStore.removeItem(item.id)">
            <i class="ti ti-trash"></i>
          </button>
        </div>
      </div>
      <div class="cart-summary">
        <h2>ORDER SUMMARY</h2>
        <div class="summary-row">
          <span>Items ({{ cartStore.itemCount }})</span>
<span>{{ total }} DA</span>        </div>
        <div class="summary-row">
  <span>Items ({{ cartStore.itemCount }})</span>
  <span>{{ total }} DA</span>
</div>
        <div class="summary-total">
  <span>Total</span>
  <span>{{ total }} DA</span>
</div>
       <button class="btn" style="width:100%" @click="checkout">
  <i class="ti ti-truck-delivery"></i> Place Order (Cash on Delivery)
</button>
      </div>
    </div>
    <div class="empty-cart" v-else>
      <i class="ti ti-shopping-bag" style="font-size:4rem; color:#1565C0;"></i>
      <h2>Your bag is empty</h2>
      <router-link to="/" class="btn" style="text-decoration:none;">Start Shopping</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useCartStore } from '../stores/cart'
import axios from 'axios'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const total = computed(() => {
  return cartStore.cart?.items?.reduce((sum, item) => sum + parseFloat(item.product.price) * item.quantity, 0).toFixed(2) || '0.00'
})

const checkout = async () => {
  await axios.post('/orders/')
  router.push('/order-confirmation')
}

onMounted(() => cartStore.fetchCart())
</script>

<style scoped>
.page-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3rem;
  letter-spacing: 4px;
  margin-bottom: 2.5rem;
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 3rem;
  align-items: start;
}

.cart-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.item-img {
  width: 100px;
  height: 120px;
  border-radius: 6px;
  overflow: hidden;
  background: var(--blue-light);
  flex-shrink: 0;
}

.item-img img { width: 100%; height: 100%; object-fit: cover; }

.img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--blue);
}

.item-info { flex: 1; }
.item-info h3 { font-size: 1rem; font-weight: 600; margin-bottom: 6px; }
.item-price { color: var(--blue-dark); font-weight: 700; font-size: 1rem; }
.item-qty { color: var(--text-muted); font-size: 0.85rem; margin-top: 4px; }

.remove-btn {
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.2s;
}

.remove-btn:hover { color: #e53935; }

.cart-summary {
  background: var(--off-white);
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 2rem;
  position: sticky;
  top: 80px;
}

.cart-summary h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.5rem;
  letter-spacing: 3px;
  margin-bottom: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: 700;
  border-top: 1px solid #eee;
  padding-top: 1rem;
  margin: 1rem 0 1.5rem;
}

.empty-cart {
  text-align: center;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  color: var(--text-muted);
}
@media (max-width: 768px) {
  .cart-layout { grid-template-columns: 1fr; }
  .cart-summary { position: static; }
}
</style>