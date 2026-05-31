<template>
  <div>
    <!-- 1. Hero Dynamic Showcase -->
    <section class="hero">
      <div class="hero-container">
        
        <div class="hero-inner">
          <p class="hero-sub">NEW COLLECTION 2026</p>
          <h1 class="hero-title">WEAR THE<br><span>STREETS</span></h1>
          <p class="hero-desc">Premium streetwear for those who move different.</p>
          <div class="hero-btns">
            <a href="#shop" class="btn" style="text-decoration:none;">Shop Now</a>
            <router-link to="/wishlist" class="btn-outline" style="text-decoration:none;">
              <i class="ti ti-heart"></i> Wishlist
            </router-link>
          </div>
        </div>

        <div class="hero-media-wrapper">
          <div class="hero-slider">
            <div 
              class="slider-track" 
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
              <div class="slide">
                <video autoplay loop muted playsinline class="slide-media">
                  <source src="/video.mp4" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <div class="slide">
                <img src="/street5.jpg" alt="Streetwear 1" class="slide-media" />
              </div>

              <div class="slide">
                <img src="/street4.jpg" alt="Streetwear 2" class="slide-media" />
              </div>
              
            </div>

            <div class="slider-dots">
              <span 
                v-for="(slide, index) in 3" 
                :key="index" 
                class="dot" 
                :class="{ active: currentSlide === index }"
                @click="currentSlide = index"
              ></span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- 2. Infinite Marquee Divider Line -->
    <section class="marquee-section">
      <div class="marquee">
        <span v-for="i in 8" :key="i">FREE DELIVERY IN ALGERIA &nbsp;•&nbsp; NEW DROPS EVERY WEEK &nbsp;•&nbsp; AUTHENTIC STREETWEAR &nbsp;•&nbsp;</span>
      </div>
    </section>

    <!-- 3. Dual Split Column Section (Featured Drops & New Arrivals Combined Side-by-Side) -->
    <section class="page split-showcase" v-if="featured.length || newArrivals.length">
      
      <!-- Left Major Wing: Premium Featured Grid Display -->
      <div class="split-left-featured" v-if="featured.length">
        <h2 class="section-title">FEATURED DROPS</h2>
        <div class="featured-grid">
          <div v-for="product in featured" :key="product.id" class="featured-card">
            <div class="featured-img-wrap">
              <img :src="product.image" v-if="product.image" class="featured-img" alt="Drop item" />
              <div class="featured-placeholder" v-else>
                <i class="ti ti-shirt" style="font-size:4rem; color:#1565C0;"></i>
              </div>
              <div class="featured-overlay">
                <router-link :to="'/product/' + product.id" class="btn" style="text-decoration:none;">View Drop</router-link>
              </div>
              <span class="featured-badge">FEATURED</span>
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
      </div>

      <!-- Right Minor Wing: Stacked Scrollable New Arrivals Feed -->
      <div class="split-right-arrivals" v-if="newArrivals.length">
        <div class="section-header">
          <h2 class="section-title">NEW ARRIVALS</h2>
          <span class="section-tag">Just dropped</span>
        </div>
        
        <div class="arrivals-stack-list">
          <div v-for="product in newArrivals" :key="product.id" class="arrival-row-card">
            <div class="arrival-row-img-wrap">
              <img :src="product.image" v-if="product.image" class="arrival-row-img" alt="New drop item" />
              <div class="product-img-placeholder" v-else>
                <i class="ti ti-shirt" style="font-size:2rem; color:#1565C0;"></i>
              </div>
              <span class="new-badge-mini">NEW</span>
            </div>
            
            <div class="arrival-row-details">
              <div>
                <p class="product-category">{{ getCategoryName(product.category) }}</p>
                <h4 class="arrival-row-name">
                  <router-link :to="'/product/' + product.id">{{ product.name }}</router-link>
                </h4>
              </div>
              <div class="arrival-row-footer">
                <span class="product-price">{{ product.price }} DA</span>
                <button class="add-btn-mini" @click="addToCart(product.id)" title="Quick Add">
                  <i class="ti ti-shopping-cart-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- 4. Global Core Catalog Grid -->
    <div class="page" id="shop">
      <div class="shop-header">
        <h2 class="section-title">ALL DROPS</h2>
        <div class="search-wrap">
          <i class="ti ti-search"></i>
          <input v-model="search" placeholder="Search pieces..." class="search-input" />
        </div>
      </div>

      <div class="category-filters">
        <button class="cat-btn" :class="{ active: selectedCategory === null }" @click="selectCategory(null)">All</button>
        <button
          v-for="cat in categories" :key="cat.id"
          class="cat-btn"
          :class="{ active: selectedCategory === cat.id }"
          @click="selectCategory(cat.id)"
        >{{ cat.name }}</button>
      </div>

      <div class="products-grid" v-if="products.length">
        <div v-for="product in products" :key="product.id" class="product-card">
          <div class="product-img-wrap">
            <img :src="product.image" v-if="product.image" class="product-img" alt="Product catalog cover" />
            <div class="product-img-placeholder" v-else>
              <i class="ti ti-shirt" style="font-size:3rem; color:#1565C0;"></i>
            </div>
            <span class="new-badge" v-if="product.is_new">NEW</span>
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

    <!-- 5. Shipping Promo Visual Banner -->
    <section class="promo-banner">
      <div class="promo-inner">
        <h2>FREE DELIVERY<br>ALL OVER ALGERIA</h2>
        <p>Order now and get your DRIP delivered to your door 🇩🇿</p>
        <a href="#shop" class="btn" style="text-decoration:none;">Shop Now</a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import axios from 'axios'
