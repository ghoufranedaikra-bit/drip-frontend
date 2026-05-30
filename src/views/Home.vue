<template>
  <div>
    <section class="hero">
      <div class="hero-inner">
        <p class="hero-sub">NEW COLLECTION 2026</p>
        <h1 class="hero-title">WEAR THE<br><span>STREETS</span></h1>
        <p class="hero-desc">Premium streetwear for those who move different.</p>
        <router-link to="/" class="btn" style="text-decoration:none; display:inline-block;">Shop Now</router-link>
      </div>
    </section>

    <div class="page">
      <div class="shop-header">
        <h2 class="section-title">ALL DROPS</h2>
        <div class="search-wrap">
          <i class="ti ti-search"></i>
          <input v-model="search" placeholder="Search pieces..." class="search-input" />
        </div>
      </div>

      <div class="category-filters">
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="cat-btn"
          :class="{ active: selectedCategory === cat.id }"
          @click="selectCategory(cat.id)"
        >
          {{ cat.name }}
        </button>
        <button class="cat-btn" :class="{ active: selectedCategory === null }" @click="selectCategory(null)">
          All
        </button>
      </div>

      <div class="products-grid" v-if="products.length">
        <div v-for="product in products" :key="product.id" class="product-card">
          <div class="product-img-wrap">
<img :src="product.image" v-if="product.image" class="product-img" />            <div class="product-img-placeholder" v-else>
              <i class="ti ti-shirt" style="font-size:3rem; color:#1565C0;"></i>
            </div>
            <div class="product-overlay">
              <router-link :to="'/product/' + product.id" class="btn" style="text-decoration:none;">View</router-link>
            </div>
          </div>
          <div class="product-info">
            <p class="product-category">{{ getCategoryName(product.category) }}</p>
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
        <i class="ti ti-hanger" style="font-size:4rem; color:#1565C0;"></i>
        <p>No products found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useCartStore } from '../stores/cart'

const products = ref([])
const categories = ref([])
const search = ref('')
const selectedCategory = ref(null)
const cartStore = useCartStore()

const fetchProducts = async () => {
  const params = { search: search.value }
  if (selectedCategory.value) params.category = selectedCategory.value
  const res = await axios.get('/products/', { params })
  products.value = res.data.results || res.data
}

const fetchCategories = async () => {
  const res = await axios.get('/categories/')
  categories.value = res.data.results || res.data
}

const selectCategory = (id) => {
  selectedCategory.value = id
  fetchProducts()
}

const getCategoryName = (id) => {
  const cat = categories.value.find(c => c.id === id)
  return cat ? cat.name.toUpperCase() : 'DRIP'
}

const addToCart = async (id) => {
  try {
    await cartStore.addItem(id)
  } catch {
    alert('Please login to add items to cart')
  }
}

watch(search, fetchProducts)
onMounted(() => {
  fetchProducts()
  fetchCategories()
})
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #0D47A1 0%, #1565C0 50%, #1976D2 100%);
  min-height: 520px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: 'DRIP';
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  font-family: 'Bebas Neue', sans-serif;
  font-size: 280px;
  color: rgba(255,255,255,0.05);
  line-height: 1;
  pointer-events: none;
}

.hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.hero-sub {
  color: rgba(255,255,255,0.7);
  font-size: 0.75rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.hero-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(5rem, 12vw, 10rem);
  color: white;
  line-height: 0.9;
  margin-bottom: 1.5rem;
}

.hero-title span { color: rgba(255,255,255,0.4); }

.hero-desc {
  color: rgba(255,255,255,0.75);
  font-size: 1rem;
  margin-bottom: 2.5rem;
  font-weight: 300;
}

.shop-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.5rem;
  letter-spacing: 3px;
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1.5px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px 16px;
  width: 260px;
}

.search-wrap i { color: var(--text-muted); }

.search-input {
  border: none;
  outline: none;
  font-size: 0.9rem;
  width: 100%;
  font-family: 'Inter', sans-serif;
}

.category-filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.cat-btn {
  background: white;
  border: 1.5px solid #e0e0e0;
  border-radius: 30px;
  padding: 8px 20px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Inter', sans-serif;
}

.cat-btn:hover { border-color: var(--blue); color: var(--blue); }
.cat-btn.active { background: var(--blue); color: white; border-color: var(--blue); }

.products-grid {
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

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}

.product-card:hover .product-img { transform: scale(1.05); }

.product-img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--blue-light);
}

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
  text-transform: uppercase;
  color: var(--blue);
  font-weight: 600;
  margin-bottom: 4px;
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--blue-dark);
}

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
  padding: 5rem 2rem;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

@media (max-width: 768px) {
  .hero { min-height: 380px; }
  .hero-title { font-size: 5rem; }
  .hero::before { font-size: 160px; }
  .shop-header { flex-direction: column; align-items: flex-start; }
  .search-wrap { width: 100%; }
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
}

@media (max-width: 400px) {
  .products-grid { grid-template-columns: 1fr; }
  .hero-title { font-size: 4rem; }
}
</style>