import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Cart from '../views/Cart.vue'
import Orders from '../views/Orders.vue'
import ProductDetail from '../views/ProductDetail.vue'
import OrderConfirmation from '../views/OrderConfirmation.vue'
import Contact from '../views/Contact.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/cart', component: Cart },
  { path: '/orders', component: Orders },
  { path: '/product/:id', component: ProductDetail },
  { path: '/order-confirmation', component: OrderConfirmation },
  { path: '/contact', component: Contact },
]

export default createRouter({
  history: createWebHistory(),
  routes
})