import { useCartStore } from '../stores/cart'

const products = ref([])
const categories = ref([])
const featured = ref([])
const newArrivals = ref([])
const search = ref('')
const selectedCategory = ref(null)
const cartStore = useCartStore()

// Slider state configuration
const currentSlide = ref(0)
const totalSlides = 3 
let slideInterval = null

const startSlider = () => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % totalSlides
  }, 4000)
}

const fetchProducts = async () => {
  const params = { search: search.value }
  if (selectedCategory.value) params.category = selectedCategory.value
  const res = await axios.get('/products/', { params })
  const all = res.data.results || res.data
  products.value = all
  featured.value = all.filter(p => p.is_featured).slice(0, 3)
  newArrivals.value = all.filter(p => p.is_new).slice(0, 4)
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
  startSlider()
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
})
</script>

<style scoped>
/* ── Global Page Layout Utility (Fixes edge clipping) ── */
.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem; /* Ensures healthy breathing room on mobile */
  width: 100%;
}

/* ── Hero Presentation Element Engine ── */
.hero {
  background: linear-gradient(135deg, #0D47A1 0%, #1565C0 50%, #1976D2 100%);
  min-height: 600px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden; /* CRITICAL: Prevents huge watermarks from breaking screen width */
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: center;
  z-index: 2;
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

.hero-inner { padding: 2rem 0; }

.hero-sub {
  color: rgba(255,255,255,0.7);
  font-size: 0.75rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.hero-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3.5rem, 8vw, 6.5rem);
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

.hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }

/* Forces buttons to match full-width nicely on very tiny screens */
@media (max-width: 400px) {
  .hero-btns .btn, .hero-btns .btn-outline {
    width: 100%;
    text-align: center;
  }
}

.hero-media-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.hero-slider {
  position: relative;
  width: 100%;
  max-width: 420px;
  aspect-ratio: 3 / 4;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.slider-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide {
  min-width: 100%;
  height: 100%;
}

.slide-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slider-dots {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 5;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: white;
  width: 20px;
  border-radius: 4px;
}

.marquee-section {
  background: #0a0a0a; /* Fallback variable replacement */
  padding: 12px 0;
  overflow: hidden;
  white-space: nowrap;
}

.marquee {
  display: inline-block;
  animation: marquee 30s linear infinite;
  color: rgba(255,255,255,0.7);
  font-size: 0.75rem;
  letter-spacing: 2px;
  font-weight: 600;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ── Split Layout Architecture ── */
.split-showcase {
  display: grid;
  grid-template-columns: 1.6fr 1.1fr;
  gap: 3.5rem;
  align-items: start;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.section-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.5rem;
  letter-spacing: 3px;
  margin-bottom: 1.5rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.section-tag {
  background: #e3f2fd;
  color: #0d47a1;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 20px;
}

/* Featured Area Styling */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

.featured-card {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #eee;
  transition: transform 0.2s, box-shadow 0.2s;
  background: #fff;
}

.featured-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(21,101,192,0.15);
}

.featured-img-wrap {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #e3f2fd;
}

.featured-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.featured-card:hover .featured-img { transform: scale(1.05); }

.featured-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.featured-overlay {
  position: absolute;
  inset: 0;
  background: rgba(13,71,161,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.featured-card:hover .featured-overlay { opacity: 1; }

.featured-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #0d47a1;
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 4px 10px;
  border-radius: 2px;
}

/* New Arrivals Stack Design */
.arrivals-stack-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.arrival-row-card {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 1.25rem;
  padding: 0.75rem;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  align-items: center;
  transition: all 0.2s ease;
}

.arrival-row-card:hover {
  border-color: rgba(21, 101, 192, 0.25);
  box-shadow: 0 6px 20px rgba(13, 71, 161, 0.04);
  transform: translateX(4px);
}

.arrival-row-img-wrap {
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 6px;
  overflow: hidden;
  background: #e3f2fd;
}

.arrival-row-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.new-badge-mini {
  position: absolute;
  bottom: 4px;
  left: 4px;
  background: #1565C0;
  color: white;
  font-size: 0.55rem;
  font-weight: 800;
  letter-spacing: 1px;
  padding: 2px 5px;
  border-radius: 2px;
}

.arrival-row-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0.25rem 0;
}

.arrival-row-name {
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.3;
  margin-top: 2px;
}

.arrival-row-name a {
  text-decoration: none;
  color: #333;
}

.arrival-row-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.add-btn-mini {
  background: rgba(21, 101, 192, 0.08);
  color: #1565C0;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.add-btn-mini:hover {
  background: #1565C0;
  color: white;
}

/* ── Standard Product Catalog Elements ── */
.shop-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
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

.search-input {
  border: none;
  outline: none;
  font-size: 0.9rem;
  width: 100%;
}

.category-filters { 
  display: flex; 
  gap: 10px; 
  flex-wrap: nowrap; /* Forces scroll bar instead of making page wildly long on phone screens */
  overflow-x: auto;
  padding-bottom: 10px;
  margin-bottom: 2.5rem;
  -webkit-overflow-scrolling: touch;
}

.category-filters::-webkit-scrollbar {
  height: 4px;
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
  white-space: nowrap; /* Stops category tags from breaking into two lines */
  transition: all 0.2s;
}

.cat-btn:hover { border-color: #1565C0; color: #1565C0; }
.cat-btn.active { background: #1565C0; color: white; border-color: #1565C0; }

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
  background: white;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(21,101,192,0.15);
}

.product-img-wrap {
  position: relative;
  aspect-ratio: 3/4;
  background: #e3f2fd;
  overflow: hidden;
}

.product-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }

.product-img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e3f2fd;
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
  color: #1565C0;
  font-weight: 600;
  margin-bottom: 4px;
}

.product-name { font-size: 1rem; font-weight: 600; margin-bottom: 12px; }
.product-footer { display: flex; align-items: center; justify-content: space-between; }
.product-price { font-size: 1.1rem; font-weight: 700; color: #0d47a1; }

.add-btn {
  background: #1565C0;
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

.add-btn:hover { background: #0d47a1; }

.new-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #1565C0;
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 4px 10px;
  border-radius: 2px;
}

.promo-banner {
  background: #0d47a1;
  padding: 5rem 1.5rem;
  text-align: center;
  margin-top: 4rem;
}

.promo-inner h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2.5rem, 8vw, 4rem); /* Responsive typography handling */
  color: white;
  letter-spacing: 4px;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.promo-inner p { color: rgba(255,255,255,0.7); margin-bottom: 2rem; font-size: 1rem; }

.empty-state {
  text-align: center;
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

/* ── Media Queries Responsive Matrix ── */
@media (max-width: 1024px) {
  .split-showcase {
    grid-template-columns: 1fr; 
    gap: 3rem;
  }
}

@media (max-width: 992px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    text-align: center;
  }
  .hero-inner { padding: 1rem 0 0 0; }
  .hero-btns { justify-content: center; }
  .hero-slider { max-width: 340px; }
}

@media (max-width: 768px) {
  .hero { min-height: auto; padding: 3rem 0; }
  .hero-title { font-size: 4rem; }
  .hero::before { font-size: 120px; top: 30%; right: -10px; }
  .featured-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
  .shop-header { flex-direction: column; align-items: flex-start; }
  .search-wrap { width: 100%; }
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
}

@media (max-width: 520px) {
  .hero-title { font-size: 3.2rem; }
  .hero::before { display: none; } /* Turns off big background watermark on small screens */
  .featured-grid { grid-template-columns: 1fr; }
  .products-grid { grid-template-columns: 1fr; }
  .arrival-row-card { grid-template-columns: 75px 1fr; gap: 0.85rem; padding: 0.5rem; }
  .arrival-row-name { font-size: 0.85rem; }
}
</style>