import { useEffect, useState } from 'react';

const MU_CD = window.MU_TOKENS;
const MU_TOP_SPACING = window.MU_TOP_SPACING || 32;

const MU_CAST_IMAGES = {
  hero: 'https://images.pexels.com/photos/11746333/pexels-photo-11746333.jpeg?auto=compress&cs=tinysrgb&w=1200',
  shop: 'https://images.pexels.com/photos/36092418/pexels-photo-36092418.jpeg?auto=compress&cs=tinysrgb&w=600',
  gallery1: 'https://images.pexels.com/photos/11746333/pexels-photo-11746333.jpeg?auto=compress&cs=tinysrgb&w=900',
  gallery2: 'https://images.pexels.com/photos/1066134/pexels-photo-1066134.jpeg?auto=compress&cs=tinysrgb&w=900',
  gallery3: 'https://images.pexels.com/photos/15262855/pexels-photo-15262855.jpeg?auto=compress&cs=tinysrgb&w=900',
  gallery4: 'https://images.pexels.com/photos/14456935/pexels-photo-14456935.jpeg?auto=compress&cs=tinysrgb&w=900',
  gallery5: 'https://images.pexels.com/photos/32197366/pexels-photo-32197366.jpeg?auto=compress&cs=tinysrgb&w=900',
  gallery6: 'https://images.pexels.com/photos/32280799/pexels-photo-32280799.jpeg?auto=compress&cs=tinysrgb&w=900',
};

const MU_CAST_DETAIL_TABS = [
  { id: 'profile', label: 'プロフィール' },
  { id: 'album', label: 'アルバム' },
  { id: 'gifts', label: 'レビュー' },
];

const MU_CAST_FOLLOW_KEY = '__MU_CAST_FOLLOWING';
const MU_CAST_CHANGE_EVENT = 'mu-cast-following-change';
const MU_DEFAULT_CAST = {
  id: 'nanami',
  name: '七海',
  fullName: '七海 Nanami',
  shop: 'LOUNGE ARIA',
  shopLabel: 'LOUNGE ARIA 銀座本店',
  statusText: '本日出勤 · 21:00-翌4:00',
  subtitle: 'LOUNGE ARIA · 21:00 - 翌4:00',
  meta: '出勤中',
  tag: 'ONLINE',
  thumb: MU_CAST_IMAGES.hero,
  hero: MU_CAST_IMAGES.hero,
  shopThumb: MU_CAST_IMAGES.shop,
  distance: '1.2 km',
  ageLine: 'LOUNGE ARIA · 銀座七丁目 · 24歳 · 162cm',
};
const MU_DEFAULT_FOLLOWING = [
  MU_DEFAULT_CAST,
  {
    id: 'misaki',
    name: '美咲',
    fullName: '美咲 Misaki',
    shop: 'Club Velvet',
    shopLabel: 'Club Velvet',
    statusText: '本日は休み、明晩出勤',
    subtitle: 'Club Velvet · 本日は休み、明晩出勤',
    meta: 'Lv.5',
    thumb: MU_CAST_IMAGES.gallery2,
    hero: MU_CAST_IMAGES.gallery2,
    shopThumb: MU_CAST_IMAGES.shop,
    distance: '2.4 km',
    ageLine: 'Club Velvet · 六本木 · 23歳 · 160cm',
  },
  {
    id: 'rin',
    name: '凛',
    fullName: '凛 Rin',
    shop: 'NOBLE',
    shopLabel: 'NOBLE',
    statusText: '今週アルバムを4件更新',
    subtitle: 'NOBLE · 今週アルバムを4件更新',
    meta: 'NEW',
    thumb: MU_CAST_IMAGES.gallery3,
    hero: MU_CAST_IMAGES.gallery3,
    shopThumb: MU_CAST_IMAGES.shop,
    distance: '0.9 km',
    ageLine: 'NOBLE · 銀座八丁目 · 25歳 · 164cm',
  },
];

function MU_getCastFollowingMap() {
  if (!window[MU_CAST_FOLLOW_KEY]) {
    window[MU_CAST_FOLLOW_KEY] = new Map(MU_DEFAULT_FOLLOWING.map((item) => [item.id, item]));
  }
  return window[MU_CAST_FOLLOW_KEY];
}

function MU_getFollowingCasts() {
  return Array.from(MU_getCastFollowingMap().values());
}

