import { useEffect, useMemo, useRef, useState } from 'react';

const MU_R = window.MU_TOKENS;
const MU_TOP_SPACING = window.MU_TOP_SPACING || 32;
const MU_RANK_LOCATION_STORAGE_KEY = 'mu_home_location';
const MU_NOTICE_DETAIL_KEY = '__MU_NOTICE_DETAIL';

const MU_RANK_REGIONS = [
  { id: 'tokyo', label: '東京都', area: '中央区 · 銀座', en: 'TOKYO', desc: '銀座 / 六本木 / 新宿', hot: '人気 128 店舗' },
  { id: 'osaka', label: '大阪府', area: '北区 · 北新地', en: 'OSAKA', desc: '北新地 / 心斎橋', hot: '人気 96 店舗' },
  { id: 'fukuoka', label: '福岡県', area: '博多区 · 中洲', en: 'FUKUOKA', desc: '中洲 / 天神', hot: '人気 54 店舗' },
  { id: 'aichi', label: '愛知県', area: '名古屋市 · 栄', en: 'AICHI', desc: '錦三丁目 / 栄', hot: '人気 63 店舗' },
  { id: 'hokkaido', label: '北海道', area: '札幌市 · すすきの', en: 'HOKKAIDO', desc: 'すすきの / 札幌駅', hot: '人気 41 店舗' },
];

const MU_RANK_AVATARS = [
  'https://images.pexels.com/photos/11746333/pexels-photo-11746333.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/1066134/pexels-photo-1066134.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/15262855/pexels-photo-15262855.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/14456935/pexels-photo-14456935.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/32197366/pexels-photo-32197366.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/32280799/pexels-photo-32280799.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/24389351/pexels-photo-24389351.jpeg?auto=compress&cs=tinysrgb&w=600',
];

function MU_RankAvatar({ src, w, h, radius = 8 }) {
  return (
    <div style={{ width: w, height: h, borderRadius: radius, overflow: 'hidden', position: 'relative', background: '#eadfd6', boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.2)' }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: radius, border: '0.5px solid rgba(0,0,0,0.04)', pointerEvents: 'none' }} />
    </div>
  );
}

function MU_setNoticeDetailContext(detail) {
  window[MU_NOTICE_DETAIL_KEY] = detail;
}

function MU_getNoticeDetailContext() {
  return window[MU_NOTICE_DETAIL_KEY] || {
    title: 'システム通知',
    body: '今月のギフトランキングが更新され、七海が銀座エリア1位になりました。',
    time: '昨日',
    badge: 'RANK',
    detailTitle: 'ランキング更新のお知らせ',
    detailBody: '最新のギフトランキングが反映されました。エリア別ランキングや対象キャストの詳細はランキングページから確認できます。',
  };
}

function MU_ChatAvatar({ size = 36, src, online = false }) {
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <img src={src} alt="" style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', display: 'block', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)' }} />
      {online ? (
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: size * 0.28, height: size * 0.28, borderRadius: '50%', background: '#44B564', border: `2px solid #FFFFFF`, boxShadow: '0 2px 6px rgba(68,181,100,0.4), inset 0 -1px 2px rgba(0,0,0,0.1)' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#44B564', filter: 'blur(3px)', opacity: 0.6, zIndex: -1 }} />
        </div>
      ) : null}
    </div>
  );
}

function MU_rankNormalizeLocationText(value) {
  const map = {
    东京: '東京都',
    银座: '銀座',
    涩谷: '渋谷',
    惠比寿: '恵比寿',
    心斋桥: '心斎橋',
    难波: '難波',
    道顿堀: '道頓堀',
    福冈: '福岡県',
    爱知: '愛知県',
    锦: '錦',
    荣: '栄',
    名站: '名駅',
    札幌站: '札幌駅',
  };
  return map[value] || value;
}

function MU_getRankStoredLocation() {
  try {
    const stored = JSON.parse(window.localStorage?.getItem(MU_RANK_LOCATION_STORAGE_KEY) || 'null');
    if (!stored?.regionId) return { regionId: 'tokyo', prefecture: '東京都', city: '中央区', area: '銀座' };
    return {
      regionId: stored.regionId,
      prefecture: MU_rankNormalizeLocationText(stored.prefecture || '東京都'),
      city: MU_rankNormalizeLocationText(stored.city || '中央区'),
      area: MU_rankNormalizeLocationText(stored.area || '銀座'),
    };
  } catch {
    return { regionId: 'tokyo', prefecture: '東京都', city: '中央区', area: '銀座' };
  }
}

