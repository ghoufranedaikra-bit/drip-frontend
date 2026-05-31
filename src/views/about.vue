<template>
  <div class="about">
    <div class="header">
      <h1>About <span class="brand">DRIP</span></h1>
      <p class="tagline">Street wear born in Algeria. Built for the culture.</p>
    </div>

    <div class="page-wrap">
      <div class="section">
        <h2>Our Story</h2>
        <p>
          DRIP started in Algeria with one goal: give the local street culture the brand it deserves.
          No importing, no faking — just real pieces made for real people who live and breathe the culture.
          From Algiers to Oran, the drip is yours.
        </p>
        <p>
          What began as limited drops for a tight circle grew into something the culture couldn't ignore.
          Every piece is designed to age with you, not against you.
        </p>
      </div>

      <div class="pillars">
        <div class="pillar" v-for="pillar in pillars" :key="pillar.title">
          <div class="pillar-icon">{{ pillar.icon }}</div>
          <h3>{{ pillar.title }}</h3>
          <p>{{ pillar.body }}</p>
        </div>
      </div>

      <div class="section">
        <h2>The Team</h2>
        <div class="members">
          <div class="member" v-for="m in team" :key="m.name">
            <div class="member-avatar">{{ m.initials }}</div>
            <div class="member-info">
              <strong>{{ m.name }}</strong>
              <span>{{ m.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cta-bar">
      <div class="cta-text">
        <h2>Ready to cop?</h2>
        <p>New drops every week. Don't sleep on it.</p>
      </div>
      <a href="/shop" class="cta-btn">Shop the Drop</a>
    </div>
  </div>
</template>

<script setup>
const pillars = [
  { icon: '✦', title: 'Quality First',   body: "Every piece is checked before it reaches you. If it doesn't meet the standard, it doesn't ship." },
  { icon: '◈', title: 'Limited Always',  body: "No restocks. No mass production. When it's gone, it's gone — that's the point." },
  { icon: '◎', title: 'Made for Algeria', body: 'Designed with the Algerian street scene in mind. Sizes, fits, and styles that actually work for us.' },
]

const team = [
  { name: 'Daikra Ghoufrane', role: 'Founder & Creative Director', initials: 'DG' },
  { name: 'Belaggoun Nourhane',    role: 'Head of Design',              initials: 'BN' },
  { name: 'Belaggoun Malak',     role: 'Brand & Community',           initials: 'BK' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@300;400;600&display=swap');

.about {
  min-height: 100vh;
  background: #f5f6fa;
  color: #1a1a2e;
  font-family: 'Open Sans', sans-serif;
}

.header {
  background: #1e40af;
  padding: 60px 24px 44px;
  text-align: center;
  color: #fff;
}

.header h1 {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(34px, 6vw, 62px);
  font-weight: 800;
  margin: 0 0 14px;
  letter-spacing: -0.01em;
}

.brand {
  background: rgba(255,255,255,0.18);
  padding: 2px 14px;
  border-radius: 6px;
}

.tagline {
  font-size: 15px;
  color: rgba(255,255,255,0.7);
  margin: 0;
  font-weight: 300;
}

.page-wrap {
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 24px 0;
}

.section {
  background: #fff;
  border: 1px solid #dde2f0;
  border-radius: 12px;
  padding: 36px 32px;
  margin-bottom: 24px;
}

.section h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #1e40af;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 18px;
}

.section p {
  font-size: 14px;
  line-height: 1.8;
  color: #666;
  margin: 0 0 14px;
}
.section p:last-child { margin-bottom: 0; }

/* PILLARS */
.pillars {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.pillar {
  background: #fff;
  border: 1px solid #dde2f0;
  border-radius: 12px;
  padding: 28px 24px;
}

.pillar-icon {
  font-size: 22px;
  color: #1e40af;
  margin-bottom: 12px;
}

.pillar h3 {
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #1a1a2e;
  margin: 0 0 8px;
}

.pillar p {
  font-size: 13px;
  line-height: 1.7;
  color: #777;
  margin: 0;
}

/* TEAM */
.members {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.member {
  display: flex;
  align-items: center;
  gap: 14px;
}

.member-avatar {
  width: 44px;
  height: 44px;
  background: #1e40af;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 13px;
  color: #fff;
  flex-shrink: 0;
}

.member-info { display: flex; flex-direction: column; gap: 2px; }
.member-info strong { font-size: 14px; font-weight: 600; color: #1a1a2e; }
.member-info span   { font-size: 12px; color: #888; }

/* CTA */
.cta-bar {
  background: #1e40af;
  padding: 48px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  gap: 20px;
  margin-top: 48px;
}

.cta-text h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  margin: 0 0 6px;
}

.cta-text p { color: rgba(255,255,255,0.65); font-size: 14px; margin: 0; }

.cta-btn {
  display: inline-block;
  padding: 13px 34px;
  background: #fff;
  color: #1e40af;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.05em;
  text-decoration: none;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.18);
}
</style>