<template>
  <div class="page" v-if="product">
    <div class="detail-layout">
      <div class="detail-img">
       <img :src="product.image" v-if="product.image" />
        <div class="img-placeholder" v-else>
          <i class="ti ti-shirt" style="font-size:6rem; color:#1565C0;"></i>
        </div>
      </div>
      <div class="detail-info">
        <p class="detail-category">DRIP COLLECTION</p>
        <h1 class="detail-name">{{ product.name }}</h1>
        <p class="detail-price">{{ product.price }} DA</p>
        <p class="detail-stock" :class="{ low: product.stock < 5 }">
          {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
        </p>
        <div class="detail-actions">
          <button class="btn" @click="addToCart" :disabled="product.stock === 0">
            Add to Bag
          </button>
          <router-link to="/" class="btn-outline" style="text-decoration:none;">
            Back to Shop
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useCartStore } from '../stores/cart'

const product = ref(null)
const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const addToCart = async () => {
  try {
    await cartStore.addItem(product.value.id)
    router.push('/cart')
  } catch {
    alert('Please login to add items to cart')
  }
}

onMounted(async () => {
  const res = await axios.get(`/products/${route.params.id}/`)
  product.value = res.data
})
</script>

<style scoped>
.detail-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.detail-img {
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 3/4;
  background: var(--blue-light);
}

.detail-img img { width: 100%; height: 100%; object-fit: cover; }

.img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-category {
  font-size: 0.75rem;
  letter-spacing: 3px;
  color: var(--blue);
  font-weight: 600;
  margin-bottom: 1rem;
}

.detail-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 4rem;
  letter-spacing: 2px;
  line-height: 1;
  margin-bottom: 1.5rem;
}

.detail-price {
  font-size: 2rem;
  font-weight: 700;
  color: var(--blue-dark);
  margin-bottom: 1rem;
}

.detail-stock {
  font-size: 0.85rem;
  color: #2e7d32;
  margin-bottom: 2rem;
}

.detail-stock.low { color: #e53935; }

.detail-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
@media (max-width: 768px) {
  .detail-layout { grid-template-columns: 1fr; gap: 2rem; }
  .detail-name { font-size: 2.5rem; }
}
</style>