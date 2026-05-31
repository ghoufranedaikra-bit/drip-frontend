<template>
  <div class="cart-page">
    <div class="cart-hero">
      <div class="cart-hero-inner">
        <h1>YOUR BAG <span>({{ cartStore.itemCount }})</span></h1>
      </div>
    </div>

    <div class="page">
      <div class="cart-layout" v-if="cartStore.cart?.items?.length">
        <div class="cart-items">
          <div v-for="item in cartStore.cart.items" :key="item.id" class="cart-item">
            <div class="item-img">
              <img :src="getImageUrl(item.product.image)" v-if="item.product.image" />
              <div v-else class="img-placeholder"><i class="ti ti-shirt"></i></div>
            </div>
            <div class="item-info">
              <p class="item-brand">DRIP</p>
              <h3>{{ item.product.name }}</h3>
              <div class="item-meta">
                <span v-if="item.size" class="meta-tag">{{ item.size }}</span>
                <span v-if="item.color" class="meta-tag">{{ item.color }}</span>
                <span class="meta-tag">Qty: {{ item.quantity }}</span>
              </div>
              <p class="item-price">{{ item.product.price }} DA</p>
            </div>
            <button class="remove-btn" @click="cartStore.removeItem(item.id)">
              <i class="ti ti-trash"></i>
            </button>
          </div>
        </div>

        <div class="cart-summary">
          <h2>ORDER SUMMARY</h2>
          <div class="summary-lines">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>{{ total }} DA</span>
            </div>
            <div class="summary-row">
              <span>Delivery</span>
              <span class="free">FREE</span>
            </div>
            <div class="summary-row">
              <span>Payment</span>
              <span>Cash on Delivery</span>
            </div>
          </div>
          <div class="summary-total">
            <span>Total</span>
            <span>{{ total }} DA</span>
          </div>
          <button class="checkout-btn" @click="checkout">
            <i class="ti ti-lock"></i>
            Place Order
          </button>
          <router-link to="/" class="continue-link">
            <i class="ti ti-arrow-left"></i> Continue Shopping
          </router-link>
          <div class="trust-badges">
            <div class="trust-item">
              <i class="ti ti-truck-delivery"></i>
              <span>Free delivery</span>
            </div>
            <div class="trust-item">
              <i class="ti ti-shield-check"></i>
              <span>Secure order</span>
            </div>
            <div class="trust-item">
              <i class="ti ti-refresh"></i>
              <span>Easy returns</span>
            </div>
          </div>
        </div>
      </div>

      <div class="empty-cart" v-else>
        <div class="empty-icon">
          <i class="ti ti-shopping-bag"></i>
        </div>
        <h2>YOUR BAG IS EMPTY</h2>
        <p>Looks like you haven't added anything yet.</p>
        <router-link to="/" class="btn" style="text-decoration:none;">Start Shopping</router-link>
      </div>
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

const getImageUrl = (image) => {
  if (!image) return ''
  if (image.startsWith('http')) return image
  return `http://127.0.0.1:8000${image}`
}

const total = computed(() => {
  return cartStore.cart?.items?.reduce((sum, item) =>
    sum + parseFloat(item.product.price) * item.quantity, 0
  ).toFixed(2) || '0.00'
})

const checkout = async () => {
  try {
    await axios.post('/orders/')
    router.push('/order-confirmation')
  } catch (err) {
    alert(err.response?.data?.error || 'Something went wrong')
  }
}

onMounted(() => cartStore.fetchCart())
</script>

<style scoped>
.cart-hero {
  background: #060e1a;
  padding: 3rem 2rem;
}

.cart-hero-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.cart-hero h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3.5rem;
  letter-spacing: 4px;
  color: white;
}

.cart-hero h1 span { color: rgba(255,255,255,0.3); }

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 3rem;
  align-items: start;
}

.cart-item {
  display: flex;
  gap: 1.5rem;
  padding: 2rem 0;
  border-bottom: 1px solid #f0f0f0;
  align-items: flex-start;
}

.item-img {
  width: 110px;
  height: 140px;
  border-radius: 8px;
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

.item-brand {
  font-size: 0.7rem;
  letter-spacing: 3px;
  color: var(--blue);
  font-weight: 700;
  margin-bottom: 4px;
}

.item-info h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: 10px; }

.item-meta { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }

.meta-tag {
  background: var(--blue-light);
  color: var(--blue-dark);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 3px 10px;
  border-radius: 20px;
  text-transform: uppercase;
}

.item-price { font-size: 1.1rem; font-weight: 700; color: var(--blue-dark); }

.remove-btn {
  background: none;
  border: 1px solid #eee;
  color: #ccc;
  cursor: pointer;
  font-size: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.remove-btn:hover { border-color: #ffcdd2; color: #e53935; background: #fff5f5; }

.cart-summary {
  background: #060e1a;
  border-radius: 16px;
  padding: 2rem;
  position: sticky;
  top: 80px;
  color: white;
}

.cart-summary h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.5rem;
  letter-spacing: 3px;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.summary-lines { margin-bottom: 1rem; }

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.88rem;
  color: rgba(255,255,255,0.6);
  margin-bottom: 12px;
}

.free { color: #4caf50; font-weight: 700; }

.summary-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 700;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 1rem;
  margin-bottom: 1.5rem;
}

.checkout-btn {
  width: 100%;
  background: var(--blue);
  color: white;
  border: none;
  padding: 16px;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.2s;
  font-family: 'Inter', sans-serif;
  margin-bottom: 1rem;
}

.checkout-btn:hover { background: #1976D2; }

.continue-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  font-size: 0.82rem;
  margin-bottom: 1.5rem;
  transition: color 0.2s;
}

.continue-link:hover { color: white; }

.trust-badges {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 1.25rem;
}

.trust-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.4);
  text-align: center;
}

.trust-item i { font-size: 1.2rem; color: rgba(255,255,255,0.5); }

.empty-cart {
  text-align: center;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-icon {
  width: 100px;
  height: 100px;
  background: var(--blue-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: var(--blue);
  margin-bottom: 1rem;
}

.empty-cart h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem;
  letter-spacing: 3px;
}

.empty-cart p { color: var(--text-muted); }

@media (max-width: 768px) {
  .cart-layout { grid-template-columns: 1fr; }
  .cart-summary { position: static; }
  .cart-hero h1 { font-size: 2.5rem; }
}
</style>