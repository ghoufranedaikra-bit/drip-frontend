<template>
  <div id="app">
    <!-- 1. The Premium Glassmorphism Navbar -->
    <nav class="navbar">
      <div class="nav-container">
        
        <!-- Left Wing: Core Store Navigation -->
        <div class="nav-left hide-mobile">
          <router-link to="/" class="nav-link">Shop</router-link>
          <router-link to="/orders" class="nav-link">Orders</router-link>
          <router-link to="/contact" class="nav-link">Contact</router-link>
        </div>

        <!-- Center Hub: Verbatim Image Asset Resolution -->
        <div class="nav-center">
          <router-link to="/" class="logo-wrap">
            <img src="/logo.webp" alt="DRIP Streetwear Logo" class="brand-logo" />
          </router-link>
        </div>

        <!-- Right Wing: System Actions & Micro-indicators -->
        <div class="nav-right">
          <!-- Wishlist Target Icon -->
          <router-link to="/wishlist" class="icon-link" title="Wishlist">
            <i class="ti ti-heart"></i>
          </router-link>

          <!-- Cart Target Icon + Reactive Overlay Count Badge -->
          <router-link to="/cart" class="icon-link cart-link" title="Cart">
            <i class="ti ti-shopping-bag"></i>
            <span class="cart-count" v-if="cartStore.itemCount > 0">
              {{ cartStore.itemCount }}
            </span>
          </router-link>

          <span class="nav-divider"></span>

          <!-- Identity Verification Control Block -->
          <div class="auth-actions">
            <template v-if="!auth.isLoggedIn">
              <router-link to="/login" class="btn-login">Login</router-link>
              <router-link to="/register" class="btn-register hide-mobile">Register</router-link>
            </template>
            <template v-else>
              <button @click="auth.logout()" class="btn-logout">
                <i class="ti ti-logout hide-desktop"></i>
                <span class="hide-mobile">Logout</span>
              </button>
            </template>
          </div>
        </div>

      </div>
    </nav>

    <!-- 2. Main Injected Page Route Area -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- 3. Clean Modular Brand Footer -->
    <footer class="footer">
      <div class="footer-inner">
        
        <div class="footer-brand">
          <h2 class="footer-logo">DRIP</h2>
          <p>Premium streetwear for those<br>who move different. 🇩🇿</p>
          <div class="social-links">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener"><i class="ti ti-brand-instagram"></i></a>
            <a href="https://www.tiktok.com/en/" target="_blank" rel="noopener"><i class="ti ti-brand-tiktok"></i></a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener"><i class="ti ti-brand-facebook"></i></a>
            <a href="https://x.com/" target="_blank" rel="noopener"><i class="ti ti-brand-twitter"></i></a>
          </div>
        </div>
        
        <div class="footer-col">
          <h4>SHOP</h4>
          <router-link to="/">All Products</router-link>
          <router-link to="/">New Arrivals</router-link>
          <router-link to="/">Featured</router-link>
          <router-link to="/wishlist">Wishlist</router-link>
        </div>
        
        <div class="footer-col">
          <h4>HELP</h4>
          <router-link to="/contact">Contact Us</router-link>
          <router-link to="/orders">My Orders</router-link>
          <router-link to="/contact">Returns</router-link>
          <router-link to="/contact">Complaints</router-link>
        </div>
        
        <div class="footer-col">
          <h4>INFO</h4>
          <router-link to="/size-guide">Size Guide</router-link>
          <router-link to="/about">About DRIP</router-link>
          <router-link to="/privacy-policy">Privacy Policy</router-link>
          <router-link to="/terms">Terms of service</router-link>
        </div>

      </div>
      
      <div class="footer-bottom">
        <p>© 2026 DRIP. All rights reserved. Made with 🔥 in Algeria.</p>
        <div class="payment-icons">
          <span>CCP</span>
          <span>BaridiMob</span>
          <span>Cash</span>
        </div>
      </div>
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
/* ── Global Document Rules & Imports ── */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap');

