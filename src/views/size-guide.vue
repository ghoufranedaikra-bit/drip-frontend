<template>
  <div class="size-guide">
    <div class="header">
      <h1>Size Guide</h1>
      <p class="subtitle">Find your perfect fit</p>
    </div>

    <div class="page-wrap">
      <div class="category" v-for="category in categories" :key="category.name">
        <h2>{{ category.name }}</h2>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th v-for="col in category.columns" :key="col">{{ col }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in category.rows" :key="row[0]">
                <td v-for="(val, i) in row" :key="i">{{ val }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="tips">
        <h2>How To Measure</h2>
        <ul>
          <li v-for="tip in tips" :key="tip.label">
            <span class="tip-label">{{ tip.label }}</span>
            <span class="tip-desc">{{ tip.desc }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const categories = [
  {
    name: 'Tops & Hoodies',
    columns: ['Size', 'Chest (cm)', 'Length (cm)', 'Shoulder (cm)'],
    rows: [
      ['XS', '86–91', '69', '41'],
      ['S',  '91–96', '71', '43'],
      ['M',  '96–101','74', '46'],
      ['L',  '101–106','76','48'],
      ['XL', '106–111','79','51'],
      ['XXL','111–116','81','53'],
    ],
  },
  {
    name: 'Bottoms',
    columns: ['Size', 'Waist (cm)', 'Hip (cm)', 'Inseam (cm)'],
    rows: [
      ['XS', '66–71', '86–91', '76'],
      ['S',  '71–76', '91–96', '76'],
      ['M',  '76–81', '96–101','79'],
      ['L',  '81–86', '101–106','79'],
      ['XL', '86–91', '106–111','81'],
      ['XXL','91–96', '111–116','81'],
    ],
  },
]

const tips = [
  { label: 'Chest',  desc: 'Measure around the fullest part of your chest, keeping the tape horizontal.' },
  { label: 'Waist',  desc: 'Measure around your natural waistline, keeping the tape comfortably loose.' },
  { label: 'Hip',    desc: 'Stand with feet together and measure around the fullest part of your hips.' },
  { label: 'Inseam', desc: 'Measure from the crotch seam to the bottom of the leg.' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@300;400;600&display=swap');

.size-guide {
  min-height: 100vh;
  background: #f5f6fa;
  color: #1a1a2e;
  font-family: 'Open Sans', sans-serif;
}

.header {
  background: #1e40af;
  padding: 52px 0 36px;
  text-align: center;
  color: #fff;
}

.header h1 {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(30px, 5vw, 52px);
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.01em;
}

.subtitle {
  font-size: 13px;
  color: rgba(255,255,255,0.65);
  margin: 8px 0 0;
  letter-spacing: 0.06em;
}

.page-wrap {
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}

.category {
  margin-bottom: 48px;
}

.category h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #1e40af;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 14px;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 10px;
  border: 1px solid #dde2f0;
  box-shadow: 0 2px 10px rgba(30,64,175,0.06);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  background: #fff;
}

thead th {
  background: #1e40af;
  color: #fff;
  text-align: left;
  padding: 13px 20px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

tbody tr:nth-child(even) { background: #f4f6fd; }
tbody tr { border-bottom: 1px solid #eaedf7; transition: background 0.15s; }
tbody tr:hover { background: #e6eaf8; }

tbody td { padding: 13px 20px; color: #444; }
tbody td:first-child {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  color: #1e40af;
}

.tips {
  padding-top: 40px;
  border-top: 2px solid #dde2f0;
}

.tips h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #1e40af;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 18px;
}

.tips ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.tips li {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 16px 20px;
  border: 1px solid #dde2f0;
  border-radius: 8px;
  background: #fff;
}

.tip-label {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #1e40af;
  min-width: 64px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding-top: 2px;
}

.tip-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.65;
}
</style>