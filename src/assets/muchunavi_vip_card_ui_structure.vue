<template>
  <div class="page">
    <section class="vip-card-wrap">
      <button
        class="vip-card"
        :class="{ active: isActive, expanded: isExpanded }"
        @click="handleCardClick"
      >
        <div class="metal-texture"></div>
        <div class="ambient-glow"></div>
        <div class="shine"></div>

        <div class="card-header">
          <div>
            <div class="brand">MUCHUNAVIメンバー</div>
            <div class="sub">WELCOME MEMBER</div>
            <div class="level-chip">
              <span class="diamond">◆</span>
              <span>{{ member.level }}</span>
            </div>
          </div>
          <div class="logo-badge">
            <div class="logo-ring"></div>
            <div class="logo-word">muchunavi</div>
            <div class="logo-cups">🥂</div>
          </div>
        </div>

        <div class="city-engraving">
          <div class="road"></div>
          <div class="car car-left"></div>
          <div class="car car-right"></div>
          <span v-for="n in 10" :key="`l-${n}`" class="building left" :style="leftBuildingStyle(n)"></span>
          <span v-for="n in 10" :key="`r-${n}`" class="building right" :style="rightBuildingStyle(n)"></span>
          <span v-for="n in 8" :key="`s-${n}`" class="sign" :style="signStyle(n)"></span>
        </div>

        <div class="card-main">
          <div class="identity">
            <div class="name">{{ member.name }}</div>
            <div class="label">CARD NO.</div>
            <div class="card-no">{{ maskedCardNo }}</div>
            <div class="valid-row">
              <span class="valid-label">VALID THRU</span>
              <span class="valid-value">{{ member.expire }}</span>
            </div>
          </div>

          <div class="points-panel">
            <div class="points-label">現在ポイント</div>
            <div class="points-value">
              {{ formatNumber(member.points) }}
              <span>PT</span>
            </div>
            <div class="next-tip">
              次のランクまであと {{ formatNumber(member.remainPoint) }} PT
            </div>
            <div class="progress-track">
              <div class="progress-fill" :style="{ width: member.progress + '%' }"></div>
            </div>
          </div>
        </div>

        <div class="tap-tip">点击卡片查看详情</div>
      </button>
    </section>

    <transition name="fade-up">
      <section v-if="isExpanded" class="detail-panel">
        <div class="detail-card">
          <div class="detail-top">
            <div>
              <div class="detail-title">会员权益</div>
              <div class="detail-sub">MEMBER BENEFITS</div>
            </div>
            <button class="close-btn" @click="isExpanded = false">×</button>
          </div>

          <div class="benefit-list">
            <div v-for="item in benefits" :key="item.title" class="benefit-item">
              <div class="benefit-icon">{{ item.icon }}</div>
              <div>
                <div class="benefit-title">{{ item.title }}</div>
                <div class="benefit-desc">{{ item.desc }}</div>
              </div>
            </div>
          </div>

          <div class="stats-row">
            <div class="stat-box">
              <div class="stat-label">有效期</div>
              <div class="stat-value">{{ member.openDate }}</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">升级进度</div>
              <div class="stat-value">{{ member.progress }}%</div>
            </div>
          </div>
        </div>
      </section>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'MuchunaviVipCard',
  data() {
    return {
      isActive: true,
      isExpanded: false,
      member: {
        name: 'TAKESHI',
        level: 'BLACK MEMBER',
        cardNo: '3528000123456789',
        expire: '06/29',
        points: 128450,
        remainPoint: 21550,
        progress: 78,
        openDate: '2024.06.29'
      },
      benefits: [
        { icon: '🎁', title: '充值赠送', desc: '会员充值额外 +10%' },
        { icon: '🎂', title: '生日特典', desc: '生日月专属礼遇' },
        { icon: '⭐', title: '尊享权益', desc: '限定活动优先参与' },
        { icon: '💎', title: '积分兑换', desc: '积分可兑换礼品与福利' }
      ]
    }
  },
  computed: {
    maskedCardNo() {
      const n = this.member.cardNo
      return `${n.slice(0, 4)} **** **** ${n.slice(-4)}`
    }
  },
  methods: {
    formatNumber(num) {
      return new Intl.NumberFormat('en-US').format(num)
    },
    handleCardClick() {
      this.isActive = true
      this.isExpanded = !this.isExpanded
    },
    leftBuildingStyle(n) {
      return {
        height: `${30 + n * 6}px`,
        left: `${18 + n * 2.8}%`,
        bottom: `${58 + n * 2}px`
      }
    },
    rightBuildingStyle(n) {
      return {
        height: `${32 + n * 5}px`,
        right: `${18 + n * 2.7}%`,
        bottom: `${58 + n * 2}px`
      }
    },
    signStyle(n) {
      return {
        top: `${24 + (n % 4) * 12}%`,
        left: `${24 + n * 7}%`,
        animationDelay: `${n * 0.4}s`
      }
    }
  }
}
</script>

