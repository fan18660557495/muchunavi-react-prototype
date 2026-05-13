// User-side tokens — warm off-white base, aligned with cast-side.
// Masculine distinction via deeper gold (bronze) + burgundy accent.
// RULE: burgundy is for backgrounds / borders / icons / tiny labels — never body/title text.

window.MU_TOKENS = {
  // Core palette — brand-defined neutral ivory #F6F2EF
  bg: '#F6F2EF',
  bgAlt: '#EFEBE7',
  bgSoft: '#F2EEEB',
  bgDeep: '#E5E0DA',
  surface: '#FFFFFF',
  sheet: '#FFFFFF',

  // Ink (text) — brand-defined dark teal #1A2C31, related cool grays
  ink: '#1A2C31',
  inkMid: '#5B6B70',
  inkLow: '#9CA5A8',
  hairline: '#E1D4C3',
  hairlineStrong: '#C9B79F',

  // Brand — brand-defined antique gold #A49673, related shades
  gold: '#A49673',
  goldMid: '#8A7E5F',
  goldDeep: '#6B6147',
  goldLight: '#C9BC9A',
  champagne: '#E5D5B2',

  // Rouge tokens retained for compatibility, redirected to neutral danger range
  rouge: '#C97A7A',
  rougeDeep: '#A85C5C',
  rougeSoft: '#D89E9E',
  rougeGlow: 'rgba(201, 122, 122, 0.18)',
  rougeTint: '#FBF1F1',

  // Soft pastels (decorative only)
  rose: '#E8A8C4',
  peach: '#F4D4BE',

  // Semantic
  success: '#7FB285',
  warn: '#D9A86C',
  danger: '#C97A7A',

  // Bubble & coupon surfaces (added for reference-image fidelity)
  bubbleSelf: '#FFFFFF',
  bubbleOther: '#F0E2D2',
  bubbleSelfBorder: 'rgba(31, 24, 20, 0.45)',
  couponBg: '#EFD9B4',
  couponBorder: '#C9A47B',

  // Gold "fills" flattened — reference image avoids gradient surfaces
  gradGold: '#B8896B',
  gradRouge: 'linear-gradient(135deg, #EDD6B5 0%, #C9A47B 100%)',
  gradSoft: 'linear-gradient(180deg, #F4EEE5 0%, #EFE7DC 100%)',
  gradGoldRouge: 'linear-gradient(135deg, #D4B59A 0%, #B8896B 50%, #8A6347 100%)',

  // Shadows — flatter, lighter
  shadowSm: '0 1px 2px rgba(120, 90, 70, 0.04)',
  shadowMd: '0 2px 8px rgba(120, 90, 70, 0.05)',
  shadowLg: '0 6px 20px rgba(120, 90, 70, 0.08)',
  shadowGold: '0 3px 12px rgba(184, 137, 107, 0.16)',

  // Radii — semantic naming
  r: { none: 0, xs: 4, sm: 6, md: 8, lg: 14, xl: 22, pill: 9999 },

  // Motion — animation durations + easing
  motion: {
    short: '180ms',
    normal: '280ms',
    long: '380ms',
    ease: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
  },

  // Type
  fontSans: '"Noto Sans JP", -apple-system, "Hiragino Sans", sans-serif',
  fontSerif: '"Shippori Mincho", "Hiragino Mincho ProN", serif',
  fontBrand: '"Italiana", serif',
};

window.MU_TOP_SPACING = 32;

// ========== Status bar (dark ink on light bg) ==========
window.MU_Status = function MU_Status({ time = '21:34', tone = 'dark' }) {
  const c = tone === 'light' ? '#FBF7F4' : '#1F1814';
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '8px 20px 0', height: window.MU_TOP_SPACING, boxSizing: 'border-box',
      pointerEvents: 'none',
    }}>
      <span style={{ fontSize: 15, fontWeight: 600, color: c }}>{time}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="6.5" width="2.8" height="4" rx="0.6" fill={c}/><rect x="4.4" y="4.5" width="2.8" height="6" rx="0.6" fill={c}/><rect x="8.8" y="2.3" width="2.8" height="8.2" rx="0.6" fill={c}/><rect x="13.2" y="0" width="2.8" height="10.5" rx="0.6" fill={c}/></svg>
        <svg width="24" height="12" viewBox="0 0 24 12"><rect x="0.5" y="0.5" width="20" height="10" rx="3" fill="none" stroke={c} strokeOpacity="0.4"/><rect x="2" y="2" width="17" height="7" rx="1.5" fill={c}/><rect x="21.5" y="4" width="1.5" height="4" rx="0.5" fill={c} fillOpacity="0.4"/></svg>
      </div>
    </div>
  );
};