function MU_isFollowingCast(id) {
  return MU_getCastFollowingMap().has(id);
}

function MU_toggleFollowingCast(cast) {
  const map = MU_getCastFollowingMap();
  if (map.has(cast.id)) {
    map.delete(cast.id);
  } else {
    map.set(cast.id, cast);
  }
  window.dispatchEvent(new CustomEvent(MU_CAST_CHANGE_EVENT, { detail: { id: cast.id, following: map.has(cast.id) } }));
  return map.has(cast.id);
}

function MU_setCastContext(cast) {
  window.__MU_CAST_CONTEXT = {
    ...MU_DEFAULT_CAST,
    ...cast,
  };
}

function MU_getCastContext() {
  return {
    ...MU_DEFAULT_CAST,
    ...(window.__MU_CAST_CONTEXT || {}),
  };
}

function MU_CastPhoto({ src, w, h, radius = 12, fullSize = false }) {
  const style = fullSize ? { position: 'absolute', inset: 0, width: '100%', height: '100%' } : { width: w, height: h };
  return (
    <div style={{ ...style, overflow: 'hidden', borderRadius: radius, position: fullSize ? 'absolute' : 'relative', background: '#eadfd6' }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  );
}

function MU_CastDetail() {
  const cast = MU_getCastContext();
  const [activeTab, setActiveTab] = useState('profile');
  const [contentVisible, setContentVisible] = useState(true);
  const [previewIndex, setPreviewIndex] = useState(null);
  const [following, setFollowing] = useState(() => MU_isFollowingCast(cast.id));

  const profile = [
    ['身長', '162 cm'],
    ['血液型', 'A型'],
    ['雰囲気', '落ち着いた会話が得意'],
    ['前職', 'モデル'],
    ['お酒', 'たしなむ程度'],
    ['喫煙', '吸わない'],
  ];
  const preferences = [
    ['お酒', '好き'],
    ['喫煙', '吸わない'],
    ['得意料理', '和食が得意'],
    ['好きな食べ物', 'お寿司、焼肉'],
    ['好きなお酒', 'シャンパン、ワイン'],
    ['好きな漫画', '鬼滅の刃'],
    ['好きな映画', '君の名は'],
    ['好きなキャラクター', '特になし'],
    ['好きな音楽', 'J-POP、K-POP'],
    ['男性の好み', '優しくて面白い人'],
    ['好きなプレゼント', '花束、アクセサリー'],
  ];

  const gallery = [
    { id: 'g1', src: MU_CAST_IMAGES.gallery1, title: '営業前の準備', meta: '2時間前に更新', height: 188 },
    { id: 'g2', src: MU_CAST_IMAGES.gallery2, title: 'シャンパンタイム', meta: '昨夜 23:18', height: 140 },
    { id: 'g3', src: MU_CAST_IMAGES.gallery3, title: '店内ミラーセルフィー', meta: '昨日更新', height: 214 },
    { id: 'g4', src: MU_CAST_IMAGES.gallery4, title: '休日コーデ', meta: '3日前', height: 162 },
    { id: 'g5', src: MU_CAST_IMAGES.gallery5, title: '和装イベントデー', meta: '先週', height: 204 },
    { id: 'g6', src: MU_CAST_IMAGES.gallery6, title: 'お店へ向かう途中', meta: '先週', height: 148 },
  ];

  const reviews = [
    { id: 'r1', nickname: 'K***', date: '2026/04/21', rating: 5, body: '写真以上に上品な雰囲気で、会話のテンポも心地よく、気まずさを感じる瞬間がありませんでした。気配りも自然でとても良かったです。', tag: 'Lv.12', useful: 18, verified: true, gift: { icon: '🌹', name: '赤いバラ', value: '100' }, avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: 'r2', nickname: 'R***', date: '2026/04/18', rating: 5, body: '前回ウイスキーが好きだと少し話しただけなのに、今回の再会で覚えていてくれました。細かい気遣いが本当に嬉しかったです。', tag: 'Lv.18', useful: 12, verified: true, gift: { icon: '🥃', name: 'ウイスキー', value: '500' }, avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: 'r3', nickname: 'M***', date: '2026/04/12', rating: 4, body: '一晩を通して空気感がとても自然で落ち着いていました。静かにお酒を飲みながら話したい人にぴったりです。', tag: 'Lv.9', useful: 7, verified: true, gift: { icon: '💐', name: '花束', value: '300' }, avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: 'r4', nickname: 'S***', date: '2026/04/05', rating: 5, body: '席についてから最後までとても丁寧で、同伴した友人にも積極的に気を配ってくれました。全体的に安心感のある接客でした。', tag: 'Lv.21', useful: 9, verified: false, gift: { icon: '🍾', name: 'シャンパン', value: '1200' }, avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=200' },
  ];
  const previewPhoto = previewIndex !== null ? gallery[previewIndex] : null;

  useEffect(() => {
    setContentVisible(false);
    const frame = window.requestAnimationFrame(() => {
      setContentVisible(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeTab]);

  useEffect(() => {
    if (previewIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setPreviewIndex(null);
      if (event.key === 'ArrowLeft') setPreviewIndex((current) => (current - 1 + gallery.length) % gallery.length);
      if (event.key === 'ArrowRight') setPreviewIndex((current) => (current + 1) % gallery.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gallery.length, previewIndex]);

  useEffect(() => {
    const sync = () => setFollowing(MU_isFollowingCast(cast.id));
    window.addEventListener(MU_CAST_CHANGE_EVENT, sync);
    return () => window.removeEventListener(MU_CAST_CHANGE_EVENT, sync);
  }, [cast.id]);

  return (
    <div style={{ width: '100%', height: '100%', background: MU_CD.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <div style={{ position: 'relative', width: '100%', height: 460 }}>
          <MU_CastPhoto src={MU_CAST_IMAGES.hero} w="100%" h={460} radius={0} fullSize />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, transparent 20%, transparent 55%, rgba(26, 44, 49, 0.75) 100%)' }} />

          <div style={{ position: 'absolute', top: MU_TOP_SPACING, left: 0, right: 0, padding: '8px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(255, 255, 255, 0.6)', border: `0.5px solid ${MU_CD.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => window.__nav?.back()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MU_CD.ink} strokeWidth="2"><path d="M15 6 L9 12 L15 18" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(255, 255, 255, 0.6)', border: `0.5px solid ${MU_CD.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MU_CD.ink} strokeWidth="1.6"><path d="M4 12 V18 A2 2 0 0 0 6 20 H18 A2 2 0 0 0 20 18 V12" strokeLinecap="round" /><path d="M16 6 L12 2 L8 6" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 2 V14" strokeLinecap="round" /></svg>
              </div>
              <button
                type="button"
                onClick={() => setFollowing(MU_toggleFollowingCast(cast))}
                style={{ width: 36, height: 36, borderRadius: 18, background: following ? MU_CD.gradGold : 'rgba(255, 255, 255, 0.6)', border: `0.5px solid ${following ? 'transparent' : MU_CD.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: following ? MU_CD.shadowGold : 'none', cursor: 'pointer' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill={following ? '#1A2C31' : 'none'} stroke={following ? '#1A2C31' : MU_CD.gold} strokeWidth="1.8"><path d="M12 21 C5 15 2 11 2 7 A5 5 0 0 1 12 5 A5 5 0 0 1 22 7 C22 11 19 15 12 21 Z" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>

          <div style={{ position: 'absolute', top: 108, right: 20, padding: '5px 10px', borderRadius: 12, background: 'rgba(255, 255, 255, 0.7)', border: `0.5px solid ${MU_CD.hairlineStrong}`, fontSize: 10, color: MU_CD.gold, letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={MU_CD.gold} strokeWidth="2"><path d="M12 2 C8 2 5 5 5 9 C5 14 12 22 12 22 C12 22 19 14 19 9 C19 5 16 2 12 2 Z" /><circle cx="12" cy="9" r="2" /></svg>
            {cast.distance}
          </div>

          <div style={{ position: 'absolute', top: 108, left: 20, display: 'flex', gap: 4 }}>
            {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ width: i === 0 ? 18 : 6, height: 3, borderRadius: 2, background: i === 0 ? MU_CD.gold : 'rgba(245, 239, 234, 0.35)' }} />)}
          </div>

          <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <window.MU_LevelPill lvl={7} size="md" />
              <div style={{ height: 22, padding: '0 10px', borderRadius: 11, background: MU_CD.success, color: '#F6F2EF', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, letterSpacing: '0.05em' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#F6F2EF' }} />
                {cast.statusText}
              </div>
            </div>
            <div style={{ fontFamily: MU_CD.fontSerif, fontSize: 28, color: '#F6F2EF', letterSpacing: '0.08em', fontWeight: 500, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{cast.name} <span style={{ fontSize: 15, color: '#E5D5B2', letterSpacing: '0.25em', fontFamily: MU_CD.fontBrand }}>{String(cast.fullName || '').split(' ').slice(1).join(' ').toUpperCase() || 'NANAMI'}</span></div>
            <div style={{ marginTop: 4, fontSize: 11, color: 'rgba(251, 247, 244, 0.8)', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>{cast.ageLine}</div>
          </div>
        </div>

        <div style={{ padding: '18px 20px 0' }}>
          <div style={{ padding: '0' }}>
            <div style={{ fontFamily: MU_CD.fontSerif, fontSize: 15, color: MU_CD.ink, lineHeight: 1.8, letterSpacing: '0.05em' }}>
              「シャンパン一杯から、特別な夜を一緒に。」
            </div>
          </div>

          <div style={{ marginTop: 18, padding: 14, borderRadius: 14, background: MU_CD.surface, border: `0.5px solid ${MU_CD.hairline}`, display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer' }} onClick={() => window.__nav?.open('shop-detail')}>
            <MU_CastPhoto src={MU_CAST_IMAGES.shop} w={48} h={48} radius={8} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: MU_CD.fontBrand, fontSize: 9, color: MU_CD.goldDeep, letterSpacing: '0.3em' }}>SHOP</div>
              <div style={{ fontFamily: MU_CD.fontSerif, fontSize: 14, color: MU_CD.ink, letterSpacing: '0.04em', marginTop: 2 }}>{cast.shopLabel}</div>
              <div style={{ fontSize: 10, color: MU_CD.inkMid, marginTop: 3, letterSpacing: '0.05em' }}>営業中 · 20:00 - 翌4:00</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MU_CD.gold} strokeWidth="1.8"><path d="M9 6 L15 12 L9 18" /></svg>
          </div>

          <div style={{ marginTop: 14, padding: '14px 0', display: 'flex', borderRadius: 14, background: 'linear-gradient(135deg, #EFEBE7 0%, #FFFFFF 100%)', border: `0.5px solid ${MU_CD.hairlineStrong}` }}>
            {[
              { label: 'AREA RANK', value: '3', unit: '位', sub: 'TOP 5' },
              { label: 'GIFTS', value: '248', unit: '件', sub: '¥4.2M' },
              { label: 'FANS', value: '1.8', unit: 'k', sub: '今月 +128' },
            ].map((item, i) => (
              <div key={item.label} style={{ flex: 1, textAlign: 'center', borderLeft: i > 0 ? `0.5px solid ${MU_CD.hairline}` : 'none' }}>
                <div style={{ fontFamily: MU_CD.fontBrand, fontSize: 9, color: MU_CD.goldDeep, letterSpacing: '0.2em' }}>{item.label}</div>
                <div style={{ marginTop: 6, fontFamily: MU_CD.fontSerif }}>
                  <span style={{ fontSize: 22, color: MU_CD.goldDeep, fontWeight: 500, letterSpacing: '0.02em' }}>{item.value}</span>
                  <span style={{ fontSize: 11, color: MU_CD.inkMid, marginLeft: 2 }}>{item.unit}</span>
                </div>
                <div style={{ marginTop: 2, fontSize: 9, color: MU_CD.inkMid, letterSpacing: '0.05em' }}>{item.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 22, display: 'flex', gap: 18, borderBottom: `0.5px solid ${MU_CD.hairline}` }}>
            {MU_CAST_DETAIL_TABS.map((tab) => {
              const active = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{ paddingBottom: 10, fontSize: 13, letterSpacing: '0.05em', color: active ? MU_CD.gold : MU_CD.inkMid, borderBottom: '1.5px solid transparent', fontFamily: MU_CD.fontSerif, fontWeight: active ? 500 : 400, cursor: 'pointer', transition: 'color 220ms ease, transform 220ms ease', transform: active ? 'translateY(-1px)' : 'translateY(0)' }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div style={{ transition: 'opacity 220ms ease, transform 220ms ease', opacity: contentVisible ? 1 : 0, transform: contentVisible ? 'translateY(0)' : 'translateY(10px)' }}>
            {activeTab === 'profile' ? (
              <>
              <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 20px' }}>
                {profile.map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10, borderBottom: `0.5px solid ${MU_CD.hairline}` }}>
                    <div style={{ fontSize: 11, color: MU_CD.inkMid, letterSpacing: '0.1em' }}>{k}</div>
                    <div style={{ fontSize: 12, color: MU_CD.ink, fontFamily: MU_CD.fontSerif, letterSpacing: '0.04em' }}>{v}</div>
                  </div>
                ))}
              </div>

              <div style={{ padding: '24px 0 0' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: MU_CD.ink, marginBottom: 10, letterSpacing: '0.05em' }}>好み・相性</div>
                <div style={{ background: MU_CD.surface, borderRadius: 16, padding: '4px 16px', border: `0.5px solid ${MU_CD.hairline}` }}>
                  {preferences.map(([label, value], index) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: index < preferences.length - 1 ? `0.5px solid ${MU_CD.hairline}` : 'none', gap: 12 }}>
                      <div style={{ width: 120, flexShrink: 0, fontSize: 13, color: MU_CD.inkMid, fontWeight: 500 }}>{label}</div>
                      <div style={{ flex: 1, minWidth: 0, fontSize: 14, color: MU_CD.ink, fontWeight: 600, textAlign: 'right', lineHeight: 1.5 }}>{value || '未設定'}</div>
                    </div>
                  ))}
                </div>
              </div>
              </>
            ) : null}

            {activeTab === 'album' ? (
              <>
              <div style={{ marginTop: 16, padding: '12px 14px', borderRadius: 14, background: MU_CD.surface, border: `0.5px solid ${MU_CD.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ fontFamily: MU_CD.fontBrand, fontSize: 10, color: MU_CD.goldDeep, letterSpacing: '0.25em' }}>GALLERY</div>
                  <div style={{ marginTop: 3, fontFamily: MU_CD.fontSerif, fontSize: 14, color: MU_CD.ink, letterSpacing: '0.04em' }}>出勤シーンと私服アルバム</div>
                </div>
                <div style={{ fontSize: 11, color: MU_CD.goldDeep, fontWeight: 600 }}>全 {gallery.length} 件</div>
              </div>

              <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1.12fr 0.88fr', gap: 10 }}>
                <button type="button" onClick={() => setPreviewIndex(0)} style={{ position: 'relative', minHeight: 322, borderRadius: 18, overflow: 'hidden', border: `0.5px solid ${MU_CD.hairline}`, boxShadow: MU_CD.shadowMd, cursor: 'pointer' }}>
                  <MU_CastPhoto src={gallery[0].src} w="100%" h={322} radius={0} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26, 44, 49, 0.05) 0%, rgba(26, 44, 49, 0.7) 100%)' }} />
                  <div style={{ position: 'absolute', top: 12, right: 12, height: 24, padding: '0 10px', borderRadius: 999, background: 'rgba(251, 247, 244, 0.88)', color: MU_CD.goldDeep, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', display: 'flex', alignItems: 'center' }}>タップで拡大</div>
                  <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14, textAlign: 'left' }}>
                    <div style={{ fontFamily: MU_CD.fontSerif, fontSize: 18, color: '#F6F2EF', letterSpacing: '0.05em', textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}>{gallery[0].title}</div>
                    <div style={{ marginTop: 5, fontSize: 11, color: 'rgba(251, 247, 244, 0.82)', letterSpacing: '0.06em' }}>{gallery[0].meta}</div>
                  </div>
                </button>

                <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 10 }}>
                  {gallery.slice(1, 3).map((item, index) => (
                    <button key={item.id} type="button" onClick={() => setPreviewIndex(index + 1)} style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: `0.5px solid ${MU_CD.hairline}`, boxShadow: MU_CD.shadowSm, cursor: 'pointer' }}>
                      <MU_CastPhoto src={item.src} w="100%" h={156} radius={0} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26, 44, 49, 0.02) 25%, rgba(26, 44, 49, 0.58) 100%)' }} />
                      <div style={{ position: 'absolute', left: 10, right: 10, bottom: 10, textAlign: 'left' }}>
                        <div style={{ fontFamily: MU_CD.fontSerif, fontSize: 12, color: '#F6F2EF', letterSpacing: '0.04em' }}>{item.title}</div>
                        <div style={{ marginTop: 3, fontSize: 9, color: 'rgba(251, 247, 244, 0.82)' }}>{item.meta}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {gallery.slice(3).map((item, index) => (
                  <button key={item.id} type="button" onClick={() => setPreviewIndex(index + 3)} style={{ borderRadius: 14, overflow: 'hidden', background: MU_CD.surface, border: `0.5px solid ${MU_CD.hairline}`, boxShadow: MU_CD.shadowSm, cursor: 'pointer', textAlign: 'left' }}>
                    <MU_CastPhoto src={item.src} w="100%" h={132} radius={0} />
                    <div style={{ padding: '9px 9px 10px' }}>
                      <div style={{ fontFamily: MU_CD.fontSerif, fontSize: 11, color: MU_CD.ink, letterSpacing: '0.04em' }}>{item.title}</div>
                      <div style={{ marginTop: 4, fontSize: 9, color: MU_CD.inkMid, letterSpacing: '0.04em' }}>{item.meta}</div>
                    </div>
                  </button>
                ))}
              </div>
              </>
            ) : null}

            {activeTab === 'gifts' ? (
              <>
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {reviews.map((review) => (
                  <div key={review.id} style={{ padding: '14px 16px', borderRadius: 14, background: MU_CD.surface, border: `0.5px solid ${MU_CD.hairline}` }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ width: 38, height: 38, borderRadius: 19, overflow: 'hidden', border: `0.5px solid ${MU_CD.hairlineStrong}`, background: MU_CD.bgSoft, flexShrink: 0 }}>
                        <img src={review.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                            <div style={{ fontSize: 12, color: MU_CD.ink, fontWeight: 700, whiteSpace: 'nowrap' }}>{review.nickname}</div>
                            <div style={{ height: 20, padding: '0 8px', borderRadius: 999, background: MU_CD.bgSoft, color: MU_CD.goldDeep, fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center' }}>{review.tag}</div>
                          </div>
                          <div style={{ fontSize: 10, color: MU_CD.inkMid }}>{review.date}</div>
                        </div>
                        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, minWidth: 68 }}>
                            <span style={{ fontSize: 15, lineHeight: 1, flexShrink: 0 }}>{review.gift.icon}</span>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 1, lineHeight: 1.2 }}>
                              <span style={{ color: MU_CD.rouge, fontSize: 11, fontWeight: 700 }}>{review.gift.name}</span>
                              <span style={{ color: MU_CD.goldDeep, fontSize: 10, fontWeight: 700 }}>+{review.gift.value}</span>
                            </div>
                          </div>
                          <div style={{ flex: 1, fontSize: 11, color: MU_CD.inkMid, lineHeight: 1.7 }}>{review.body}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              </>
            ) : null}
          </div>
        </div>

        <div style={{ height: 30 }} />
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 20px 28px', background: 'linear-gradient(180deg, rgba(251, 247, 244, 0) 0%, rgba(251, 247, 244, 0.95) 40%)', display: 'flex', gap: 10, alignItems: 'center', zIndex: 40 }}>
        <div style={{ width: 44, height: 44, borderRadius: 22, border: `0.5px solid ${MU_CD.hairlineStrong}`, background: MU_CD.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MU_CD.gold} strokeWidth="1.6"><path d="M12 21 C5 15 2 11 2 7 A5 5 0 0 1 12 5 A5 5 0 0 1 22 7 C22 11 19 15 12 21 Z" strokeLinejoin="round" /></svg>
        </div>
        <div style={{ flex: 1, height: 48, borderRadius: 24, background: MU_CD.rouge, border: `0.5px solid ${MU_CD.rougeSoft}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F6F2EF" strokeWidth="1.8"><path d="M12 2 L15 9 L22 10 L17 15 L18 22 L12 19 L6 22 L7 15 L2 10 L9 9 Z" /></svg>
          <span style={{ fontSize: 13, color: '#F6F2EF', fontWeight: 600, letterSpacing: '0.12em', fontFamily: MU_CD.fontSerif }}>ギフトを送る</span>
        </div>
        <div style={{ flex: 1.3, height: 48, borderRadius: 24, background: MU_CD.gradGold, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: MU_CD.shadowGold, cursor: 'pointer' }} onClick={() => window.__nav?.open('chat')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F6F2EF" strokeWidth="2"><path d="M4 5 H20 A1 1 0 0 1 21 6 V17 A1 1 0 0 1 20 18 H10 L5 21 V18 H4 A1 1 0 0 1 3 17 V6 A1 1 0 0 1 4 5 Z" strokeLinejoin="round" /></svg>
          <span style={{ fontSize: 13, color: '#F6F2EF', fontWeight: 700, letterSpacing: '0.15em' }}>メッセージ</span>
        </div>
      </div>

      {previewPhoto ? (
        <div style={{ position: 'absolute', inset: 0, zIndex: 80, background: 'rgba(18, 14, 12, 0.88)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 18px 42px' }} onClick={() => setPreviewIndex(null)}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 14 }} onClick={(event) => event.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#F6F2EF', gap: 12 }}>
              <div>
                <div style={{ fontFamily: MU_CD.fontSerif, fontSize: 18, letterSpacing: '0.05em' }}>{previewPhoto.title}</div>
                <div style={{ marginTop: 4, fontSize: 11, color: 'rgba(251, 247, 244, 0.7)', letterSpacing: '0.06em' }}>{previewPhoto.meta}</div>
              </div>
              <button type="button" onClick={() => setPreviewIndex(null)} style={{ width: 34, height: 34, borderRadius: 17, background: 'rgba(251, 247, 244, 0.12)', border: '1px solid rgba(251, 247, 244, 0.16)', color: '#F6F2EF', fontSize: 18, cursor: 'pointer' }}>×</button>
            </div>

            <div style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', background: '#120f0d', boxShadow: '0 24px 80px rgba(0,0,0,0.45)' }}>
              <MU_CastPhoto src={previewPhoto.src} w="100%" h={520} radius={0} />
              <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 0 1px rgba(251, 247, 244, 0.08)' }} />
              <button
                type="button"
                onClick={() => setPreviewIndex((previewIndex - 1 + gallery.length) % gallery.length)}
                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 38, height: 38, borderRadius: 19, background: 'rgba(18, 14, 12, 0.42)', border: '1px solid rgba(251, 247, 244, 0.14)', color: '#F6F2EF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F6F2EF" strokeWidth="2"><path d="M15 6 L9 12 L15 18" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button
                type="button"
                onClick={() => setPreviewIndex((previewIndex + 1) % gallery.length)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 38, height: 38, borderRadius: 19, background: 'rgba(18, 14, 12, 0.42)', border: '1px solid rgba(251, 247, 244, 0.14)', color: '#F6F2EF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F6F2EF" strokeWidth="2"><path d="M9 6 L15 12 L9 18" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14, display: 'flex', justifyContent: 'center', gap: 6 }}>
                {gallery.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPreviewIndex(index)}
                    style={{ width: index === previewIndex ? 22 : 7, height: 7, borderRadius: 999, background: index === previewIndex ? '#F6F2EF' : 'rgba(251, 247, 244, 0.34)', cursor: 'pointer', transition: 'all 180ms ease' }}
                  />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <button type="button" onClick={() => setPreviewIndex((previewIndex - 1 + gallery.length) % gallery.length)} style={{ flex: 1, height: 42, borderRadius: 21, background: 'rgba(251, 247, 244, 0.1)', border: '1px solid rgba(251, 247, 244, 0.12)', color: '#F6F2EF', cursor: 'pointer', fontSize: 12, letterSpacing: '0.08em' }}>前へ</button>
              <div style={{ fontSize: 11, color: 'rgba(251, 247, 244, 0.72)', letterSpacing: '0.12em' }}>{previewIndex + 1} / {gallery.length}</div>
              <button type="button" onClick={() => setPreviewIndex((previewIndex + 1) % gallery.length)} style={{ flex: 1, height: 42, borderRadius: 21, background: MU_CD.gradGold, border: 'none', color: '#1A2C31', cursor: 'pointer', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', boxShadow: MU_CD.shadowGold }}>次へ</button>
            </div>

            <div className="mu-hide-scrollbar" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
              {gallery.map((item, index) => {
                const active = index === previewIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPreviewIndex(index)}
                    style={{ width: 78, flexShrink: 0, borderRadius: 14, overflow: 'hidden', border: active ? `1.5px solid ${MU_CD.gold}` : '1px solid rgba(251, 247, 244, 0.08)', boxShadow: active ? MU_CD.shadowGold : 'none', cursor: 'pointer', opacity: active ? 1 : 0.58, transform: active ? 'translateY(-1px)' : 'translateY(0)', transition: 'all 180ms ease' }}
                  >
                    <MU_CastPhoto src={item.src} w={78} h={94} radius={0} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

Object.assign(window, { MU_CastDetail, MU_setCastContext, MU_getCastContext, MU_getFollowingCasts, MU_isFollowingCast, MU_toggleFollowingCast });