* { 
  margin: 0; 
  padding: 0; 
  box-sizing: border-box; 
}

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
  -webkit-font-smoothing: antialiased;
}

/* ── Refactored Floating Navbar Styles ── */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 85px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(13, 71, 161, 0.08);
  display: flex;
  align-items: center;
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.nav-left {
  display: flex;
  gap: 2rem;
}

.nav-link {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #1a1a1a;
  text-decoration: none;
  position: relative;
  padding: 0.4rem 0;
  transition: color 0.2s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--blue);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.nav-link:hover {
  color: var(--blue);
}

.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-wrap {
  display: block;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.logo-wrap:hover {
  transform: scale(1.05);
}

.brand-logo {
  height: 60px;
  width: auto;
  object-fit: contain;
}

.nav-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.5rem;
}

.icon-link {
  color: #1a1a1a;
  font-size: 1.35rem;
  text-decoration: none;
  position: relative;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
}

.icon-link:hover {
  color: var(--blue);
}

.cart-link {
  position: relative;
}

.cart-count {
  position: absolute;
  top: -6px;
  right: -8px;
  background: #FF5252;
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}

.nav-divider {
  width: 1px;
  height: 18px;
  background-color: rgba(0, 0, 0, 0.1);
}

.auth-actions {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.btn-login {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #1a1a1a;
  text-decoration: none;
  transition: color 0.2s ease;
}

.btn-login:hover {
  color: var(--blue);
}

.btn-register {
  background: #1a1a1a;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.55rem 1.2rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.btn-register:hover {
  background: var(--blue);
  transform: translateY(-1px);
}

.btn-logout {
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.15);
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 0.45rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-logout:hover {
  border-color: #FF5252;
  color: #FF5252;
  background: rgba(255, 82, 82, 0.04);
}

/* Offset Document Height due to Fixed Header layout */
.main-content {
  padding-top: 85px;
}

/* ── Main Component Page UI Atoms ── */
.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
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

/* ── Modernized High-End Modular Footer Styles ── */
.footer {
  background: #060e1a;
  color: rgba(255,255,255,0.6);
  margin-top: 4rem;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
}

.footer-logo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3rem;
  letter-spacing: 6px;
  color: white;
  margin-bottom: 1rem;
}

.footer-brand p {
  font-size: 0.88rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.social-links { display: flex; gap: 12px; }

.social-links a {
  width: 38px;
  height: 38px;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.6);
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.2s;
}

.social-links a:hover {
  background: var(--blue);
  border-color: var(--blue);
  color: white;
}

.footer-col h4 {
  font-size: 0.75rem;
  letter-spacing: 3px;
  color: white;
  font-weight: 700;
  margin-bottom: 1.25rem;
}

.footer-col a {
  display: block;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  font-size: 0.88rem;
  margin-bottom: 10px;
  transition: color 0.2s;
}

.footer-col a:hover { color: white; }

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.08);
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
}

.payment-icons { display: flex; gap: 8px; }

.payment-icons span {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.6);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 1px;
}

/* ── Breakpoints & Responsiveness Configurations ── */
@media (max-width: 992px) {
  .nav-container { padding: 0 1.5rem; }
  .footer-inner { gap: 2rem; }
}

@media (max-width: 768px) {
  .nav-container {
    grid-template-columns: 1fr auto;
    gap: 0;
  }
  
  .hide-mobile {
    display: none !important;
  }
  
  .navbar {
    height: 70px;
  }
  
  .brand-logo {
    height: 48px;
  }
  
  .main-content {
    padding-top: 70px;
  }

  .page { padding: 2rem 1rem; }
  .btn { padding: 12px 20px; font-size: 0.8rem; }
  
  .footer-inner { grid-template-columns: 1fr 1fr; gap: 2rem; }
  .footer-brand { grid-column: 1 / -1; }
  .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
}

@media (max-width: 480px) {
  .nav-right { gap: 1rem; }
  .footer-inner { grid-template-columns: 1fr; }
}

@media (min-width: 769px) {
  .hide-desktop {
    display: none !important;
  }
}
</style>