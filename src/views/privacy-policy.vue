<template>
  <div class="privacy">
    <div class="header">
      <h1>Privacy Policy</h1>
      <p class="meta">Last updated: June 1, 2025</p>
    </div>

    <div class="page-wrap">
      <div class="layout">
        <nav class="toc">
          <p class="toc-label">On This Page</p>
          <a
            v-for="section in sections"
            :key="section.id"
            :href="`#${section.id}`"
            :class="{ active: activeId === section.id }"
            @click.prevent="scrollTo(section.id)"
          >{{ section.title }}</a>
        </nav>

        <div class="sections">
          <div
            v-for="section in sections"
            :key="section.id"
            :id="section.id"
            class="section"
          >
            <h2>{{ section.title }}</h2>
            <p v-for="(p, i) in section.paragraphs" :key="i">{{ p }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeId = ref('collection')

const sections = [
  {
    id: 'collection',
    title: '1. Information We Collect',
    paragraphs: [
      'We collect information you provide when you create an account, place an order, subscribe to our newsletter, or contact support — including your name, email, phone number, wilaya, and delivery address.',
      'We also collect technical data automatically when you visit our site: IP address, browser type, device info, and navigation behaviour.',
    ],
  },
  {
    id: 'use',
    title: '2. How We Use Your Information',
    paragraphs: [
      'Your information is used to process orders, confirm deliveries via Algerian shipping partners, and provide customer support.',
      'With your consent we may send you updates about new drops and promotions. We never sell your data to third parties.',
    ],
  },
  {
    id: 'sharing',
    title: '3. Information Sharing',
    paragraphs: [
      'We share your delivery details with our courier partners operating in Algeria (e.g. Yalidine, Zaki, Maystro) solely to fulfil your order.',
      'We may disclose information if required by Algerian law or competent authorities.',
    ],
  },
  {
    id: 'cookies',
    title: '4. Cookies & Tracking',
    paragraphs: [
      'We use cookies to keep you logged in, remember your cart, and understand how visitors use the site. You can disable cookies in your browser settings.',
    ],
  },
  {
    id: 'rights',
    title: '5. Your Rights',
    paragraphs: [
      'You have the right to access, correct, or delete your personal data at any time. To make a request, contact us at privacy@drip.dz.',
    ],
  },
  {
    id: 'security',
    title: '6. Data Security',
    paragraphs: [
      'All sensitive data is transmitted over HTTPS. Payment information is handled by our payment provider and never stored on our servers.',
    ],
  },
  {
    id: 'contact',
    title: '7. Contact Us',
    paragraphs: [
      'For any privacy-related questions, email us at privacy@drip.dz or message us on our social channels. We respond within 48 hours.',
    ],
  },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function onScroll() {
  for (const section of [...sections].reverse()) {
    const el = document.getElementById(section.id)
    if (el && el.getBoundingClientRect().top <= 120) {
      activeId.value = section.id
      return
    }
  }
  activeId.value = sections[0].id
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@300;400;600&display=swap');

.privacy {
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
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}

.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
}

/* TOC */
.toc {
  position: sticky;
  top: 24px;
  align-self: start;
  background: #fff;
  border: 1px solid #dde2f0;
  border-radius: 12px;
  padding: 24px 20px;
}

.toc-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #aaa;
  margin: 0 0 12px;
}

.toc a {
  display: block;
  font-size: 12px;
  color: #888;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 6px;
  margin-bottom: 2px;
  transition: background 0.15s, color 0.15s;
  line-height: 1.4;
}

.toc a:hover { background: #f0f3ff; color: #1e40af; }
.toc a.active { background: #e8edf8; color: #1e40af; font-weight: 600; }

/* SECTIONS */
.sections {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.section {
  background: #fff;
  border: 1px solid #dde2f0;
  border-radius: 12px;
  padding: 28px 28px;
  scroll-margin-top: 80px;
  margin-bottom: 16px;
}

.section h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #1e40af;
  margin: 0 0 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.section p {
  font-size: 13px;
  line-height: 1.85;
  color: #666;
  margin: 0 0 12px;
}

.section p:last-child { margin-bottom: 0; }

@media (max-width: 720px) {
  .layout { grid-template-columns: 1fr; }
  .toc { position: static; }
}
</style>