window.MU_HomeInd = function MU_HomeInd({ tone = 'dark' }) {
  return (
    <div style={{
      position: 'absolute', bottom: 6, left: 0, right: 0, zIndex: 60,
      display: 'flex', justifyContent: 'center', pointerEvents: 'none',
    }}>
      <div style={{ width: 134, height: 5, borderRadius: 100,
        background: tone === 'light' ? 'rgba(251, 247, 244, 0.65)' : 'rgba(31, 24, 20, 0.35)' }}/>
    </div>
  );
};

// ========== Tab bar — 首页 · 店舗 · 排行 · 消息 · 我 ==========
window.MU_TabBar = function MU_TabBar({ active = 'home' }) {
  const T = window.MU_TOKENS;
  const items = [
    { key: 'home', label: 'ホーム' },
    { key: 'shop', label: '店舗' },
    { key: 'rank', label: 'ランキング' },
    { key: 'msg', label: 'メッセージ', badge: 2 },
    { key: 'me', label: 'マイ' },
  ];
  const icon = (k, on) => {
    const c = on ? T.gold : T.inkLow;
    const sw = 1.6;
    switch (k) {
      case 'home': return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={sw}><path d="M3 10 L12 3 L21 10 V20 A1 1 0 0 1 20 21 H15 V14 H9 V21 H4 A1 1 0 0 1 3 20 Z" strokeLinejoin="round"/></svg>;
      case 'shop': return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={sw}><path d="M4 8 L5 4 H19 L20 8" strokeLinejoin="round"/><path d="M4 8 V20 A1 1 0 0 0 5 21 H19 A1 1 0 0 0 20 20 V8"/><path d="M4 8 Q8 11 12 8 Q16 11 20 8" strokeLinejoin="round"/><path d="M10 21 V14 H14 V21"/></svg>;
      case 'rank': return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={sw}><path d="M6 21 H18" strokeLinecap="round"/><rect x="5" y="12" width="4" height="9"/><rect x="10" y="7" width="4" height="14"/><rect x="15" y="15" width="4" height="6"/><path d="M12 4 L13 6 L15 6.3 L13.5 7.8 L13.8 10 L12 9 L10.2 10 L10.5 7.8 L9 6.3 L11 6 Z" fill={on ? T.gold : 'none'}/></svg>;
      case 'msg': return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={sw}><path d="M4 5 H20 A1 1 0 0 1 21 6 V17 A1 1 0 0 1 20 18 H10 L5 21 V18 H4 A1 1 0 0 1 3 17 V6 A1 1 0 0 1 4 5 Z" strokeLinejoin="round"/></svg>;
      case 'me': return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={sw}><circle cx="12" cy="8" r="4"/><path d="M4 21 C4 16 8 14 12 14 C16 14 20 16 20 21" strokeLinecap="round"/></svg>;
    }
  };
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 40,
      height: 82, paddingBottom: 18, paddingTop: 6,
      display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start',
      background: 'rgba(251, 247, 244, 0.94)',
      backdropFilter: 'blur(24px) saturate(160%)',
      WebkitBackdropFilter: 'blur(24px) saturate(160%)',
      borderTop: `0.5px solid ${T.hairline}`,
    }}>
      {items.map(it => {
        const on = it.key === active;
        return (
          <div key={it.key} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            paddingTop: 6, position: 'relative',
          }}>
            <div style={{ position: 'relative' }}>
              {icon(it.key, on)}
              {it.badge && <div style={{
                position: 'absolute', top: -4, right: -7, minWidth: 15, height: 15, borderRadius: 8,
                background: T.rouge, color: '#FBF7F4', fontSize: 9, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
              }}>{it.badge}</div>}
            </div>
            <div style={{
              fontSize: 10, color: on ? T.gold : T.inkLow,
              fontWeight: on ? 600 : 400, letterSpacing: '0.02em',
            }}>{it.label}</div>
          </div>
        );
      })}
    </div>
  );
};