function MU_Ranking() {
  const [activeLocation, setActiveLocation] = useState(() => MU_getRankStoredLocation());
  const [activeRegionId, setActiveRegionId] = useState(() => MU_getRankStoredLocation().regionId);
  const activeRegion = MU_RANK_REGIONS.find((item) => item.id === activeRegionId) || MU_RANK_REGIONS[0];

  const list = [
    { r: 4, name: '蘭 Ran', shop: 'La Rose', amt: '¥2.8M' },
    { r: 5, name: '優花 Yuka', shop: 'Salon Lumiere', amt: '¥2.4M' },
    { r: 6, name: '葵 Aoi', shop: 'ARIA', amt: '¥2.2M' },
    { r: 7, name: '千尋 Chihiro', shop: 'NOBLE', amt: '¥1.9M' },
    { r: 8, name: '花音 Kanon', shop: 'La Rose', amt: '¥1.7M' },
    { r: 9, name: '紗良 Sara', shop: 'LOUNGE ARIA', amt: '¥1.5M' },
    { r: 10, name: '真帆 Maho', shop: 'Club Lune', amt: '¥1.4M' },
    { r: 11, name: '玲奈 Reina', shop: 'Salon Lumiere', amt: '¥1.32M' },
    { r: 12, name: '沙耶 Saya', shop: 'LOUNGE ARIA', amt: '¥1.28M' },
    { r: 13, name: '由奈 Yuna', shop: 'NOBLE', amt: '¥1.22M' },
    { r: 14, name: '結衣 Yui', shop: 'Club Velvet', amt: '¥1.18M' },
    { r: 15, name: '心春 Koharu', shop: 'La Rose', amt: '¥1.13M' },
    { r: 16, name: '真由 Mayu', shop: 'ARIA', amt: '¥1.08M' },
    { r: 17, name: '桃香 Momoka', shop: 'Club Lune', amt: '¥1.02M' },
    { r: 18, name: '詩織 Shiori', shop: 'Club Velvet', amt: '¥980K' },
    { r: 19, name: '奈緒 Nao', shop: 'LOUNGE ARIA', amt: '¥950K' },
    { r: 20, name: '愛理 Airi', shop: 'Salon Lumiere', amt: '¥920K' },
    { r: 21, name: '莉子 Riko', shop: 'NOBLE', amt: '¥900K' },
    { r: 22, name: '梨紗 Risa', shop: 'Club Velvet', amt: '¥875K' },
    { r: 23, name: '遥 Haruka', shop: 'La Rose', amt: '¥860K' },
    { r: 24, name: '花音 Kanon', shop: 'ARIA 青山', amt: '¥845K' },
    { r: 25, name: '心美 Kokomi', shop: 'Salon Lumiere', amt: '¥828K' },
    { r: 26, name: '千夏 Chinatsu', shop: 'Club Lune', amt: '¥812K' },
    { r: 27, name: '紗月 Satsuki', shop: 'LOUNGE ARIA', amt: '¥796K' },
    { r: 28, name: '朱里 Akari', shop: 'Club Velvet', amt: '¥780K' },
    { r: 29, name: '由依 Yui', shop: 'NOBLE', amt: '¥764K' },
    { r: 30, name: '琴音 Kotone', shop: 'La Rose', amt: '¥750K' },
    { r: 31, name: '莉奈 Rina', shop: 'ARIA', amt: '¥734K' },
    { r: 32, name: '真奈 Mana', shop: 'Salon Lumiere', amt: '¥720K' },
    { r: 33, name: '結愛 Yua', shop: 'Club Lune', amt: '¥706K' },
    { r: 34, name: '澪 Mio', shop: 'Club Velvet', amt: '¥692K' },
    { r: 35, name: '奈奈 Nana', shop: 'LOUNGE ARIA', amt: '¥678K' },
    { r: 36, name: '桃子 Momoko', shop: 'NOBLE', amt: '¥664K' },
    { r: 37, name: '小百合 Sayuri', shop: 'ARIA 青山', amt: '¥650K' },
    { r: 38, name: '真央 Mao', shop: 'La Rose', amt: '¥638K' },
    { r: 39, name: '唯 Yui', shop: 'Club Velvet', amt: '¥626K' },
    { r: 40, name: '遥香 Haruka', shop: 'Salon Lumiere', amt: '¥614K' },
    { r: 41, name: '凛花 Rinka', shop: 'Club Lune', amt: '¥602K' },
    { r: 42, name: '愛菜 Aina', shop: 'NOBLE', amt: '¥590K' },
    { r: 43, name: '美月 Mizuki', shop: 'LOUNGE ARIA', amt: '¥578K' },
    { r: 44, name: '楓 Kaede', shop: 'ARIA', amt: '¥566K' },
    { r: 45, name: '莉央 Rio', shop: 'La Rose', amt: '¥554K' },
    { r: 46, name: '瑠奈 Runa', shop: 'Club Velvet', amt: '¥542K' },
    { r: 47, name: '雫 Shizuku', shop: 'Salon Lumiere', amt: '¥530K' },
    { r: 48, name: '杏 An', shop: 'Club Lune', amt: '¥518K' },
    { r: 49, name: '希 Nozomi', shop: 'NOBLE', amt: '¥506K' },
    { r: 50, name: 'ひかり Hikari', shop: 'LOUNGE ARIA', amt: '¥495K' },
  ];

  useEffect(() => {
    const syncRegion = () => {
      const nextLocation = MU_getRankStoredLocation();
      setActiveLocation(nextLocation);
      setActiveRegionId(nextLocation.regionId);
    };
    window.addEventListener('mu:region-change', syncRegion);
    return () => window.removeEventListener('mu:region-change', syncRegion);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', background: MU_R.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 420, background: 'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(234, 212, 167, 0.45), transparent 70%), radial-gradient(ellipse 50% 40% at 50% 25%, rgba(245, 228, 230, 0.6), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 82 }}>
        <div style={{ height: MU_TOP_SPACING }} />

        <div style={{ textAlign: 'center', padding: '14px 0 4px' }}>
          <div style={{ fontFamily: MU_R.fontBrand, fontSize: 10, color: MU_R.goldDeep, letterSpacing: '0.4em' }}>GIFT RANKING · MAY 2026</div>
          <div style={{ marginTop: 4, fontFamily: MU_R.fontSerif, fontSize: 20, color: MU_R.ink, letterSpacing: '0.1em' }}>今月のギフトランキング</div>
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}>
            <button type="button" onClick={() => window.__nav?.open('city-selector')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '6px 14px 6px 8px', borderRadius: 20, background: 'rgba(251,247,244,0.4)', border: `0.5px solid ${MU_R.hairline}`, backdropFilter: 'blur(20px)', boxShadow: '0 4px 15px rgba(26,44,49,0.04)' }}>
              <div style={{ width: 32, height: 32, borderRadius: 16, background: MU_R.gradGold, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(164,150,115,0.3)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A2C31" strokeWidth="2">
                  <path d="M12 2 C8 2 5 5 5 9 C5 14 12 22 12 22 C12 22 19 14 19 9 C19 5 16 2 12 2 Z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 9, color: MU_R.goldDeep, letterSpacing: '0.15em', fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>{activeRegion.en}</div>
                <div style={{ fontFamily: MU_R.fontSerif, fontSize: 14, color: MU_R.ink, letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 4 }}>
                  {`${activeLocation.prefecture} · ${activeLocation.city} · ${activeLocation.area}`}
                  <svg width="10" height="10" viewBox="0 0 12 12" fill={MU_R.inkMid}><path d="M2 4 L6 8 L10 4" /></svg>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div style={{ marginTop: 42, padding: '0 20px' }}>
          <div style={{ position: 'relative', height: 296, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 10 }}>
            {[
              { rank: 2, name: '美咲', shop: 'CLUB VELVET', amt: '¥ 3.8M', src: MU_RANK_AVATARS[1], cardW: 100, cardH: 132, podiumH: 42, tone: 'linear-gradient(180deg, #E9E1D7 0%, #D8CCBF 100%)', edge: 'rgba(175, 160, 148, 0.42)', offset: 14 },
              { rank: 1, name: '七海', shop: 'LOUNGE ARIA', amt: '¥ 4.2M', src: MU_RANK_AVATARS[0], cardW: 110, cardH: 146, podiumH: 60, tone: 'linear-gradient(180deg, #DAB798 0%, #CCA279 100%)', edge: 'rgba(164, 150, 115, 0.5)', crown: true, offset: 0 },
              { rank: 3, name: '凛', shop: 'NOBLE', amt: '¥ 3.1M', src: MU_RANK_AVATARS[2], cardW: 100, cardH: 132, podiumH: 30, tone: 'linear-gradient(180deg, #F2E6DE 0%, #E4D1C5 100%)', edge: 'rgba(214, 165, 138, 0.4)', offset: 20 },
            ].map((item) => (
              <div key={item.rank} style={{ width: item.rank === 1 ? 138 : 126, height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', flexShrink: 0 }}>
                <button type="button" onClick={() => window.__nav?.open('cast-detail')} style={{ width: item.rank === 1 ? 138 : 126, textAlign: 'center', transform: `translateY(${item.offset}px)`, cursor: 'pointer', background: 'none', border: 'none', padding: 0, transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                  {item.rank === 1 && (
                    <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)', width: 200, height: 200, background: 'radial-gradient(circle, rgba(164, 150, 115, 0.15) 0%, transparent 65%)', pointerEvents: 'none', zIndex: -1 }} />
                  )}
                  {item.crown ? (
                    <div style={{ position: 'relative', height: 32, marginBottom: 4 }}>
                      <svg width="38" height="28" viewBox="0 0 34 25" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: -6 }}>
                        <path d="M4 20 L9 8 L14 14 L17 4 L20 14 L25 8 L30 20 Z" fill="url(#podiumCrown)" stroke={MU_R.gold} strokeWidth="0.6" />
                        <defs>
                          <linearGradient id="podiumCrown" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#F1D5B3" />
                            <stop offset="1" stopColor="#BF906D" />
                          </linearGradient>
                        </defs>
                        <circle cx="17" cy="8" r="1.6" fill="#6B6147" />
                      </svg>
                      <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 44, height: 22, background: 'radial-gradient(circle, rgba(164, 150, 115, 0.3) 0%, transparent 75%)', filter: 'blur(5px)', pointerEvents: 'none' }} />
                    </div>
                  ) : (
                    <div style={{ height: 32 }} />
                  )}

                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <div style={{ width: item.cardW, margin: '0 auto', padding: 3, borderRadius: 16, background: '#FFFFFF', border: `0.5px solid ${item.edge}`, boxShadow: item.rank === 1 ? '0 16px 40px rgba(164, 150, 115, 0.28), 0 4px 12px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.8)' : '0 10px 24px rgba(26, 44, 49, 0.1), inset 0 0 0 1px rgba(255,255,255,0.6)' }}>
                      <MU_RankAvatar src={item.src} w={item.cardW - 6} h={item.cardH - 6} radius={13} />
                    </div>
                    <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', width: item.rank === 1 ? 32 : 26, height: item.rank === 1 ? 32 : 26, borderRadius: 999, background: item.rank === 1 ? MU_R.gradGold : item.rank === 2 ? 'linear-gradient(135deg, #E6E0D8, #BCB1A5)' : 'linear-gradient(135deg, #D8A88E, #B77B63)', color: '#1A2C31', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MU_R.fontBrand, fontSize: item.rank === 1 ? 14 : 12, fontWeight: 900, border: '2px solid #FFFFFF', boxShadow: '0 6px 14px rgba(0,0,0,0.15)', zIndex: 2 }}>
                      {item.rank}
                    </div>
                  </div>

                  <div style={{ marginTop: 14, fontFamily: MU_R.fontSerif, fontSize: item.rank === 1 ? 17 : 14, lineHeight: 1.05, color: MU_R.ink, letterSpacing: '0.06em', fontWeight: 700, textShadow: '0 1px 1px rgba(255,255,255,0.9)' }}>{item.name}</div>
                  <div style={{ marginTop: 5, fontSize: item.rank === 1 ? 10 : 9, lineHeight: 1, color: MU_R.inkMid, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7, fontWeight: 500 }}>{item.shop}</div>
                  <div style={{ marginTop: 10, fontSize: 12, lineHeight: 1, color: MU_R.goldDeep, fontFamily: MU_R.fontBrand, letterSpacing: '0.16em', fontWeight: 800, textShadow: '0 0.5px 0.5px rgba(0,0,0,0.05)' }}>{item.amt}</div>

                  <div style={{ marginTop: 16, height: item.podiumH, width: item.rank === 1 ? 88 : 68, marginInline: 'auto', borderTopLeftRadius: 6, borderTopRightRadius: 6, background: 'transparent', border: 'none', boxShadow: 'none', position: 'relative', overflow: 'hidden' }}>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ margin: '24px 16px 0', borderRadius: 24, background: '#FFFFFF', border: `0.5px solid ${MU_R.hairlineStrong}`, overflow: 'hidden', boxShadow: '0 12px 36px rgba(26, 44, 49, 0.08), 0 4px 10px rgba(0,0,0,0.03)' }}>
          {list.map((p, i) => (
            <button key={p.r} type="button" onClick={() => window.__nav?.open('cast-detail')} style={{ width: '100%', display: 'flex', alignItems: 'center', padding: '18px 16px', gap: 16, borderTop: i > 0 ? `0.5px solid ${MU_R.hairline}` : 'none', cursor: 'pointer', textAlign: 'left', background: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: 'none', transition: 'background 0.2s ease' }}>
              <div style={{ width: 36, height: 36, borderRadius: 18, background: i < 3 ? 'linear-gradient(135deg, rgba(164, 150, 115, 0.15), rgba(164, 150, 115, 0.06))' : 'rgba(243, 236, 228, 0.7)', border: `0.5px solid ${i < 3 ? 'rgba(164, 150, 115, 0.25)' : MU_R.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MU_R.fontBrand, fontSize: 14, color: MU_R.goldDeep, fontWeight: 800, letterSpacing: '0.01em', flexShrink: 0, boxShadow: 'inset 0 1.5px 3px rgba(255,255,255,1), 0 2px 5px rgba(0,0,0,0.02)' }}>
                {String(p.r).padStart(2, '0')}
              </div>
              <div style={{ padding: 2.5, borderRadius: 24, background: '#FFF', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', border: `0.5px solid ${MU_R.hairline}` }}>
                <MU_RankAvatar src={MU_RANK_AVATARS[(i + 3) % MU_RANK_AVATARS.length]} w={44} h={44} radius={22} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                  <div style={{ fontSize: 16, color: MU_R.ink, fontFamily: MU_R.fontSerif, letterSpacing: '0.02em', fontWeight: 700 }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: MU_R.goldDeep, fontFamily: MU_R.fontBrand, letterSpacing: '0.12em', fontWeight: 900, textShadow: '0 0.5px 0px rgba(0,0,0,0.02)' }}>{p.amt}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 5 }}>
                  <div style={{ fontSize: 10.5, color: MU_R.inkMid, letterSpacing: '0.02em', opacity: 0.85, fontWeight: 500 }}>{p.shop}</div>
                  <div style={{ width: 3.5, height: 3.5, borderRadius: '50%', background: 'rgba(164, 150, 115, 0.4)' }} />
                  <div style={{ fontSize: 9.5, color: MU_R.inkLow, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>Gift Mastery</div>
                </div>
              </div>
              <div style={{ width: 28, height: 28, borderRadius: 14, background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(164, 150, 115, 0.08) 100%)', border: `0.5px solid rgba(164, 150, 115, 0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 6px rgba(164, 150, 115, 0.05)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MU_R.goldDeep} strokeWidth="2.5"><path d="M9 5 L16 12 L9 19" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </button>
          ))}
        </div>

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_Messages() {
  const [activeType, setActiveType] = useState('chat');
  const [contentVisible, setContentVisible] = useState(true);
  const [chatSort, setChatSort] = useState('latest');

  const chats = [
    { name: '七海', shop: 'LOUNGE ARIA', msg: '入力中...', time: 'たった今', unread: 1, lvl: 7, online: true, typing: true, intimacy: 98, gift15d: 520000, latestOrder: 5 },
    { name: '美咲', shop: 'Club Velvet', msg: '[写真を送信しました]', time: '20:32', unread: 0, lvl: 5, intimacy: 82, gift15d: 280000, latestOrder: 4 },
    { name: '凛', shop: 'NOBLE', msg: '今夜また会える？', time: '昨日', unread: 1, lvl: 6, intimacy: 88, gift15d: 360000, latestOrder: 3 },
    { name: '蘭', shop: 'La Rose', msg: 'ギフトありがとう。昨夜は本当に楽しかったよ。', time: '昨日', unread: 0, max: true, intimacy: 100, gift15d: 680000, latestOrder: 2 },
    { name: '優花', shop: 'Salon Lumiere', msg: '来てくれるのを待ってるね。', time: '3日前', unread: 0, lvl: 4, intimacy: 74, gift15d: 190000, latestOrder: 1 },
  ];

  const notices = [
    { title: 'クーポン付与', body: 'LOUNGE ARIA のペア来店クーポンが付与されました。5月31日まで利用可能です。', time: '18:20', badge: 'NEW', detailTitle: 'クーポンが付与されました', detailBody: '対象クーポンはマイページまたは店舗クーポン一覧から確認できます。利用期限内にご利用ください。' },
    { title: '予約リマインド', body: '今夜22:00の来店予約が確定しています。10分前までにご入店ください。', time: '今日', badge: 'BOOKING', detailTitle: '来店予約リマインド', detailBody: '予約時間の10分前までにご来店いただくとスムーズです。時間変更が必要な場合はサポートへご連絡ください。' },
    { title: 'システム通知', body: '今月のギフトランキングが更新され、七海が銀座エリア1位になりました。', time: '昨日', badge: 'RANK', detailTitle: 'ランキング更新のお知らせ', detailBody: '最新のギフトランキングが反映されました。エリア別ランキングや対象キャストの詳細はランキングページから確認できます。' },
  ];

  const supportTickets = [
    { title: 'オンラインサポート', body: 'チャージ、予約、アカウント異常についてそのまま問い合わせできます。', time: '24h', status: 'オンライン' },
    { title: '注文サポート', body: '予約注文 #A10582 は確認中です。5分以内に返信予定です。', time: '対応中', status: '進行中' },
    { title: 'ギフト申請', body: 'ギフト反映に異常がある場合はスクリーンショットを添付してください。1営業日以内に対応します。', time: 'ヘルプ', status: 'FAQ' },
  ];

  const typeTabs = [
    { id: 'chat', label: 'チャット', count: chats.reduce((sum, item) => sum + item.unread, 0) },
    { id: 'notice', label: '通知' },
    { id: 'support', label: 'サポート' },
  ];

  const chatSortOptions = [
    { id: 'latest', label: '最新' },
    { id: 'intimacy', label: '親密度' },
    { id: 'gift15d', label: '15日送礼' },
  ];

  const sortedChats = useMemo(() => {
    const list = [...chats];
    if (chatSort === 'intimacy') {
      list.sort((a, b) => b.intimacy - a.intimacy || b.unread - a.unread || b.latestOrder - a.latestOrder);
      return list;
    }
    if (chatSort === 'gift15d') {
      list.sort((a, b) => b.gift15d - a.gift15d || b.intimacy - a.intimacy || b.latestOrder - a.latestOrder);
      return list;
    }
    list.sort((a, b) => b.latestOrder - a.latestOrder);
    return list;
  }, [chatSort]);

  useEffect(() => {
    setContentVisible(false);
    const frame = window.requestAnimationFrame(() => {
      setContentVisible(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeType]);

  return (
    <div style={{ width: '100%', height: '100%', background: MU_R.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 82 }}>
        <div style={{ height: MU_TOP_SPACING }} />

        <div style={{ padding: '14px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: 24 }} />
          <div style={{ fontFamily: MU_R.fontSerif, fontSize: 20, color: MU_R.ink, letterSpacing: '0.18em', fontWeight: 500 }}>メッセージ</div>
          <button type="button" onClick={() => window.__nav?.open('home-search')} style={{ width: 24, height: 24, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={MU_R.ink} strokeWidth="1.6">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20 L16 16" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <style>{`
          @keyframes muTypingDot { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
          @keyframes muPulseRed { 0% { box-shadow: 0 0 0 0 rgba(217,83,79,0.4); } 70% { box-shadow: 0 0 0 6px rgba(217,83,79,0); } 100% { box-shadow: 0 0 0 0 rgba(217,83,79,0); } }
        `}</style>

        <div style={{ margin: '18px 20px 0', display: 'flex', position: 'relative', borderBottom: `0.5px solid ${MU_R.hairline}` }}>
          <div style={{ position: 'absolute', bottom: -1, left: 0, width: `calc(100% / ${typeTabs.length})`, transform: `translateX(${typeTabs.findIndex(t => t.id === activeType) * 100}%)`, height: 2, background: MU_R.gold, borderRadius: 1, transition: 'transform 0.3s ease-out', zIndex: 1 }} />
          {typeTabs.map((tab) => {
            const active = tab.id === activeType;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveType(tab.id)}
                style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 14, letterSpacing: '0.04em', color: active ? MU_R.ink : MU_R.inkLow, fontWeight: 500, fontFamily: MU_R.fontSerif, cursor: 'pointer', background: 'transparent', border: 'none', position: 'relative', transition: 'color 0.2s ease' }}
              >
                <span>{tab.label}{tab.count ? ` (${tab.count})` : ''}</span>
              </button>
            );
          })}
        </div>

        <div style={{ transition: 'opacity 220ms ease, transform 220ms ease', opacity: contentVisible ? 1 : 0, transform: contentVisible ? 'translateY(0)' : 'translateY(10px)' }}>
          {activeType === 'chat' ? (
            <div>
              <div style={{ padding: '16px 20px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
                {chatSortOptions.map((option) => (
                  <window.MU_FilterChip
                    key={option.id}
                    active={option.id === chatSort}
                    onClick={() => setChatSort(option.id)}
                  >
                    {option.label}
                  </window.MU_FilterChip>
                ))}
              </div>
              <window.MU_FlatRowGroup marginTop={0}>
                {sortedChats.map((c, i) => (
                  <div
                    key={`${c.name}-${i}`}
                    onClick={() => window.__nav?.open('chat')}
                    style={{ display: 'flex', padding: '18px 0', alignItems: 'center', gap: 16, cursor: 'pointer', background: 'transparent' }}
                  >
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <MU_ChatAvatar size={64} src={MU_RANK_AVATARS[i % MU_RANK_AVATARS.length]} online={false} />
                      {c.online ? (
                        <div style={{ position: 'absolute', right: 2, bottom: 2, width: 13, height: 13, borderRadius: '50%', background: MU_R.success, border: `2px solid ${MU_R.bg}` }} />
                      ) : null}
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                        <span style={{ fontSize: 19, color: MU_R.ink, fontFamily: MU_R.fontSerif, letterSpacing: '0.04em', fontWeight: 500 }}>{c.name}</span>
                        <span style={{ fontSize: 13, color: MU_R.inkMid, letterSpacing: '0.04em', fontWeight: 400 }}>{c.shop}</span>
                      </div>
                      <div style={{ fontSize: 14, color: MU_R.inkMid, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', gap: c.typing ? 6 : 0 }}>
                        {c.typing ? (
                          <span style={{ display: 'inline-flex', gap: 3, alignItems: 'center', height: 16 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: MU_R.inkMid, animation: 'muTypingDot 1.4s infinite ease-in-out both', animationDelay: '-0.32s' }} />
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: MU_R.inkMid, animation: 'muTypingDot 1.4s infinite ease-in-out both', animationDelay: '-0.16s' }} />
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: MU_R.inkMid, animation: 'muTypingDot 1.4s infinite ease-in-out both' }} />
                          </span>
                        ) : null}
                        <span>{c.msg}</span>
                      </div>
                      <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: MU_R.inkLow, letterSpacing: '0.02em' }}>
                        <span>親密度 {c.intimacy}</span>
                        <span style={{ opacity: 0.6 }}>·</span>
                        <span>15日送礼 ¥{(c.gift15d / 10000).toFixed(0)}万</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', alignSelf: 'stretch', paddingTop: 4, paddingBottom: 4 }}>
                      <div style={{ fontSize: 11, color: MU_R.inkLow, letterSpacing: '0.02em' }}>{c.time}</div>
                      {c.unread > 0 ? (
                        <div style={{ minWidth: 18, height: 18, padding: '0 6px', borderRadius: 9, background: MU_R.success, color: '#FFFFFF', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.unread}</div>
                      ) : (
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: MU_R.success }} />
                      )}
                    </div>
                  </div>
                ))}
              </window.MU_FlatRowGroup>
            </div>
          ) : null}

          {activeType === 'notice' ? (
            <window.MU_FlatRowGroup marginTop={6}>
              {notices.map((item, i) => (
                <button key={item.title} type="button" onClick={() => { MU_setNoticeDetailContext(item); window.__nav?.open('notice-detail'); }} style={{ width: '100%', display: 'flex', padding: '14px 0', alignItems: 'flex-start', gap: 14, textAlign: 'left', cursor: 'pointer', background: 'transparent', border: 'none' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 22, background: MU_R.gradGold, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: MU_R.shadowGold, flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A2C31" strokeWidth="2"><path d="M12 3 A5 5 0 0 1 17 8 V11.5 L19 15 V17 H5 V15 L7 11.5 V8 A5 5 0 0 1 12 3 Z" /><path d="M10 20 A2 2 0 0 0 14 20" strokeLinecap="round" /></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                      <div style={{ fontSize: 14, color: MU_R.ink, fontFamily: MU_R.fontSerif, letterSpacing: '0.04em', fontWeight: 700 }}>{item.title}</div>
                      <div style={{ fontSize: 10, color: MU_R.inkLow, fontWeight: 500 }}>{item.time}</div>
                    </div>
                    <div style={{ marginTop: 6, fontSize: 12, color: MU_R.inkMid, lineHeight: 1.6 }}>{item.body}</div>
                  </div>
                  <div style={{ height: 18, padding: '0 6px', borderRadius: 9, background: MU_R.rougeTint, color: MU_R.rouge, fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', border: `0.5px solid #F0DCD8` }}>{item.badge}</div>
                </button>
              ))}
            </window.MU_FlatRowGroup>
          ) : null}

          {activeType === 'support' ? (
            <window.MU_FlatRowGroup marginTop={6}>
              {supportTickets.map((item, i) => (
                <div key={item.title} style={{ display: 'flex', padding: '14px 0', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 20, background: 'transparent', border: `0.5px solid ${MU_R.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={MU_R.gold} strokeWidth="2"><path d="M12 18 H12.01" strokeLinecap="round" /><path d="M9.1 9 A3 3 0 1 1 14.9 10 C13.6 10.7 12.7 11.4 12.3 12.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                      <div style={{ fontSize: 14, color: MU_R.ink, fontFamily: MU_R.fontSerif, letterSpacing: '0.04em', fontWeight: 700 }}>{item.title}</div>
                      <div style={{ fontSize: 10, color: MU_R.inkLow, fontWeight: 500 }}>{item.time}</div>
                    </div>
                    <div style={{ marginTop: 6, fontSize: 12, color: MU_R.inkMid, lineHeight: 1.6 }}>{item.body}</div>
                  </div>
                  <div style={{ height: 18, padding: '0 6px', borderRadius: 9, background: 'rgba(164, 150, 115, 0.12)', color: MU_R.goldDeep, fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center' }}>{item.status}</div>
                </div>
              ))}
            </window.MU_FlatRowGroup>
          ) : null}

          {activeType === 'support' ? (
            <div style={{ margin: '14px 20px 0' }}>
              <window.MU_HeroCard bg={MU_R.ink} padding="16px 18px" style={{ cursor: 'pointer' }}>
                <button
                  type="button"
                  onClick={() => window.__nav?.open('support-chat')}
                  style={{ width: '100%', background: 'transparent', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: MU_R.r.none, background: 'transparent', border: `0.5px solid rgba(212, 188, 140, 0.36)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={MU_R.gold} strokeWidth="1.6">
                      <path d="M4 5 H20 A1 1 0 0 1 21 6 V17 A1 1 0 0 1 20 18 H10 L5 21 V18 H4 A1 1 0 0 1 3 17 V6 A1 1 0 0 1 4 5 Z" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: MU_R.fontBrand, fontSize: 10, color: MU_R.gold, letterSpacing: '0.2em' }}>PRIVATE SUPPORT</div>
                    <div style={{ marginTop: 4, fontFamily: MU_R.fontSerif, fontSize: 16, color: '#F6F2EF', letterSpacing: '0.04em' }}>专属客户服务</div>
                    <div style={{ marginTop: 4, fontSize: 11, color: 'rgba(246,242,239,0.7)', lineHeight: 1.6 }}>进入 1 对 1 客服通道，处理预约、支付、礼物和账户问题。</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MU_R.gold} strokeWidth="1.8" style={{ flexShrink: 0 }}><path d="M9 5 L16 12 L9 19" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </window.MU_HeroCard>
            </div>
          ) : null}
        </div>

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_NoticeDetail() {
  const notice = MU_getNoticeDetailContext();

  return (
    <div style={{ width: '100%', height: '100%', background: MU_R.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 40 }}>
        <div style={{ paddingTop: MU_TOP_SPACING }}>
          <div style={{ padding: '10px 16px 12px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <button type="button" onClick={() => window.__nav?.back()} style={{ width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF', border: `0.5px solid ${MU_R.hairlineStrong}`, cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MU_R.ink} strokeWidth="2.5"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div style={{ flex: 1, textAlign: 'center', marginRight: 46 }}>
              <div style={{ fontFamily: MU_R.fontBrand, fontSize: 10, color: MU_R.goldDeep, letterSpacing: '0.24em' }}>NOTICE</div>
              <div style={{ marginTop: 4, fontFamily: MU_R.fontSerif, fontSize: 16, color: MU_R.ink, letterSpacing: '0.06em' }}>通知详情</div>
            </div>
          </div>
        </div>

        <div style={{ margin: '14px 20px 0', padding: 18, borderRadius: 20, background: '#FFFFFF', border: `0.5px solid ${MU_R.hairlineStrong}`, boxShadow: '0 12px 30px rgba(26,44,49,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <div style={{ height: 22, padding: '0 8px', borderRadius: 999, background: MU_R.rougeTint, color: MU_R.rouge, fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center', border: `0.5px solid #F0DCD8` }}>{notice.badge}</div>
            <div style={{ fontSize: 11, color: MU_R.inkLow }}>{notice.time}</div>
          </div>
          <div style={{ marginTop: 12, fontFamily: MU_R.fontSerif, fontSize: 24, color: MU_R.ink, lineHeight: 1.35 }}>{notice.detailTitle || notice.title}</div>
          <div style={{ marginTop: 10, fontSize: 13, color: MU_R.inkMid, lineHeight: 1.8 }}>{notice.body}</div>
        </div>

        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 18, background: '#FFFFFF', border: `0.5px solid ${MU_R.hairline}` }}>
          <div style={{ fontFamily: MU_R.fontBrand, fontSize: 10, color: MU_R.goldDeep, letterSpacing: '0.24em' }}>DETAIL</div>
          <div style={{ marginTop: 8, fontSize: 12, color: MU_R.ink, lineHeight: 1.8 }}>{notice.detailBody || notice.body}</div>
        </div>

        <div style={{ padding: '18px 20px 0' }}>
          <button type="button" onClick={() => window.__nav?.back()} style={{ width: '100%', height: 42, borderRadius: 999, background: '#FFFFFF', border: `0.5px solid ${MU_R.goldLight}`, color: MU_R.ink, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            通知列表に戻る
          </button>
        </div>
      </div>
    </div>
  );
}

function MU_SupportChat() {
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([
    { id: 'support-1', from: 'them', text: '您好，这里是专属客户服务。可以协助您处理预约、支付、礼物、账号异常等问题。', time: '21:10' },
    { id: 'support-2', from: 'them', text: '如果是紧急订单问题，请直接发送订单编号，我们会优先处理。', time: '21:11' },
  ]);

  function sendMessage() {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: `support-${Date.now()}`, from: 'me', text, time: 'たった今' }]);
    setDraft('');
  }

  return (
    <div style={{ width: '100%', height: '100%', background: MU_R.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, paddingTop: MU_TOP_SPACING, background: 'rgba(251, 247, 244, 0.94)', backdropFilter: 'blur(20px)', borderBottom: `0.5px solid ${MU_R.hairlineStrong}` }}>
        <div style={{ padding: '10px 16px 12px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <button type="button" onClick={() => window.__nav?.back()} style={{ width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF', border: `0.5px solid ${MU_R.hairlineStrong}`, cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MU_R.ink} strokeWidth="2.5"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div style={{ width: 42, height: 42, borderRadius: 21, background: MU_R.gradGold, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: MU_R.shadowGold }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A2C31" strokeWidth="2">
              <path d="M12 18 H12.01" strokeLinecap="round" />
              <path d="M9.1 9 A3 3 0 1 1 14.9 10 C13.6 10.7 12.7 11.4 12.3 12.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, color: MU_R.ink, fontFamily: MU_R.fontSerif, letterSpacing: '0.02em', fontWeight: 800 }}>专属客户服务</div>
            <div style={{ marginTop: 4, fontSize: 10, color: MU_R.goldDeep, fontWeight: 700, letterSpacing: '0.12em' }}>ONLINE SUPPORT · 1 TO 1</div>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 84 + MU_TOP_SPACING, bottom: 72, left: 0, right: 0, overflowY: 'auto', padding: '16px 16px 0' }}>
        <div style={{ marginBottom: 14, padding: '12px 14px', borderRadius: 16, background: '#FBF1F1', border: '1px solid #F0DCD8', fontSize: 11, color: MU_R.rouge, lineHeight: 1.7 }}>
          当前入口适用于预约异常、支付问题、优惠券未到账、礼物记录核对、账号安全等人工服务。
        </div>
        {messages.map((message) => {
          const isMe = message.from === 'me';
          return (
            <div key={message.id} style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
              <div style={{ maxWidth: 260 }}>
                <div style={{ padding: '12px 16px', borderRadius: isMe ? '20px 4px 20px 20px' : '4px 20px 20px 20px', background: isMe ? MU_R.bubbleSelf : MU_R.bubbleOther, border: isMe ? `0.5px solid ${MU_R.bubbleSelfBorder}` : 'none', color: MU_R.ink, fontSize: 13, lineHeight: 1.7, boxShadow: 'none' }}>
                  {message.text}
                </div>
                <div style={{ marginTop: 5, fontSize: 9, color: MU_R.inkLow, textAlign: isMe ? 'right' : 'left' }}>{message.time}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(251, 247, 244, 0.96)', backdropFilter: 'blur(20px)', borderTop: `0.5px solid ${MU_R.hairlineStrong}`, padding: '10px 14px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: 42, borderRadius: 12, background: '#FFFFFF', border: `0.5px solid ${MU_R.hairlineStrong}`, padding: '0 14px', display: 'flex', alignItems: 'center', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)' }}>
            <input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') sendMessage(); }} placeholder="输入问题描述或订单编号..." style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 14, color: MU_R.ink }} />
          </div>
          <button type="button" onClick={sendMessage} style={{ width: 72, height: 42, borderRadius: 12, background: MU_R.gradGold, color: '#1A2C31', fontSize: 13, fontWeight: 800, cursor: 'pointer', boxShadow: MU_R.shadowGold }}>
            发送
          </button>
        </div>
      </div>
    </div>
  );
}

function MU_Chat() {
  const messageListRef = useRef(null);
  const [draft, setDraft] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [activeQuickType, setActiveQuickType] = useState('emoji');
  const [activeEmojiGroup, setActiveEmojiGroup] = useState('common');
  const [giftFx, setGiftFx] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageMenuPos, setMessageMenuPos] = useState(null);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [isTypingReply, setIsTypingReply] = useState(false);
  const [messages, setMessages] = useState([
    { id: 'm1', from: 'them', type: 'text', text: 'こんばんは。今日もお店で待ってるね。', time: '21:02' },
    { id: 'm2', from: 'me', type: 'text', text: '22時ごろ着くよ。今日は2人で行くね。', time: '21:05', status: '送信済み' },
    { id: 'm3', from: 'me', type: 'gift', emoji: '🥂', title: 'シャンパンタワー', price: '¥180,000', time: '21:06', status: '送信済み' },
    { id: 'm4', from: 'them', type: 'text', text: 'ありがとう。本当に会えるのが楽しみだよ。', time: '21:07' },
    { id: 'm5', from: 'them', type: 'card', title: '七海 · 今夜出勤', subtitle: '21:00 - 翌4:00 · LOUNGE ARIA', tag: 'カード', target: 'cast-detail', time: '21:08' },
    { id: 'm6', from: 'them', type: 'package', title: 'ペアコース', subtitle: '2時間 + 指名1名', price: '¥52,000', time: '21:09' },
  ]);

  const emojiGroups = [
    { id: 'common', label: '定番', items: ['😀', '😁', '😂', '🤣', '😊', '😎', '👍', '👏', '🙏', '💪', '👀', '✨'] },
    { id: 'mood', label: '気分', items: ['😍', '😘', '🥰', '🤗', '🤔', '🥺', '😭', '😤', '😴', '🙄', '😳', '😇'] },
    { id: 'love', label: 'ハート', items: ['❤️', '💖', '💗', '💘', '💝', '💞', '🫶', '💌', '🌹', '💕', '🤍', '🥹'] },
    { id: 'party', label: 'パーティー', items: ['🎉', '🔥', '🍓', '🥂', '🍾', '🎤', '🎁', '🎊', '🍰', '🌟', '🎶', '🍷'] },
  ];
  const emojiOptions = emojiGroups.find((group) => group.id === activeEmojiGroup)?.items || emojiGroups[0].items;
  const cardOptions = [
    { id: 'card1', title: '七海 · 今夜出勤', subtitle: '21:00 - 翌4:00 · LOUNGE ARIA', tag: 'カード', target: 'cast-detail' },
    { id: 'card2', title: 'LOUNGE ARIA 銀座本店', subtitle: '初回来店 10,000円OFF', tag: '店舗', target: 'shop-detail' },
  ];
  const packageOptions = [
    { id: 'pkg1', title: 'ペアコース', subtitle: '2時間 + 指名1名', price: '¥52,000' },
    { id: 'pkg2', title: 'シャンパンライトラグジュアリー', subtitle: 'スパークリング1本 + フルーツ盛り', price: '¥88,000' },
  ];
  const giftOptions = [
    { id: 'gift1', emoji: '🌹', title: 'ローズブーケ', price: '¥12,000' },
    { id: 'gift2', emoji: '🍾', title: 'シャンパンギフト', price: '¥38,000' },
    { id: 'gift3', emoji: '💎', title: 'クリスタルハート', price: '¥88,000' },
    { id: 'gift4', emoji: '🥂', title: 'シャンパンタワー', price: '¥180,000' },
  ];
  const imageOptions = [
    { id: 'img1', title: '営業前セルフィー', src: MU_RANK_AVATARS[0] },
    { id: 'img2', title: '店内個室', src: 'https://images.pexels.com/photos/5371577/pexels-photo-5371577.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'img3', title: '今夜のコーデ', src: MU_RANK_AVATARS[1] },
  ];

  const getNowTime = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  const getAutoReply = (message) => {
    if (message.type === 'gift') {
      return { from: 'them', type: 'text', text: `受け取ったよ：${message.title} 。ありがとう、今夜はしっかり一緒に過ごすね。`, time: getNowTime() };
    }
    if (message.type === 'package') {
      return { from: 'them', type: 'text', text: `このコース見たよ。先に席を押さえておくね。着いたらそのまま連絡して。`, time: getNowTime() };
    }
    if (message.type === 'card') {
      return { from: 'them', type: 'text', text: `受け取ったよ。このカードは上に固定しておいたから、あとでここからすぐ連絡してね。`, time: getNowTime() };
    }
    if (message.type === 'image') {
      return { from: 'them', type: 'text', text: `この写真すごく好き。実物のほうがもっと素敵だよ、待ってるね。`, time: getNowTime() };
    }
    const text = message.text || '';
    if (text.length <= 3) {
      return { from: 'them', type: 'text', text: 'スタンプ受け取ったよ。急に会いたくなっちゃった。', time: getNowTime() };
    }
    return { from: 'them', type: 'text', text: '確認したよ。連絡待ってるね。', time: getNowTime() };
  };

  const appendMessage = (message) => {
    const normalized = {
      ...message,
      time: message.time || getNowTime(),
      status: message.from === 'me' ? message.status || '送信中' : message.status,
      id: `msg-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
    };
    setMessages((prev) => [...prev, normalized]);
    if (normalized.from === 'me' && !normalized.recalled) {
      window.setTimeout(() => {
        setMessages((prev) =>
          prev.map((item) => (item.id === normalized.id && !item.recalled ? { ...item, status: '送信済み' } : item)),
        );
      }, 620);
    }
    return normalized;
  };

  const closePicker = () => {
    setPickerOpen(false);
  };

  const closeMessageActions = () => {
    setSelectedMessage(null);
    setMessageMenuPos(null);
  };

  const closeOverlays = () => {
    closePicker();
    closeMessageActions();
    setMoreMenuOpen(false);
  };

  const sendQuickMessage = (message, options = {}) => {
    const sent = appendMessage(message);
    if (options.triggerGift) triggerGiftFx(options.triggerGift);
    closePicker();
    setIsTypingReply(true);
    window.setTimeout(() => {
      appendMessage(getAutoReply(sent));
      setIsTypingReply(false);
    }, 900);
  };

  const triggerGiftFx = (gift) => {
    setGiftFx({ ...gift, key: `fx-${Date.now()}` });
    window.setTimeout(() => {
      setGiftFx(null);
    }, 1400);
  };

  const getMessagePreview = (message) => {
    if (message.type === 'gift') return `${message.emoji} ${message.title}`;
    if (message.type === 'card') return message.title;
    if (message.type === 'package') return message.title;
    if (message.type === 'image') return `[画像] ${message.title}`;
    return message.text;
  };

  const openMessageActions = (message, element) => {
    const rect = element.getBoundingClientRect();
    const menuWidth = 220;
    const menuHeight = 92;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const left = message.from === 'me'
      ? Math.max(12, rect.right - menuWidth)
      : Math.min(viewportWidth - menuWidth - 12, rect.left);
    const placeBelow = rect.top - menuHeight - 10 < 70;
    const top = placeBelow
      ? Math.min(viewportHeight - menuHeight - 90, rect.bottom + 10)
      : rect.top - menuHeight - 10;

    setSelectedMessage(message);
    setMessageMenuPos({
      left,
      top,
      align: message.from === 'me' ? 'right' : 'left',
      placeBelow,
      anchorX: message.from === 'me' ? rect.right - left - 22 : rect.left - left + 22,
    });
  };

  const handleCopyMessage = async () => {
    if (!selectedMessage) return;
    const text = getMessagePreview(selectedMessage);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      }
    } catch {}
    closeMessageActions();
  };

  const handleDeleteMessage = () => {
    if (!selectedMessage) return;
    setMessages((prev) => prev.filter((item) => item.id !== selectedMessage.id));
    closeMessageActions();
  };

  const handleRecallMessage = () => {
    if (!selectedMessage) return;
    setMessages((prev) => prev.map((item) => (item.id === selectedMessage.id ? { ...item, type: 'text', text: 'メッセージを取り消しました', recalled: true } : item)));
    closeMessageActions();
  };

  const sendTextMessage = () => {
    const value = draft.trim();
    if (!value) return;
    const sent = appendMessage({ from: 'me', type: 'text', text: value });
    setDraft('');
    closePicker();
    setIsTypingReply(true);
    window.setTimeout(() => {
      appendMessage(getAutoReply(sent));
      setIsTypingReply(false);
    }, 900);
  };

  const renderBubble = (message) => {
    const isMe = message.from === 'me';
    if (message.type === 'gift') {
      return (
        <div style={{ width: 190, borderRadius: 20, overflow: 'hidden', border: `0.5px solid ${MU_R.gold}`, background: '#FFFFFF', boxShadow: '0 12px 32px rgba(164, 150, 115, 0.18), inset 0 0 0 1px rgba(255,255,255,0.8)' }}>
          <div style={{ padding: '16px 14px', textAlign: 'center', background: 'linear-gradient(180deg, rgba(164, 150, 115, 0.08), transparent)' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{ position: 'absolute', inset: -10, background: 'radial-gradient(circle, rgba(164,150,115,0.2) 0%, transparent 70%)', filter: 'blur(4px)' }} />
              <div style={{ fontSize: 36, position: 'relative' }}>{message.emoji}</div>
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: MU_R.ink, fontFamily: MU_R.fontSerif, letterSpacing: '0.06em', fontWeight: 700 }}>{message.title}</div>
            <div style={{ marginTop: 4, fontSize: 11, color: MU_R.goldDeep, fontFamily: MU_R.fontBrand, letterSpacing: '0.12em', fontWeight: 800 }}>{message.price}</div>
          </div>
        </div>
      );
    }

    if (message.type === 'card') {
      return (
        <button type="button" onClick={(event) => { event.stopPropagation(); window.__nav?.open(message.target || 'cast-detail'); }} style={{ width: 230, padding: 14, borderRadius: 18, background: '#FFFFFF', border: `0.5px solid ${MU_R.hairlineStrong}`, textAlign: 'left', cursor: 'pointer', boxShadow: '0 10px 24px rgba(26, 44, 49, 0.06), inset 0 1px 1px rgba(255,255,255,1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <div style={{ fontSize: 14, color: MU_R.ink, fontFamily: MU_R.fontSerif, letterSpacing: '0.02em', fontWeight: 700 }}>{message.title}</div>
            <div style={{ height: 18, padding: '0 8px', borderRadius: 9, background: MU_R.rouge, color: '#F6F2EF', fontSize: 8, fontWeight: 800, display: 'flex', alignItems: 'center', boxShadow: '0 2px 6px rgba(217,83,79,0.2)' }}>{message.tag}</div>
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: MU_R.inkMid, lineHeight: 1.5, opacity: 0.8 }}>{message.subtitle}</div>
          <div style={{ marginTop: 12, height: 1, background: MU_R.hairline }} />
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, color: MU_R.goldDeep, fontWeight: 700 }}>詳細を表示</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={MU_R.goldDeep} strokeWidth="3"><path d="M9 18l6-6-6-6" /></svg>
          </div>
        </button>
      );
    }

    if (message.type === 'package') {
      return (
        <button type="button" onClick={(event) => { event.stopPropagation(); window.__nav?.open('booking'); }} style={{ width: 230, padding: 16, borderRadius: 20, background: 'linear-gradient(135deg, #FDFBF9 0%, #EFEBE7 100%)', border: `1px solid ${MU_R.goldLight}`, textAlign: 'left', cursor: 'pointer', boxShadow: '0 12px 30px rgba(164, 150, 115, 0.15), inset 0 1px 1px rgba(255,255,255,1)' }}>
          <div style={{ fontFamily: MU_R.fontBrand, fontSize: 10, color: MU_R.goldDeep, letterSpacing: '0.18em', fontWeight: 800 }}>GROUP PACKAGE</div>
          <div style={{ marginTop: 6, fontSize: 15, color: MU_R.ink, fontFamily: MU_R.fontSerif, letterSpacing: '0.02em', fontWeight: 800 }}>{message.title}</div>
          <div style={{ marginTop: 4, fontSize: 11, color: MU_R.inkMid, opacity: 0.8 }}>{message.subtitle}</div>
          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 13, color: MU_R.goldDeep, fontFamily: MU_R.fontBrand, letterSpacing: '0.1em', fontWeight: 900 }}>{message.price}</div>
            <div style={{ height: 26, padding: '0 14px', borderRadius: 13, background: MU_R.gradGold, color: '#1A2C31', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', boxShadow: MU_R.shadowGold }}>予約する</div>
          </div>
        </button>
      );
    }

    if (message.type === 'image') {
      return (
        <button type="button" onClick={(event) => { event.stopPropagation(); setPreviewImage(message); }} style={{ width: 200, padding: 4, borderRadius: 20, overflow: 'hidden', background: '#FFFFFF', border: `0.5px solid ${MU_R.hairlineStrong}`, cursor: 'pointer', textAlign: 'left', boxShadow: '0 12px 36px rgba(26, 44, 49, 0.08)' }}>
          <img src={message.src} alt={message.title} style={{ width: '100%', height: 200, borderRadius: 16, objectFit: 'cover', display: 'block' }} />
          <div style={{ padding: '10px 12px 8px', fontSize: 12, color: MU_R.ink, fontFamily: MU_R.fontSerif, letterSpacing: '0.04em', fontWeight: 600 }}>{message.title}</div>
        </button>
      );
    }

    return (
      <div style={{
        maxWidth: 250,
        padding: '12px 16px',
        borderRadius: isMe ? '20px 4px 20px 20px' : '4px 20px 20px 20px',
        background: isMe ? MU_R.bubbleSelf : MU_R.bubbleOther,
        border: isMe ? `0.5px solid ${MU_R.bubbleSelfBorder}` : 'none',
        boxShadow: 'none',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          fontSize: 13,
          color: message.recalled ? MU_R.inkLow : MU_R.ink,
          lineHeight: 1.6, 
          letterSpacing: isMe ? '0.02em' : '0', 
          fontStyle: message.recalled ? 'italic' : 'normal',
          fontWeight: isMe ? 600 : 400,
          position: 'relative',
          zIndex: 1
        }}>
          {message.text}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const node = messageListRef.current;
    if (!node) return;
    window.requestAnimationFrame(() => {
      node.scrollTo({ top: node.scrollHeight, behavior: 'smooth' });
    });
  }, [messages, pickerOpen]);

  return (
    <div style={{ width: '100%', height: '100%', background: MU_R.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, paddingTop: MU_TOP_SPACING, background: 'rgba(251, 247, 244, 0.94)', backdropFilter: 'blur(20px)', borderBottom: `0.5px solid ${MU_R.hairlineStrong}` }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.02, pointerEvents: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
        <div style={{ padding: '10px 16px 12px', display: 'flex', alignItems: 'center', gap: 14, position: 'relative', zIndex: 1 }}>
          <button type="button" onClick={() => { closePicker(); window.__nav?.back(); }} style={{ width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF', border: `0.5px solid ${MU_R.hairlineStrong}`, cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MU_R.ink} strokeWidth="2.5"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <MU_ChatAvatar size={42} src={MU_RANK_AVATARS[0]} online />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 15, color: MU_R.ink, fontFamily: MU_R.fontSerif, letterSpacing: '0.02em', fontWeight: 800 }}>七海</span>
              <window.MU_LevelPill lvl={7} />
            </div>
            <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 8, color: MU_R.goldDeep, fontFamily: MU_R.fontBrand, letterSpacing: '0.12em', fontWeight: 800 }}>AFFECTION 5/7</div>
              <div style={{ flex: 1, height: 3, borderRadius: 1.5, background: 'rgba(164, 150, 115, 0.12)', overflow: 'hidden', maxWidth: 80 }}>
                <div style={{ width: '71%', height: '100%', background: MU_R.gradGold, borderRadius: 1.5 }} />
              </div>
            </div>
          </div>
          <button type="button" onClick={() => setMoreMenuOpen((prev) => !prev)} style={{ width: 32, height: 32, borderRadius: 10, background: '#FFFFFF', border: `0.5px solid ${MU_R.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill={MU_R.inkMid}><circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /></svg>
          </button>
        </div>

        <div style={{ padding: '0 16px 12px', position: 'relative', zIndex: 1 }}>
          <button type="button" onClick={() => window.__nav?.open('booking')} style={{ width: '100%', padding: '10px 14px', borderRadius: 14, background: '#FBF1F1', border: '1px solid #F0DCD8', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', textAlign: 'left', boxShadow: '0 4px 12px rgba(217, 83, 79, 0.05)' }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: MU_R.rouge, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 10px rgba(217, 83, 79, 0.2)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2"><path d="M20 12V8H4v4m16 0v4H4v-4m16 0h2M4 12H2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: MU_R.ink, fontWeight: 700, letterSpacing: '0.02em' }}>ペアコース 8,000円OFF</div>
              <div style={{ fontSize: 9, color: MU_R.rouge, fontWeight: 600, letterSpacing: '0.08em', marginTop: 1 }}>LIMITED · EXP 2026/05/31</div>
            </div>
            <div style={{ padding: '5px 12px', borderRadius: 10, background: MU_R.gradGold, fontSize: 10, fontWeight: 900, color: '#1A2C31', letterSpacing: '0.1em', boxShadow: '0 4px 10px rgba(164, 150, 115, 0.25)' }}>予約</div>
          </button>
        </div>
      </div>

      <div
        ref={messageListRef}
        style={{ position: 'absolute', top: 158, bottom: pickerOpen ? 214 : 72, left: 0, right: 0, overflowY: 'auto', padding: '16px 16px 0' }}
        onClick={() => {
          if (pickerOpen || selectedMessage || moreMenuOpen) closeOverlays();
        }}
      >
        <div style={{ textAlign: 'center', fontSize: 9, color: MU_R.inkLow, letterSpacing: '0.2em', margin: '8px 0 16px' }}>TODAY · 21:02</div>

        {messages.map((message) => (
          <div key={message.id} style={{ display: 'flex', justifyContent: message.from === 'me' ? 'flex-end' : 'flex-start', gap: 8, marginBottom: 10 }}>
            {message.from === 'them' ? <MU_ChatAvatar size={28} src={MU_RANK_AVATARS[0]} /> : null}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: message.from === 'me' ? 'flex-end' : 'flex-start', gap: 5 }}>
              <div
                role="button"
                tabIndex={0}
                onClick={(event) => {
                  openMessageActions(message, event.currentTarget);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openMessageActions(message, event.currentTarget);
                  }
                }}
                style={{ cursor: 'pointer', textAlign: 'inherit', outline: 'none' }}
              >
                {renderBubble(message)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9, color: MU_R.inkLow }}>
                <span>{message.time}</span>
                {message.from === 'me' ? <span style={{ color: MU_R.goldDeep }}>· {message.status || '送信済み'}</span> : null}
              </div>
            </div>
          </div>
        ))}

        {isTypingReply ? (
          <div style={{ display: 'flex', justifyContent: 'flex-start', gap: 8, marginBottom: 10 }}>
            <MU_ChatAvatar size={28} src={MU_RANK_AVATARS[0]} />
            <div style={{ maxWidth: 86, padding: '12px 14px', borderRadius: '4px 14px 14px 14px', background: MU_R.surface, border: `0.5px solid ${MU_R.hairline}`, display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: MU_R.goldDeep, opacity: 0.4 }} />
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: MU_R.goldDeep, opacity: 0.7 }} />
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: MU_R.goldDeep, opacity: 1 }} />
            </div>
          </div>
        ) : null}

        <div style={{ marginLeft: 36, fontSize: 9, color: MU_R.inkLow, marginBottom: 10 }}>残り6件の過去メッセージ · <span style={{ color: MU_R.goldDeep }}>解放後に閲覧可能</span></div>
      </div>

      {giftFx ? (
        <div style={{ position: 'absolute', inset: 0, zIndex: 100, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(26, 44, 49, 0.15)' }}>
          <div style={{ position: 'relative', width: 240, height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(164, 150, 115, 0.4) 0%, transparent 70%)', animation: 'muGiftRipple 1.4s ease-out forwards' }} />
            <div style={{ position: 'absolute', width: 220, height: 220, borderRadius: '50%', border: '1px solid rgba(164, 150, 115, 0.3)', animation: 'muGiftRipple 1.2s ease-out 0.1s forwards', opacity: 0 }} />
            
            <div style={{ 
              position: 'absolute', 
              width: 110, height: 110, 
              borderRadius: '50%', 
              background: '#FFFFFF', 
              boxShadow: '0 20px 50px rgba(164, 150, 115, 0.4), inset 0 0 0 1px rgba(164, 150, 115, 0.1)', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              animation: 'muGiftRiseHigh 1.2s cubic-bezier(0.2, 0.8, 0.2, 1.1) forwards',
              zIndex: 2 
            }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: '-100%', width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)', transform: 'skewX(-25deg)', animation: 'muSweep 1.5s infinite 0.5s' }} />
              </div>
              <div style={{ fontSize: 42, lineHeight: 1, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}>{giftFx.emoji}</div>
              <div style={{ marginTop: 6, fontSize: 10, color: MU_R.goldDeep, fontFamily: MU_R.fontBrand, letterSpacing: '0.15em', fontWeight: 900 }}>GLORY GIFT</div>
            </div>
            
            <div style={{ 
              position: 'absolute', 
              bottom: 10, 
              left: '50%', 
              transform: 'translateX(-50%)', 
              padding: '10px 20px', 
              borderRadius: 999, 
              background: 'rgba(26, 44, 49, 0.88)', 
              backdropFilter: 'blur(10px)',
              color: '#FFFFFF', 
              fontSize: 13, 
              letterSpacing: '0.08em', 
              fontWeight: 700,
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              animation: 'muGiftLabelHigh 1.2s ease-out forwards', 
              whiteSpace: 'nowrap',
              zIndex: 3 
            }}>
              {giftFx.title} <span style={{ color: MU_R.gold, marginLeft: 8 }}>{giftFx.price}</span>
            </div>
          </div>
        </div>
      ) : null}

      {moreMenuOpen ? (
        <div style={{ position: 'absolute', top: 94, right: 12, zIndex: 26, width: 156, borderRadius: 16, background: 'rgba(255,255,255,0.96)', border: `0.5px solid ${MU_R.hairline}`, boxShadow: '0 14px 30px rgba(26,44,49,0.14)', overflow: 'hidden' }}>
          {[
            { label: 'キャスト詳細を見る', action: () => window.__nav?.open('cast-detail') },
            { label: '店舗詳細を見る', action: () => window.__nav?.open('shop-detail') },
            { label: '今すぐ予約', action: () => window.__nav?.open('booking') },
          ].map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setMoreMenuOpen(false);
                item.action();
              }}
              style={{ width: '100%', height: 42, background: '#FFF', color: MU_R.ink, fontSize: 12, borderTop: index > 0 ? `0.5px solid ${MU_R.hairline}` : 'none', cursor: 'pointer' }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}

      {previewImage ? (
        <div style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'rgba(18, 14, 12, 0.84)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 18px' }} onClick={() => setPreviewImage(null)}>
          <div style={{ width: '100%', maxWidth: 380 }} onClick={(event) => event.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 14, color: '#F6F2EF', fontFamily: MU_R.fontSerif }}>{previewImage.title}</div>
              <button type="button" onClick={() => setPreviewImage(null)} style={{ width: 34, height: 34, borderRadius: 17, background: 'rgba(251,247,244,0.12)', border: '1px solid rgba(251,247,244,0.14)', color: '#F6F2EF', fontSize: 18, cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.35)' }}>
              <img src={previewImage.src} alt={previewImage.title} style={{ width: '100%', maxHeight: 520, objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      ) : null}

      {selectedMessage ? (
        <div style={{ position: 'absolute', inset: 0, zIndex: 120, background: 'rgba(18, 14, 12, 0.3)', backdropFilter: 'blur(4px)', animation: 'muFadeIn 0.2s ease-out' }} onClick={closeMessageActions}>
          <div
            style={{ 
              position: 'fixed', 
              left: messageMenuPos?.left ?? 16, 
              top: messageMenuPos?.top ?? 120, 
              minWidth: 180, 
              maxWidth: 240, 
              borderRadius: 20, 
              background: 'rgba(255,255,255,0.95)', 
              backdropFilter: 'blur(15px)',
              border: `0.5px solid ${MU_R.hairlineStrong}`, 
              boxShadow: '0 20px 40px rgba(26,44,49,0.25)', 
              padding: '12px',
              animation: 'muPopIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)' 
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div style={{ padding: '0 4px 10px', fontSize: 11, color: MU_R.inkMid, borderBottom: `0.5px solid ${MU_R.hairline}`, marginBottom: 10, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontWeight: 500, opacity: 0.7 }}>
              {getMessagePreview(selectedMessage)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              <button type="button" onClick={handleCopyMessage} style={{ height: 36, borderRadius: 10, background: '#F8F9FA', color: MU_R.ink, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: 'none' }}>コピー</button>
              {selectedMessage.from === 'me' && !selectedMessage.recalled ? (
                <button type="button" onClick={handleRecallMessage} style={{ height: 36, borderRadius: 10, background: 'rgba(164, 150, 115, 0.1)', color: MU_R.goldDeep, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: 'none' }}>送信取消</button>
              ) : null}
              <button type="button" onClick={handleDeleteMessage} style={{ height: 36, borderRadius: 10, background: '#FFF0F1', color: MU_R.rouge, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: 'none', gridColumn: selectedMessage.from === 'me' ? 'auto' : 'span 2' }}>削除</button>
            </div>
          </div>
        </div>
      ) : null}

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(251, 247, 244, 0.96)', backdropFilter: 'blur(20px)', borderTop: `0.5px solid ${MU_R.hairlineStrong}`, paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)' }}>
        <div style={{ padding: '10px 14px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button type="button" onClick={() => { setPickerOpen((prev) => !prev); }} style={{ width: 40, height: 40, borderRadius: 12, background: pickerOpen ? MU_R.gradGold : '#FFFFFF', border: `0.5px solid ${MU_R.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.03)', transition: 'all 0.2s ease' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={pickerOpen ? '#1A2C31' : MU_R.goldDeep} strokeWidth="2.5"><path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div style={{ flex: 1, height: 42, borderRadius: 12, background: '#FFFFFF', border: `0.5px solid ${MU_R.hairlineStrong}`, padding: '0 14px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)' }}>
            <button type="button" onClick={() => { setActiveQuickType('emoji'); setPickerOpen(true); }} style={{ color: MU_R.goldDeep, fontSize: 20, cursor: 'pointer', opacity: 0.8, filter: 'grayscale(0.2)' }}>☺</button>
            <input value={draft} onFocus={() => { if (pickerOpen) closePicker(); }} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') sendTextMessage(); }} placeholder="メッセージを入力..." style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 14, color: MU_R.ink, fontWeight: 500 }} />
          </div>
          <button type="button" onClick={sendTextMessage} style={{ minWidth: 64, height: 42, borderRadius: 12, background: MU_R.gradGold, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A2C31', fontSize: 13, fontWeight: 800, letterSpacing: '0.04em', cursor: 'pointer', boxShadow: MU_R.shadowGold, transition: 'transform 0.1s active', transform: 'scale(1)' }}>
            送信
          </button>
        </div>

        {pickerOpen ? (
          <div style={{ padding: '0 12px 12px' }}>
            <div style={{ marginBottom: 10, padding: 4, borderRadius: 18, background: MU_R.surface, border: `0.5px solid ${MU_R.hairline}`, display: 'flex', gap: 4 }}>
              {[
                { id: 'emoji', label: '絵文字' },
                { id: 'gift', label: 'ギフト' },
                { id: 'card', label: 'カード' },
                { id: 'package', label: 'コース' },
                { id: 'image', label: '画像' },
              ].map((tab) => {
                const active = tab.id === activeQuickType;
                return (
                  <button key={tab.id} type="button" onClick={() => setActiveQuickType(tab.id)} style={{ flex: 1, height: 30, borderRadius: 14, background: active ? MU_R.gradGold : 'transparent', color: active ? '#1A2C31' : MU_R.inkMid, fontSize: 11, fontWeight: active ? 700 : 500, cursor: 'pointer' }}>
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {activeQuickType === 'emoji' ? (
              <div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                  {emojiGroups.map((group) => {
                    const active = group.id === activeEmojiGroup;
                    return (
                      <button
                        key={group.id}
                        type="button"
                        onClick={() => setActiveEmojiGroup(group.id)}
                        style={{ height: 28, padding: '0 12px', borderRadius: 999, background: MU_R.surface, border: `0.5px solid ${active ? MU_R.gold : MU_R.hairline}`, color: active ? MU_R.goldDeep : MU_R.inkMid, fontSize: 10, fontWeight: active ? 700 : 500, cursor: 'pointer' }}
                      >
                        {group.label}
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, maxHeight: 188, overflowY: 'auto', paddingRight: 2 }}>
                  {emojiOptions.map((emoji) => (
                    <button key={emoji} type="button" onClick={() => setDraft((prev) => `${prev}${emoji}`)} style={{ height: 44, borderRadius: 14, background: MU_R.surface, border: `0.5px solid ${MU_R.hairline}`, fontSize: 22, cursor: 'pointer' }}>
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {activeQuickType === 'gift' ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {giftOptions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      sendQuickMessage({ from: 'me', type: 'gift', ...item }, { triggerGift: item });
                    }}
                    style={{ padding: '14px 12px', borderRadius: 16, background: '#FFFFFF', border: `0.5px solid ${MU_R.hairlineStrong}`, cursor: 'pointer', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}
                  >
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 40, background: 'linear-gradient(180deg, rgba(164,150,115,0.06), transparent)', pointerEvents: 'none' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 1 }}>
                      <div style={{ width: 46, height: 46, borderRadius: 12, background: 'rgba(164, 150, 115, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8)' }}>{item.emoji}</div>
                      <div>
                        <div style={{ fontSize: 13, color: MU_R.ink, fontFamily: MU_R.fontSerif, letterSpacing: '0.02em', fontWeight: 700 }}>{item.title}</div>
                        <div style={{ marginTop: 4, fontSize: 11, color: MU_R.goldDeep, fontFamily: MU_R.fontBrand, letterSpacing: '0.08em', fontWeight: 900 }}>{item.price}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : null}

            {activeQuickType === 'card' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {cardOptions.map((item) => (
                  <button key={item.id} type="button" onClick={() => sendQuickMessage({ from: 'me', type: 'card', ...item })} style={{ padding: '12px 14px', borderRadius: 14, background: MU_R.surface, border: `0.5px solid ${MU_R.hairline}`, textAlign: 'left', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ fontSize: 13, color: MU_R.ink, fontFamily: MU_R.fontSerif }}>{item.title}</div>
                      <div style={{ height: 18, padding: '0 6px', borderRadius: 9, background: MU_R.rougeTint, color: MU_R.rouge, fontSize: 8, fontWeight: 700, display: 'flex', alignItems: 'center' }}>{item.tag}</div>
                    </div>
                    <div style={{ marginTop: 5, fontSize: 10, color: MU_R.inkMid }}>{item.subtitle}</div>
                  </button>
                ))}
              </div>
            ) : null}

            {activeQuickType === 'package' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {packageOptions.map((item) => (
                  <button key={item.id} type="button" onClick={() => sendQuickMessage({ from: 'me', type: 'package', ...item })} style={{ padding: '12px 14px', borderRadius: 14, background: 'linear-gradient(135deg, #EFEBE7 0%, #FFFFFF 100%)', border: `0.5px solid ${MU_R.hairlineStrong}`, textAlign: 'left', cursor: 'pointer' }}>
                    <div style={{ fontFamily: MU_R.fontBrand, fontSize: 9, color: MU_R.goldDeep, letterSpacing: '0.16em' }}>GROUP PACKAGE</div>
                    <div style={{ marginTop: 5, fontSize: 13, color: MU_R.ink, fontFamily: MU_R.fontSerif }}>{item.title}</div>
                    <div style={{ marginTop: 4, fontSize: 10, color: MU_R.inkMid }}>{item.subtitle}</div>
                    <div style={{ marginTop: 8, fontSize: 11, color: MU_R.goldDeep, fontFamily: MU_R.fontBrand, letterSpacing: '0.12em' }}>{item.price}</div>
                  </button>
                ))}
              </div>
            ) : null}

            {activeQuickType === 'image' ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {imageOptions.map((item) => (
                  <button key={item.id} type="button" onClick={() => sendQuickMessage({ from: 'me', type: 'image', ...item })} style={{ borderRadius: 12, overflow: 'hidden', border: `0.5px solid ${MU_R.hairline}`, background: MU_R.surface, cursor: 'pointer', textAlign: 'left' }}>
                    <img src={item.src} alt={item.title} style={{ width: '100%', height: 88, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '6px 7px', fontSize: 10, color: MU_R.ink }}>{item.title}</div>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <style>{`
        @keyframes muFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes muPopIn { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes muSweep { 0% { left: -100%; } 100% { left: 200%; } }
        @keyframes muGiftRipple {
          0% { transform: scale(0.5); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes muGiftRiseHigh {
          0% { transform: translateY(40px) scale(0.8); opacity: 0; }
          25% { opacity: 1; }
          65% { transform: translateY(-15px) scale(1.05); opacity: 1; }
          100% { transform: translateY(-35px) scale(1.1); opacity: 0; }
        }
        @keyframes muGiftLabelHigh {
          0% { transform: translateX(-50%) translateY(20px); opacity: 0; }
          25% { opacity: 1; }
          75% { transform: translateX(-50%) translateY(0); opacity: 1; }
          100% { transform: translateX(-50%) translateY(-15px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { MU_Ranking, MU_Messages, MU_Chat, MU_SupportChat, MU_NoticeDetail });

