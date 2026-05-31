<template>
  <div class="page">
    <h1 class="page-title">MY WISHLIST</h1>
    <div class="wishlist-grid" v-if="products.length">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="product-img-wrap">
          <img :src="product.image" v-if="product.image" class="product-img" />
          <div class="product-img-placeholder" v-else>
            <i class="ti ti-shirt" style="font-size:3rem; color:#1565C0;"></i>
          </div>
          <button class="remove-wish" @click="removeFromWishlist(product.id)">
            <i class="ti ti-x"></i>
          </button>
          <div class="product-overlay">
            <router-link :to="'/product/' + product.id" class="btn" style="text-decoration:none;">View</router-link>
          </div>
        </div>
        <div class="product-info">
          <p class="product-category">DRIP</p>
          <h3 class="product-name">{{ product.name }}</h3>
          <div class="product-footer">
            <span class="product-price">{{ product.price }} DA</span>
            <button class="add-btn" @click="addToCart(product.id)">
              <i class="ti ti-shopping-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="empty-state" v-else>
      <i class="ti ti-heart" style="font-size:4rem; color:#1565C0;"></i>
      <h2>Your wishlist is empty</h2>
      <p>Save items you love and come back to them later.</p>
      <router-link to="/" class="btn" style="text-decoration:none;">Browse Products</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useCartStore } from '../stores/cart'

const products = ref([])
const cartStore = useCartStore()

const loadWishlist = async () => {
  const ids = JSON.parse(localStorage.getItem('wishlist') || '[]')
  if (!ids.length) return
  const res = await axios.get('/products/')
  const all = res.data.results || res.data
  products.value = all.filter(p => ids.includes(p.id))
}

const removeFromWishlist = (id) => {
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
  const idx = wishlist.indexOf(id)
  if (idx > -1) wishlist.splice(idx, 1)
  localStorage.setItem('wishlist', JSON.stringify(wishlist))
  products.value = products.value.filter(p => p.id !== id)
}

const addToCart = async (id) => {
  try {
    await cartStore.addItem(id)
    alert('Added to bag!')
  } catch {
    alert('Please login first')
  }
}

onMounted(loadWishlist)
</script>

<style scoped>
.page-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3rem;
  letter-spacing: 4px;
  margin-bottom: 2.5rem;
}

.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2rem;
}

.product-card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(21,101,192,0.15);
}

.product-img-wrap {
  position: relative;
  aspect-ratio: 3/4;
  background: var(--blue-light);
  overflow: hidden;
}

.product-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.product-card:hover .product-img { transform: scale(1.05); }

.product-img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-wish {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.9rem;
  color: #666;
  transition: all 0.2s;
  z-index: 2;
}

.remove-wish:hover { background: #ffebee; color: #c62828; }

.product-overlay {
  position: absolute;
  inset: 0;
  background: rgba(13,71,161,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.product-card:hover .product-overlay { opacity: 1; }

.product-info { padding: 1rem 1.25rem; }

.product-category {
  font-size: 0.7rem;
  letter-spacing: 2px;
  color: var(--blue);
  font-weight: 600;
  margin-bottom: 4px;
  text-transform: uppercase;
}

.product-name { font-size: 1rem; font-weight: 600; margin-bottom: 12px; }

.product-footer { display: flex; align-items: center; justify-content: space-between; }

.product-price { font-size: 1.1rem; font-weight: 700; color: var(--blue-dark); }

.add-btn {
  background: var(--blue);
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.add-btn:hover { background: var(--blue-dark); }

.empty-state {
  text-align: center;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--text-muted);
}

.empty-state h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem;
  letter-spacing: 3px;
  color: var(--text);
}
</style>