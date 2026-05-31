<template>
  <div class="terms">
    <div class="header">
      <h1>Terms of Service</h1>
      <p class="meta">Effective: June 1, 2025 · DRIP Algeria</p>
    </div>

    <div class="page-wrap">
      <div class="intro">
        <p>
          By browsing or purchasing from DRIP, you agree to the following terms.
          Please read them carefully before placing an order.
        </p>
      </div>

      <div class="accordion">
        <div
          v-for="(term, i) in terms"
          :key="term.id"
          class="item"
          :class="{ open: openIndex === i }"
        >
          <button class="item-header" @click="toggle(i)">
            <span class="item-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="item-title">{{ term.title }}</span>
            <span class="item-arrow">
              <svg v-if="openIndex === i" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 10L8 5L13 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 6L8 11L13 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </button>
          <div class="item-body" v-show="openIndex === i">
            <p v-for="(p, j) in term.paragraphs" :key="j">{{ p }}</p>
          </div>
        </div>
      </div>

      <div class="footer-note">
        <p>Questions? Contact us at <a href="mailto:contact@drip.dz">contact@drip.dz</a></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openIndex = ref(0)
function toggle(i) { openIndex.value = openIndex.value === i ? null : i }

const terms = [
  {
    id: 'use',
    title: 'Use of the Site',
    paragraphs: [
      'You must be at least 16 years old to use this site or place an order. By using our website, you confirm that all information you provide is accurate and up to date.',
      'You agree not to misuse the site, attempt to access restricted areas, or use it for any unlawful activity under Algerian law.',
    ],
  },
  {
    id: 'orders',
    title: 'Orders & Payment',
    paragraphs: [
      'All orders are subject to availability. DRIP reserves the right to cancel any order at its discretion, particularly for limited-edition drops where quantities are strictly controlled.',
      'Prices are displayed in Algerian Dinars (DZD). We accept cash on delivery (COD) and any supported payment methods listed at checkout.',
    ],
  },
  {
    id: 'shipping',
    title: 'Shipping & Delivery',
    paragraphs: [
      'We deliver across Algeria through trusted courier partners including Yalidine, Zaki, and Maystro. Delivery times vary by wilaya — typically 1–3 business days for major cities and 3–6 for remote areas.',
      'DRIP is not responsible for delays caused by the courier or circumstances beyond our control. Ensure your phone number and address are correct at checkout.',
    ],
  },
  {
    id: 'returns',
    title: 'Returns & Exchanges',
    paragraphs: [
      'Due to the limited nature of our drops, all sales are final. We do not accept returns or exchanges unless an item arrives damaged or is the wrong product.',
      'If there is an issue with your order, contact us within 48 hours of delivery via Instagram DM or email with your order number and photos.',
    ],
  },
  {
    id: 'ip',
    title: 'Intellectual Property',
    paragraphs: [
      'All designs, graphics, logos, and product photos on this site are the property of DRIP Algeria. Reproducing or using them without written permission is prohibited.',
    ],
  },
  {
    id: 'liability',
    title: 'Limitation of Liability',
    paragraphs: [
      'DRIP shall not be liable for any indirect or consequential damages arising from the use of our site or products. Our liability is limited to the value of the order in question.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to Terms',
    paragraphs: [
      'We may update these terms at any time. The latest version will always be available on this page. Continued use of the site after changes means you accept the updated terms.',
    ],
  },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@300;400;600&display=swap');

.terms {
  min-height: 100vh;
  background: #f5f6fa;
  color: #1a1a2e;
  font-family: 'Open Sans', sans-serif;
}

.header {
  background: #1e40af;
  padding: 52px 24px 36px;
  text-align: center;
  color: #fff;
}

.header h1 {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(30px, 5vw, 52px);
  font-weight: 800;
  margin: 0 0 10px;
  letter-spacing: -0.01em;
}

.meta {
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  margin: 0;
}

.page-wrap {
  max-width: 760px;
  margin: 0 auto;
  padding: 40px 24px 80px;
}

.intro {
  background: #fff;
  border: 1px solid #dde2f0;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 24px;
}

.intro p {
  font-size: 13px;
  line-height: 1.75;
  color: #666;
  margin: 0;
}

/* ACCORDION */
.accordion {
  background: #fff;
  border: 1px solid #dde2f0;
  border-radius: 12px;
  overflow: hidden;
}

.item {
  border-bottom: 1px solid #eaedf7;
}

.item:last-child { border-bottom: none; }

.item-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 24px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  color: #1a1a2e;
  transition: background 0.15s;
}

.item-header:hover { background: #f4f6fd; }
.item.open .item-header { background: #f0f3ff; }

.item-num {
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: #bbb;
  min-width: 24px;
  letter-spacing: 0.05em;
}

.item.open .item-num { color: #1e40af; }

.item-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 600;
  flex: 1;
  transition: color 0.15s;
}

.item.open .item-title { color: #1e40af; }

.item-arrow {
  color: #ccc;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.item.open .item-arrow { color: #1e40af; }

.item-body {
  padding: 4px 24px 20px 62px;
}

.item-body p {
  font-size: 13px;
  line-height: 1.85;
  color: #777;
  margin: 0 0 10px;
}

.item-body p:last-child { margin-bottom: 0; }

/* FOOTER */
.footer-note {
  margin-top: 20px;
  padding: 18px 24px;
  background: #fff;
  border: 1px solid #dde2f0;
  border-radius: 12px;
  text-align: center;
}

.footer-note p { font-size: 13px; color: #999; margin: 0; }
.footer-note a { color: #1e40af; text-decoration: none; font-weight: 600; }
.footer-note a:hover { text-decoration: underline; }
</style>