<style scoped>
:root {
  --bg: #f5efea;
  --metal-1: #6b5a54;
  --metal-2: #3d302d;
  --gold: #d6ab79;
  --gold-strong: #f1c389;
  --rose: #c89a84;
  --text-soft: rgba(255, 239, 223, 0.88);
  --line-soft: rgba(255, 225, 187, 0.18);
}

* { box-sizing: border-box; }
.page {
  min-height: 100vh;
  padding: 20px 16px 28px;
  background:
    radial-gradient(circle at top center, rgba(209, 172, 162, 0.35), transparent 28%),
    linear-gradient(180deg, #f7f1ed 0%, #f3ece7 100%);
  color: #2f2724;
}

.vip-card-wrap {
  perspective: 1200px;
}

.vip-card {
  position: relative;
  width: 100%;
  min-height: 250px;
  border: 0;
  padding: 20px 18px 16px;
  border-radius: 24px;
  overflow: hidden;
  text-align: left;
  color: var(--text-soft);
  background:
    linear-gradient(135deg, #74625d 0%, #4f403c 46%, #342926 100%);
  box-shadow:
    0 18px 40px rgba(58, 41, 35, 0.22),
    inset 0 1px 1px rgba(255,255,255,0.16),
    inset 0 -1px 1px rgba(0,0,0,0.28);
  transform-style: preserve-3d;
  transition: transform .22s ease, box-shadow .22s ease;
}

.vip-card:active {
  transform: scale(0.985);
}

.vip-card.active {
  box-shadow:
    0 22px 52px rgba(58, 41, 35, 0.28),
    0 0 0 1px rgba(255, 214, 156, 0.12),
    inset 0 1px 1px rgba(255,255,255,0.16),
    inset 0 -1px 1px rgba(0,0,0,0.32);
}

.metal-texture,
.ambient-glow,
.shine,
.city-engraving {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.metal-texture {
  background:
    repeating-linear-gradient(
      90deg,
      rgba(255,255,255,0.035) 0px,
      rgba(255,255,255,0.035) 1px,
      rgba(0,0,0,0.02) 2px,
      rgba(0,0,0,0.02) 4px
    );
  mix-blend-mode: soft-light;
  opacity: .5;
}

.ambient-glow {
  background:
    radial-gradient(circle at 82% 20%, rgba(255, 211, 152, 0.22), transparent 22%),
    radial-gradient(circle at 50% 50%, rgba(255, 186, 123, 0.08), transparent 32%),
    radial-gradient(circle at 26% 8%, rgba(255,255,255,0.08), transparent 18%);
}

.shine {
  left: -120%;
  width: 48%;
  background: linear-gradient(105deg, transparent 0%, rgba(255,255,255,.18) 48%, transparent 100%);
  transform: skewX(-18deg);
  animation: shine 5.6s ease-in-out infinite;
}

@keyframes shine {
  0%, 78% { left: -120%; }
  100% { left: 140%; }
}

.card-header,
.card-main,
.tap-tip {
  position: relative;
  z-index: 2;
}

.card-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.brand {
  font-size: 24px;
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: .5px;
  color: #efc18a;
  text-shadow: 0 1px 0 rgba(0,0,0,.25), 0 0 12px rgba(236, 196, 137, .12);
}

.sub {
  margin-top: 4px;
  font-size: 12px;
  letter-spacing: 1px;
  color: rgba(255,232,208,.86);
}

.level-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  color: #f3cc97;
  background: rgba(25, 17, 16, 0.28);
  border: 1px solid rgba(244, 199, 142, 0.36);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
}

.logo-badge {
  position: relative;
  width: 116px;
  height: 116px;
  flex: 0 0 116px;
}

.logo-ring {
  position: absolute;
  inset: 10px;
  border-radius: 50%;
  border: 2px solid rgba(255, 207, 142, 0.82);
  box-shadow: 0 0 18px rgba(255, 204, 120, 0.14);
}

.logo-word {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 24px;
  text-align: center;
  font-size: 18px;
  line-height: 1;
  font-style: italic;
  font-weight: 700;
  color: #ffd7a0;
  text-shadow: 0 0 10px rgba(255, 207, 142, 0.18);
}

.logo-cups {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 34px;
  filter: saturate(.8) brightness(1.05);
}

.city-engraving {
  inset: 74px 18px 52px;
  opacity: .95;
}

.city-engraving .road {
  position: absolute;
  left: 50%;
  bottom: 8px;
  width: 58%;
  height: 56%;
  transform: translateX(-50%);
  background:
    linear-gradient(to top, rgba(255,192,120,.28), transparent 50%),
    linear-gradient(88deg, transparent 47%, rgba(255,194,132,.42) 49%, transparent 51%),
    linear-gradient(92deg, transparent 47%, rgba(167, 201, 255, .3) 49%, transparent 51%);
  clip-path: polygon(46% 100%, 54% 100%, 70% 0, 30% 0);
}

.building {
  position: absolute;
  width: 2px;
  background: linear-gradient(180deg, rgba(255,209,162,.35), rgba(255,210,180,.12));
  box-shadow: 8px 0 0 rgba(255, 210, 165, .08), -8px 0 0 rgba(255, 210, 165, .08);
}

.building.left { transform: skewY(20deg); }
.building.right { transform: skewY(-20deg); }

.sign {
  position: absolute;
  width: 14px;
  height: 28px;
  border: 1px solid rgba(255, 205, 132, .4);
  background: linear-gradient(180deg, rgba(255,193,134,.14), rgba(166,194,255,.08));
  box-shadow: 0 0 10px rgba(243, 194, 132, .08);
  animation: blink 3s ease-in-out infinite alternate;
}

@keyframes blink {
  from { opacity: .45; }
  to { opacity: .95; }
}

.car {
  position: absolute;
  bottom: 18px;
  width: 58px;
  height: 16px;
  border: 1px solid rgba(255, 211, 150, .42);
  border-radius: 16px 18px 12px 12px;
}

.car::after {
  content: '';
  position: absolute;
  left: -44px;
  top: 6px;
  width: 46px;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 188, 105, .6));
}

