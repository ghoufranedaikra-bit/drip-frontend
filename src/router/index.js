import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Cart from '../views/Cart.vue'
import Orders from '../views/Orders.vue'
import ProductDetail from '../views/ProductDetail.vue'
import OrderConfirmation from '../views/OrderConfirmation.vue'
import Contact from '../views/Contact.vue'
import Wishlist from '../views/Wishlist.vue'
import terms from '../views/terms.vue'
import privacyPolicy from '../views/privacy-policy.vue'
import about from '../views/about.vue'
import sizeGuide from '../views/size-guide.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/cart', component: Cart },
  { path: '/orders', component: Orders },
  { path: '/product/:id', component: ProductDetail },
  { path: '/order-confirmation', component: OrderConfirmation },
  { path: '/contact', component: Contact },
  { path: '/wishlist', component: Wishlist },
  { path: '/about', component: about },
  { path: '/size-guide', component: sizeGuide },
  { path: '/terms', component: terms },
  { path: '/privacy-policy', component: privacyPolicy },
]

export default createRouter({
  history: createWebHistory(),
  routes
})