<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-inner">
        <router-link to="/" class="logo">DRIP</router-link>
        <div class="nav-links">
  <router-link to="/" class="hide-mobile">Shop</router-link>
  <router-link to="/cart" class="cart-link">
    <i class="ti ti-shopping-bag"></i>
    <span class="cart-count" v-if="cartStore.itemCount > 0">{{ cartStore.itemCount }}</span>
  </router-link>
  <router-link to="/orders" class="hide-mobile">Orders</router-link>
  <router-link to="/login" v-if="!auth.isLoggedIn" class="btn-nav">Login</router-link>
  <router-link to="/register" v-if="!auth.isLoggedIn" class="btn-nav hide-mobile">Register</router-link>
  <router-link to="/contact" class="hide-mobile">Contact</router-link>
  <button v-if="auth.isLoggedIn" @click="auth.logout()" class="btn-nav">Logout</button>
</div>
      </div>
    </nav>
    <router-view />
    <footer class="footer">
      <p>© 2026 DRIP. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { useAuthStore } from './stores/auth'
import { useCartStore } from './stores/cart'
const auth = useAuthStore()
const cartStore = useCartStore()
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --blue: #1565C0;
  --blue-dark: #0D47A1;
  --blue-light: #E3F2FD;
  --blue-mid: #1976D2;
  --white: #ffffff;
  --off-white: #F8F9FF;
  --gray: #f0f0f0;
  --text: #0a0a0a;
  --text-muted: #666;
}

body {
  font-family: 'Inter', sans-serif;
  background: var(--white);
  color: var(--text);
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--blue-dark);
  border-bottom: 2px solid var(--blue);
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem;
  color: var(--white);
  text-decoration: none;
  letter-spacing: 4px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-links a, .nav-links button {
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}

.nav-links a:hover, .nav-links button:hover { color: var(--white); }

.cart-link { position: relative; font-size: 1.3rem !important; }

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #FF5252;
  color: white;
  font-size: 10px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-nav {
  background: rgba(255,255,255,0.15) !important;
  padding: 6px 14px !important;
  border-radius: 4px !important;
  border: 1px solid rgba(255,255,255,0.3) !important;
}

.btn-nav:hover { background: rgba(255,255,255,0.25) !important; }

.footer {
  background: var(--blue-dark);
  color: rgba(255,255,255,0.5);
  text-align: center;
  padding: 2rem;
  font-size: 0.8rem;
  letter-spacing: 1px;
  margin-top: 4rem;
}

.btn {
  background: var(--blue);
  color: white;
  border: none;
  padding: 12px 28px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s;
}

.btn:hover { background: var(--blue-dark); }

.btn-outline {
  background: transparent;
  color: var(--blue);
  border: 2px solid var(--blue);
  padding: 10px 26px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.btn-outline:hover { background: var(--blue); color: white; }

.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

/* ── MOBILE ── */
@media (max-width: 768px) {
  .nav-inner { padding: 0 1rem; }

  .nav-links { gap: 1rem; }

  .nav-links a, .nav-links button { font-size: 0.72rem; letter-spacing: 0.5px; }

  .btn-nav { padding: 5px 10px !important; }

  .page { padding: 2rem 1rem; }

  .btn { padding: 12px 20px; font-size: 0.8rem; }
}

@media (max-width: 480px) {
  .logo { font-size: 1.6rem; }

  .nav-links { gap: 0.6rem; }

  .nav-links .hide-mobile { display: none; }
}
</style>