.car-left { left: 36%; }
.car-right {
  right: 18%;
  border-color: rgba(172, 199, 255, .4);
}

.car-right::after {
  background: linear-gradient(90deg, transparent, rgba(166, 197, 255, .55));
}

.card-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
  margin-top: 86px;
}

.identity { min-width: 0; }

.name {
  font-size: 18px;
  font-weight: 700;
  color: #f3d3a8;
}

.label,
.valid-label,
.points-label,
.next-tip,
.tap-tip {
  font-size: 11px;
}

.label {
  margin-top: 8px;
  color: rgba(255, 235, 214, 0.6);
  letter-spacing: .8px;
}

.card-no {
  margin-top: 4px;
  font-size: 18px;
  letter-spacing: 1.6px;
  color: #efc493;
  text-shadow: 0 1px 0 rgba(0,0,0,.22);
}

.valid-row {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  align-items: end;
}

.valid-label { color: rgba(255,235,214,0.62); }
.valid-value {
  font-size: 16px;
  color: #f0c48f;
  font-weight: 700;
}

.points-panel {
  width: 44%;
  min-width: 122px;
  text-align: right;
}

.points-label { color: rgba(255,235,214,.72); }
.points-value {
  margin-top: 4px;
  font-size: 30px;
  font-weight: 800;
  color: #f0c48e;
  line-height: 1;
}
.points-value span {
  font-size: 13px;
  margin-left: 4px;
}

.next-tip {
  margin-top: 10px;
  color: rgba(255,233,206,.82);
}

.progress-track {
  margin-top: 8px;
  width: 100%;
  height: 6px;
  border-radius: 999px;
  background: rgba(255,255,255,.08);
  box-shadow: inset 0 1px 2px rgba(0,0,0,.28);
}

.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #f1c386 0%, #ffc676 42%, #f0d0a4 100%);
  box-shadow: 0 0 10px rgba(255, 199, 117, .22);
}

.tap-tip {
  margin-top: 10px;
  color: rgba(255,237,218,.58);
}

.detail-panel {
  margin-top: 14px;
}

.detail-card {
  border-radius: 20px;
  padding: 16px;
  background: rgba(255,255,255,.62);
  backdrop-filter: blur(12px);
  box-shadow: 0 12px 24px rgba(95, 70, 56, 0.1);
  border: 1px solid rgba(219, 191, 168, 0.36);
}

.detail-top {
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.detail-title {
  font-size: 18px;
  color: #7a5e52;
  font-weight: 700;
}

.detail-sub {
  margin-top: 2px;
  font-size: 11px;
  color: #b99886;
}

.close-btn {
  border: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(122, 94, 82, .08);
  color: #7a5e52;
  font-size: 18px;
}

.benefit-list {
  margin-top: 12px;
  display: grid;
  gap: 10px;
}

.benefit-item {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(255,255,255,.48);
}

.benefit-icon {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, #f4d4b2, #eac59d);
}

.benefit-title {
  font-size: 14px;
  font-weight: 700;
  color: #6a5147;
}

.benefit-desc {
  margin-top: 2px;
  font-size: 12px;
  color: #9f8070;
}

.stats-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 12px;
}

.stat-box {
  padding: 12px;
  border-radius: 14px;
  background: rgba(255,255,255,.48);
}

.stat-label {
  font-size: 12px;
  color: #aa8a78;
}

.stat-value {
  margin-top: 4px;
  font-size: 15px;
  font-weight: 700;
  color: #6f584e;
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: all .22s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 390px) {
  .brand { font-size: 21px; }
  .logo-badge { width: 96px; height: 96px; flex-basis: 96px; }
  .logo-word { font-size: 16px; }
  .card-main { margin-top: 76px; }
  .points-value { font-size: 26px; }
  .card-no { font-size: 16px; }
}
</style>