// ========== Shared components ==========

// Cast photo placeholder — warm tones, aligned with cast-side
window.MU_PhotoPH = function MU_PhotoPH({ w, h, tone = 'rose', radius = 12, label, fullSize = false }) {
  const tones = {
    rose:   { c1: '#F4D4DE', c2: '#E8A8C4', accent: 'rgba(255, 255, 255, 0.4)' },
    champ:  { c1: '#F0D8B8', c2: '#D4B59A', accent: 'rgba(255, 255, 255, 0.4)' },
    lilac:  { c1: '#E0D0E8', c2: '#C8A2C8', accent: 'rgba(255, 255, 255, 0.4)' },
    wine:   { c1: '#E8C5CC', c2: '#C88A95', accent: 'rgba(255, 255, 255, 0.4)' },
    peach:  { c1: '#F8E0D0', c2: '#E8B898', accent: 'rgba(255, 255, 255, 0.4)' },
    ink:    { c1: '#EFE5DB', c2: '#D4C2B0', accent: 'rgba(255, 255, 255, 0.4)' },
  };
  const t = tones[tone] || tones.rose;
  const style = fullSize
    ? { position: 'absolute', inset: 0, borderRadius: radius }
    : { width: w, height: h, borderRadius: radius };
  return (
    <div style={{ ...style, overflow: 'hidden', position: fullSize ? 'absolute' : 'relative', background: `linear-gradient(135deg, ${t.c1}, ${t.c2})` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 30% 20%, ${t.accent}, transparent 60%)` }}/>
      <div style={{ position: 'absolute', inset: 0, background: `repeating-linear-gradient(135deg, transparent 0 18px, rgba(255, 255, 255, 0.08) 18px 19px)` }}/>
      {label && <div style={{
        position: 'absolute', bottom: 6, left: 6,
        fontSize: 9, color: 'rgba(31, 24, 20, 0.4)',
        fontFamily: 'ui-monospace, monospace', letterSpacing: '0.05em',
      }}>{label}</div>}
    </div>
  );
};

// Level badge — gold pill, dark text
window.MU_LevelPill = function MU_LevelPill({ lvl, size = 'sm', tone = 'gold' }) {
  const sz = size === 'sm' ? { h: 18, fs: 10, p: '0 8px' } : size === 'md' ? { h: 22, fs: 11, p: '0 10px' } : { h: 28, fs: 13, p: '0 14px' };
  const bg = tone === 'gold'
    ? 'linear-gradient(135deg, #E8C5A0 0%, #B8896B 50%, #8A6347 100%)'
    : 'linear-gradient(135deg, #D4B59A 0%, #7A2838 100%)';
  return (
    <div style={{
      height: sz.h, borderRadius: sz.h/2, padding: sz.p,
      background: bg, color: '#FBF7F4', fontSize: sz.fs, fontWeight: 700,
      display: 'inline-flex', alignItems: 'center', gap: 3, letterSpacing: '0.02em',
    }}>
      <svg width={sz.fs} height={sz.fs} viewBox="0 0 12 12" fill="#FBF7F4"><path d="M6 1 L7.5 4.5 L11 5 L8.5 7.5 L9 11 L6 9.3 L3 11 L3.5 7.5 L1 5 L4.5 4.5 Z"/></svg>
      <span>Lv.{lvl}</span>
    </div>
  );
};

// Avatar — round, warm gradient bg + letter in white
window.MU_Avatar = function MU_Avatar({ size = 40, letter = 'A', tone = 'rose', online = false, ring = false }) {
  const bgs = {
    rose:   'linear-gradient(135deg, #E8A8C4, #C88A9E)',
    champ:  'linear-gradient(135deg, #D4B59A, #B8896B)',
    lilac:  'linear-gradient(135deg, #C8A2C8, #8E6E92)',
    wine:   'linear-gradient(135deg, #9A3D4D, #551822)',
    peach:  'linear-gradient(135deg, #F4D4BE, #D9A98C)',
    ink:    'linear-gradient(135deg, #D4C2B0, #8A7563)',
  };
  const T = window.MU_TOKENS;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <div style={{
        width: size, height: size, borderRadius: '50%', background: bgs[tone],
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#FBF7F4', fontSize: size * 0.42, fontWeight: 500,
        fontFamily: T.fontSerif, letterSpacing: '-0.02em',
        border: ring ? `1.5px solid ${T.gold}` : 'none',
        boxShadow: ring ? '0 0 0 2px rgba(251, 247, 244, 0.95)' : 'none',
      }}>{letter}</div>
      {online && <div style={{
        position: 'absolute', bottom: 1, right: 1, width: size * 0.26, height: size * 0.26,
        borderRadius: '50%', background: T.success, border: `1.5px solid ${T.bg}`,
      }}/>}
    </div>
  );
};

// Section title with English subtitle
window.MU_SectionTitle = function MU_SectionTitle({ ja, en, action, onAction, pad = '0 20px' }) {
  const T = window.MU_TOKENS;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: pad, marginBottom: 12 }}>
      <div>
        <div style={{ fontFamily: T.fontBrand, fontSize: 11, color: T.goldDeep, letterSpacing: '0.3em', marginBottom: 4, textTransform: 'uppercase' }}>{en}</div>
        <div style={{ fontFamily: T.fontSerif, fontSize: 18, color: T.ink, letterSpacing: '0.04em', fontWeight: 500 }}>{ja}</div>
      </div>
      {action ? <div onClick={onAction} style={{ fontSize: 11, color: T.goldDeep, letterSpacing: '0.08em', cursor: onAction ? 'pointer' : 'default' }}>{action} →</div> : null}
    </div>
  );
};

// Chip — light base, burgundy/gold variants
window.MU_Chip = function MU_Chip({ children, active = false, tone = 'default', size = 'sm' }) {
  const T = window.MU_TOKENS;
  const sz = size === 'sm' ? { h: 26, fs: 11, p: '0 11px' } : { h: 32, fs: 12, p: '0 14px' };
  const styles = {
    default: active
      ? { bg: T.gradGold, color: '#FBF7F4', border: 'transparent' }
      : { bg: '#FFFFFF', color: T.ink, border: T.hairlineStrong },
    rouge: { bg: T.rougeTint, color: T.rouge, border: '#E8C5CC' }, // rouge as tiny label on tint — allowed sparingly
    gold: { bg: 'rgba(184, 137, 107, 0.08)', color: T.goldDeep, border: 'rgba(184, 137, 107, 0.3)' },
  };
  const s = styles[tone];
  return (
    <div style={{
      height: sz.h, padding: sz.p, borderRadius: sz.h / 2,
      background: s.bg, color: s.color, border: `0.5px solid ${s.border}`,
      fontSize: sz.fs, fontWeight: 500, letterSpacing: '0.04em',
      display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
    }}>{children}</div>
  );
};

// Decorative ornament line
window.MU_Ornament = function MU_Ornament({ width = 60, color }) {
  const T = window.MU_TOKENS;
  const c = color || T.gold;
  return (
    <svg width={width} height="8" viewBox={`0 0 ${width} 8`}>
      <line x1="0" y1="4" x2={width * 0.4} y2="4" stroke={c} strokeOpacity="0.4" strokeWidth="0.5"/>
      <path d={`M${width*0.4} 4 L${width*0.5} 2 L${width*0.6} 4 L${width*0.5} 6 Z`} fill={c}/>
      <line x1={width * 0.6} y1="4" x2={width} y2="4" stroke={c} strokeOpacity="0.4" strokeWidth="0.5"/>
    </svg>
  );
};
