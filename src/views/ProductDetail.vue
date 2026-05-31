<template>
  <div class="page" v-if="product">
    <div class="detail-layout">
      <div class="detail-img-section">
        <img :src="product.image" v-if="product.image" class="detail-img" />
        <div class="img-placeholder" v-else>
          <i class="ti ti-shirt" style="font-size:6rem; color:#1565C0;"></i>
        </div>
        <button class="wishlist-btn" @click="toggleWishlist" :class="{ active: isWishlisted }">
          <i :class="isWishlisted ? 'ti ti-heart-filled' : 'ti ti-heart'"></i>
          {{ isWishlisted ? 'Wishlisted' : 'Add to Wishlist' }}
        </button>
      </div>
<div class="related-section" v-if="related.length">
  <h2 class="related-title">YOU MIGHT ALSO LIKE</h2>
  <div class="related-grid">
    <div v-for="item in related" :key="item.id" class="product-card" @click="goToProduct(item.id)">
      <div class="product-img-wrap">
        <img :src="getImageUrl(item.image)" v-if="item.image" class="product-img" />
        <div class="product-img-placeholder" v-else>
          <i class="ti ti-shirt" style="font-size:2rem; color:#1565C0;"></i>
        </div>
        <div class="product-overlay">
          <button class="btn" @click.stop="goToProduct(item.id)">View</button>
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-name">{{ item.name }}</h3>
        <div class="product-footer">
          <span class="product-price">{{ item.price }} DA</span>
          <button class="add-btn" @click.stop="quickAdd(item.id)">
            <i class="ti ti-shopping-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
      <div class="detail-info">
        <div class="detail-badges">
          <span class="badge new" v-if="product.is_new">NEW</span>
          <span class="badge featured" v-if="product.is_featured">FEATURED</span>
        </div>

        <p class="detail-category">{{ categoryName }}</p>
        <h1 class="detail-name">{{ product.name }}</h1>
        <p class="detail-price">{{ product.price }} DA</p>

        <p class="detail-desc" v-if="product.description">{{ product.description }}</p>

        <div class="selector-section" v-if="product.colors_list?.length">
          <p class="selector-label">COLOR — <span>{{ selectedColor }}</span></p>
          <div class="color-options">
            <button
              v-for="color in product.colors_list"
              :key="color"
              class="color-btn"
              :class="{ active: selectedColor === color }"
              :style="{ background: colorMap[color] || '#ccc' }"
              @click="selectedColor = color"
              :title="color"
            ></button>
          </div>
        </div>

        <div class="selector-section" v-if="product.sizes_list?.length">
          <p class="selector-label">SIZE — <span>{{ selectedSize || 'Select a size' }}</span></p>
          <div class="size-options">
            <button
              v-for="size in product.sizes_list"
              :key="size"
              class="size-btn"
              :class="{ active: selectedSize === size }"
              @click="selectedSize = size"
            >{{ size }}</button>
          </div>
          <p class="size-guide" @click="showSizeGuide = !showSizeGuide">
            <i class="ti ti-ruler"></i> Size Guide
          </p>
          <div class="size-guide-table" v-if="showSizeGuide">
            <table>
              <tr><th>Size</th><th>Chest</th><th>Waist</th><th>Hip</th></tr>
              <tr><td>XS</td><td>82cm</td><td>62cm</td><td>88cm</td></tr>
              <tr><td>S</td><td>88cm</td><td>68cm</td><td>94cm</td></tr>
              <tr><td>M</td><td>94cm</td><td>74cm</td><td>100cm</td></tr>
              <tr><td>L</td><td>100cm</td><td>80cm</td><td>106cm</td></tr>
              <tr><td>XL</td><td>106cm</td><td>86cm</td><td>112cm</td></tr>
            </table>
          </div>
        </div>

        <p class="stock-status" :class="{ low: product.stock < 5, out: product.stock === 0 }">
          <i class="ti ti-circle-filled" style="font-size:8px"></i>
          {{ product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left!` : 'Out of Stock' }}
        </p>

        <p class="error-msg" v-if="error">{{ error }}</p>

        <div class="detail-actions">
          <button class="btn" @click="addToCart" :disabled="product.stock === 0">
            <i class="ti ti-shopping-bag"></i> Add to Bag
          </button>
          <router-link to="/" class="btn-outline" style="text-decoration:none;">
            Back to Shop
          </router-link>
        </div>

        <div class="product-perks">
          <div class="perk">
            <i class="ti ti-truck-delivery"></i>
            <span>Free delivery in Algeria</span>
          </div>
          <div class="perk">
            <i class="ti ti-refresh"></i>
            <span>Easy 14-day returns</span>
          </div>
          <div class="perk">
            <i class="ti ti-shield-check"></i>
            <span>Authentic DRIP product</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useCartStore } from '../stores/cart'

const product = ref(null)
const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const selectedSize = ref('')
const selectedColor = ref('')
const isWishlisted = ref(false)
const showSizeGuide = ref(false)
const error = ref('')

const colorMap = {
  'Black': '#0a0a0a',
  'White': '#f5f5f5',
  'Blue': '#1565C0',
  'Navy': '#0D47A1',
  'Red': '#c62828',
  'Green': '#2e7d32',
  'Gray': '#757575',
  'Beige': '#d7ccc8',
  'Brown': '#5d4037',
  'Yellow': '#f9a825',
  'Orange': '#e65100',
  'Pink': '#e91e8c',
  'Purple': '#6a1b9a',
}

const categoryName = computed(() => {
  return product.value?.category_name || 'DRIP'
})

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
  if (isWishlisted.value) {
    wishlist.push(product.value.id)
  } else {
    const idx = wishlist.indexOf(product.value.id)
    if (idx > -1) wishlist.splice(idx, 1)
  }
  localStorage.setItem('wishlist', JSON.stringify(wishlist))
}

const addToCart = async () => {
  if (product.value.sizes_list?.length && !selectedSize.value) {
    error.value = 'Please select a size'
    return
  }
  if (product.value.colors_list?.length && !selectedColor.value) {
    error.value = 'Please select a color'
    return
  }
  error.value = ''
  try {
    await cartStore.addItem(product.value.id, 1, selectedSize.value, selectedColor.value)
    router.push('/cart')
  } catch {
    error.value = 'Please login to add items to cart'
  }
}
const related = ref([])

const getImageUrl = (image) => {
  if (!image) return ''
  if (image.startsWith('http')) return image
  return `http://127.0.0.1:8000${image}`
}

const goToProduct = (id) => {
  router.push(`/product/${id}`)
  window.scrollTo(0, 0)
}

const quickAdd = async (id) => {
  try {
    await cartStore.addItem(id)
    alert('Added to bag!')
  } catch {
    alert('Please login first')
  }
}

onMounted(async () => {
  const res = await axios.get(`/products/${route.params.id}/`)
  product.value = res.data
  if (res.data.colors_list?.length) selectedColor.value = res.data.colors_list[0]
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
  isWishlisted.value = wishlist.includes(res.data.id)

  const relatedRes = await axios.get(`/products/${route.params.id}/related/`)
  related.value = relatedRes.data
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
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  border-radius: 12px;
}

.img-placeholder {
  width: 100%;
  aspect-ratio: 3/4;
  background: var(--blue-light);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wishlist-btn {
  width: 100%;
  margin-top: 1rem;
  background: white;
  border: 1.5px solid #e0e0e0;
  border-radius: 6px;
  padding: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
}

.wishlist-btn:hover { border-color: #e91e63; color: #e91e63; }
.wishlist-btn.active { background: #fce4ec; border-color: #e91e63; color: #e91e63; }

.detail-badges {
  display: flex;
  gap: 8px;
  margin-bottom: 1rem;
}

.badge {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 4px 12px;
  border-radius: 2px;
}

.badge.new { background: #1565C0; color: white; }
.badge.featured { background: #0a0a0a; color: white; }

.detail-category {
  font-size: 0.75rem;
  letter-spacing: 3px;
  color: var(--blue);
  font-weight: 600;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
}

.detail-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3.5rem;
  letter-spacing: 2px;
  line-height: 1;
  margin-bottom: 1rem;
}

.detail-price {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--blue-dark);
  margin-bottom: 1.25rem;
}

.detail-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  border-left: 3px solid var(--blue-light);
  padding-left: 1rem;
}

.selector-section { margin-bottom: 1.5rem; }

.selector-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 10px;
  color: var(--text);
}

.selector-label span { color: var(--blue); }

.color-options { display: flex; gap: 10px; flex-wrap: wrap; }

.color-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;
}

.color-btn:hover { transform: scale(1.15); }
.color-btn.active { border-color: var(--blue-dark); transform: scale(1.15); }

.size-options { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 8px; }

.size-btn {
  min-width: 48px;
  height: 48px;
  border: 1.5px solid #e0e0e0;
  border-radius: 4px;
  background: white;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Inter', sans-serif;
  padding: 0 12px;
}

.size-btn:hover { border-color: var(--blue); color: var(--blue); }
.size-btn.active { background: var(--blue-dark); color: white; border-color: var(--blue-dark); }

.size-guide {
  font-size: 0.78rem;
  color: var(--blue);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 6px;
  font-weight: 600;
}

.size-guide-table {
  margin-top: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

.size-guide-table table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
.size-guide-table th { background: var(--blue-dark); color: white; padding: 8px 12px; text-align: left; }
.size-guide-table td { padding: 8px 12px; border-bottom: 1px solid #f0f0f0; }
.size-guide-table tr:last-child td { border-bottom: none; }

.stock-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2e7d32;
}

.stock-status.low { color: #e65100; }
.stock-status.out { color: #c62828; }

.error-msg { color: #c62828; font-size: 0.85rem; margin-bottom: 1rem; }

.detail-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; }

.product-perks {
  border-top: 1px solid #eee;
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.perk {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.perk i { color: var(--blue); font-size: 1.1rem; }

@media (max-width: 768px) {
  .detail-layout { grid-template-columns: 1fr; gap: 2rem; }
  .detail-name { font-size: 2.5rem; }
}
.related-section {
  margin-top: 5rem;
  border-top: 1px solid #eee;
  padding-top: 3rem;
}

.related-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem;
  letter-spacing: 3px;
  margin-bottom: 2rem;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.product-card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
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

.product-info { padding: 0.75rem 1rem; }

.product-name { font-size: 0.9rem; font-weight: 600; margin-bottom: 8px; }

.product-footer { display: flex; align-items: center; justify-content: space-between; }

.product-price { font-size: 1rem; font-weight: 700; color: var(--blue-dark); }

.add-btn {
  background: var(--blue);
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.add-btn:hover { background: var(--blue-dark); }

@media (max-width: 768px) {
  .related-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>