import { useState, useEffect, useRef } from 'react';
import mypageLv3Img from '../../assets/lv3.png';

const MU_M = window.MU_TOKENS;
const MU_TOP_SPACING = window.MU_TOP_SPACING || 32;
const MU_BOOKING_SHOP = 'https://images.pexels.com/photos/36092418/pexels-photo-36092418.jpeg?auto=compress&cs=tinysrgb&w=600';
const MU_MYPAGE_HEADER_BG = mypageLv3Img;
const MU_RECHARGE_MIN_AMOUNT = 1000;
const MU_MY_QR_LINK = 'https://muchunavi.jp/u/takeshi';
const MU_RECHARGE_RECORDS = [
  { date: '2026-04-18', time: '22:16', amount: 50000, bonus: 5000, status: '反映済み', method: 'JCB', type: 'gift', title: 'ギフト' },
  { date: '2026-04-03', time: '20:42', amount: 30000, bonus: 1500, status: '反映済み', method: 'VISA', type: 'purchase', title: 'muchu オンライン購入' },
  { date: '2026-03-21', time: '00:18', amount: 100000, bonus: 15000, status: '反映済み', method: 'JCB', type: 'store', title: '店舗に支払い' },
  { date: '2026-03-08', time: '23:04', amount: 20000, bonus: 0, status: '反映済み', method: 'Apple Pay', type: 'charge', title: '充值（チャージ）' },
  { date: '2026-02-26', time: '21:37', amount: 50000, bonus: 5000, status: '反映済み', method: 'JCB', type: 'award', title: '限定祝付与' },
  { date: '2026-02-14', time: '19:52', amount: 30000, bonus: 1500, status: '反映済み', method: 'VISA', type: 'coin', title: '無償祝分付与' },
  { date: '2026-01-29', time: '22:11', amount: 200000, bonus: 40000, status: '反映済み', method: 'JCB', type: 'gift', title: 'ギフト' },
  { date: '2026-01-16', time: '20:26', amount: 10000, bonus: 0, status: '反映済み', method: 'Apple Pay', type: 'charge', title: '充值（チャージ）' },
  { date: '2025-12-28', time: '23:40', amount: 100000, bonus: 15000, status: '反映済み', method: 'JCB', type: 'store', title: '店舗に支払い' },
  { date: '2025-12-09', time: '18:15', amount: 50000, bonus: 5000, status: '反映済み', method: 'VISA', type: 'award', title: '限定祝付与' },
];
const MU_DEFAULT_ORDER = {
  id: 'AR10234',
  scene: 'detail',
  status: 'confirmed',
  shopName: 'LOUNGE ARIA 銀座本店',
  shopThumb: MU_BOOKING_SHOP,
  castName: '七海 Nanami',
  castLevel: 'Lv.7',
  date: '5/28',
  time: '23:00',
  partySize: 2,
  couponTitle: '初回来店 10,000円OFF',
  packageFeePerGuest: 30000,
  nominationFee: 8000,
};

function MU_setBookingContext(order) {
  window.__MU_BOOKING_CONTEXT = {
    ...MU_DEFAULT_ORDER,
    ...order,
  };
}

function MU_getBookingContext() {
  return {
    ...MU_DEFAULT_ORDER,
    ...(window.__MU_BOOKING_CONTEXT || {}),
  };
}

function MU_BookingThumb({ src, size = 56, radius = 10 }) {
  return <img src={src} alt="" style={{ width: size, height: size, borderRadius: radius, objectFit: 'cover', display: 'block', background: '#eadfd6' }} />;
}

function MU_FinanceIcon({ type }) {
  const wrapStyle = { width: 46, height: 46, borderRadius: 23, background: 'linear-gradient(180deg, #FFFDFB 0%, #F6EFE8 100%)', border: '1px solid rgba(229, 218, 207, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 };
  if (type === 'gift') {
    return (
      <div style={wrapStyle}>
        <div style={{ width: 24, height: 20, borderRadius: 6, background: 'linear-gradient(180deg, #FFB6CC 0%, #F58CB2 100%)', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 11, top: 0, bottom: 0, width: 3, background: '#FBF1F1' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: 8, height: 3, background: '#FBF1F1' }} />
          <div style={{ position: 'absolute', left: 4, top: -5, width: 7, height: 7, border: '3px solid #F7A8C2', borderRadius: '7px 7px 0 7px', transform: 'rotate(-45deg)' }} />
          <div style={{ position: 'absolute', right: 4, top: -5, width: 7, height: 7, border: '3px solid #F7A8C2', borderRadius: '7px 7px 7px 0', transform: 'rotate(45deg)' }} />
        </div>
      </div>
    );
  }
  if (type === 'purchase') {
    return (
      <div style={wrapStyle}>
        <div style={{ width: 25, height: 18, borderRadius: 4, background: 'linear-gradient(180deg, #45352D 0%, #2C211D 100%)', color: '#D8B38D', fontSize: 6, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '0.08em' }}>muchu</div>
      </div>
    );
  }
  if (type === 'store') {
    return (
      <div style={wrapStyle}>
        <div style={{ width: 24, height: 20, position: 'relative' }}>
          <div style={{ position: 'absolute', left: 2, right: 2, top: 6, height: 12, borderRadius: '0 0 5px 5px', background: '#F1D3AE', border: '1px solid #D5B28A' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: 2, height: 7, borderRadius: 4, background: 'repeating-linear-gradient(90deg, #C98E63 0 4px, #F8EBDD 4px 8px)' }} />
          <div style={{ position: 'absolute', left: 5, bottom: 2, width: 5, height: 8, borderRadius: 2, background: '#8C6A52' }} />
          <div style={{ position: 'absolute', right: 5, bottom: 5, width: 5, height: 5, borderRadius: 2, background: '#C8E0EF' }} />
        </div>
      </div>
    );
  }
  if (type === 'charge') {
    return (
      <div style={wrapStyle}>
        <div style={{ width: 26, height: 19, borderRadius: 5, background: 'linear-gradient(180deg, #D6B486 0%, #BD9364 100%)', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 2, right: 2, top: 2, height: 7, borderRadius: 4, background: '#F6ECD9' }} />
          <div style={{ position: 'absolute', left: 7, top: 10, width: 12, height: 5, borderRadius: 3, background: '#246B56' }} />
          <div style={{ position: 'absolute', left: 4, top: 8, width: 8, height: 8, borderRadius: 999, background: '#F7F4ED', border: '1px solid #C9B89E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C69854', fontSize: 7, fontWeight: 800 }}>+</div>
        </div>
      </div>
    );
  }
  if (type === 'award') {
    return (
      <div style={wrapStyle}>
        <div style={{ width: 24, height: 24, position: 'relative' }}>
          <div style={{ position: 'absolute', left: 4, top: 1, width: 16, height: 16, borderRadius: 999, background: 'linear-gradient(180deg, #FFD98A 0%, #F2B94D 100%)', border: '1px solid #D7A047', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF6D7', fontSize: 10 }}>★</div>
          <div style={{ position: 'absolute', left: 3, bottom: 1, width: 7, height: 10, background: '#6EA3D8', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)' }} />
          <div style={{ position: 'absolute', right: 3, bottom: 1, width: 7, height: 10, background: '#8DC1F1', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)' }} />
        </div>
      </div>
    );
  }
  return (
    <div style={wrapStyle}>
      <div style={{ width: 24, height: 24, borderRadius: 999, background: 'linear-gradient(180deg, #FFDE84 0%, #F0B646 100%)', border: '1px solid #D8A048', color: '#FFF7E1', fontSize: 16, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>P</div>
    </div>
  );
}

const MU_DEFAULT_FINANCE_DETAIL = {
  date: '2026-04-25',
  time: '14:32',
  amount: 5000,
  bonus: 0,
  status: '反映済み',
  method: 'MUCHUポイント利用',
  type: 'coin',
  title: '消費（有償ポイント）',
  direction: 'minus',
  detailTag: '有償ポイント消費',
  transactionId: 'TXN202604251432001',
  balanceAfter: 123450,
  note: 'お買い物にて有償ポイントを利用しました。ご利用いただきありがとうございます。',
  shopName: 'MUCHU STORE 渋谷店',
  productName: 'MUCHUオリジナルTシャツ（ブラック）',
};

function MU_setFinanceDetailContext(detail) {
  window.__MU_FINANCE_DETAIL_CONTEXT = {
    ...MU_DEFAULT_FINANCE_DETAIL,
    ...detail,
  };
}

function MU_getFinanceDetailContext() {
  return {
    ...MU_DEFAULT_FINANCE_DETAIL,
    ...(window.__MU_FINANCE_DETAIL_CONTEXT || {}),
  };
}

function MU_SubpageHeader({ eyebrow, title }) {
  return (
    <div style={{ paddingTop: MU_TOP_SPACING }}>
      <div style={{ padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MU_M.ink} strokeWidth="2" style={{ cursor: 'pointer' }} onClick={() => window.__nav?.back()}><path d="M15 6 L9 12 L15 18" strokeLinecap="round" /></svg>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.3em' }}>{eyebrow}</div>
          <div style={{ fontFamily: MU_M.fontSerif, fontSize: 15, color: MU_M.ink, letterSpacing: '0.08em' }}>{title}</div>
        </div>
        <div style={{ width: 18 }} />
      </div>
    </div>
  );
}

function MU_StatsPage({ eyebrow, title, summary, items }) {
  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow={eyebrow} title={title} />

        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairlineStrong}` }}>
          <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>SUMMARY</div>
          <div style={{ marginTop: 5, fontFamily: MU_M.fontSerif, fontSize: 18, color: MU_M.ink, letterSpacing: '0.05em' }}>{summary}</div>
        </div>

        <div style={{ margin: '14px 20px 0', borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, overflow: 'hidden' }}>
          {items.map((item, index) => (
            <div key={`${item.title}-${index}`} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderTop: index > 0 ? `0.5px solid ${MU_M.hairline}` : 'none' }}>
              {item.thumb ? <MU_BookingThumb src={item.thumb} size={52} radius={10} /> : <div style={{ width: 52, height: 52, borderRadius: 6, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MU_M.gold, fontFamily: MU_M.fontBrand, fontSize: 13 }}>{item.icon}</div>}
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink, letterSpacing: '0.04em' }}>{item.title}</div>
                <div style={{ marginTop: 4, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.5 }}>{item.subtitle}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: MU_M.goldDeep, fontWeight: 700 }}>{item.meta}</div>
                {item.tag ? <div style={{ marginTop: 5, fontSize: 8, color: MU_M.rouge, background: MU_M.rougeTint, padding: '2px 6px', borderRadius: 999, display: 'inline-flex' }}>{item.tag}</div> : null}
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_MyPage() {
  const [ptExpanded, setPtExpanded] = useState(false);
  const [lineNotify, setLineNotify] = useState(true);

  const statItems = [
    {
      label: 'クーポン', num: '12', target: 'mypage-coupons',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8v8h18V8M3 8l9-5 9 5" />
          <circle cx="12" cy="13" r="0.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: 'お気に入り店舗', num: '18', target: 'mypage-favorites',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s-7-4.5-7-10.5C5 7 7.5 5 10 5c1.5 0 2.5.8 2 2 0-1.2 0.5-2 2-2 2.5 0 5 2 5 5.5 0 6-7 10.5-7 10.5z" />
        </svg>
      ),
    },
    {
      label: 'フォロー中', num: '24', target: 'mypage-following',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="8" r="4" />
          <path d="M2 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
          <path d="M18 8l2 2 4-4" />
        </svg>
      ),
    },
    {
      label: 'ファン', num: '136', target: 'mypage-followers',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="8" r="3.5" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M2 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
          <path d="M16 14c2.8 0 5 2.2 5 5" />
        </svg>
      ),
    },
  ];
  const historyItems = [
    { label: '会員特典 & 限定ミッション', en: 'BENEFITS', target: 'mypage-benefits' },
    { label: 'muchuポン購入履歴', en: 'MUCHU PASS', count: 3, target: 'mypage-muchupon-history' },
    { label: 'ギフト履歴', en: 'GIFTS', target: 'mypage-gifts' },
    { label: '来店履歴', en: 'HISTORY', target: 'mypage-visits' },
  ];
  const ptBreakdown = [
    { label: '有償ポイント', value: '90,600' },
    { label: '無償ポイント', value: '30,000' },
    { label: '限定ポイント', value: '8,000', warn: '今月末失効' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 82 }}>
        <div style={{ height: MU_TOP_SPACING }} />

        <div style={{ padding: '8px 20px 14px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            type="button"
            onClick={() => window.__nav?.open('mypage-share')}
            aria-label="プロフィール"
            style={{ width: 44, height: 44, borderRadius: '50%', border: `0.5px solid ${MU_M.hairlineStrong}`, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0, flexShrink: 0 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={MU_M.gold} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
            </svg>
          </button>
          <div style={{ flex: 1, minWidth: 0, fontFamily: MU_M.fontSerif, fontSize: 17, color: MU_M.ink, letterSpacing: '0.12em', fontWeight: 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>山田 武</div>
          <button
            type="button"
            onClick={() => window.__nav?.open('mypage-settings')}
            aria-label="設定"
            style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent', border: 'none', padding: 0, flexShrink: 0 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={MU_M.gold} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15 A1.6 1.6 0 0 0 19.7 16.8 L19.8 16.9 A2 2 0 0 1 17 19.8 L16.9 19.7 A1.6 1.6 0 0 0 15 19.4 A1.6 1.6 0 0 0 14 20.9 V21 A2 2 0 0 1 10 21 V20.9 A1.6 1.6 0 0 0 9 19.4 A1.6 1.6 0 0 0 7.1 19.7 L7 19.8 A2 2 0 0 1 4.2 17 L4.3 16.9 A1.6 1.6 0 0 0 4.6 15 A1.6 1.6 0 0 0 3.1 14 H3 A2 2 0 0 1 3 10 H3.1 A1.6 1.6 0 0 0 4.6 9 A1.6 1.6 0 0 0 4.3 7.1 L4.2 7 A2 2 0 0 1 7 4.2 L7.1 4.3 A1.6 1.6 0 0 0 9 4.6 A1.6 1.6 0 0 0 10 3.1 V3 A2 2 0 0 1 14 3 V3.1 A1.6 1.6 0 0 0 15 4.6 A1.6 1.6 0 0 0 16.9 4.3 L17 4.2 A2 2 0 0 1 19.8 7 L19.7 7.1 A1.6 1.6 0 0 0 19.4 9 A1.6 1.6 0 0 0 20.9 10 H21 A2 2 0 0 1 21 14 H20.9 A1.6 1.6 0 0 0 19.4 15 Z" />
            </svg>
          </button>
        </div>

        <div style={{ margin: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: MU_M.fontSerif, fontSize: 19, lineHeight: 1.15, letterSpacing: '0.05em', color: MU_M.ink, fontWeight: 400 }}>MUCHUNAVIグランドマスター</div>
              <div style={{ marginTop: 5, fontFamily: MU_M.fontBrand, fontSize: 8, letterSpacing: '0.32em', color: MU_M.goldDeep, opacity: 0.75 }}>MUCHUNAVI GRAND MASTER MEMBER</div>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: '50%', border: `0.5px solid ${MU_M.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: '"Italiana", serif', fontStyle: 'italic', fontSize: 20, color: MU_M.goldDeep }}>m</div>
          </div>

          <div style={{ marginTop: 18, width: 38, height: 28, border: `0.5px solid ${MU_M.hairlineStrong}`, borderRadius: 4, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 2, right: 2, top: 'calc(50% - 0.25px)', height: 0.5, background: MU_M.hairlineStrong, opacity: 0.7 }} />
            <div style={{ position: 'absolute', top: 2, bottom: 2, left: 'calc(50% - 0.25px)', width: 0.5, background: MU_M.hairlineStrong, opacity: 0.7 }} />
          </div>

          <div style={{ marginTop: 12, fontFamily: MU_M.fontSerif, fontSize: 21, letterSpacing: '0.17em', color: MU_M.ink, fontWeight: 400, whiteSpace: 'nowrap' }}>4119&nbsp;&nbsp;3901&nbsp;&nbsp;2345&nbsp;&nbsp;6789</div>

          <button
            type="button"
            onClick={() => window.__nav?.open('mypage-benefits')}
            aria-label="会員特典を見る"
            style={{ marginTop: 14, padding: 0, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, width: '100%', transition: 'opacity .15s' }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            <div style={{ flex: 1, height: 3, border: `0.5px solid ${MU_M.hairline}`, borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', background: MU_M.gold, opacity: 0.78 }} />
            </div>
            <span style={{ fontFamily: MU_M.fontSerif, fontSize: 11, letterSpacing: '0.08em', color: MU_M.goldDeep, fontWeight: 500, whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              Lv.77 / 77
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M9 6 L15 12 L9 18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>

          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
            <div>
              <div style={{ fontFamily: MU_M.fontBrand, fontSize: 7, letterSpacing: '0.31em', color: MU_M.inkLow, textTransform: 'uppercase' }}>USERNAME</div>
              <div style={{ marginTop: 3, fontFamily: MU_M.fontSerif, fontSize: 14, letterSpacing: '0.16em', color: MU_M.ink, fontWeight: 400 }}>TAKESHI</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
              <button
                type="button"
                onClick={() => window.__nav?.open('mypage-benefits')}
                style={{ padding: '5px 14px', border: `0.5px solid ${MU_M.gold}`, borderRadius: 999, background: 'transparent', color: MU_M.goldDeep, fontFamily: MU_M.fontSerif, fontSize: 10.5, letterSpacing: '0.2em', fontWeight: 400, cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                会員特典
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ textAlign: 'right', lineHeight: 1.15 }}>
                  <div style={{ fontFamily: MU_M.fontBrand, fontSize: 7, letterSpacing: '0.31em', color: MU_M.inkLow, textTransform: 'uppercase' }}>VALID</div>
                  <div style={{ fontFamily: MU_M.fontBrand, fontSize: 7, letterSpacing: '0.31em', color: MU_M.inkLow, textTransform: 'uppercase' }}>THRU</div>
                </div>
                <div style={{ fontFamily: MU_M.fontSerif, fontSize: 13, letterSpacing: '0.11em', color: MU_M.ink, fontWeight: 400 }}>06/29</div>
              </div>
            </div>
          </div>
        </div>

        <window.MU_StatColumns items={statItems} onItemClick={(item) => window.__nav?.open(item.target)} withDividers numFontSize={22} />

        <div style={{ margin: '18px 20px 0', padding: '22px 22px 18px', borderRadius: 8, border: `0.5px solid ${MU_M.hairline}`, background: '#FBF8F4' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <span style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 500 }}>MUCHU PT</span>
            <button
              type="button"
              onClick={() => window.__nav?.open('mypage-recharge')}
              style={{ padding: '7px 16px', border: `0.5px solid ${MU_M.hairlineStrong}`, borderRadius: 999, background: 'transparent', color: MU_M.goldDeep, fontFamily: MU_M.fontSerif, fontSize: 11, letterSpacing: '0.04em', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              ポイント購入で<span style={{ color: MU_M.warn, marginLeft: 2, fontWeight: 500 }}>+18%</span>
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: MU_M.fontSerif, fontSize: 10.5, color: MU_M.inkMid, letterSpacing: '0.15em', fontWeight: 300 }}>総保有ポイント</span>
              <button
                type="button"
                onClick={() => window.__nav?.open('mypage-pt-detail')}
                style={{ padding: 0, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: 6 }}
              >
                <span style={{ fontFamily: MU_M.fontSerif, fontSize: 40, color: MU_M.ink, letterSpacing: '0.02em', fontWeight: 300, lineHeight: 1 }}>128,600</span>
                <span style={{ fontFamily: MU_M.fontBrand, fontSize: 13, color: MU_M.inkMid, letterSpacing: '0.2em' }}>PT</span>
              </button>
            </div>
            <button
              type="button"
              onClick={() => setPtExpanded((v) => !v)}
              style={{ padding: '8px 2px 6px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: MU_M.inkMid, fontFamily: MU_M.fontSerif, fontSize: 11, letterSpacing: '0.12em', fontWeight: 300 }}
            >
              <span>内訳</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ transform: ptExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 320ms cubic-bezier(0.22, 0.61, 0.36, 1)' }}>
                <path d="M6 9 L12 15 L18 9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div style={{ maxHeight: ptExpanded ? 120 : 0, opacity: ptExpanded ? 1 : 0, overflow: 'hidden', transition: 'max-height 360ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 240ms ease, margin-top 360ms cubic-bezier(0.22, 0.61, 0.36, 1), padding-top 360ms cubic-bezier(0.22, 0.61, 0.36, 1)', marginTop: ptExpanded ? 14 : 0, paddingTop: ptExpanded ? 14 : 0, borderTop: ptExpanded ? `0.5px solid ${MU_M.hairline}` : '0.5px solid transparent' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 28 }}>
              {ptBreakdown.map((p) => (
                <div key={p.label} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={{ fontFamily: MU_M.fontSerif, fontSize: 10.5, color: MU_M.inkMid, letterSpacing: '0.1em', fontWeight: 300 }}>{p.label}</span>
                  <span style={{ fontFamily: MU_M.fontSerif, fontSize: 15, color: MU_M.ink, letterSpacing: '0.04em', fontWeight: 400 }}>{p.value}<span style={{ fontFamily: MU_M.fontBrand, fontSize: 9.5, color: MU_M.inkMid, marginLeft: 3, letterSpacing: '0.12em' }}>PT</span></span>
                  {p.warn ? <span style={{ fontFamily: MU_M.fontBrand, fontSize: 9.5, color: MU_M.warn, letterSpacing: '0.14em', marginTop: 3 }}>{p.warn}</span> : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <window.MU_FlatRowGroup>
          {historyItems.map((r) => (
            <window.MU_FlatRow
              key={r.label}
              label={r.label}
              en={r.en}
              count={r.count}
              tagText={r.tagText}
              onClick={() => window.__nav?.open(r.target)}
            />
          ))}
        </window.MU_FlatRowGroup>

        <window.MU_FlatRowGroup topBorder>
          <window.MU_FlatRow label="友だち招待" en="INVITE" tagText="+1,000 PT" onClick={() => window.__nav?.open('mypage-invite')} />
        </window.MU_FlatRowGroup>

        <window.MU_FlatRowGroup topBorder>
          <window.MU_FlatRow label="本人確認" en="IDENTITY" onClick={() => window.__nav?.open('mypage-verification')} />
        </window.MU_FlatRowGroup>

        <div style={{ margin: '14px 20px 0', paddingTop: 6, borderTop: `0.5px solid ${MU_M.hairline}` }}>
          <div style={{ padding: '12px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <div style={{ fontSize: 14, color: MU_M.ink, fontFamily: MU_M.fontSerif, letterSpacing: '0.03em', fontWeight: 500 }}>LINE通知</div>
              <div style={{ fontSize: 9, color: MU_M.inkMid, letterSpacing: '0.16em', fontFamily: MU_M.fontBrand }}>LINE NOTIFY</div>
            </div>
            <button
              type="button"
              onClick={() => setLineNotify((v) => !v)}
              style={{ width: 36, height: 20, borderRadius: 999, padding: 2, background: lineNotify ? MU_M.gold : 'rgba(31, 42, 68, 0.18)', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: lineNotify ? 'flex-end' : 'flex-start', transition: 'background 240ms ease' }}
            >
              <div style={{ width: 16, height: 16, borderRadius: 999, background: '#FBF7F4', boxShadow: '0 0.5px 2px rgba(31, 42, 68, 0.18)' }} />
            </button>
          </div>
        </div>

        <window.MU_FlatRowGroup topBorder>
          <window.MU_FlatRow label="設定" en="SETTINGS" onClick={() => window.__nav?.open('mypage-settings')} />
        </window.MU_FlatRowGroup>

        <button
          type="button"
          onClick={() => window.__nav?.open('mypage-settings')}
          style={{ margin: '20px 20px 0', width: 'calc(100% - 40px)', padding: '18px 0', borderTop: `0.5px solid ${MU_M.hairline}`, borderBottom: `0.5px solid ${MU_M.hairline}`, borderLeft: 'none', borderRight: 'none', background: 'transparent', color: MU_M.inkMid, fontFamily: MU_M.fontSerif, fontSize: 13, letterSpacing: '0.25em', cursor: 'pointer' }}
        >
          ログアウト
        </button>

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_MyPaymentBinding() {
  const [selected, setSelected] = useState('visa');
  const methods = [
    { id: 'visa', title: 'Visa **** 4242', sub: '默认支付方式 · 有效期 08/29', brand: 'visa', status: '主卡', tone: 'primary' },
    { id: 'master', title: 'Mastercard **** 8891', sub: '备用支付方式 · 有效期 11/28', brand: 'master', status: '使用中', tone: 'active' },
    { id: 'paypal', title: 'PayPal', sub: 'takeshi@example.com', brand: 'paypal', status: '已验证', tone: 'verified' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: '#F6F2EF', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -100, left: -28, width: 260, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(210, 158, 158, 0.28) 0%, rgba(210, 158, 158, 0.08) 48%, transparent 74%)', filter: 'blur(12px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: -86, right: -44, width: 230, height: 190, borderRadius: '50%', background: 'radial-gradient(circle, rgba(214, 178, 161, 0.24) 0%, rgba(214, 178, 161, 0.07) 48%, transparent 74%)', filter: 'blur(14px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="PAYMENT" title="支付绑定" />
        <div style={{ margin: '10px 20px 0', textAlign: 'center' }}>
          <div style={{ fontFamily: MU_M.fontSerif, fontSize: 18, color: '#6D4F41', letterSpacing: '0.03em' }}>お支払い方法の管理</div>
          <div style={{ marginTop: 12, fontSize: 11, color: '#7B6A5E', lineHeight: 1.8 }}>
            ご利用中の決済方法を確認し、
            <br />
            デフォルトの支払い方法を設定できます。
          </div>
        </div>
        <div style={{ margin: '18px 16px 0', borderRadius: 8, background: '#FBF8F4', border: '1px solid rgba(231, 220, 209, 0.96)', overflow: 'hidden' }}>
          {methods.map((item, index) => {
            const active = selected === item.id;
            const badgeStyle = item.tone === 'primary'
              ? { background: 'rgba(201, 160, 130, 0.14)', color: '#A06E4D', border: '1px solid rgba(201, 160, 130, 0.24)' }
              : item.tone === 'active'
                ? { background: 'rgba(118, 150, 108, 0.12)', color: '#5F7F55', border: '1px solid rgba(118, 150, 108, 0.18)' }
                : { background: 'rgba(86, 131, 181, 0.12)', color: '#4E78A6', border: '1px solid rgba(86, 131, 181, 0.18)' };
            return (
              <button key={item.id} type="button" onClick={() => setSelected(item.id)} style={{ width: '100%', padding: '16px 16px', display: 'flex', alignItems: 'center', gap: 12, borderTop: index > 0 ? '1px solid rgba(239, 231, 223, 0.94)' : 'none', textAlign: 'left', cursor: 'pointer', background: active ? 'linear-gradient(135deg, #FDFBF9 0%, #F6EEE7 100%)' : 'transparent' }}>
                <div style={{ width: 46, height: 46, borderRadius: 8, background: '#FFFFFF', border: `1px solid ${active ? 'rgba(201, 160, 130, 0.9)' : 'rgba(231, 220, 209, 0.96)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {item.brand === 'visa' ? (
                    <div style={{ fontSize: 14, fontWeight: 900, color: '#1A4C9A', letterSpacing: '-0.03em' }}>VISA</div>
                  ) : item.brand === 'master' ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ width: 16, height: 16, borderRadius: 999, background: '#EB001B' }} />
                      <div style={{ width: 16, height: 16, borderRadius: 999, background: '#F79E1B', marginLeft: -6 }} />
                    </div>
                  ) : (
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#003087', letterSpacing: '-0.01em' }}>PayPal</div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: MU_M.fontSerif, fontSize: 14, color: '#4D3C33', letterSpacing: '0.02em' }}>{item.title}</div>
                  <div style={{ marginTop: 4, fontSize: 10, color: '#8C7A6C', lineHeight: 1.5 }}>{item.sub}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                  {active ? <div style={{ fontSize: 10, color: '#A06E4D', fontWeight: 800 }}>默认</div> : null}
                  <div style={{ padding: '5px 8px', borderRadius: 999, fontSize: 9, fontWeight: 800, lineHeight: 1, ...badgeStyle }}>{item.status}</div>
                </div>
              </button>
            );
          })}
        </div>
        <button type="button" onClick={() => window.__nav?.open('mypage-payment-add-card')} style={{ margin: '18px 20px 0', width: 'calc(100% - 40px)', height: 46, borderRadius: 999, background: 'transparent', border: `0.5px solid ${MU_M.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MU_M.goldDeep, fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', cursor: 'pointer' }}>
          绑定新的支付方式
        </button>
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 10, color: '#99877A' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="6.5" y="10" width="11" height="8" rx="2" /><path d="M8.5 10V8.5a3.5 3.5 0 0 1 7 0V10" /></svg>
          <span>お支払い情報は暗号化され、安全に保管されます。</span>
        </div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_MyPaymentAddCard() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [cardLabel, setCardLabel] = useState('');
  const fieldStyle = {
    width: '100%',
    minWidth: 0,
    height: 46,
    borderRadius: 6,
    border: '1px solid rgba(230, 219, 207, 0.96)',
    background: '#FFFFFF',
    padding: '0 14px',
    fontSize: 14,
    color: MU_M.ink,
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ width: '100%', height: '100%', background: '#F6F2EF', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -110, left: -36, width: 280, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(210, 158, 158, 0.46) 0%, rgba(210, 158, 158, 0.18) 42%, transparent 74%)', filter: 'blur(10px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: -90, right: -54, width: 260, height: 210, borderRadius: '50%', background: 'radial-gradient(circle, rgba(214, 178, 161, 0.34) 0%, rgba(214, 178, 161, 0.14) 48%, transparent 76%)', filter: 'blur(14px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 48 }}>
        <div style={{ paddingTop: MU_TOP_SPACING }}>
          <div style={{ padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8F6B56" strokeWidth="2" style={{ cursor: 'pointer' }} onClick={() => window.__nav?.back()}><path d="M15 6 L9 12 L15 18" strokeLinecap="round" /></svg>
            <div style={{ flex: 1 }} />
            <div style={{ width: 18 }} />
          </div>
        </div>

        <div style={{ margin: '2px 20px 0', textAlign: 'center' }}>
          <div style={{ fontFamily: MU_M.fontSerif, fontSize: 19, color: '#6D4F41', letterSpacing: '0.02em' }}>クレジットカードの登録</div>
          <div style={{ marginTop: 24, fontSize: 11, color: '#7B6A5E', lineHeight: 1.9, fontWeight: 600 }}>
            クレジットカードを登録すると、ポイントのチャージや
            <br />
            お支払いをスムーズに行うことができます。
          </div>
        </div>

        <div style={{ margin: '22px 16px 0', padding: '18px 18px 16px', borderRadius: 8, background: '#FBF8F4', border: '1px solid rgba(231, 220, 209, 0.96)' }}>
          <div style={{ fontSize: 11, color: '#5A473D', fontWeight: 700 }}>カード番号</div>
          <div style={{ marginTop: 10, position: 'relative' }}>
            <input value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} placeholder="例） 1234 5678 9012 3456" style={{ ...fieldStyle, paddingRight: 110 }} />
            <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: 7, pointerEvents: 'none' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#1A4C9A', letterSpacing: '-0.02em' }}>VISA</div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 14, height: 14, borderRadius: 999, background: '#EB001B' }} />
                <div style={{ width: 14, height: 14, borderRadius: 999, background: '#F79E1B', marginLeft: -5 }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 7px)', gap: 1 }}>
                {['#2B73B6', '#5CB85C', '#D9534F', '#F0AD4E'].map((color, index) => (
                  <div key={index} style={{ width: 7, height: 7, borderRadius: 2, background: color }} />
                ))}
              </div>
              <div style={{ width: 18, height: 13, borderRadius: 2, background: '#4A90E2' }} />
            </div>
          </div>

          <div style={{ marginTop: 20, fontSize: 11, color: '#5A473D', fontWeight: 700 }}>カード名義人</div>
          <input value={cardHolder} onChange={(event) => setCardHolder(event.target.value)} placeholder="例） TARO MUCHUNAVI" style={{ ...fieldStyle, marginTop: 10 }} />

          <div style={{ marginTop: 20, fontSize: 11, color: '#5A473D', fontWeight: 700 }}>有効期限</div>
          <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 14px minmax(0, 1fr)', gap: 8, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <select value={expiryMonth} onChange={(event) => setExpiryMonth(event.target.value)} style={{ ...fieldStyle, appearance: 'none', color: expiryMonth ? MU_M.ink : '#B8A99B', paddingRight: 36 }}>
                <option value="">月を選択</option>
                {Array.from({ length: 12 }, (_, index) => (
                  <option key={index + 1} value={String(index + 1).padStart(2, '0')}>{String(index + 1).padStart(2, '0')}</option>
                ))}
              </select>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9F8A79" strokeWidth="1.8" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><path d="M6 9 L12 15 L18 9" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div style={{ textAlign: 'center', color: '#A58E7C', fontSize: 18 }}>/</div>
            <div style={{ position: 'relative' }}>
              <select value={expiryYear} onChange={(event) => setExpiryYear(event.target.value)} style={{ ...fieldStyle, appearance: 'none', color: expiryYear ? MU_M.ink : '#B8A99B', paddingRight: 36 }}>
                <option value="">年を選択</option>
                {Array.from({ length: 12 }, (_, index) => {
                  const year = 2026 + index;
                  return <option key={year} value={String(year)}>{year}</option>;
                })}
              </select>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9F8A79" strokeWidth="1.8" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><path d="M6 9 L12 15 L18 9" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>

          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ fontSize: 11, color: '#5A473D', fontWeight: 700 }}>セキュリティコード</div>
            <div style={{ width: 15, height: 15, borderRadius: 999, border: '1px solid rgba(176, 156, 142, 0.9)', color: '#9F8A79', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>?</div>
          </div>
          <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 64px', gap: 10, alignItems: 'center' }}>
            <input value={securityCode} onChange={(event) => setSecurityCode(event.target.value)} placeholder="例） 123" style={fieldStyle} />
            <div style={{ height: 42, borderRadius: 8, background: '#F2F2F2', border: '1px solid rgba(222, 214, 206, 0.9)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, right: 0, top: 7, height: 8, background: '#262626' }} />
              <div style={{ position: 'absolute', right: 8, bottom: 6, width: 20, height: 14, borderRadius: 7, border: '1px solid #E88E8E', color: '#E25B5B', fontSize: 8, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF' }}>123</div>
            </div>
          </div>

          <div style={{ marginTop: 20, fontSize: 11, color: '#5A473D', fontWeight: 700 }}>カードの登録名（任意）</div>
          <input value={cardLabel} onChange={(event) => setCardLabel(event.target.value)} placeholder="例） メインカード" style={{ ...fieldStyle, marginTop: 10 }} />
          <div style={{ marginTop: 8, fontSize: 10, color: '#8C7A6C', lineHeight: 1.6 }}>ご自身で分かりやすい名前を設定できます。</div>
        </div>

        <button type="button" style={{ margin: '20px 20px 0', width: 'calc(100% - 40px)', height: 46, borderRadius: 999, background: 'transparent', border: `0.5px solid ${MU_M.gold}`, color: MU_M.goldDeep, fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', cursor: 'pointer' }}>
          カードを登録する
        </button>
        <button type="button" style={{ margin: '14px 20px 0', width: 'calc(100% - 40px)', height: 46, borderRadius: 999, background: '#FBF8F4', color: '#B07C5D', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', cursor: 'pointer', border: `0.5px solid ${MU_M.hairlineStrong}` }}>
          登録をスキップする
        </button>

        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 10, color: '#99877A' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="6.5" y="10" width="11" height="8" rx="2" /><path d="M8.5 10V8.5a3.5 3.5 0 0 1 7 0V10" /></svg>
          <span>お客様の情報は暗号化され、安全に管理されています。</span>
        </div>
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}

function MU_MyPhoneChange() {
  const [phone, setPhone] = useState('138 0013 8000');
  const [code, setCode] = useState('');

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="PHONE" title="更换手机号码" />
        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairlineStrong}` }}>
          <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>SECURITY UPDATE</div>
          <div style={{ marginTop: 5, fontFamily: MU_M.fontSerif, fontSize: 18, color: MU_M.ink }}>修改登录手机号并同步账号通知</div>
        </div>
        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}` }}>
          <div style={{ fontSize: 11, color: MU_M.inkMid }}>新手机号码</div>
          <input value={phone} onChange={(event) => setPhone(event.target.value)} style={{ marginTop: 8, width: '100%', height: 42, borderRadius: 6, background: '#FFFFFF', border: `0.5px solid ${MU_M.hairlineStrong}`, padding: '0 14px', fontSize: 14, color: MU_M.ink }} />
          <div style={{ marginTop: 14, fontSize: 11, color: MU_M.inkMid }}>验证码</div>
          <div style={{ marginTop: 8, display: 'flex', gap: 10 }}>
            <input value={code} onChange={(event) => setCode(event.target.value)} style={{ flex: 1, height: 42, borderRadius: 6, background: '#FFFFFF', border: `0.5px solid ${MU_M.hairlineStrong}`, padding: '0 14px', fontSize: 14, color: MU_M.ink }} />
            <button type="button" style={{ width: 110, height: 42, borderRadius: 6, background: MU_M.bgSoft, color: MU_M.ink, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>发送验证码</button>
          </div>
        </div>
        <div style={{ margin: '14px 20px 0', height: 42, borderRadius: 8, background: 'transparent', border: `0.5px solid ${MU_M.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MU_M.goldDeep, fontSize: 12, fontWeight: 500, letterSpacing: '0.12em' }}>确认更换</div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_MyQRCode() {
  const [qrState, setQrState] = useState('idle');
  const qrSeed = 'TAKESHI-MYQR-2026';
  const qrCells = Array.from({ length: 25 * 25 }, (_, index) => {
    const row = Math.floor(index / 25);
    const col = index % 25;
    const finder = (
      (row < 7 && col < 7) ||
      (row < 7 && col > 17) ||
      (row > 17 && col < 7)
    );
    const finderRing = (
      ((row === 0 || row === 6) && ((col >= 0 && col <= 6) || (col >= 18 && col <= 24))) ||
      ((col === 0 || col === 6) && ((row >= 0 && row <= 6) || (row >= 18 && row <= 24))) ||
      ((row === 18 || row === 24) && col >= 0 && col <= 6) ||
      ((col === 18 || col === 24) && row >= 0 && row <= 6)
    );
    const finderCore = (
      ((row >= 2 && row <= 4) && (col >= 2 && col <= 4)) ||
      ((row >= 2 && row <= 4) && (col >= 20 && col <= 22)) ||
      ((row >= 20 && row <= 22) && (col >= 2 && col <= 4))
    );
    if (finder) return finderRing || finderCore;
    const seed = qrSeed.charCodeAt((row + col) % qrSeed.length);
    return ((row * 11 + col * 7 + seed) % 5) < 2;
  });

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="MY QR" title="我的二维码" />

        <div style={{ margin: '14px 20px 0', padding: '22px 20px 20px', borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairlineStrong}` }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" style={{ width: 72, height: 72, borderRadius: 36, objectFit: 'cover', display: 'block' }} />
            <div style={{ marginTop: 12, fontFamily: MU_M.fontSerif, fontSize: 20, color: MU_M.ink, letterSpacing: '0.04em' }}>TAKESHI</div>

            <div style={{ marginTop: 16, width: 224, height: 224, padding: 14, borderRadius: 8, background: '#FFFFFF', border: `0.5px solid ${MU_M.hairlineStrong}` }}>
              <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: 'repeat(25, 1fr)', gridTemplateRows: 'repeat(25, 1fr)', gap: 1 }}>
                {qrCells.map((filled, index) => (
                  <div key={index} style={{ background: filled ? '#1A2C31' : 'transparent', borderRadius: 1 }} />
                ))}
              </div>
            </div>

            <div style={{ marginTop: 16, fontSize: 12, color: MU_M.inkMid, lineHeight: 1.7 }}>
              扫一扫上面的二维码，
              <br />
              和我聊天
            </div>
          </div>
        </div>

        {qrState !== 'idle' ? (
          <div style={{ margin: '12px 20px 0', display: 'inline-flex', padding: '6px 12px', borderRadius: 999, background: 'rgba(251,247,244,0.88)', color: MU_M.ink, fontSize: 10, fontWeight: 700, border: `0.5px solid ${MU_M.hairline}` }}>
            {qrState === 'copied' ? '链接已复制' : '已准备保存图片'}
          </div>
        ) : null}

        <div style={{ margin: '18px 20px 0', display: 'flex', gap: 10 }}>
          <button type="button" onClick={() => setQrState('copied')} style={{ flex: 1, height: 44, borderRadius: 8, background: MU_M.bgSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MU_M.ink, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            复制链接
          </button>
          <button type="button" onClick={() => setQrState('saved')} style={{ flex: 1, height: 44, borderRadius: 8, background: 'transparent', border: `0.5px solid ${MU_M.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MU_M.goldDeep, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            保存图片
          </button>
        </div>

        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 8, background: '#FFFFFF', border: `0.5px solid ${MU_M.hairline}` }}>
          <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>PROFILE LINK</div>
          <div style={{ marginTop: 8, fontSize: 12, color: MU_M.ink, lineHeight: 1.7, wordBreak: 'break-all' }}>{MU_MY_QR_LINK}</div>
        </div>

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_BookingConfirm() {
  const order = MU_getBookingContext();
  const [selectedDate, setSelectedDate] = useState(order.date || '5/28');
  const [selectedTime, setSelectedTime] = useState(order.time || '23:00');
  const [partySize, setPartySize] = useState(order.partySize || 2);
  const [confirmNotice, setConfirmNotice] = useState('');
  const dates = [
    { day: '今日', date: '5/27' },
    { day: '明日', date: '5/28', on: true },
    { day: '木', date: '5/29' },
    { day: '金', date: '5/30' },
    { day: '土', date: '5/31', off: true },
    { day: '日', date: '6/1' },
    { day: '月', date: '6/2' },
  ];
  const slots = [
    ['20:00', '予約可'],
    ['20:30', '予約可'],
    ['21:00', '予約可'],
    ['21:30', '残りわずか'],
    ['22:00', '満席'],
    ['22:30', '予約可'],
    ['23:00', 'おすすめ', true],
    ['23:30', '予約可'],
    ['0:00', '予約可'],
    ['0:30', '残りわずか'],
    ['1:00', '予約可'],
    ['1:30', '-'],
  ];
  const totalPrice = order.packageFeePerGuest * partySize - 10000 + order.nominationFee;

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 88 }}>
        <div style={{ paddingTop: MU_TOP_SPACING }}>
          <div style={{ padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MU_M.ink} strokeWidth="2" style={{ cursor: 'pointer' }} onClick={() => window.__nav?.back()}><path d="M15 6 L9 12 L15 18" strokeLinecap="round" /></svg>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.3em' }}>RESERVATION</div>
              <div style={{ fontFamily: MU_M.fontSerif, fontSize: 15, color: MU_M.ink, letterSpacing: '0.08em' }}>予約確認</div>
            </div>
            <div style={{ width: 18 }} />
          </div>
        </div>

        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairlineStrong}` }}>
          <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>CONFIRM BOOKING</div>
          <div style={{ marginTop: 5, fontFamily: MU_M.fontSerif, fontSize: 18, color: MU_M.ink, letterSpacing: '0.05em' }}>来店時間、人数、特典を確認して予約を確定します</div>
          {confirmNotice ? <div style={{ marginTop: 10, display: 'inline-flex', padding: '4px 10px', borderRadius: 999, background: MU_M.rougeTint, color: MU_M.rouge, fontSize: 10, fontWeight: 700 }}>{confirmNotice}</div> : null}
        </div>

        <div style={{ margin: '14px 20px 0', padding: 14, borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, display: 'flex', gap: 12, alignItems: 'center' }}>
          <MU_BookingThumb src={order.shopThumb} size={56} radius={10} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink, letterSpacing: '0.04em' }}>{order.shopName}</div>
            <div style={{ fontSize: 10, color: MU_M.goldDeep, marginTop: 2, letterSpacing: '0.08em' }}>指名キャスト：{order.castName} · {order.castLevel}</div>
          </div>
        </div>

        <div style={{ margin: '18px 20px 0' }}>
          <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.25em', marginBottom: 10 }}>SELECT DATE</div>
          <div className="mu-hide-scrollbar" style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {dates.map((d) => (
              <button key={`${d.day}-${d.date}`} type="button" onClick={() => !d.off && setSelectedDate(d.date)} style={{ flexShrink: 0, width: 52, padding: '10px 0', borderRadius: 6, textAlign: 'center', background: selectedDate === d.date ? MU_M.bgAlt : MU_M.surface, border: `0.5px solid ${selectedDate === d.date ? MU_M.hairlineStrong : MU_M.hairline}`, opacity: d.off ? 0.4 : 1, cursor: d.off ? 'default' : 'pointer' }}>
                <div style={{ fontSize: 9, color: selectedDate === d.date ? '#1A2C31' : MU_M.inkMid, letterSpacing: '0.05em' }}>{d.day}</div>
                <div style={{ marginTop: 3, fontSize: 14, color: selectedDate === d.date ? '#1A2C31' : MU_M.ink, fontFamily: MU_M.fontSerif, fontWeight: selectedDate === d.date ? 700 : 400 }}>{d.date}</div>
                {d.off ? <div style={{ fontSize: 7, color: MU_M.danger, marginTop: 1 }}>店休</div> : null}
              </button>
            ))}
          </div>
        </div>

        <div style={{ margin: '20px 20px 0' }}>
          <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.25em', marginBottom: 10 }}>ARRIVAL TIME · {selectedDate}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {slots.map(([t, s]) => {
              const disabled = s === '満席' || s === '-';
              const color = s === '満席' ? MU_M.inkLow : s === '残りわずか' ? MU_M.warn : s === '-' ? MU_M.inkLow : MU_M.gold;
              return (
                <button key={t} type="button" onClick={() => !disabled && setSelectedTime(t)} style={{ height: 50, borderRadius: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: selectedTime === t ? MU_M.rouge : MU_M.surface, border: `0.5px solid ${selectedTime === t ? MU_M.gold : MU_M.hairline}`, opacity: disabled ? 0.4 : 1, cursor: disabled ? 'default' : 'pointer' }}>
                  <div style={{ fontSize: 12, color: selectedTime === t ? MU_M.gold : MU_M.ink, fontFamily: MU_M.fontSerif, letterSpacing: '0.05em' }}>{t}</div>
                  <div style={{ fontSize: 10, color }}>{s}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ margin: '20px 20px 0', padding: 14, borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.25em' }}>PARTY</div>
              <div style={{ marginTop: 2, fontSize: 13, color: MU_M.ink, fontFamily: MU_M.fontSerif, letterSpacing: '0.05em' }}>来店人数</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button type="button" onClick={() => setPartySize((prev) => Math.max(1, prev - 1))} style={{ width: 32, height: 32, borderRadius: 8, border: `0.5px solid ${MU_M.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MU_M.gold, fontSize: 16, cursor: 'pointer' }}>-</button>
              <div style={{ fontFamily: MU_M.fontSerif, fontSize: 18, color: MU_M.gold, width: 24, textAlign: 'center' }}>{partySize}</div>
              <button type="button" onClick={() => setPartySize((prev) => Math.min(6, prev + 1))} style={{ width: 32, height: 32, borderRadius: 8, background: 'transparent', border: `0.5px solid ${MU_M.gold}`, color: MU_M.goldDeep, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>+</button>
            </div>
          </div>
        </div>

        <div style={{ margin: '14px 20px 0', padding: 14, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.rougeSoft}`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={MU_M.gold} strokeWidth="1.6"><path d="M4 8 V16 A1 1 0 0 0 5 17 H19 A1 1 0 0 0 20 16 V8 A1 1 0 0 0 19 7 H5 A1 1 0 0 0 4 8 Z" /><path d="M4 12 H20" strokeDasharray="2 2" /></svg>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: MU_M.fontBrand, fontSize: 9, color: 'rgba(234, 212, 167, 0.86)', letterSpacing: '0.25em' }}>COUPON · APPLIED</div>
            <div style={{ marginTop: 2, fontSize: 12, color: '#F6F2EF', letterSpacing: '0.04em', textShadow: '0 1px 2px rgba(0,0,0,0.18)' }}>{order.couponTitle}</div>
          </div>
        </div>

        <div style={{ margin: '14px 20px 0', padding: 14, borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}` }}>
          {[
            [`コース料金 (2h × ${partySize}名)`, `¥${(order.packageFeePerGuest * partySize).toLocaleString()}`],
            ['指名料金', `¥${order.nominationFee.toLocaleString()}`],
            ['クーポン', '-¥10,000', true],
          ].map(([k, v, neg]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 12, color: MU_M.inkMid }}>
              <span>{k}</span>
              <span style={{ color: neg ? MU_M.gold : MU_M.ink, fontFamily: MU_M.fontSerif }}>{v}</span>
            </div>
          ))}
          <div style={{ marginTop: 6, paddingTop: 10, borderTop: `0.5px solid ${MU_M.hairline}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: MU_M.inkMid, letterSpacing: '0.1em' }}>TOTAL</span>
            <span style={{ fontFamily: MU_M.fontSerif, fontSize: 22, color: MU_M.gold, letterSpacing: '0.03em' }}>¥{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 20px 28px', background: 'linear-gradient(180deg, transparent 0%, rgba(26, 44, 49, 0.75) 30%)' }}>
        <button type="button" onClick={() => setConfirmNotice(`予約を送信しました ${selectedDate} ${selectedTime}`)} style={{ width: '100%', height: 50, borderRadius: 25, background: 'transparent', border: `0.5px solid ${MU_M.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MU_M.goldDeep, fontSize: 14, fontWeight: 500, letterSpacing: '0.2em', fontFamily: MU_M.fontSerif, cursor: 'pointer' }}>
          予約を確定
        </button>
      </div>
    </div>
  );
}

function MU_BookingDetail() {
  const order = MU_getBookingContext();
  const [orderStatus, setOrderStatus] = useState(order.status || 'confirmed');
  const [selectedDate] = useState(order.date || '5/28');
  const [selectedTime] = useState(order.time || '23:00');
  const [partySize] = useState(order.partySize || 2);
  const [actionNotice, setActionNotice] = useState('');
  const statusMap = {
    confirmed: {
      badge: '確定済み',
      tone: MU_M.rouge,
      bg: MU_M.rougeTint,
      title: '予約は確定済み、来店をお待ちしています',
      desc: '開始2時間前までは無料で日程変更できます。急な変更がある場合はサポートへご連絡ください。',
      cta: '来店パスを見る',
    },
    rescheduled: {
      badge: '日程変更済み',
      tone: MU_M.goldDeep,
      bg: 'rgba(164,150,115,0.14)',
      title: '予約日程を変更しました。店舗確認をお待ちください',
      desc: '新しい来店時間は送信済みです。通常は3分以内に確認結果が届きます。',
      cta: '変更状況を見る',
    },
    cancelled: {
      badge: 'キャンセル済み',
      tone: MU_M.warn,
      bg: 'rgba(195,126,72,0.14)',
      title: '予約はキャンセルされました',
      desc: '支払い済みの場合は同じ決済手段へ返金されます。クーポン保持が必要な場合はサポートへご相談ください。',
      cta: '返金状況を見る',
    },
  };
  const currentStatus = statusMap[orderStatus];
  const totalPrice = order.packageFeePerGuest * partySize - 10000 + order.nominationFee;

  function syncNotice(text) {
    setActionNotice(text);
    window.setTimeout(() => {
      setActionNotice((prev) => (prev === text ? '' : prev));
    }, 2200);
  }

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 110 }}>
        <div style={{ paddingTop: MU_TOP_SPACING }}>
          <div style={{ padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MU_M.ink} strokeWidth="2" style={{ cursor: 'pointer' }} onClick={() => window.__nav?.back()}><path d="M15 6 L9 12 L15 18" strokeLinecap="round" /></svg>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.3em' }}>RESERVATION</div>
              <div style={{ fontFamily: MU_M.fontSerif, fontSize: 15, color: MU_M.ink, letterSpacing: '0.08em' }}>注文詳細</div>
            </div>
            <div style={{ width: 18 }} />
          </div>
        </div>

        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairlineStrong}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <div>
              <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>ORDER STATUS</div>
              <div style={{ marginTop: 5, fontFamily: MU_M.fontSerif, fontSize: 18, color: MU_M.ink, letterSpacing: '0.05em' }}>{currentStatus.title}</div>
            </div>
            <div style={{ flexShrink: 0, padding: '4px 10px', borderRadius: 999, background: currentStatus.bg, color: currentStatus.tone, fontSize: 10, fontWeight: 700 }}>{currentStatus.badge}</div>
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: MU_M.inkMid, lineHeight: 1.7 }}>{currentStatus.desc}</div>
          {actionNotice ? <div style={{ marginTop: 10, display: 'inline-flex', padding: '4px 10px', borderRadius: 999, background: 'rgba(26,44,49,0.06)', color: MU_M.ink, fontSize: 10, fontWeight: 700 }}>{actionNotice}</div> : null}
        </div>

        <div style={{ margin: '14px 20px 0', padding: 14, borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, display: 'flex', gap: 12, alignItems: 'center' }}>
          <MU_BookingThumb src={order.shopThumb} size={56} radius={10} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink, letterSpacing: '0.04em' }}>{order.shopName}</div>
            <div style={{ fontSize: 10, color: MU_M.goldDeep, marginTop: 2, letterSpacing: '0.08em' }}>指名キャスト：{order.castName} · {order.castLevel}</div>
          </div>
        </div>

        <div style={{ margin: '14px 20px 0', padding: 14, borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { label: '来店日', value: selectedDate },
              { label: '来店時間', value: selectedTime },
              { label: '来店人数', value: `${partySize} 名` },
            ].map((item) => (
              <div key={item.label} style={{ minWidth: 0 }}>
                <div style={{ fontSize: 10, color: MU_M.inkMid, letterSpacing: '0.08em' }}>{item.label}</div>
                <div style={{ marginTop: 4, fontFamily: MU_M.fontSerif, fontSize: 16, color: MU_M.ink, letterSpacing: '0.03em' }}>{item.value}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: `0.5px solid ${MU_M.hairline}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 10, color: MU_M.inkMid, lineHeight: 1.6 }}>
              時間や人数を変更する場合は、下部の `日程変更` をご利用ください。
            </div>
            <div style={{ padding: '4px 8px', borderRadius: 999, background: MU_M.bgSoft, color: MU_M.goldDeep, fontSize: 9, fontWeight: 700 }}>
              LOCKED
            </div>
          </div>
        </div>

        <div style={{ margin: '14px 20px 0', padding: 14, borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.25em' }}>RESCHEDULE POLICY</div>
              <div style={{ marginTop: 3, fontSize: 12, color: MU_M.ink, fontFamily: MU_M.fontSerif }}>変更 / キャンセル規定</div>
            </div>
            <div style={{ fontSize: 10, color: MU_M.goldDeep, fontWeight: 700 }}>注文番号 #{order.id}</div>
          </div>
          <div style={{ marginTop: 10, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.7 }}>
            開始2時間前までは無料で変更可能です。支払い後にキャンセルした場合はクーポンを優先保持し、残額は元の決済手段へ返金されます。期限超過時はサポートで個別対応します。
          </div>
        </div>

        <div style={{ margin: '14px 20px 0', padding: 14, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.rougeSoft}`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={MU_M.gold} strokeWidth="1.6"><path d="M4 8 V16 A1 1 0 0 0 5 17 H19 A1 1 0 0 0 20 16 V8 A1 1 0 0 0 19 7 H5 A1 1 0 0 0 4 8 Z" /><path d="M4 12 H20" strokeDasharray="2 2" /></svg>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: MU_M.fontBrand, fontSize: 9, color: 'rgba(234, 212, 167, 0.86)', letterSpacing: '0.25em' }}>COUPON · APPLIED</div>
            <div style={{ marginTop: 2, fontSize: 12, color: '#F6F2EF', letterSpacing: '0.04em', textShadow: '0 1px 2px rgba(0,0,0,0.18)' }}>{order.couponTitle}</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MU_M.gold} strokeWidth="1.8"><path d="M9 6 L15 12 L9 18" /></svg>
        </div>

        <div style={{ margin: '14px 20px 0', padding: 14, borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}` }}>
          {[
            [`コース料金 (2h × ${partySize}名)`, `¥${(order.packageFeePerGuest * partySize).toLocaleString()}`],
            ['指名料金', `¥${order.nominationFee.toLocaleString()}`],
            ['クーポン', '-¥10,000', true],
          ].map(([k, v, neg]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 12, color: MU_M.inkMid }}>
              <span>{k}</span>
              <span style={{ color: neg ? MU_M.gold : MU_M.ink, fontFamily: MU_M.fontSerif }}>{v}</span>
            </div>
          ))}
          <div style={{ marginTop: 6, paddingTop: 10, borderTop: `0.5px solid ${MU_M.hairline}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: MU_M.inkMid, letterSpacing: '0.1em' }}>TOTAL</span>
            <span style={{ fontFamily: MU_M.fontSerif, fontSize: 22, color: MU_M.gold, letterSpacing: '0.03em' }}>¥{totalPrice.toLocaleString()}</span>
          </div>
        </div>

        <div style={{ height: 20 }} />
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 16px 24px', background: 'linear-gradient(180deg, transparent 0%, rgba(26, 44, 49, 0.82) 28%)' }}>
        <div style={{ padding: 8, borderRadius: 8, background: 'rgba(28,22,18,0.78)', border: '0.5px solid rgba(251,247,244,0.14)', boxShadow: '0 -8px 24px rgba(0,0,0,0.18)', backdropFilter: 'blur(18px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {[
              { label: '日程変更', onClick: () => { setOrderStatus('rescheduled'); syncNotice('日程変更を送信しました。店舗確認をお待ちください'); } },
              { label: '予約キャンセル', onClick: () => { setOrderStatus('cancelled'); syncNotice('予約をキャンセルしました'); } },
              { label: 'カスタマーサポート', onClick: () => window.__nav?.open('mypage-support') },
              { label: '再予約', onClick: () => { MU_setBookingContext({ ...order, scene: 'create' }); window.__nav?.open('booking'); } },
            ].map((item) => (
              <button key={item.label} type="button" onClick={item.onClick} style={{ height: 34, borderRadius: 11, background: 'rgba(251,247,244,0.08)', border: '0.5px solid rgba(251,247,244,0.12)', color: '#F6F2EF', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MU_MyOrders() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const orders = {
    upcoming: [
      { id: 'AR10234', thumb: MU_BOOKING_SHOP, title: 'LOUNGE ARIA 銀座本店', subtitle: '4/24 23:00 · 七海 Nanami · 2名', meta: '確定済み', tag: '来店待ち', status: 'confirmed', shopName: 'LOUNGE ARIA 銀座本店', shopThumb: MU_BOOKING_SHOP, castName: '七海 Nanami', castLevel: 'Lv.7', date: '4/24', time: '23:00', partySize: 2, couponTitle: '初回来店 10,000円OFF', packageFeePerGuest: 30000, nominationFee: 8000, scene: 'detail' },
      { id: 'SL20418', thumb: 'https://images.pexels.com/photos/5371577/pexels-photo-5371577.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Salon Lumiere', subtitle: '4/27 21:30 · 優花 Yuka · 3名', meta: '支払い待ち', tag: '確認中', status: 'rescheduled', shopName: 'Salon Lumiere', shopThumb: 'https://images.pexels.com/photos/5371577/pexels-photo-5371577.jpeg?auto=compress&cs=tinysrgb&w=600', castName: '優花 Yuka', castLevel: 'Lv.5', date: '4/27', time: '21:30', partySize: 3, couponTitle: '平日ペアコース 8,000円OFF', packageFeePerGuest: 24000, nominationFee: 6000, scene: 'detail' },
    ],
    history: [
      { id: 'AR10118', thumb: MU_BOOKING_SHOP, title: 'LOUNGE ARIA 銀座本店', subtitle: '4/20 22:30 · 七海 Nanami · 2名', meta: '¥58,000', tag: '完了', status: 'confirmed', shopName: 'LOUNGE ARIA 銀座本店', shopThumb: MU_BOOKING_SHOP, castName: '七海 Nanami', castLevel: 'Lv.7', date: '4/20', time: '22:30', partySize: 2, couponTitle: '初回来店 10,000円OFF', packageFeePerGuest: 30000, nominationFee: 8000, scene: 'detail' },
      { id: 'CV09881', thumb: 'https://images.pexels.com/photos/6266446/pexels-photo-6266446.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Club Velvet', subtitle: '4/13 23:00 · 指名なし · 3名', meta: '¥76,000', tag: '完了', status: 'confirmed', shopName: 'Club Velvet', shopThumb: 'https://images.pexels.com/photos/6266446/pexels-photo-6266446.jpeg?auto=compress&cs=tinysrgb&w=600', castName: 'フリー来店', castLevel: 'Open Seat', date: '4/13', time: '23:00', partySize: 3, couponTitle: 'VIP シャンパンクーポン', packageFeePerGuest: 26000, nominationFee: 8000, scene: 'detail' },
      { id: 'NB08366', thumb: 'https://images.pexels.com/photos/36092418/pexels-photo-36092418.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'NOBLE', subtitle: '4/06 21:00 · 凛 Rin · 2名', meta: 'キャンセル済み', tag: '返金済み', status: 'cancelled', shopName: 'NOBLE', shopThumb: 'https://images.pexels.com/photos/36092418/pexels-photo-36092418.jpeg?auto=compress&cs=tinysrgb&w=600', castName: '凛 Rin', castLevel: 'Lv.6', date: '4/06', time: '21:00', partySize: 2, couponTitle: '新人歓迎クーポン', packageFeePerGuest: 28000, nominationFee: 7000, scene: 'detail' },
    ],
  };

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="MY ORDERS" title="予約注文" />
        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairlineStrong}` }}>
          <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>SUMMARY</div>
          <div style={{ marginTop: 5, fontFamily: MU_M.fontSerif, fontSize: 18, color: MU_M.ink, letterSpacing: '0.05em' }}>{activeTab === 'upcoming' ? '現在 2 件の予約が進行中で、そのうち 1 件は支払い待ちです' : '直近30日で 5 件来店、1 件キャンセルしました'}</div>
        </div>
        <div style={{ margin: '14px 20px 0', padding: 4, borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, display: 'flex' }}>
          {[
            { id: 'upcoming', label: '進行中' },
            { id: 'history', label: '注文履歴' },
          ].map((tab) => {
            const active = tab.id === activeTab;
            return (
              <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} style={{ flex: 1, height: 34, borderRadius: 8, background: active ? MU_M.bgAlt : 'transparent', color: active ? MU_M.ink : MU_M.inkMid, fontSize: 11, fontWeight: active ? 700 : 500, cursor: 'pointer' }}>
                {tab.label}
              </button>
            );
          })}
        </div>
        <div style={{ margin: '14px 20px 0', borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, overflow: 'hidden' }}>
          {orders[activeTab].map((item, index) => (
            <button key={`${item.title}-${index}`} type="button" onClick={() => { MU_setBookingContext(item); window.__nav?.open('booking-detail'); }} style={{ width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderTop: index > 0 ? `0.5px solid ${MU_M.hairline}` : 'none', textAlign: 'left', cursor: 'pointer' }}>
              <MU_BookingThumb src={item.thumb} size={54} radius={10} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink }}>{item.title}</div>
                <div style={{ marginTop: 4, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.5 }}>{item.subtitle}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: MU_M.goldDeep, fontWeight: 700 }}>{item.meta}</div>
                <div style={{ marginTop: 5, fontSize: 8, color: item.tag === '返金済み' ? MU_M.warn : MU_M.rouge, background: item.tag === '返金済み' ? 'rgba(195,126,72,0.14)' : MU_M.rougeTint, padding: '2px 6px', borderRadius: 999, display: 'inline-flex' }}>{item.tag}</div>
              </div>
            </button>
          ))}
        </div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_MyCoupons() {
  const [activeTab, setActiveTab] = useState('available');
  const tabs = [
    { id: 'available', label: '利用可能', count: 12 },
    { id: 'used', label: '利用済み', count: 18 },
    { id: 'expired', label: '期限切れ', count: 6 },
  ];
  const couponMap = {
    available: [
      { icon: 'CP', title: '初回来店 10,000円OFF', subtitle: 'LOUNGE ARIA 銀座本店 · 50,000円以上で利用可', meta: '2026/05/31', tag: 'まもなく期限切れ', shop: { id: 'aria', name: 'LOUNGE ARIA', area: '銀座7丁目', src: 'https://images.pexels.com/photos/36092418/pexels-photo-36092418.jpeg?auto=compress&cs=tinysrgb&w=600' }, coupon: { title: '初回来店 10,000円OFF', sub: '50,000円以上で利用可 · 新規限定', tag: 'おすすめ', status: '受取可能' } },
      { icon: 'CP', title: 'ペアコース 8,000円OFF', subtitle: '対象店舗共通 · 平日限定', meta: '2026/06/12', shop: { id: 'velvet', name: 'Club Velvet', area: '六本木', src: 'https://images.pexels.com/photos/6266446/pexels-photo-6266446.jpeg?auto=compress&cs=tinysrgb&w=600' }, coupon: { title: '平日ペア来店 8,000円OFF', sub: '火曜から木曜に利用可', tag: 'ペア', status: '受取可能' } },
      { icon: 'CP', title: 'VIP シャンパンクーポン', subtitle: '対象シャンパンコースが 15%OFF', meta: '2026/06/30', tag: 'VIP', shop: { id: 'aria', name: 'LOUNGE ARIA', area: '銀座7丁目', src: 'https://images.pexels.com/photos/36092418/pexels-photo-36092418.jpeg?auto=compress&cs=tinysrgb&w=600' }, coupon: { title: 'シャンパンコース 15%OFF', sub: '対象シャンパンコースに会員PT併用可', tag: '期間限定', status: '受取可能' } },
    ],
    used: [
      { icon: '✓', title: 'NOBLE 来店割引券', subtitle: '2026/04/18 に利用済み', meta: '-¥8,000', shop: { id: 'noble', name: 'NOBLE 銀座', area: '銀座8丁目', src: 'https://images.pexels.com/photos/7245333/pexels-photo-7245333.jpeg?auto=compress&cs=tinysrgb&w=600' }, coupon: { title: '来店クーポン', sub: 'この店舗で受け取れる特典', tag: '店舗', status: '受取済み' } },
      { icon: '✓', title: 'ペア予約クーポン', subtitle: '2026/04/06 に利用済み', meta: '-¥10,000', shop: { id: 'aria', name: 'LOUNGE ARIA', area: '銀座7丁目', src: 'https://images.pexels.com/photos/36092418/pexels-photo-36092418.jpeg?auto=compress&cs=tinysrgb&w=600' }, coupon: { title: 'ペア同卓 6,000円OFF', sub: '2名来店かつ同卓予約時に利用可', tag: 'ペア', status: '受取済み' } },
    ],
    expired: [
      { icon: 'EX', title: '春限定ウェルカム券', subtitle: '2026/03/31 に期限切れ', meta: '失効済み', shop: { id: 'velvet', name: 'Club Velvet', area: '六本木', src: 'https://images.pexels.com/photos/6266446/pexels-photo-6266446.jpeg?auto=compress&cs=tinysrgb&w=600' }, coupon: { title: 'ウェルカムドリンク券', sub: '対象セットでスパークリング1本進呈', tag: 'ドリンク', status: '受取済み' } },
      { icon: 'EX', title: '平日ナイトクーポン', subtitle: '2026/02/28 に期限切れ', meta: '失効済み', shop: { id: 'lumiere', name: 'Salon Lumiere', area: '六本木', src: 'https://images.pexels.com/photos/5371577/pexels-photo-5371577.jpeg?auto=compress&cs=tinysrgb&w=600' }, coupon: { title: '平日予約特典', sub: '月曜から木曜の予約で利用可', tag: '平日', status: '受取済み' } },
    ],
  };

  function openCouponDetail(item, index) {
    if (!window.MU_setShopContext || !window.MU_setCouponDetailContext || !window.MU_buildCouponDetail) return;
    window.MU_setShopContext({
      id: item.shop.id,
      name: item.shop.name,
      area: item.shop.area,
      src: item.shop.src,
      favorite: false,
    });
    window.MU_setCouponDetailContext(window.MU_buildCouponDetail(
      { id: item.shop.id, name: item.shop.name, area: item.shop.area, src: item.shop.src },
      item.coupon,
      index,
    ));
    window.__nav?.open('shop-coupon-detail');
  }

  const renderCouponIcon = (icon) => {
    if (icon === 'CP') {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={MU_M.gold} strokeWidth="1.5">
          <path d="M15 5l-3 3-3-3M7 12h10M5 8v8a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
        </svg>
      );
    }
    if (icon === '✓') {
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={MU_M.gold} strokeWidth="2.5">
          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={MU_M.gold} strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4l3 3" />
      </svg>
    );
  };

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="COUPONS" title="クーポン" />
        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairlineStrong}` }}>
          <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>SUMMARY</div>
          <div style={{ marginTop: 5, fontFamily: MU_M.fontSerif, fontSize: 18, color: MU_M.ink, letterSpacing: '0.05em' }}>現在利用可能 12枚、まもなく期限切れ 3枚</div>
        </div>
        <div style={{ margin: '14px 20px 0', padding: 4, borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, display: 'flex' }}>
          {tabs.map((tab) => {
            const active = tab.id === activeTab;
            return (
              <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} style={{ flex: 1, height: 34, borderRadius: 8, background: active ? MU_M.bgAlt : 'transparent', color: active ? MU_M.ink : MU_M.inkMid, fontSize: 11, fontWeight: active ? 700 : 500, cursor: 'pointer' }}>
                {tab.label} {tab.count}
              </button>
            );
          })}
        </div>
        <div style={{ margin: '14px 20px 0', borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, overflow: 'hidden' }}>
          {couponMap[activeTab].map((item, index) => (
            <button key={`${item.title}-${index}`} type="button" onClick={() => openCouponDetail(item, index)} style={{ width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderTop: index > 0 ? `0.5px solid ${MU_M.hairline}` : 'none', textAlign: 'left', cursor: 'pointer', background: 'transparent' }}>
              <div style={{ width: 52, height: 52, borderRadius: 6, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {renderCouponIcon(item.icon)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink, letterSpacing: '0.04em' }}>{item.title}</div>
                <div style={{ marginTop: 4, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.5 }}>{item.subtitle}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: MU_M.goldDeep, fontWeight: 700 }}>{item.meta}</div>
                {item.tag ? <div style={{ marginTop: 5, fontSize: 8, color: MU_M.rouge, background: MU_M.rougeTint, padding: '2px 6px', borderRadius: 999, display: 'inline-flex' }}>{item.tag}</div> : null}
              </div>
            </button>
          ))}
        </div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_MySearch() {
  const [activeKeyword, setActiveKeyword] = useState('予約');
  const keywords = ['予約', 'ギフト', 'クーポン', 'チャージ', 'カスタマーサポート'];
  const resultMap = {
    予約: [
      { title: '予約注文', subtitle: '進行中の予約と注文履歴を確認', target: 'mypage-orders' },
      { title: '予約確認', subtitle: '現在の予約フローをそのまま続ける', target: 'booking', mode: 'create' },
    ],
    ギフト: [
      { title: 'ギフト履歴', subtitle: '送信履歴と今月の集計を確認', target: 'mypage-gifts' },
      { title: 'フォロー中のキャスト', subtitle: 'チャットへ移動してそのままギフト送信', target: 'mypage-following' },
    ],
    クーポン: [
      { title: 'クーポン', subtitle: '利用可能、利用済み、期限切れを確認', target: 'mypage-coupons' },
      { title: '来店履歴', subtitle: 'クーポン利用済みの注文を照合', target: 'mypage-visits' },
    ],
    チャージ: [
      { title: 'チャージ', subtitle: '金額プラン、支払い方法、特典を選択', target: 'mypage-recharge' },
      { title: 'ギフト履歴', subtitle: 'チャージ残高でギフトや予約に利用可能', target: 'mypage-gifts' },
    ],
    カスタマーサポート: [
      { title: 'カスタマーサポート', subtitle: 'オンライン相談、注文窓口、ギフト窓口', target: 'mypage-support' },
      { title: '本人確認', subtitle: '認証状態と提出済み情報を確認', target: 'mypage-verification' },
    ],
  };

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="SEARCH" title="クイックアクセス" />
        <div style={{ margin: '14px 20px 0', padding: '12px 14px', borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MU_M.goldDeep} strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M16 16 L20 20" strokeLinecap="round" /></svg>
          <div style={{ flex: 1, fontSize: 12, color: MU_M.inkMid }}>ページ、予約、ギフト、サービスを検索</div>
        </div>
        <div className="mu-hide-scrollbar" style={{ margin: '14px 20px 0', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {keywords.map((keyword) => {
            const active = keyword === activeKeyword;
            return (
              <button key={keyword} type="button" onClick={() => setActiveKeyword(keyword)} style={{ flexShrink: 0, height: 32, padding: '0 14px', borderRadius: 999, background: active ? MU_M.bgAlt : MU_M.surface, border: `0.5px solid ${active ? MU_M.hairlineStrong : MU_M.hairline}`, color: active ? MU_M.ink : MU_M.inkMid, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                {keyword}
              </button>
            );
          })}
        </div>
        <div style={{ margin: '14px 20px 0', borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, overflow: 'hidden' }}>
          {resultMap[activeKeyword].map((item, index) => (
            <button key={item.title} type="button" onClick={() => {
              if (item.mode === 'create') {
                MU_setBookingContext({ ...MU_DEFAULT_ORDER, scene: 'create', id: 'NEW-ORDER', status: 'confirmed', date: '5/28', time: '23:00' });
              }
              window.__nav?.open(item.target);
            }} style={{ width: '100%', padding: '15px 16px', display: 'flex', alignItems: 'center', gap: 12, borderTop: index > 0 ? `0.5px solid ${MU_M.hairline}` : 'none', textAlign: 'left', cursor: 'pointer' }}>
              <div style={{ width: 42, height: 42, borderRadius: 6, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MU_M.gold, fontFamily: MU_M.fontBrand, fontSize: 12 }}>{String(index + 1).padStart(2, '0')}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink }}>{item.title}</div>
                <div style={{ marginTop: 4, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.5 }}>{item.subtitle}</div>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={MU_M.inkLow} strokeWidth="1.8"><path d="M9 6 L15 12 L9 18" /></svg>
            </button>
          ))}
        </div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_MyShare() {
  const [shareState, setShareState] = useState('');
  const channels = [
    { id: 'line', label: 'LINE', sub: 'LINE友だちに送る' },
    { id: 'x', label: 'X', sub: 'タイムラインにシェア' },
    { id: 'link', label: 'リンク', sub: '招待ページURLをコピー' },
    { id: 'poster', label: '画像保存', sub: '招待ポスターを保存' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="SHARE" title="招待シェア" />

        <div style={{ margin: '14px 20px 0', padding: '22px 22px 18px', borderRadius: MU_M.r.md, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairline}` }}>
          <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 500 }}>INVITE POSTER</div>
          <div style={{ marginTop: 8, fontFamily: MU_M.fontSerif, fontSize: 18, color: MU_M.ink, lineHeight: 1.45, letterSpacing: '0.04em' }}>お気に入りのナイトスポットを友だちにシェア</div>
          <div style={{ marginTop: 8, fontFamily: MU_M.fontSerif, fontSize: 11, color: MU_M.inkMid, lineHeight: 1.75, fontWeight: 300 }}>
            友だちが会員登録、本人確認、初回来店を完了すると、招待特典と会員成長値を受け取れます。
          </div>
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: `0.5px solid ${MU_M.hairline}` }}>
            <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 500 }}>REFERRAL CODE</div>
            <div style={{ marginTop: 6, fontFamily: MU_M.fontSerif, fontSize: 28, color: MU_M.ink, letterSpacing: '0.2em', fontWeight: 400 }}>TAK10234</div>
            <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['会員登録 300PT', '初回来店 700PT', 'VIP成長値'].map((item) => (
                <div key={item} style={{ padding: '4px 10px', borderRadius: MU_M.r.pill, border: `0.5px solid ${MU_M.hairlineStrong}`, color: MU_M.goldDeep, fontFamily: MU_M.fontSerif, fontSize: 10, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{item}</div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ margin: '14px 20px 0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {channels.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setShareState(item.label)}
              style={{ padding: '16px 14px', borderRadius: MU_M.r.md, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, textAlign: 'left', cursor: 'pointer' }}
            >
              <div style={{ width: 40, height: 40, borderRadius: MU_M.r.sm, background: item.id === 'line' ? '#06C755' : item.id === 'x' ? MU_M.ink : 'transparent', border: `0.5px solid ${item.id === 'line' || item.id === 'x' ? 'transparent' : MU_M.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.id === 'line' ? (
                  <span style={{ fontFamily: MU_M.fontBrand, fontSize: 10, fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.06em' }}>LINE</span>
                ) : item.id === 'x' ? (
                  <span style={{ fontFamily: MU_M.fontBrand, fontSize: 16, fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>X</span>
                ) : item.id === 'link' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MU_M.goldDeep} strokeWidth="1.4">
                    <path d="M10 13.5 L14 9.5" strokeLinecap="round" />
                    <path d="M7.5 14.5 L5.8 16.2 A3 3 0 1 0 10 20.4 L11.8 18.6" strokeLinecap="round" />
                    <path d="M16.5 9.5 L18.2 7.8 A3 3 0 1 0 14 3.6 L12.2 5.4" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MU_M.goldDeep} strokeWidth="1.4">
                    <path d="M5 19 H19" strokeLinecap="round" />
                    <path d="M12 15 V5" strokeLinecap="round" />
                    <path d="M8.5 8.5 L12 5 L15.5 8.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div style={{ marginTop: 12, fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink, letterSpacing: '0.04em' }}>{item.label}</div>
              <div style={{ marginTop: 4, fontFamily: MU_M.fontSerif, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.5, fontWeight: 300 }}>{item.sub}</div>
            </button>
          ))}
        </div>

        <div style={{ margin: '14px 20px 0', padding: '20px 22px 18px', borderRadius: MU_M.r.md, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairline}` }}>
          <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 500 }}>SHARE LINK</div>
          <div style={{ marginTop: 10, padding: '12px 14px', borderRadius: MU_M.r.sm, background: MU_M.bg, border: `0.5px solid ${MU_M.hairline}`, fontFamily: MU_M.fontSerif, fontSize: 11, color: MU_M.inkMid, lineHeight: 1.6, letterSpacing: '0.02em' }}>
            https://muchunavi.jp/invite/TAK10234
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
            <button
              type="button"
              onClick={() => setShareState('リンクをコピーしました')}
              style={{ flex: 1, height: 40, borderRadius: MU_M.r.pill, background: 'transparent', border: `0.5px solid ${MU_M.hairlineStrong}`, color: MU_M.goldDeep, fontFamily: MU_M.fontSerif, fontSize: 11, letterSpacing: '0.08em', cursor: 'pointer' }}
            >
              リンクをコピー
            </button>
            <button
              type="button"
              onClick={() => setShareState('LINEで共有する準備ができました')}
              style={{ flex: 1.2, height: 40, borderRadius: MU_M.r.pill, background: 'transparent', border: `0.5px solid ${MU_M.gold}`, color: MU_M.goldDeep, fontFamily: MU_M.fontSerif, fontSize: 11, letterSpacing: '0.12em', fontWeight: 500, cursor: 'pointer' }}
            >
              LINEでシェア
            </button>
          </div>
          {shareState ? <div style={{ marginTop: 10, fontFamily: MU_M.fontSerif, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.04em' }}>{shareState}</div> : null}
        </div>

        <div style={{ margin: '14px 20px 0' }}>
          {[
            { title: '招待特典について', subtitle: '友だちが会員登録と初回来店を完了すると自動で特典が付与されます' },
            { title: 'シェア履歴', subtitle: '直近7日間で12回シェア、3名が新規登録しました' },
            { title: '招待ルール', subtitle: '同一端末または同一決済アカウントでの重複特典取得はできません' },
          ].map((item, index) => (
            <div key={item.title} style={{ padding: '14px 0', display: 'flex', alignItems: 'center', gap: 12, borderTop: index === 0 ? `0.5px solid ${MU_M.hairline}` : 'none', borderBottom: `0.5px solid ${MU_M.hairline}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink, letterSpacing: '0.04em' }}>{item.title}</div>
                <div style={{ marginTop: 4, fontFamily: MU_M.fontSerif, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.5, fontWeight: 300 }}>{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_MyFavorites() {
  const [items, setItems] = useState([
    { thumb: MU_BOOKING_SHOP, title: 'LOUNGE ARIA 銀座本店', subtitle: '本日 18 名出勤 · あなたから 1.2km', meta: '営業中', tag: 'HOT' },
    { thumb: 'https://images.pexels.com/photos/6266446/pexels-photo-6266446.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Club Velvet', subtitle: '今週は新イベント 2 本 · 六本木', meta: 'NEW' },
    { thumb: 'https://images.pexels.com/photos/5371577/pexels-photo-5371577.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Salon Lumiere', subtitle: '青山 / 平日コース利用可', meta: 'おすすめ' },
  ]);

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="FAVORITES" title="お気に入り店舗" />
        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairlineStrong}` }}>
          <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>SUMMARY</div>
          <div style={{ marginTop: 5, fontFamily: MU_M.fontSerif, fontSize: 18, color: MU_M.ink, letterSpacing: '0.05em' }}>お気に入り店舗は {items.length} 件、今週は 5 件の営業更新があります</div>
        </div>
        <div style={{ margin: '14px 20px 0', borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, overflow: 'hidden' }}>
          {items.map((item, index) => (
            <div key={`${item.title}-${index}`} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderTop: index > 0 ? `0.5px solid ${MU_M.hairline}` : 'none' }}>
              <MU_BookingThumb src={item.thumb} size={52} radius={10} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink, letterSpacing: '0.04em' }}>{item.title}</div>
                <div style={{ marginTop: 4, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.5 }}>{item.subtitle}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                <div style={{ fontSize: 11, color: MU_M.goldDeep, fontWeight: 700 }}>{item.meta}</div>
                <button type="button" onClick={() => setItems((prev) => prev.filter((_, i) => i !== index))} style={{ height: 24, padding: '0 10px', borderRadius: 999, background: MU_M.rougeTint, color: MU_M.rouge, fontSize: 9, fontWeight: 700, cursor: 'pointer' }}>解除</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_MyFollowing() {
  const [items, setItems] = useState(() => (window.MU_getFollowingCasts?.() || []).map((item) => ({
    thumb: item.thumb,
    title: item.fullName,
    subtitle: item.subtitle,
    meta: item.meta,
    tag: item.tag,
    cast: item,
  })));

  useEffect(() => {
    const sync = () => setItems((window.MU_getFollowingCasts?.() || []).map((item) => ({
      thumb: item.thumb,
      title: item.fullName,
      subtitle: item.subtitle,
      meta: item.meta,
      tag: item.tag,
      cast: item,
    })));
    window.addEventListener('mu-cast-following-change', sync);
    return () => window.removeEventListener('mu-cast-following-change', sync);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="FOLLOWING" title="フォロー中のキャスト" />
        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairlineStrong}` }}>
          <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>SUMMARY</div>
          <div style={{ marginTop: 5, fontFamily: MU_M.fontSerif, fontSize: 18, color: MU_M.ink, letterSpacing: '0.05em' }}>フォロー中 {items.length} 名、そのうち1名が今夜出勤</div>
        </div>
        <div style={{ margin: '14px 20px 0', borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, overflow: 'hidden' }}>
          {items.map((item, index) => (
            <div key={`${item.title}-${index}`} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderTop: index > 0 ? `0.5px solid ${MU_M.hairline}` : 'none' }}>
              <MU_BookingThumb src={item.thumb} size={52} radius={10} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink, letterSpacing: '0.04em' }}>{item.title}</div>
                <div style={{ marginTop: 4, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.5 }}>{item.subtitle}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                <div style={{ fontSize: 11, color: MU_M.goldDeep, fontWeight: 700 }}>{item.meta}</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button type="button" onClick={() => { window.MU_setCastContext?.(item.cast); window.__nav?.open('cast-detail'); }} style={{ height: 24, padding: '0 10px', borderRadius: 999, background: MU_M.bgSoft, color: MU_M.ink, fontSize: 9, fontWeight: 700, cursor: 'pointer' }}>詳細</button>
                  <button type="button" onClick={() => window.__nav?.open('chat')} style={{ height: 24, padding: '0 10px', borderRadius: 999, background: 'transparent', border: `0.5px solid ${MU_M.gold}`, color: MU_M.goldDeep, fontSize: 9, fontWeight: 700, cursor: 'pointer' }}>チャット</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_MyFollowers() {
  const items = [
    { thumb: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Takeshi', subtitle: '直近3日でギフトを2回送信 · 銀座 / 六本木をよく閲覧', meta: 'アクティブファン', tag: 'VIP' },
    { thumb: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Yuma', subtitle: '6名のキャストをフォロー中 · 今週1回来店', meta: '今週の新規', tag: 'NEW' },
    { thumb: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Kaito', subtitle: 'あなたのプロフィールとギフト動向をよく閲覧', meta: '高エンゲージ', tag: 'HOT' },
    { thumb: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Shun', subtitle: '累計ギフト ¥128,000 · 最近オンライン', meta: 'サポーター', tag: 'PT' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="FOLLOWERS" title="私のファン" />
        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairlineStrong}` }}>
          <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>SUMMARY</div>
          <div style={{ marginTop: 5, fontFamily: MU_M.fontSerif, fontSize: 18, color: MU_M.ink, letterSpacing: '0.05em' }}>あなたをフォローしているファンは14名、そのうち4名が今週アクションしています</div>
        </div>
        <div style={{ margin: '14px 20px 0', borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, overflow: 'hidden' }}>
          {items.map((item, index) => (
            <div key={`${item.title}-${index}`} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderTop: index > 0 ? `0.5px solid ${MU_M.hairline}` : 'none' }}>
              <MU_BookingThumb src={item.thumb} size={52} radius={10} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink, letterSpacing: '0.04em' }}>{item.title}</div>
                <div style={{ marginTop: 4, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.5 }}>{item.subtitle}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: MU_M.goldDeep, fontWeight: 700 }}>{item.meta}</div>
                <div style={{ marginTop: 5, fontSize: 8, color: MU_M.rouge, background: MU_M.rougeTint, padding: '2px 6px', borderRadius: 999, display: 'inline-flex' }}>{item.tag}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_MyBadges() {
  const badges = [
    { title: 'Platinum Member', sub: '累計利用額がPlatinumランクに到達', meta: 'LV.5', on: true },
    { title: 'Top Supporter', sub: '月間ギフト利用が上位10%', meta: '獲得済み', on: true },
    { title: 'Frequent Visitor', sub: '5週連続で毎週1回以上来店', meta: '2 / 5', on: false },
    { title: 'Night Explorer', sub: '10店舗のナイトスポットを解放', meta: '8 / 10', on: false },
    { title: 'Best Wingman', sub: '友だち3名の来店を達成', meta: '1 / 3', on: false },
    { title: 'Gift Collector', sub: '累計50回ギフト送信', meta: '36 / 50', on: false },
  ];

  const renderBadgeIcon = (badge) => {
    const color = badge.on ? '#1A2C31' : MU_M.goldDeep;
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M12 15l-2 5 2-1 2 1-2-5z" fill={badge.on ? color : 'none'} />
        <circle cx="12" cy="9" r="7" strokeWidth="2" />
        <path d="M12 6v6M9 9h6" strokeWidth="1.2" />
      </svg>
    );
  };

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="BADGES" title="バッジ" />
        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairlineStrong}` }}>
          <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>SUMMARY</div>
          <div style={{ marginTop: 5, fontFamily: MU_M.fontSerif, fontSize: 18, color: MU_M.ink, letterSpacing: '0.05em' }}>14個のバッジを獲得済み、次まであと2回の来店</div>
        </div>
        <div style={{ margin: '14px 20px 0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {badges.map((badge) => (
            <div key={badge.title} style={{ padding: '16px 14px', borderRadius: 8, background: badge.on ? '#FBF8F4' : MU_M.surface, border: `0.5px solid ${badge.on ? MU_M.goldLight : MU_M.hairline}`, position: 'relative', overflow: 'hidden' }}>
              {badge.on && <div style={{ position: 'absolute', top: -10, right: -10, width: 40, height: 40, background: 'radial-gradient(circle, rgba(212,188,140,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />}
              <div style={{ width: 46, height: 46, borderRadius: 23, background: badge.on ? MU_M.bgAlt : MU_M.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `0.5px solid ${badge.on ? 'transparent' : MU_M.hairlineStrong}` }}>
                {renderBadgeIcon(badge)}
              </div>
              <div style={{ marginTop: 12, fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink, letterSpacing: '0.04em' }}>{badge.title}</div>
              <div style={{ marginTop: 4, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.5 }}>{badge.sub}</div>
              <div style={{ marginTop: 8, fontSize: 10, color: badge.on ? MU_M.goldDeep : MU_M.warn, fontWeight: 700 }}>{badge.meta}</div>
            </div>
          ))}
        </div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_MyGiftRecords() {
  const presetBaseDate = new Date('2026-04-23T00:00:00');
  const giftRecords = [
    { icon: 'CH', title: 'シャンパンタワー', subtitle: '送付先 七海 Nanami · LOUNGE ARIA', amount: 58000, date: '2026-04-21', time: '23:18' },
    { icon: 'RG', title: 'ローズブーケ', subtitle: '送付先 美咲 Misaki · Club Velvet', amount: 12000, date: '2026-04-19', time: '22:04' },
    { icon: 'CR', title: 'クリスタルクラウン', subtitle: '送付先 凛 Rin · NOBLE', amount: 88000, date: '2026-04-16', time: '00:42' },
    { icon: 'HB', title: 'バースデーバルーン', subtitle: '送付先 蘭 Ran · La Rose', amount: 9800, date: '2026-04-12', time: '21:36' },
    { icon: 'VC', title: 'VIPフラワーワゴン', subtitle: '送付先 優花 Yuka · Salon Lumiere', amount: 36000, date: '2026-03-28', time: '22:09' },
    { icon: 'RG', title: 'ローズブーケ', subtitle: '送付先 美咲 Misaki · Club Velvet', amount: 12000, date: '2026-03-11', time: '21:17' },
    { icon: 'CH', title: 'シャンパンタワー', subtitle: '送付先 七海 Nanami · LOUNGE ARIA', amount: 68000, date: '2026-02-18', time: '23:02' },
    { icon: 'VC', title: 'VIPフラワーワゴン', subtitle: '送付先 優花 Yuka · Salon Lumiere', amount: 42000, date: '2025-12-30', time: '20:45' },
  ];
  const presets = [
    { id: '7d', label: '直近7日' },
    { id: 'month', label: '今月' },
    { id: 'halfyear', label: '半年' },
    { id: 'custom', label: 'カスタム' },
  ];
  const formatDateInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const shiftDays = (date, days) => {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
  };
  const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
  const initialDateFrom = formatDateInput(startOfMonth(presetBaseDate));
  const initialDateTo = formatDateInput(presetBaseDate);
  const [activePreset, setActivePreset] = useState('month');
  const [draftDateFrom, setDraftDateFrom] = useState(initialDateFrom);
  const [draftDateTo, setDraftDateTo] = useState(initialDateTo);
  const [dateFrom, setDateFrom] = useState(initialDateFrom);
  const [dateTo, setDateTo] = useState(initialDateTo);
  const [filterError, setFilterError] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const getPresetRange = (presetId) => {
    if (presetId === '7d') {
      return {
        from: formatDateInput(shiftDays(presetBaseDate, -6)),
        to: formatDateInput(presetBaseDate),
      };
    }
    if (presetId === 'month') {
      return {
        from: formatDateInput(startOfMonth(presetBaseDate)),
        to: formatDateInput(presetBaseDate),
      };
    }
    if (presetId === 'halfyear') {
      return {
        from: formatDateInput(shiftDays(presetBaseDate, -183)),
        to: formatDateInput(presetBaseDate),
      };
    }
    return {
      from: draftDateFrom,
      to: draftDateTo,
    };
  };

  const items = giftRecords.filter((item) => (!dateFrom || item.date >= dateFrom) && (!dateTo || item.date <= dateTo));
  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
  const summaryText = items.length
    ? `現在の条件で ${items.length} 件、合計 ¥${new Intl.NumberFormat('ja-JP').format(totalAmount)}`
    : '現在の条件ではギフト履歴がありません';

  const applyFilter = (presetId = activePreset) => {
    const range = getPresetRange(presetId);
    if (range.from && range.to && range.from > range.to) {
      setFilterError('開始日は終了日より前に設定してください');
      return;
    }
    setActivePreset(presetId);
    setFilterError('');
    setDateFrom(range.from);
    setDateTo(range.to);
  };

  const handlePresetClick = (presetId) => {
    setActivePreset(presetId);
    if (presetId !== 'custom') {
      const range = getPresetRange(presetId);
      setDraftDateFrom(range.from);
      setDraftDateTo(range.to);
      applyFilter(presetId);
    }
  };

  const resetFilter = () => {
    const range = getPresetRange('month');
    setActivePreset('month');
    setDraftDateFrom(range.from);
    setDraftDateTo(range.to);
    setFilterError('');
    setDateFrom(range.from);
    setDateTo(range.to);
  };

  const renderGiftIcon = () => {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={MU_M.gold} strokeWidth="1.5">
        <path d="M20 12v10H4V12M2 7h20v5H2V7zM12 22V7M12 7c-2-3-6-3-6 0 0 3 6 3 6 0zM12 7c2-3 6-3 6 0 0 3-6 3-6 0z" />
      </svg>
    );
  };

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="GIFT HISTORY" title="ギフト履歴" />
        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairlineStrong}` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>SUMMARY</div>
              <div style={{ marginTop: 6, fontSize: 10, color: MU_M.inkMid }}>
                {dateFrom || '指定なし'} 〜 {dateTo || '指定なし'}
              </div>
            </div>
            <button type="button" onClick={() => setShowFilters((prev) => !prev)} style={{ width: 34, height: 34, borderRadius: 6, background: showFilters ? MU_M.bgAlt : '#FFFFFF', border: `0.5px solid ${MU_M.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={showFilters ? '#1A2C31' : MU_M.goldDeep} strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 7h16" />
                <path d="M7 12h10" />
                <path d="M10 17h4" />
              </svg>
            </button>
          </div>
          <div style={{ marginTop: 5, fontFamily: MU_M.fontSerif, fontSize: 18, color: MU_M.ink, letterSpacing: '0.05em' }}>{summaryText}</div>
        </div>
        {showFilters ? (
          <div style={{ margin: '10px 20px 0', padding: 12, borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}` }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
              {presets.map((preset) => {
                const active = preset.id === activePreset;
                return (
                  <button key={preset.id} type="button" onClick={() => handlePresetClick(preset.id)} style={{ height: 30, borderRadius: 6, background: active ? MU_M.bgAlt : 'transparent', border: `0.5px solid ${active ? MU_M.hairlineStrong : MU_M.hairline}`, color: active ? MU_M.ink : MU_M.inkMid, fontSize: 10, fontWeight: active ? 700 : 500, cursor: 'pointer' }}>
                    {preset.label}
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, alignItems: 'end' }}>
              <div>
                <div style={{ marginBottom: 4, fontSize: 9, color: MU_M.inkMid }}>開始日</div>
                <input type="date" value={draftDateFrom} onChange={(event) => { setActivePreset('custom'); setDraftDateFrom(event.target.value); }} style={{ width: '100%', height: 36, padding: '0 10px', borderRadius: 6, background: '#FFFFFF', border: `0.5px solid ${MU_M.hairlineStrong}`, color: MU_M.ink, fontSize: 11 }} />
              </div>
              <div>
                <div style={{ marginBottom: 4, fontSize: 9, color: MU_M.inkMid }}>終了日</div>
                <input type="date" value={draftDateTo} onChange={(event) => { setActivePreset('custom'); setDraftDateTo(event.target.value); }} style={{ width: '100%', height: 36, padding: '0 10px', borderRadius: 6, background: '#FFFFFF', border: `0.5px solid ${MU_M.hairlineStrong}`, color: MU_M.ink, fontSize: 11 }} />
              </div>
              <button type="button" onClick={() => applyFilter(activePreset)} style={{ width: 72, height: 36, borderRadius: 6, background: 'transparent', border: `0.5px solid ${MU_M.gold}`, color: MU_M.goldDeep, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>検索</button>
            </div>
            {filterError ? <div style={{ marginTop: 6, fontSize: 10, color: MU_M.rouge }}>{filterError}</div> : null}
          </div>
        ) : null}
        <div style={{ margin: '14px 20px 0', borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, overflow: 'hidden' }}>
          {items.map((item, index) => (
            <div key={`${item.title}-${item.date}-${index}`} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderTop: index > 0 ? `0.5px solid ${MU_M.hairline}` : 'none' }}>
              <div style={{ width: 52, height: 52, borderRadius: 6, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {renderGiftIcon(item.icon)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink }}>{item.title}</div>
                <div style={{ marginTop: 4, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.5 }}>{item.subtitle}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: MU_M.goldDeep, fontWeight: 700 }}>¥{new Intl.NumberFormat('ja-JP').format(item.amount)}</div>
                <div style={{ marginTop: 5, fontSize: 8, color: MU_M.rouge, background: MU_M.rougeTint, padding: '2px 6px', borderRadius: 999, display: 'inline-flex' }}>{item.date.replaceAll('-', '/')} {item.time}</div>
              </div>
            </div>
          ))}
          {!items.length ? <div style={{ padding: '24px 16px', textAlign: 'center', fontSize: 11, color: MU_M.inkMid }}>現在の条件ではギフト履歴がありません</div> : null}
        </div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_MyVisitHistory() {
  const [activeTab, setActiveTab] = useState('completed');
  const visitMap = {
    completed: [
      { thumb: MU_BOOKING_SHOP, title: 'LOUNGE ARIA 銀座本店', subtitle: '2名来店 · 七海 Nanami 指名 · 2hコース', meta: '¥58,000', tag: '2026/04/20 完了' },
      { thumb: 'https://images.pexels.com/photos/6266446/pexels-photo-6266446.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Club Velvet', subtitle: '3名来店 · 指名なし · シャンパンコース', meta: '¥76,000', tag: '2026/04/13 完了' },
      { thumb: 'https://images.pexels.com/photos/5371577/pexels-photo-5371577.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Salon Lumiere', subtitle: '2名来店 · 優花 Yuka 指名 · 初回特典', meta: '¥42,000', tag: '2026/04/02 完了' },
    ],
    upcoming: [
      { thumb: MU_BOOKING_SHOP, title: 'LOUNGE ARIA 銀座本店', subtitle: '4/24 23:00 · 2名来店 · 指名 七海 Nanami', meta: '来店待ち', tag: '確定済み' },
      { thumb: 'https://images.pexels.com/photos/5371577/pexels-photo-5371577.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Salon Lumiere', subtitle: '4/27 21:30 · 3名来店 · 個室優先', meta: '支払い待ち', tag: '確認待ち' },
    ],
  };

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="VISIT HISTORY" title="来店履歴" />
        <div style={{ margin: '14px 20px 0', padding: 4, borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, display: 'flex' }}>
          {[
            { id: 'completed', label: '完了' },
            { id: 'upcoming', label: '来店待ち' },
          ].map((tab) => {
            const active = tab.id === activeTab;
            return (
              <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} style={{ flex: 1, height: 34, borderRadius: 8, background: active ? MU_M.bgAlt : 'transparent', color: active ? MU_M.ink : MU_M.inkMid, fontSize: 11, fontWeight: active ? 700 : 500, cursor: 'pointer' }}>
                {tab.label}
              </button>
            );
          })}
        </div>
        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairlineStrong}` }}>
          <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>SUMMARY</div>
          <div style={{ marginTop: 5, fontFamily: MU_M.fontSerif, fontSize: 18, color: MU_M.ink, letterSpacing: '0.05em' }}>{activeTab === 'completed' ? '直近30日で6回来店、最も多いエリアは銀座' : '現在2件の来店待ち予約があり、最短で48時間以内に開始'}</div>
        </div>
        <div style={{ margin: '14px 20px 0', borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, overflow: 'hidden' }}>
          {visitMap[activeTab].map((item, index) => (
            <div key={`${item.title}-${index}`} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderTop: index > 0 ? `0.5px solid ${MU_M.hairline}` : 'none' }}>
              <MU_BookingThumb src={item.thumb} size={52} radius={10} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink }}>{item.title}</div>
                <div style={{ marginTop: 4, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.5 }}>{item.subtitle}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: MU_M.goldDeep, fontWeight: 700 }}>{item.meta}</div>
                <div style={{ marginTop: 5, fontSize: 8, color: item.tag === '確認待ち' ? MU_M.warn : MU_M.rouge, background: item.tag === '確認待ち' ? 'rgba(195,126,72,0.14)' : MU_M.rougeTint, padding: '2px 6px', borderRadius: 999, display: 'inline-flex' }}>{item.tag}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_VerificationDocIcon({ type }) {
  return (
    <div style={{ width: 48, height: 30, borderRadius: 4, background: MU_M.bgSoft, border: `0.5px solid ${MU_M.hairlineStrong}`, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
      <div style={{ position: 'absolute', left: 5, top: 5, width: 13, height: 13, borderRadius: type === 'passport' ? 7 : 2, background: '#F0D8B8', border: '0.5px solid rgba(138,99,71,0.28)' }} />
      <div style={{ position: 'absolute', left: 22, top: 7, width: 18, height: 2, borderRadius: 2, background: 'rgba(138,99,71,0.34)' }} />
      <div style={{ position: 'absolute', left: 22, top: 13, width: 14, height: 2, borderRadius: 2, background: 'rgba(138,99,71,0.2)' }} />
      <div style={{ position: 'absolute', left: 6, right: 6, bottom: 5, height: 2, borderRadius: 2, background: type === 'number' ? 'rgba(201,122,122,0.34)' : 'rgba(138,99,71,0.18)' }} />
    </div>
  );
}

function MU_MyVerification() {
  const rows = [
    {
      id: 'card',
      title: 'クレジットカードを登録する',
      status: 'done',
      statusText: '登録済み',
      note: 'クレジットカード登録により料金が自動的に発生する事はありません。',
      target: 'mypage-payment-binding',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <rect x="3" y="6" width="18" height="13" rx="1.5" />
          <path d="M3 10h18M7 15h3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'id',
      title: '顔付き身分証明書の写真を送る',
      status: 'warn',
      statusText: '未提出',
      note: 'クレジットカードをお持ちでない場合は「muchunavi」へ顔付き身分証明書の写真を送っていただく事でご利用可能です。',
      target: 'mypage-verification-upload',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <circle cx="9" cy="11" r="2" />
          <path d="M5 17c1-2 3-3 4-3s3 1 4 3M15 9h3M15 12h3M15 15h2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="IDENTITY" title="本人確認" />

        <div style={{ margin: '8px 20px 0', fontFamily: MU_M.fontSerif, fontSize: 12, lineHeight: 1.75, letterSpacing: '0.04em', color: MU_M.inkMid }}>
          ご本人様確認のため、以下のいずれかをご登録ください。<br />
          確認完了後、すべてのサービスをご利用いただけます。
        </div>

        <div style={{ margin: '18px 20px 0' }}>
          {rows.map((r, i) => (
            <div key={r.id} style={{ borderTop: i === 0 ? `0.5px solid ${MU_M.hairline}` : 'none', borderBottom: `0.5px solid ${MU_M.hairline}` }}>
              <button
                type="button"
                onClick={() => window.__nav?.open(r.target)}
                style={{ width: '100%', padding: '16px 0', display: 'flex', alignItems: 'center', gap: 12, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <span style={{ color: MU_M.gold, flexShrink: 0 }}>{r.icon}</span>
                <span style={{ flex: 1, fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink, letterSpacing: '0.03em', fontWeight: 500 }}>{r.title}</span>
                <span style={{ fontFamily: MU_M.fontSerif, fontSize: 11, color: r.status === 'done' ? MU_M.goldDeep : MU_M.rouge, letterSpacing: '0.06em' }}>{r.statusText}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={MU_M.inkLow} strokeWidth="1.5"><path d="M9 6 L15 12 L9 18" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <div style={{ padding: '0 0 14px 32px', fontFamily: MU_M.fontSerif, fontSize: 10.5, lineHeight: 1.75, color: MU_M.inkMid, letterSpacing: '0.02em' }}>{r.note}</div>
            </div>
          ))}
        </div>

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_MyVerificationUpload() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [reviewStatus, setReviewStatus] = useState('idle');
  const [familyName, setFamilyName] = useState('田中');
  const [givenName, setGivenName] = useState('太郎');
  const uploadedCount = uploadedFiles.length;

  useEffect(() => () => {
    uploadedFiles.forEach((file) => {
      if (file.previewUrl) URL.revokeObjectURL(file.previewUrl);
    });
  }, [uploadedFiles]);

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 60 }}>
        <MU_SubpageHeader eyebrow="IDENTITY" title="著名人認証" />

        <div style={{ margin: '10px 20px 0', fontSize: 11, color: MU_M.inkMid, lineHeight: 1.7 }}>
          下記の本人確認書類をアップロードしてください。内容確認後、順次審査を進めます。
        </div>

        <div style={{ margin: '14px 20px 0', padding: '18px 16px', borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}` }}>
          <div style={{ fontSize: 11, color: MU_M.inkMid, lineHeight: 1.6 }}>有効な本人確認書類</div>
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { key: 'license', label: '運転免許証', round: false },
              { key: 'passport', label: 'パスポート', round: true },
              { key: 'number', label: 'マイナンバー', round: false },
            ].map((item) => (
              <div key={item.key} style={{ padding: '12px 8px 10px', borderRadius: 8, background: MU_M.bgSoft, border: `0.5px solid ${MU_M.hairline}`, textAlign: 'center' }}>
                <div style={{ width: 52, height: 34, margin: '0 auto', borderRadius: 8, background: '#fff', border: `0.5px solid ${MU_M.hairlineStrong}`, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', left: 6, top: 7, width: 14, height: 14, borderRadius: item.round ? 999 : 4, background: 'rgba(164,150,115,0.24)', border: '0.5px solid rgba(138,99,71,0.24)' }} />
                  <div style={{ position: 'absolute', left: 25, top: 8, width: 18, height: 2, borderRadius: 2, background: 'rgba(138,99,71,0.34)' }} />
                  <div style={{ position: 'absolute', left: 25, top: 14, width: 14, height: 2, borderRadius: 2, background: 'rgba(138,99,71,0.2)' }} />
                  <div style={{ position: 'absolute', left: 6, right: 6, bottom: 6, height: 2, borderRadius: 2, background: item.key === 'number' ? 'rgba(201,122,122,0.3)' : 'rgba(138,99,71,0.18)' }} />
                </div>
                <div style={{ marginTop: 8, fontSize: 10, color: MU_M.ink, lineHeight: 1.4 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ margin: '16px 20px 0', borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, overflow: 'hidden' }}>
          <label style={{ display: 'block', padding: '26px 18px 18px', cursor: 'pointer' }}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => {
                const nextFiles = Array.from(event.target.files || []);
                if (!nextFiles.length) return;
                setReviewStatus('idle');
                setUploadedFiles((prev) => {
                  prev.forEach((file) => {
                    if (file.previewUrl) URL.revokeObjectURL(file.previewUrl);
                  });
                  return nextFiles.map((file, index) => ({
                    id: `${file.name}-${file.size}-${index}`,
                    name: file.name,
                    previewUrl: URL.createObjectURL(file),
                  }));
                });
                event.target.value = '';
              }}
              style={{ display: 'none' }}
            />
            <div style={{ minHeight: 186, borderRadius: 8, border: `1.5px dashed ${uploadedCount ? 'rgba(201,122,122,0.28)' : 'rgba(164,150,115,0.32)'}`, background: uploadedCount ? 'linear-gradient(180deg, rgba(201,122,122,0.03) 0%, rgba(251,247,244,0.9) 100%)' : '#FCF9F6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: uploadedCount ? '16px 14px' : '24px 18px' }}>
              {uploadedCount ? (
                <>
                  <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                    {uploadedFiles.map((file) => (
                      <div key={file.id} style={{ aspectRatio: '1 / 1', borderRadius: 8, overflow: 'hidden', background: '#EFE7E0', border: `0.5px solid ${MU_M.hairlineStrong}` }}>
                        <img src={file.previewUrl} alt={file.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 14, fontSize: 11, color: MU_M.goldDeep, fontWeight: 700 }}>{uploadedCount}枚の画像を選択済み</div>
                  <div style={{ marginTop: 4, fontSize: 10, color: MU_M.inkMid }}>タップして画像を再選択</div>
                </>
              ) : (
                <>
                  <div style={{ width: 44, height: 44, borderRadius: 8, background: '#FFFFFF', border: `0.5px solid ${MU_M.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MU_M.goldDeep }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 5V19" strokeLinecap="round" />
                      <path d="M5 12H19" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div style={{ marginTop: 16, fontFamily: MU_M.fontSerif, fontSize: 17, color: MU_M.ink, letterSpacing: '0.04em' }}>本人確認書類をアップロード</div>
                  <div style={{ marginTop: 8, fontSize: 11, color: MU_M.inkMid, lineHeight: 1.7, textAlign: 'center' }}>
                    表面が鮮明に見える画像を選択してください
                    <br />
                    複数枚まとめてアップロードできます
                  </div>
                </>
              )}
            </div>
          </label>

          <div style={{ padding: '0 18px 18px', fontSize: 10, color: MU_M.inkMid, lineHeight: 1.7 }}>
            写真は自動で圧縮されます。反射やピンボケがある場合は再提出をお願いする場合があります。
          </div>
        </div>

        <div style={{ margin: '18px 16px 0', padding: '14px 14px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(226, 212, 198, 0.92)' }}>
          <div style={{ fontSize: 10, color: '#7E6B5E', fontWeight: 700, letterSpacing: '0.02em' }}>氏名</div>
          <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 8 }}>
            <input
              value={familyName}
              onChange={(event) => setFamilyName(event.target.value)}
              placeholder="姓"
              style={{ width: '100%', minWidth: 0, height: 40, borderRadius: 8, border: '1px solid rgba(230, 219, 207, 0.96)', background: '#F8F4F0', padding: '0 14px', fontSize: 14, fontWeight: 500, color: MU_M.ink, outline: 'none', boxSizing: 'border-box' }}
            />
            <input
              value={givenName}
              onChange={(event) => setGivenName(event.target.value)}
              placeholder="名"
              style={{ width: '100%', minWidth: 0, height: 40, borderRadius: 8, border: '1px solid rgba(230, 219, 207, 0.96)', background: '#F8F4F0', padding: '0 14px', fontSize: 14, fontWeight: 500, color: MU_M.ink, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginTop: 10, fontSize: 9, color: '#8F7C6F', lineHeight: 1.6 }}>
            パスポートをご利用の場合は、顔写真ページと所持人記入欄ページの両方をご提出ください。
          </div>
        </div>

        <div style={{ margin: '14px 20px 0', display: 'grid', gridTemplateColumns: '1fr auto', gap: 10, alignItems: 'center' }}>
          <div style={{ fontSize: 10, color: MU_M.inkMid, lineHeight: 1.6 }}>
            {uploadedCount ? `${uploadedCount}枚の画像を選択済みです。内容を確認して審査へ進んでください。` : '書類画像をアップロード後、審査に提出できます。'}
          </div>
          <button
            type="button"
            disabled={!uploadedCount}
            onClick={() => setReviewStatus('reviewing')}
            style={{ height: 40, padding: '0 16px', borderRadius: 8, background: 'transparent', border: `0.5px solid ${uploadedCount ? MU_M.gold : MU_M.hairline}`, color: uploadedCount ? MU_M.goldDeep : MU_M.inkLow, fontSize: 12, fontWeight: 800, cursor: uploadedCount ? 'pointer' : 'not-allowed' }}
          >
            {reviewStatus === 'reviewing' ? '審査中' : '審査に提出'}
          </button>
        </div>
        {reviewStatus === 'reviewing' ? (
          <div style={{ margin: '10px 20px 0', padding: '10px 12px', borderRadius: 6, background: 'rgba(164,150,115,0.12)', color: MU_M.goldDeep, fontSize: 11, fontWeight: 700, lineHeight: 1.6 }}>
            書類を提出しました。本人確認の審査中です。完了後、メッセージや予約関連機能をご利用いただけます。
          </div>
        ) : null}

        <div style={{ margin: '16px 20px 0', padding: 14, borderRadius: 8, background: MU_M.bgSoft, border: `0.5px solid ${MU_M.hairline}`, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.8 }}>
          <div style={{ color: MU_M.ink, fontWeight: 700 }}>本人確認書類として利用できない例</div>
          <div style={{ marginTop: 6 }}>健康保険証および健康保険資格確認書、加工済み画像、期限切れの書類</div>
        </div>
      </div>
    </div>
  );
}

function MU_MySupport() {
  const [activeChannel, setActiveChannel] = useState('chat');
  const [openFaq, setOpenFaq] = useState(0);
  const faqs = [
    { title: '予約後に来店時間を変更するには？', subtitle: '開始2時間前まで注文ページから変更申請できます', meta: '予約関連' },
    { title: 'ギフト送付先を間違えた場合は？', subtitle: '未受取のデジタルギフトはサポートで停止対応できます', meta: 'ギフト関連' },
    { title: 'クーポンが使えないのはなぜ？', subtitle: '対象店舗、最低利用額、有効期限をご確認ください', meta: 'クーポン' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="SUPPORT" title="カスタマーサポート" />
        <div style={{ margin: '14px 20px 0', padding: 4, borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, display: 'flex' }}>
          {[
            { id: 'chat', label: 'オンラインサポート' },
            { id: 'order', label: '注文対応' },
            { id: 'gift', label: 'ギフトサポート' },
          ].map((item) => {
            const active = item.id === activeChannel;
            return (
              <button key={item.id} type="button" onClick={() => setActiveChannel(item.id)} style={{ flex: 1, height: 34, borderRadius: 8, background: active ? MU_M.bgAlt : 'transparent', color: active ? MU_M.ink : MU_M.inkMid, fontSize: 11, fontWeight: active ? 700 : 500, cursor: 'pointer' }}>
                {item.label}
              </button>
            );
          })}
        </div>
        <div style={{ margin: '14px 20px 0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {[
            { id: 'chat', title: 'オンラインサポート', sub: '平均1分で応答' },
            { id: 'phone', title: '電話サポート', sub: '10:00 - 03:00' },
            { id: 'order', title: '注文専用窓口', sub: '予約変更 / キャンセル' },
            { id: 'gift', title: 'ギフトサポート', sub: '高額ギフト申請' },
          ].map((item) => (
            <button key={item.title} type="button" onClick={() => setActiveChannel(item.id)} style={{ padding: '16px 14px', borderRadius: 8, background: activeChannel === item.id ? '#FBF8F4' : MU_M.surface, border: `0.5px solid ${activeChannel === item.id ? MU_M.hairlineStrong : MU_M.hairline}`, textAlign: 'left', cursor: 'pointer' }}>
              <div style={{ fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink }}>{item.title}</div>
              <div style={{ marginTop: 6, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.5 }}>{item.sub}</div>
            </button>
          ))}
        </div>
        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairlineStrong}` }}>
          <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>CURRENT CHANNEL</div>
          <div style={{ marginTop: 5, fontFamily: MU_M.fontSerif, fontSize: 18, color: MU_M.ink }}>{activeChannel === 'phone' ? '電話サポートは現在混雑中、3分以内に接続予定です' : activeChannel === 'order' ? '注文専用窓口では日程変更、返金、来店トラブルを優先対応します' : activeChannel === 'gift' ? 'ギフトサポートでは高額ギフトや誤送信申請を優先対応します' : 'オンラインサポートは現在2名待ちです。すぐに相談を開始できます'}</div>
        </div>
        <div style={{ margin: '14px 20px 0', borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, overflow: 'hidden' }}>
          {faqs.map((item, index) => (
            <button key={item.title} type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} style={{ width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderTop: index > 0 ? `0.5px solid ${MU_M.hairline}` : 'none', textAlign: 'left', cursor: 'pointer' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink }}>{item.title}</div>
                {openFaq === index ? <div style={{ marginTop: 4, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.5 }}>{item.subtitle}</div> : null}
              </div>
              <div style={{ fontSize: 10, color: MU_M.goldDeep, fontWeight: 700 }}>{item.meta}</div>
            </button>
          ))}
        </div>
        <div style={{ margin: '14px 20px 0', height: 44, borderRadius: 8, background: 'transparent', border: `0.5px solid ${MU_M.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MU_M.goldDeep, fontSize: 12, fontWeight: 500, letterSpacing: '0.12em' }}>{activeChannel === 'phone' ? 'サポートへ発信' : 'オンライン相談を開始'}</div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_MyBusiness() {
  const [activeType, setActiveType] = useState('merchant');
  const benefits = [
    { icon: 'PR', title: 'ブランド提携', subtitle: 'コラボ企画、テーマパーティー、貸切PR' },
    { icon: 'MK', title: 'インフルエンサー施策', subtitle: '招待制訪店、コンテンツ配信、ランキング露出' },
    { icon: 'BD', title: '店舗掲載', subtitle: '店舗管理、キャスト出勤、コース設定' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="BUSINESS" title="ビジネス提携" />
        <div style={{ margin: '14px 20px 0', padding: 4, borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, display: 'flex' }}>
          {[
            { id: 'merchant', label: '店舗掲載' },
            { id: 'brand', label: 'ブランド提携' },
            { id: 'agency', label: '代理店提携' },
          ].map((item) => {
            const active = item.id === activeType;
            return (
              <button key={item.id} type="button" onClick={() => setActiveType(item.id)} style={{ flex: 1, height: 34, borderRadius: 8, background: active ? MU_M.bgAlt : 'transparent', color: active ? MU_M.ink : MU_M.inkMid, fontSize: 11, fontWeight: active ? 700 : 500, cursor: 'pointer' }}>
                {item.label}
              </button>
            );
          })}
        </div>
        <div style={{ margin: '14px 20px 0', padding: 18, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.goldDeep}` }}>
          <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldLight, letterSpacing: '0.24em' }}>MUCHU PARTNERS</div>
          <div style={{ marginTop: 6, fontFamily: MU_M.fontSerif, fontSize: 20, color: '#F6F2EF', lineHeight: 1.45 }}>{activeType === 'merchant' ? 'ナイトスポット事業者の掲載を歓迎します。予約、キャスト出勤、コースを一元管理できます。' : activeType === 'brand' ? '酒類、イベント、ライフスタイルブランド向けにコラボ露出とテーマ企画を提供します。' : '地域代理店、販路提携、ビジネス開発チームとのローカル連携を支援します。'}</div>
        </div>
        <div style={{ margin: '14px 20px 0', borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, overflow: 'hidden' }}>
          {benefits.map((item, index) => (
            <div key={item.title} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderTop: index > 0 ? `0.5px solid ${MU_M.hairline}` : 'none' }}>
              <div style={{ width: 48, height: 48, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MU_M.gold }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink }}>{item.title}</div>
                <div style={{ marginTop: 4, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.5 }}>{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: MU_M.inkMid }}>
            <span>ビジネスメール</span>
            <span style={{ color: MU_M.ink }}>bd@muchu.jp</span>
          </div>
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: MU_M.inkMid }}>
            <span>提携ホットライン</span>
            <span style={{ color: MU_M.ink }}>03-6688-1024</span>
          </div>
          <div style={{ marginTop: 14, height: 42, borderRadius: 8, background: 'transparent', border: `0.5px solid ${MU_M.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MU_M.goldDeep, fontSize: 12, fontWeight: 500, letterSpacing: '0.12em' }}>提携相談を送信</div>
        </div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_MyInvite() {
  const [inviteState, setInviteState] = useState('idle');
  const inviteCode = 'TAK10234';
  const inviteRecords = [
    { name: 'YUKA', status: '登録済み', meta: '2026/04/21 19:24', reward: '+300PT', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'MIO', status: '初回来店完了', meta: '2026/04/16 22:08', reward: '+1000PT', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'RINA', status: '初回来店待ち', meta: '2026/04/09 18:42', reward: '+300PT', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'AYA', status: '登録済み', meta: '2026/03/28 20:17', reward: '+300PT', avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=300' },
  ];
  const maskInviteName = (name) => {
    if (!name) return '';
    if (name.length <= 1) return `${name}*`;
    if (name.length === 2) return `${name[0]}*`;
    return `${name[0]}${'*'.repeat(Math.max(1, name.length - 2))}${name[name.length - 1]}`;
  };
  const qrCells = Array.from({ length: 21 * 21 }, (_, index) => {
    const row = Math.floor(index / 21);
    const col = index % 21;
    const finder = (
      (row < 7 && col < 7) ||
      (row < 7 && col > 13) ||
      (row > 13 && col < 7)
    );
    const finderRing = (
      ((row === 0 || row === 6) && ((col >= 0 && col <= 6) || (col >= 14 && col <= 20))) ||
      ((col === 0 || col === 6) && ((row >= 0 && row <= 6) || (row >= 14 && row <= 20))) ||
      ((row === 14 || row === 20) && col >= 0 && col <= 6) ||
      ((col === 14 || col === 20) && row >= 0 && row <= 6)
    );
    const finderCore = (
      ((row >= 2 && row <= 4) && (col >= 2 && col <= 4)) ||
      ((row >= 2 && row <= 4) && (col >= 16 && col <= 18)) ||
      ((row >= 16 && row <= 18) && (col >= 2 && col <= 4))
    );
    if (finder) return finderRing || finderCore;
    const seed = inviteCode.charCodeAt((row + col) % inviteCode.length);
    return ((row * 13 + col * 7 + seed) % 5) < 2;
  });

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="INVITE FRIENDS" title="友だち招待" />
        <div style={{ margin: '14px 20px 0', padding: '22px 22px 24px', borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairline}` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14 }}>
            <div>
              <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 500 }}>MUCHU INVITE POSTER</div>
              <div style={{ marginTop: 10, fontFamily: MU_M.fontSerif, fontSize: 20, color: MU_M.ink, lineHeight: 1.35, letterSpacing: '0.04em' }}>QRコードから登録</div>
            </div>
            <div style={{ padding: '4px 10px', borderRadius: 999, border: `0.5px solid ${MU_M.hairlineStrong}`, color: MU_M.goldDeep, fontFamily: MU_M.fontSerif, fontSize: 10, letterSpacing: '0.06em' }}>NEW USER +1000PT</div>
          </div>
          <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 152, height: 152, padding: 10, borderRadius: 6, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}` }}>
              <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: 'repeat(21, 1fr)', gridTemplateRows: 'repeat(21, 1fr)', gap: 1 }}>
                {qrCells.map((filled, index) => (
                  <div key={index} style={{ background: filled ? MU_M.ink : 'transparent', borderRadius: 1 }} />
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 16, fontFamily: MU_M.fontSerif, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.7, textAlign: 'center', letterSpacing: '0.08em' }}>MUCHU 厳選ナイトライフ</div>
          {inviteState !== 'idle' ? <div style={{ marginTop: 12, fontFamily: MU_M.fontSerif, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.04em', textAlign: 'center' }}>{inviteState === 'copied' ? '招待コードをコピーしました' : '共有パネルを準備しました'}</div> : null}
        </div>
        <div style={{ margin: '14px 20px 0', display: 'flex', gap: 10 }}>
          <button type="button" onClick={() => setInviteState('shared')} style={{ flex: 1, height: 42, borderRadius: 8, background: 'transparent', border: `0.5px solid ${MU_M.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MU_M.goldDeep, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>今すぐシェア</button>
          <button type="button" onClick={() => setInviteState('copied')} style={{ flex: 1, height: 42, borderRadius: 8, background: MU_M.bgSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MU_M.ink, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>アルバムに保存</button>
        </div>
        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairlineStrong}` }}>
          <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>INVITE RECORDS</div>
          <div style={{ marginTop: 6, fontFamily: MU_M.fontSerif, fontSize: 18, color: MU_M.ink, letterSpacing: '0.05em' }}>最近の招待 {inviteRecords.length} 名、累計 1,900PT</div>
        </div>
        <div style={{ margin: '14px 20px 0', borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, overflow: 'hidden' }}>
          {inviteRecords.map((item, index) => (
            <div key={`${item.name}-${item.meta}`} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderTop: index > 0 ? `0.5px solid ${MU_M.hairline}` : 'none' }}>
              <img src={item.avatar} alt="" style={{ width: 42, height: 42, borderRadius: 21, objectFit: 'cover', display: 'block', border: `0.5px solid ${MU_M.hairlineStrong}`, background: '#EFEBE7', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink }}>{maskInviteName(item.name)}</div>
                <div style={{ marginTop: 4, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.5 }}>{item.meta}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: MU_M.goldDeep, fontWeight: 700 }}>{item.reward}</div>
                <div style={{ marginTop: 4, fontSize: 9, color: item.status === '初回来店待ち' ? MU_M.warn : MU_M.inkMid }}>{item.status}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_MyRecharge() {
  const [selectedAmount, setSelectedAmount] = useState(50000);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('jcb');
  const [notice, setNotice] = useState('');
  const amounts = [
    { amount: 10000, bonus: 0, tag: 'START' },
    { amount: 30000, bonus: 1500, tag: '5% BONUS' },
    { amount: 50000, bonus: 5000, tag: '10% BONUS' },
    { amount: 100000, bonus: 15000, tag: '15% BONUS' },
    { amount: 200000, bonus: 40000, tag: '20% BONUS' },
  ];
  const methods = [
    { id: 'paypal', label: 'PayPal', desc: 'PayPalでオンライン決済' },
    { id: 'card', label: 'クレジットカード', desc: 'Visa / Mastercard などのカードに対応' },
    { id: 'bank', label: '銀行振込', desc: '振込後に入金を確認します' },
  ];
  const bankTransfer = {
    bankName: 'GMOあおぞらネット銀行',
    branchName: '法人第二営業部支店（102）',
    accountType: '普通',
    accountNumber: '1481443',
    accountName: 'カ）トシクリヤンス',
    transferCode: '46733564',
  };

  const renderPaymentIcon = (id, active) => {
    const color = active ? '#1A2C31' : MU_M.goldDeep;
    if (id === 'paypal') {
      return (
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
          <path d="M15 38 L20 10 H31 C37 10 40 13 39 18 C38 25 33 28 26 28 H21 L19 38 H15 Z" stroke={color} strokeWidth="3" strokeLinejoin="round" />
          <path d="M20 32 H27 C33 32 36 29 37 23" stroke={color} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    }
    if (id === 'card') {
      return (
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
          <path d="M4 12h40v24H4V12z" fill="none" stroke={color} strokeWidth="3" />
          <path d="M4 21h40" stroke={color} strokeWidth="3" />
          <path d="M12 29h10M28 29h6" stroke={color} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    }
    if (id === 'applepay') {
      return (
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
          <path d="M4 12h40v24H4V12z" fill="none" stroke={color} strokeWidth="3" />
          <circle cx="24" cy="24" r="8" stroke={color} strokeWidth="3" />
          <path d="M24 20v8M20 24h8" stroke={color} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    }
    if (id === 'bank') {
      return (
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
          <path d="M6 20h36L24 8 6 20z" stroke={color} strokeWidth="3" strokeLinejoin="round" />
          <path d="M10 22v14M18 22v14M30 22v14M38 22v14M6 38h36" stroke={color} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    }
    return <span style={{ fontSize: 10, fontWeight: 900 }}>{id.toUpperCase()}</span>;
  };
  const getBonusForAmount = (amount) => {
    if (amount >= 300000) return 75000;
    if (amount >= 200000) return 40000;
    if (amount >= 100000) return 15000;
    if (amount >= 50000) return 5000;
    if (amount >= 30000) return 1500;
    return 0;
  };
  const customAmountValue = Math.max(0, Number(customAmount.replace(/[^\d]/g, '')) || 0);
  const actualAmount = selectedAmount === 'custom' ? customAmountValue : selectedAmount;
  const customAmountError = selectedAmount === 'custom'
    ? (customAmountValue <= 0
      ? `最小チャージ金額は ¥${new Intl.NumberFormat('ja-JP').format(MU_RECHARGE_MIN_AMOUNT)} です`
      : customAmountValue < MU_RECHARGE_MIN_AMOUNT
        ? `¥${new Intl.NumberFormat('ja-JP').format(MU_RECHARGE_MIN_AMOUNT)} 以上の金額を入力してください`
        : '')
    : '';
  const rechargeDisabled = selectedAmount === 'custom' && !!customAmountError;
  const total = selectedAmount === 'custom'
    ? { amount: actualAmount, bonus: getBonusForAmount(actualAmount), tag: 'CUSTOM' }
    : (amounts.find((item) => item.amount === selectedAmount) || amounts[0]);
  const records = MU_RECHARGE_RECORDS;

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 124 }}>
        <MU_SubpageHeader eyebrow="RECHARGE" title="チャージ" />

        <div style={{ margin: '14px 20px 0', padding: 18, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.goldDeep}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldLight, letterSpacing: '0.24em' }}>MUCHU PT WALLET</div>
            <button type="button" onClick={() => window.__nav?.open('mypage-recharge-records')} style={{ height: 28, padding: '0 10px', borderRadius: 999, background: 'rgba(251,247,244,0.12)', border: '0.5px solid rgba(251,247,244,0.16)', color: '#F6F2EF', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>チャージ明細</button>
          </div>
          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, color: 'rgba(251,247,244,0.72)', letterSpacing: '0.12em' }}>現在の残高</div>
              <div style={{ marginTop: 4, fontFamily: MU_M.fontSerif, fontSize: 28, color: MU_M.gold, letterSpacing: '0.05em' }}>128,450 PT</div>
            </div>
            <div style={{ padding: '6px 10px', borderRadius: 999, background: 'rgba(251,247,244,0.12)', border: '0.5px solid rgba(251,247,244,0.16)', fontSize: 10, color: '#F6F2EF' }}>
              チャージ {new Intl.NumberFormat('ja-JP').format(total.amount)} 円
            </div>
          </div>
          <div style={{ marginTop: 12, fontSize: 11, color: 'rgba(251,247,244,0.78)', lineHeight: 1.7 }}>
            チャージ後は予約、コース、ギフトの支払いに利用できます。現在のプランでは <span style={{ color: MU_M.gold, fontWeight: 700 }}>{new Intl.NumberFormat('ja-JP').format(total.amount + total.bonus)} PT</span> が反映予定です。
          </div>
          {notice ? <div style={{ marginTop: 10, display: 'inline-flex', padding: '4px 10px', borderRadius: 999, background: 'rgba(251,247,244,0.16)', color: '#F6F2EF', fontSize: 10, fontWeight: 700 }}>{notice}</div> : null}
        </div>

        <div style={{ margin: '14px 20px 0' }}>
          <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>SELECT AMOUNT</div>
          <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {amounts.map((item) => {
              const active = item.amount === selectedAmount;
              return (
                <button
                  key={item.amount}
                  type="button"
                  onClick={() => setSelectedAmount(item.amount)}
                  style={{ padding: '14px 14px 12px', borderRadius: 8, background: active ? '#FBF8F4' : MU_M.surface, border: `0.5px solid ${active ? MU_M.hairlineStrong : MU_M.hairline}`, textAlign: 'left', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontFamily: MU_M.fontSerif, fontSize: 18, color: MU_M.ink }}>¥{new Intl.NumberFormat('ja-JP').format(item.amount)}</div>
                    <div style={{ padding: '2px 8px', borderRadius: 999, background: active ? MU_M.bgAlt : 'transparent', color: active ? '#1A2C31' : MU_M.goldDeep, fontSize: 8, fontWeight: 700, letterSpacing: '0.08em' }}>{item.tag}</div>
                  </div>
                  <div style={{ marginTop: 6, fontSize: 10, color: MU_M.inkMid }}>ボーナス {new Intl.NumberFormat('ja-JP').format(item.bonus)} PT</div>
                  <div style={{ marginTop: 8, height: 4, borderRadius: 999, background: MU_M.bgSoft, overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(100, 24 + item.bonus / 800)}%`, height: '100%', background: MU_M.gold }} />
                  </div>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setSelectedAmount('custom')}
              style={{ padding: '14px 14px 12px', borderRadius: 8, background: selectedAmount === 'custom' ? '#FBF8F4' : MU_M.surface, border: `0.5px solid ${selectedAmount === 'custom' ? MU_M.hairlineStrong : MU_M.hairline}`, textAlign: 'left', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <div style={{ fontFamily: MU_M.fontSerif, fontSize: 18, color: MU_M.ink }}>任意金額</div>
                <div style={{ padding: '2px 8px', borderRadius: 999, background: 'transparent', border: `0.5px solid ${selectedAmount === 'custom' ? MU_M.gold : MU_M.hairline}`, color: MU_M.goldDeep, fontSize: 8, fontWeight: 700, letterSpacing: '0.08em' }}>INPUT</div>
              </div>
              <div style={{ marginTop: 6, fontSize: 10, color: MU_M.inkMid }}>1,000 円以上の任意金額を自由入力</div>
            </button>
          </div>
        </div>

        {selectedAmount === 'custom' ? (
          <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}` }}>
            <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>CUSTOM AMOUNT</div>
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10, height: 48, padding: '0 14px', borderRadius: 8, background: '#FFFFFF', border: `0.5px solid ${MU_M.hairlineStrong}` }}>
              <div style={{ fontFamily: MU_M.fontSerif, fontSize: 20, color: MU_M.goldDeep }}>¥</div>
              <input
                value={customAmount}
                onChange={(event) => setCustomAmount(event.target.value.replace(/[^\d]/g, ''))}
                inputMode="numeric"
                placeholder={String(MU_RECHARGE_MIN_AMOUNT)}
                style={{ flex: 1, minWidth: 0, fontSize: 18, color: MU_M.ink, fontFamily: MU_M.fontSerif, background: 'transparent' }}
              />
            </div>
            <div style={{ marginTop: 8, fontSize: 10, color: customAmountError ? MU_M.rouge : MU_M.inkMid, lineHeight: 1.6 }}>
              {customAmountError || `最小チャージ金額は ¥${new Intl.NumberFormat('ja-JP').format(MU_RECHARGE_MIN_AMOUNT)} です。50,000円以上で 5,000 PT、100,000円以上で 15,000 PT、300,000円以上で 75,000 PT を付与します。`}
            </div>
          </div>
        ) : null}

        <div style={{ margin: '14px 20px 0', borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px 10px', fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>PAYMENT METHOD</div>
          {methods.map((method, index) => {
            const active = method.id === selectedMethod;
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => setSelectedMethod(method.id)}
                style={{ width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderTop: index > 0 ? `0.5px solid ${MU_M.hairline}` : 'none', textAlign: 'left', cursor: 'pointer' }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 8, background: '#FFFFFF', border: `0.5px solid ${active ? MU_M.gold : MU_M.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s ease' }}>
                  {renderPaymentIcon(method.id, active)}
                </div>
                <div style={{ flex: 1, marginLeft: 2 }}>
                  <div style={{ fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink, fontWeight: 700, letterSpacing: '0.02em' }}>{method.label}</div>
                  <div style={{ marginTop: 4, fontSize: 11, color: MU_M.inkMid, lineHeight: 1.5, opacity: 0.8 }}>{method.desc}</div>
                </div>
                <div style={{ width: 22, height: 22, borderRadius: 11, border: `1.5px solid ${active ? MU_M.goldDeep : MU_M.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: active ? 'transparent' : '#F6F2EF' }}>
                  {active ? <div style={{ width: 10, height: 10, borderRadius: 999, background: MU_M.goldDeep }} /> : null}
                </div>
              </button>
            );
          })}
        </div>

        {selectedMethod === 'bank' ? (
          <div style={{ margin: '14px 20px 0', borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', background: MU_M.bgSoft, borderBottom: `0.5px solid ${MU_M.hairline}` }}>
              <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>BANK TRANSFER</div>
              <div style={{ marginTop: 4, fontFamily: MU_M.fontSerif, fontSize: 16, color: MU_M.ink }}>銀行振込情報</div>
            </div>
            {[
              ['銀行名', bankTransfer.bankName],
              ['支店名', bankTransfer.branchName],
              ['口座種別', bankTransfer.accountType],
              ['口座番号', bankTransfer.accountNumber],
              ['口座名義', bankTransfer.accountName],
            ].map(([label, value], index) => (
              <div key={label} style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', gap: 12, borderTop: index > 0 ? `0.5px solid ${MU_M.hairline}` : 'none' }}>
                <div style={{ fontSize: 11, color: MU_M.inkMid }}>{label}</div>
                <div style={{ fontSize: 11, color: MU_M.ink, fontWeight: 700, textAlign: 'right' }}>{value}</div>
              </div>
            ))}

            <div style={{ marginTop: 6, background: '#2E383B', color: '#FFFFFF', textAlign: 'center', padding: '10px 16px', fontSize: 12, fontWeight: 800 }}>振込金額</div>
            <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 11, color: MU_M.inkMid }}>お振込み金額</div>
              <div style={{ fontFamily: MU_M.fontSerif, fontSize: 18, color: MU_M.ink, fontWeight: 700 }}>{new Intl.NumberFormat('ja-JP').format(total.amount)}円</div>
            </div>
            <div style={{ margin: '0 16px 14px', padding: '10px 12px', borderRadius: 6, background: 'rgba(201,122,122,0.08)', border: `0.5px solid ${MU_M.rougeSoft}`, fontSize: 10, color: MU_M.rouge, lineHeight: 1.6 }}>
              振込名義には必ず「{bankTransfer.transferCode}」をご記入ください。未記入の場合、自動で入金確認できないことがあります。
            </div>

            <div style={{ background: '#2E383B', color: '#FFFFFF', textAlign: 'center', padding: '10px 16px', fontSize: 12, fontWeight: 800 }}>ご注意</div>
            <div style={{ padding: '12px 16px 14px', display: 'grid', gap: 8 }}>
              {[
                `振込名義には ${bankTransfer.transferCode} を入力してください`,
                '振込完了後は振込明細を保管してください',
                '銀行振込手数料はお客様負担です',
                '入金確認後、チャージ残高へ反映されます',
                '情報に誤りがある場合や長時間反映されない場合はサポートへご連絡ください',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: 8, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.6 }}>
                  <span style={{ color: MU_M.goldDeep, fontWeight: 900 }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div style={{ margin: '14px 20px 0', borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px 10px', fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>RECENT RECHARGES</div>
          {records.map((item, index) => (
            <div key={`${item.date}-${index}`} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderTop: index > 0 ? `0.5px solid ${MU_M.hairline}` : 'none' }}>
              <MU_FinanceIcon type={item.type} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: MU_M.ink, fontWeight: 700 }}>{item.title}</div>
                <div style={{ marginTop: 4, fontFamily: MU_M.fontSerif, fontSize: 14, color: item.direction === 'minus' ? '#D65353' : MU_M.ink }}>{item.direction === 'minus' ? '-' : '+'}{new Intl.NumberFormat('ja-JP').format(item.amount)}</div>
                <div style={{ marginTop: 4, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.5 }}>{item.date.replaceAll('-', '/')} {item.time} · ボーナス +{new Intl.NumberFormat('ja-JP').format(item.bonus)} PT</div>
              </div>
              <div style={{ fontSize: 10, color: MU_M.goldDeep, fontWeight: 700 }}>{item.status}</div>
            </div>
          ))}
        </div>

        <div style={{ height: 20 }} />
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 20px calc(env(safe-area-inset-bottom, 0px) + 12px)', background: 'linear-gradient(180deg, rgba(251,247,244,0) 0%, rgba(251,247,244,0.94) 20%, rgba(251,247,244,0.98) 100%)' }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" onClick={() => window.__nav?.open('mypage-support')} style={{ flex: 1, height: 42, borderRadius: 8, background: MU_M.bgSoft, color: MU_M.ink, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>チャージヘルプ</button>
          <button
            type="button"
            disabled={rechargeDisabled}
            onClick={() => setNotice(selectedMethod === 'bank' ? `銀行振込情報を発行しました：${bankTransfer.transferCode}` : `¥${new Intl.NumberFormat('ja-JP').format(total.amount)} をチャージ`)}
            style={{ flex: 1.4, height: 42, borderRadius: 8, background: 'transparent', border: `0.5px solid ${rechargeDisabled ? MU_M.hairline : MU_M.gold}`, color: rechargeDisabled ? MU_M.inkLow : MU_M.goldDeep, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', cursor: rechargeDisabled ? 'not-allowed' : 'pointer' }}
          >
            {selectedMethod === 'bank' ? '振込情報を発行' : '今すぐチャージ'}
          </button>
        </div>
      </div>
    </div>
  );
}

function MU_MyRechargeRecords() {
  const initialDateFrom = '2026-01-01';
  const initialDateTo = '2026-12-31';
  const [draftDateFrom, setDraftDateFrom] = useState(initialDateFrom);
  const [draftDateTo, setDraftDateTo] = useState(initialDateTo);
  const [dateFrom, setDateFrom] = useState(initialDateFrom);
  const [dateTo, setDateTo] = useState(initialDateTo);
  const [filterError, setFilterError] = useState('');

  const items = MU_RECHARGE_RECORDS.filter((item) => (!dateFrom || item.date >= dateFrom) && (!dateTo || item.date <= dateTo));

  const applyFilter = () => {
    if (draftDateFrom && draftDateTo && draftDateFrom > draftDateTo) {
      setFilterError('開始日は終了日以前に設定してください');
      return;
    }
    setFilterError('');
    setDateFrom(draftDateFrom);
    setDateTo(draftDateTo);
  };

  const resetFilter = () => {
    setFilterError('');
    setDraftDateFrom(initialDateFrom);
    setDraftDateTo(initialDateTo);
    setDateFrom(initialDateFrom);
    setDateTo(initialDateTo);
  };

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="RECHARGE LOGS" title="チャージ明細" />

        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairlineStrong}` }}>
          <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>DATE FILTER</div>
          <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <div style={{ marginBottom: 6, fontSize: 10, color: MU_M.inkMid }}>開始日</div>
              <input type="date" value={draftDateFrom} onChange={(event) => setDraftDateFrom(event.target.value)} style={{ width: '100%', height: 42, padding: '0 12px', borderRadius: 6, background: '#FFFFFF', border: `0.5px solid ${MU_M.hairlineStrong}`, color: MU_M.ink, fontSize: 12 }} />
            </div>
            <div>
              <div style={{ marginBottom: 6, fontSize: 10, color: MU_M.inkMid }}>終了日</div>
              <input type="date" value={draftDateTo} onChange={(event) => setDraftDateTo(event.target.value)} style={{ width: '100%', height: 42, padding: '0 12px', borderRadius: 6, background: '#FFFFFF', border: `0.5px solid ${MU_M.hairlineStrong}`, color: MU_M.ink, fontSize: 12 }} />
            </div>
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
            <button type="button" onClick={resetFilter} style={{ flex: 1, height: 40, borderRadius: 6, background: MU_M.bgSoft, color: MU_M.ink, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>リセット</button>
            <button type="button" onClick={applyFilter} style={{ flex: 1.2, height: 40, borderRadius: 6, background: 'transparent', border: `0.5px solid ${MU_M.gold}`, color: MU_M.goldDeep, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>検索</button>
          </div>
          {filterError ? <div style={{ marginTop: 8, fontSize: 10, color: MU_M.rouge }}>{filterError}</div> : null}
          <div style={{ marginTop: 10, fontSize: 11, color: MU_M.inkMid }}>現在 {items.length} 件のチャージ履歴があります</div>
        </div>

        <div style={{ margin: '14px 20px 0', borderRadius: 8, background: MU_M.surface, border: `0.5px solid ${MU_M.hairline}`, overflow: 'hidden' }}>
          {items.map((item, index) => (
            <button
              key={`${item.date}-${item.time}-${index}`}
              type="button"
              onClick={() => {
                MU_setFinanceDetailContext({
                  ...item,
                  direction: item.direction || (item.type === 'charge' || item.type === 'award' || item.type === 'coin' ? 'plus' : 'minus'),
                  detailTag: item.type === 'coin' ? '有償ポイント消費' : item.type === 'gift' ? 'ギフト利用' : item.type === 'purchase' ? 'オンライン決済' : item.type === 'store' ? '店舗決済' : item.type === 'award' ? '特典付与' : 'チャージ反映',
                  transactionId: `TXN${item.date.replaceAll('-', '')}${item.time.replace(':', '')}${String(index + 1).padStart(3, '0')}`,
                  balanceAfter: 123450 + (index * 3150),
                  note: item.type === 'coin' ? 'お買い物にて有償ポイントを利用しました。ご利用いただきありがとうございます。' : item.type === 'charge' ? 'チャージ申請が正常に完了し、残高へ反映されました。' : `${item.title} の明細です。ご利用内容をご確認ください。`,
                  shopName: item.type === 'purchase' ? 'MUCHU STORE 渋谷店' : item.type === 'store' ? 'LOUNGE ARIA 銀座本店' : 'MUCHU OFFICIAL',
                  productName: item.type === 'purchase' ? 'MUCHUオリジナルTシャツ（ブラック）' : item.type === 'gift' ? 'デジタルギフト送付' : item.type === 'store' ? '来店利用お支払い' : item.type === 'charge' ? 'アプリ内チャージ' : `${item.title} 明細`,
                });
                window.__nav?.open('mypage-finance-detail');
              }}
              style={{ width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderTop: index > 0 ? `0.5px solid ${MU_M.hairline}` : 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer' }}
            >
              <MU_FinanceIcon type={item.type} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: MU_M.ink, fontWeight: 700 }}>{item.title}</div>
                <div style={{ marginTop: 4, fontFamily: MU_M.fontSerif, fontSize: 14, color: item.direction === 'minus' ? '#D65353' : MU_M.ink }}>{item.direction === 'minus' ? '-' : '+'}{new Intl.NumberFormat('ja-JP').format(item.amount)}</div>
                <div style={{ marginTop: 4, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.5 }}>{item.date.replaceAll('-', '/')} {item.time} · {item.method} · ボーナス +{new Intl.NumberFormat('ja-JP').format(item.bonus)} PT</div>
              </div>
              <div style={{ fontSize: 10, color: MU_M.goldDeep, fontWeight: 700 }}>{item.status}</div>
            </button>
          ))}
        </div>

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_MyFinanceDetail() {
  const detail = MU_getFinanceDetailContext();
  const amountColor = detail.direction === 'minus' ? '#E44848' : MU_M.ink;
  const amountPrefix = detail.direction === 'minus' ? '-' : '+';

  return (
    <div style={{ width: '100%', height: '100%', background: '#F6F2EF', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -110, left: -36, width: 280, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(210, 158, 158, 0.38) 0%, rgba(210, 158, 158, 0.14) 42%, transparent 74%)', filter: 'blur(10px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: -90, right: -54, width: 260, height: 210, borderRadius: '50%', background: 'radial-gradient(circle, rgba(214, 178, 161, 0.28) 0%, rgba(214, 178, 161, 0.12) 48%, transparent 76%)', filter: 'blur(14px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 28 }}>
        <div style={{ paddingTop: MU_TOP_SPACING }}>
          <div style={{ padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8F6B56" strokeWidth="2" style={{ cursor: 'pointer' }} onClick={() => window.__nav?.back()}><path d="M15 6 L9 12 L15 18" strokeLinecap="round" /></svg>
            <div style={{ flex: 1, textAlign: 'center', fontFamily: MU_M.fontSerif, fontSize: 17, color: '#6D4F41', letterSpacing: '0.04em' }}>決済履歴詳細</div>
            <div style={{ width: 18 }} />
          </div>
        </div>

        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <MU_FinanceIcon type={detail.type} />
          <div style={{ marginTop: 14, fontFamily: MU_M.fontSerif, fontSize: 18, color: MU_M.ink, fontWeight: 700 }}>{detail.title}</div>
          <div style={{ marginTop: 8, height: 22, padding: '0 12px', borderRadius: 999, background: 'rgba(221, 174, 188, 0.48)', color: '#D89E9E', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center' }}>{detail.detailTag}</div>
        </div>

        <div style={{ margin: '18px 20px 0', borderRadius: 8, background: '#FBF8F4', border: '1px solid rgba(231, 220, 209, 0.96)', overflow: 'hidden' }}>
          {[
            ['消費ポイント', <span style={{ fontFamily: MU_M.fontSerif, fontSize: 18, color: amountColor, fontWeight: 700 }}>{amountPrefix}{new Intl.NumberFormat('ja-JP').format(detail.amount)} <span style={{ fontSize: 11 }}>PT</span></span>],
            ['ステータス', <span style={{ height: 24, padding: '0 10px', borderRadius: 999, background: '#8F6B56', color: '#FFFFFF', fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center' }}>{detail.status}</span>],
            ['日時', `${detail.date.replaceAll('-', '/')} ${detail.time}`],
            ['決済方法', detail.method],
            ['取引ID', detail.transactionId],
            ['利用後ポイント残高', `${new Intl.NumberFormat('ja-JP').format(detail.balanceAfter)} PT`],
          ].map(([label, value], index) => (
            <div key={label} style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, borderTop: index > 0 ? '1px solid rgba(239, 231, 223, 0.94)' : 'none' }}>
              <div style={{ fontSize: 11, color: '#5A473D', fontWeight: 700 }}>{label}</div>
              <div style={{ fontSize: 11, color: MU_M.ink, textAlign: 'right' }}>{value}</div>
            </div>
          ))}
          <div style={{ padding: '14px 20px 18px', borderTop: '1px solid rgba(239, 231, 223, 0.94)' }}>
            <div style={{ fontSize: 11, color: '#5A473D', fontWeight: 700 }}>詳細</div>
            <div style={{ marginTop: 10, fontSize: 11, color: MU_M.ink, lineHeight: 1.9 }}>{detail.note}</div>
          </div>
        </div>

        <div style={{ margin: '14px 20px 0', borderRadius: 8, background: '#FBF8F4', border: '1px solid rgba(231, 220, 209, 0.96)', overflow: 'hidden' }}>
          <div style={{ margin: '12px 12px 0', height: 36, borderRadius: 6, background: '#F6F0EA', display: 'flex', alignItems: 'center', padding: '0 14px', fontSize: 12, color: '#5A473D', fontWeight: 800 }}>ご利用内容</div>
          {[
            ['利用店舗', detail.shopName],
            ['商品名', detail.productName],
            ['利用金額', `${new Intl.NumberFormat('ja-JP').format(detail.amount)}`],
            ['利用ポイント', `${new Intl.NumberFormat('ja-JP').format(detail.amount)} PT`],
          ].map(([label, value], index) => (
            <div key={label} style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, borderTop: index > 0 ? '1px solid rgba(239, 231, 223, 0.94)' : 'none' }}>
              <div style={{ fontSize: 11, color: '#5A473D', fontWeight: 700 }}>{label}</div>
              <div style={{ fontSize: 11, color: MU_M.ink, textAlign: 'right' }}>{value}</div>
            </div>
          ))}
        </div>

        <button type="button" onClick={() => window.__nav?.back()} style={{ margin: '18px 20px 0', width: 'calc(100% - 40px)', height: 40, borderRadius: 999, background: '#FFFFFF', color: '#6D4F41', fontSize: 12, fontWeight: 800, cursor: 'pointer', border: '1px solid rgba(176, 124, 93, 0.7)' }}>一覧に戻る</button>
      </div>
    </div>
  );
}

function MU_MySettings() {
  const [deleteArmed, setDeleteArmed] = useState(false);
  const rows = [
    {
      id: 'support',
      label: 'カスタマーサポート',
      target: 'mypage-support',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M21 12c0-5-4-9-9-9s-9 4-9 9v5a2 2 0 0 0 2 2h2v-7H5M21 12v5a2 2 0 0 1-2 2h-2v-7h2" strokeLinejoin="round" />
          <path d="M12 19v1c0 1 1 2 2 2h3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'business',
      label: 'ビジネス提携',
      target: 'mypage-business',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M4 9h16v11H4zM9 9V5h6v4M2 13h20" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'phone',
      label: 'ログイン・携帯番号変更',
      target: 'mypage-phone-change',
      value: '090-****-1234',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <rect x="6" y="2" width="12" height="20" rx="2" />
          <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="SETTINGS" title="設定" />

        <div style={{ margin: '14px 20px 0' }}>
          {rows.map((r, i) => (
            <button
              key={r.id}
              type="button"
              onClick={() => window.__nav?.open(r.target)}
              style={{ width: '100%', padding: '16px 0', display: 'flex', alignItems: 'center', gap: 12, background: 'transparent', border: 'none', borderTop: i === 0 ? `0.5px solid ${MU_M.hairline}` : 'none', borderBottom: `0.5px solid ${MU_M.hairline}`, cursor: 'pointer', textAlign: 'left' }}
            >
              <span style={{ color: MU_M.gold, flexShrink: 0 }}>{r.icon}</span>
              <span style={{ flex: 1, fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink, letterSpacing: '0.03em', fontWeight: 500 }}>{r.label}</span>
              {r.value ? <span style={{ fontFamily: MU_M.fontSerif, fontSize: 11, color: MU_M.inkMid, letterSpacing: '0.06em' }}>{r.value}</span> : null}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={MU_M.inkLow} strokeWidth="1.5"><path d="M9 6 L15 12 L9 18" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setDeleteArmed((v) => !v)}
          style={{ margin: '24px 20px 0', width: 'calc(100% - 40px)', padding: '18px 0', borderTop: `0.5px solid ${MU_M.hairline}`, borderBottom: `0.5px solid ${MU_M.hairline}`, borderLeft: 'none', borderRight: 'none', background: deleteArmed ? MU_M.rougeTint : 'transparent', color: MU_M.rouge, fontFamily: MU_M.fontSerif, fontSize: 13, letterSpacing: '0.25em', cursor: 'pointer' }}
        >
          {deleteArmed ? 'もう一度押して账号注销を確定' : '账号注销'}
        </button>
        {deleteArmed ? (
          <div style={{ margin: '10px 20px 0', fontFamily: MU_M.fontSerif, fontSize: 10.5, lineHeight: 1.75, color: MU_M.inkMid, letterSpacing: '0.02em' }}>
            注销账号后,残高ポイント · クーポン · 履歴 · 認証情報はすべて永久に消去され、復元できません。
          </div>
        ) : null}

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

const MU_BENEFIT_TIERS = [
  { id: 'welcome', name: 'MUCHUNAVI WELCOME', shortName: 'WELCOME', lvRange: 'Lv.1-13', exp: '544,000', mark: '達成' },
  { id: 'repeater', name: 'MUCHUNAVI リピーター', shortName: 'リピーター', lvRange: 'Lv.14-26', exp: '1,792,000', mark: '達成' },
  { id: 'platinum', name: 'MUCHUNAVI プラチナ', shortName: 'プラチナ', lvRange: 'Lv.27-39', exp: '8,000,000', mark: '達成' },
  { id: 'thevip', name: 'MUCHUNAVI THE VIP', shortName: 'THE VIP', lvRange: 'Lv.40-52', exp: '32,000,000', mark: '達成' },
  { id: 'thevipplus', name: 'MUCHUNAVI THE VIP+', shortName: 'THE VIP+', lvRange: 'Lv.53-64', exp: '80,000,000', mark: '達成' },
  { id: 'owner', name: 'MUCHUNAVI オーナー', shortName: 'オーナー', lvRange: 'Lv.65-76', exp: '160,000,000', mark: '達成' },
  { id: 'gm', name: 'MUCHUNAVI グランドマスター', shortName: 'グランドマスター', lvRange: 'Lv.77 / 77', exp: '160,000,000', mark: 'MAX 達成' },
];

const MU_BENEFIT_DEFS = [
  { name: '購入ボーナス', sub: 'ポイント購入で、無償ポイントも一緒に獲得。' },
  { name: '毎月限定ポイント', sub: 'キープ条件クリアで、翌月10日に付与' },
  { name: 'ランクアップ特典' },
  { name: 'ランキングブースト', sub: 'ギフトランキング集計倍率アップ' },
  { name: 'ホームテロップバッジ', sub: 'ギフトを送るとホーム上部へアイコンを表示' },
  { name: 'ランクアイコンエフェクト', sub: 'プロフィールやチャット画面が華やかに変化' },
  { name: 'ギフトエフェクト', sub: 'ギフト送信時の演出がもっと豪華にグレードアップ' },
  { name: '専属コンシェルジュ', sub: 'お困りごとはいつでも優先窓口でおまかせ' },
  { name: '送迎サービス', sub: '指定エリア内・無料' },
  { name: '店舗予約代行', sub: 'コンシェルジュにおまかせで簡単予約' },
  { name: '公式アドバイザー相談', sub: '運営スタッフとの定期面談' },
  { name: '年次最高位感謝ギフト', sub: '年に一度の特別贈呈' },
  { name: '専用カスタムギフト', sub: '最高ランク限定のオーダーメイド 3D ギフト' },
  { name: 'マンスリー無料ギフト', sub: 'お気に入りのキャストへプレゼント' },
  { name: '特典クーポン', sub: '店舗ページから今すぐGET', tierPrefix: true },
  { name: 'muchuポン', sub: 'キャストとのチャット画面で購入できる', tierPrefix: true, suffixForm: true },
  { name: '店舗イベント招待状', sub: '優先招待・限定枠' },
];

const MU_BENEFIT_MATRIX = [
  [{t:'val',v:'+3%'},{t:'val',v:'+6%'},{t:'val',v:'+9%'},{t:'val',v:'+12%'},{t:'val',v:'+15%'},{t:'val',v:'+17%'},{t:'val',v:'+18%'}],
  [{t:'lock',v:'リピーター'},{t:'claim',v:'12,000 PT'},{t:'claim',v:'38,000 PT'},{t:'claim',v:'77,000 PT'},{t:'claim',v:'118,000 PT'},{t:'claim',v:'220,000 PT'},{t:'claim',v:'390,000 PT',hasKeep:true}],
  [{t:'lock',v:'リピーター'},{t:'claim',v:'1,050 PT',doneText:'GET済み'},{t:'claim',v:'4,500 PT',doneText:'GET済み'},{t:'claim',v:'24,000 PT',doneText:'GET済み'},{t:'claim',v:'96,000 PT',doneText:'GET済み'},{t:'claim',v:'240,000 PT',doneText:'GET済み'},{t:'claim',v:'480,000 PT',doneText:'GET済み'}],
  [{t:'val',v:'×1.0'},{t:'val',v:'×1.1'},{t:'val',v:'×1.3'},{t:'val',v:'×1.6'},{t:'val',v:'×2.0'},{t:'val',v:'×2.5'},{t:'val',v:'×3.0'}],
  [{t:'lock',v:'リピーター'},{t:'switch'},{t:'switch'},{t:'switch'},{t:'switch'},{t:'switch'},{t:'switch'}],
  [{t:'lock',v:'プラチナ'},{t:'lock',v:'プラチナ'},{t:'switch'},{t:'switch'},{t:'switch'},{t:'switch'},{t:'switch'}],
  [{t:'lock',v:'THE VIP'},{t:'lock',v:'THE VIP'},{t:'lock',v:'THE VIP'},{t:'text',v:'ON'},{t:'text',v:'ON'},{t:'text',v:'ON'},{t:'text',v:'ON'}],
  [{t:'lock',v:'オーナー'},{t:'lock',v:'オーナー'},{t:'lock',v:'オーナー'},{t:'lock',v:'オーナー'},{t:'lock',v:'オーナー'},{t:'text',v:'利用可能'},{t:'text',v:'利用可能'}],
  [{t:'lock',v:'オーナー'},{t:'lock',v:'オーナー'},{t:'lock',v:'オーナー'},{t:'lock',v:'オーナー'},{t:'lock',v:'オーナー'},{t:'text',v:'月 3 回'},{t:'text',v:'月 8 回'}],
  [{t:'lock',v:'THE VIP'},{t:'lock',v:'THE VIP'},{t:'lock',v:'THE VIP'},{t:'text',v:'利用可能'},{t:'text',v:'利用可能'},{t:'text',v:'利用可能'},{t:'text',v:'利用可能'}],
  [{t:'lock',v:'グランドマスター'},{t:'lock',v:'グランドマスター'},{t:'lock',v:'グランドマスター'},{t:'lock',v:'グランドマスター'},{t:'lock',v:'グランドマスター'},{t:'lock',v:'グランドマスター'},{t:'text',v:'利用可能'}],
  [{t:'lock',v:'グランドマスター'},{t:'lock',v:'グランドマスター'},{t:'lock',v:'グランドマスター'},{t:'lock',v:'グランドマスター'},{t:'lock',v:'グランドマスター'},{t:'lock',v:'グランドマスター'},{t:'text',v:'年 1 回'}],
  [{t:'lock',v:'オーナー'},{t:'lock',v:'オーナー'},{t:'lock',v:'オーナー'},{t:'lock',v:'オーナー'},{t:'lock',v:'オーナー'},{t:'claim',v:'特注する',doneText:'特注済み'},{t:'claim',v:'特注する',doneText:'特注済み'}],
  [{t:'lock',v:'リピーター'},{t:'text',v:'受取済'},{t:'text',v:'受取済'},{t:'text',v:'受取済'},{t:'text',v:'受取済'},{t:'text',v:'受取済'},{t:'text',v:'今月 受取済'}],
  [{t:'text',v:'受取済'},{t:'text',v:'受取済'},{t:'text',v:'受取済'},{t:'text',v:'受取済'},{t:'text',v:'受取済'},{t:'text',v:'受取済'},{t:'text',v:'受取可能'}],
  [{t:'text',v:'購入済'},{t:'text',v:'購入済'},{t:'text',v:'購入済'},{t:'text',v:'購入済'},{t:'text',v:'購入済'},{t:'text',v:'購入済'},{t:'text',v:'購入可能'}],
  [{t:'lock',v:'リピーター'},{t:'text',v:'月 1 件'},{t:'text',v:'月 1 件'},{t:'text',v:'月 2 件'},{t:'text',v:'月 2 件'},{t:'text',v:'月 3 件'},{t:'text',v:'月 10 件'}],
];

function MU_BenefitRow({ tier, def, cell, idx, claimedMap, onToggleClaim, switchMap, onToggleSwitch }) {
  const locked = cell.t === 'lock';
  const labelMuted = locked ? MU_M.inkLow : MU_M.ink;
  const subMuted = locked ? MU_M.inkLow : MU_M.inkMid;
  const numColor = locked ? MU_M.inkLow : MU_M.goldDeep;
  const displayName = def.tierPrefix
    ? (def.suffixForm ? `${tier.shortName}${def.name}` : `${tier.shortName}${def.name}`)
    : def.name;

  let trailing = null;
  if (cell.t === 'val') {
    trailing = <span style={{ fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.goldDeep, letterSpacing: '0.04em', fontWeight: 500 }}>{cell.v}</span>;
  } else if (cell.t === 'text') {
    trailing = <span style={{ fontFamily: MU_M.fontSerif, fontSize: 11, color: MU_M.goldDeep, letterSpacing: '0.04em' }}>{cell.v}</span>;
  } else if (cell.t === 'lock') {
    trailing = (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: MU_M.fontSerif, fontSize: 10.5, color: MU_M.inkLow, letterSpacing: '0.04em' }}>
        {cell.v}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="6" y="11" width="12" height="9" rx="1.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
      </span>
    );
  } else if (cell.t === 'switch') {
    const on = switchMap[idx] ?? true;
    trailing = (
      <button
        type="button"
        onClick={() => onToggleSwitch(idx)}
        style={{ width: 34, height: 19, borderRadius: 999, padding: 2, background: on ? MU_M.gold : 'rgba(31, 42, 68, 0.15)', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: on ? 'flex-end' : 'flex-start', transition: 'background 220ms ease' }}
      >
        <div style={{ width: 15, height: 15, borderRadius: 999, background: '#FBF7F4', boxShadow: '0 0.5px 2px rgba(31, 42, 68, 0.18)' }} />
      </button>
    );
  } else if (cell.t === 'claim') {
    const claimed = claimedMap[idx] ?? true;
    const doneText = cell.doneText || '受取済み';
    if (claimed) {
      trailing = (
        <button type="button" onClick={() => onToggleClaim(idx)} style={{ background: 'transparent', border: 'none', padding: '4px 0', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: MU_M.fontSerif, fontSize: 11, color: MU_M.inkLow, letterSpacing: '0.06em' }}>
          {doneText === 'GET済み'
            ? <span style={{ fontFamily: MU_M.fontBrand, letterSpacing: '0.2em' }}>{doneText}</span>
            : <>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12l5 5 9-11" /></svg>
                <span>{doneText}</span>
              </>}
        </button>
      );
    } else {
      trailing = (
        <button
          type="button"
          onClick={() => onToggleClaim(idx)}
          style={{ padding: '6px 12px', border: `0.5px solid ${MU_M.gold}`, borderRadius: 999, background: 'transparent', color: MU_M.goldDeep, fontFamily: MU_M.fontSerif, fontSize: 11, letterSpacing: '0.06em', cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          {cell.v}{doneText === 'GET済み' ? ' 受け取る' : ' 受け取る'}
        </button>
      );
    }
  }

  const hasKeepRow = cell.t === 'claim' && cell.hasKeep;

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderTop: idx === 0 ? 'none' : `0.5px solid ${MU_M.hairline}` }}>
        <span style={{ fontFamily: MU_M.fontBrand, fontSize: 11, color: numColor, letterSpacing: '0.06em', width: 22, flexShrink: 0 }}>{String(idx + 1).padStart(2, '0')}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: MU_M.fontSerif, fontSize: 13, color: labelMuted, letterSpacing: '0.02em' }}>{displayName}</div>
          {def.sub ? <div style={{ marginTop: 3, fontSize: 10, color: subMuted, lineHeight: 1.5 }}>{def.sub}</div> : null}
        </div>
        <div style={{ flexShrink: 0 }}>{trailing}</div>
      </div>
      {hasKeepRow ? (
        <div style={{ padding: '2px 18px 12px 52px', borderTop: 'none' }}>
          <div style={{ height: 2, borderRadius: 1.5, background: 'rgba(184, 137, 107, 0.18)', overflow: 'hidden' }}>
            <div style={{ width: '60%', height: '100%', background: MU_M.gold }} />
          </div>
          <div style={{ marginTop: 5, display: 'flex', alignItems: 'center', gap: 6, fontFamily: MU_M.fontSerif, fontSize: 10.5, color: MU_M.inkMid, letterSpacing: '0.02em' }}>
            <span style={{ fontFamily: MU_M.fontBrand, fontSize: 9, color: MU_M.goldDeep, letterSpacing: '0.18em' }}>KEEP</span>
            <span style={{ color: MU_M.goldDeep, fontWeight: 500 }}>1,920,000</span>
            <span style={{ color: MU_M.inkMid }}> EXP / 3,200,000 EXP</span>
          </div>
        </div>
      ) : null}
    </>
  );
}

function MU_TierIntroCard({ tier, isActive }) {
  return (
    <div
      data-tier-slide
      style={{
        flex: '0 0 calc(100% - 40px)',
        scrollSnapAlign: 'center',
        marginRight: 12,
        padding: '22px 22px 18px',
        borderRadius: 8,
        background: '#FBF8F4',
        border: `0.5px solid ${isActive ? MU_M.hairlineStrong : MU_M.hairline}`,
        opacity: isActive ? 1 : 0.55,
        transform: isActive ? 'scale(1)' : 'scale(0.96)',
        transformOrigin: 'center',
        transition: 'opacity 280ms cubic-bezier(0.22, 0.61, 0.36, 1), transform 280ms cubic-bezier(0.22, 0.61, 0.36, 1), border-color 240ms ease',
      }}
    >
      <div style={{ fontFamily: MU_M.fontSerif, fontSize: 18, color: MU_M.ink, letterSpacing: '0.08em', fontWeight: 400, lineHeight: 1.2 }}>{tier.name}</div>
      <div style={{ marginTop: 6, fontFamily: MU_M.fontSerif, fontSize: 13, color: MU_M.inkMid, letterSpacing: '0.12em' }}>{tier.lvRange}</div>
      <div style={{ marginTop: 16, height: 0.5, background: MU_M.hairline }} />
      <div style={{ marginTop: 14, height: 3, border: `0.5px solid ${MU_M.hairline}`, borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: '100%', height: '100%', background: MU_M.gold }} />
      </div>
      <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', fontFamily: MU_M.fontSerif, fontSize: 12, color: MU_M.inkMid, letterSpacing: '0.04em' }}>
        <span>累計 <span style={{ color: MU_M.goldDeep, fontWeight: 500 }}>{tier.exp}</span> EXP</span>
        <span style={{ color: MU_M.goldDeep, fontWeight: 500, letterSpacing: '0.1em' }}>{tier.mark}</span>
      </div>
    </div>
  );
}

function MU_MyBenefits() {
  const [tab, setTab] = useState('benefits');
  const [activeTier, setActiveTier] = useState(MU_BENEFIT_TIERS.findIndex((t) => t.id === 'gm'));
  const [claimedMap, setClaimedMap] = useState({});
  const [switchMap, setSwitchMap] = useState({});
  const swiperRef = useRef(null);
  const scrollFrame = useRef(0);
  const benefitsTabCount = MU_BENEFIT_DEFS.length;

  const tierKey = (rowIdx) => `${activeTier}-${rowIdx}`;
  const handleToggleClaim = (rowIdx) => {
    const k = tierKey(rowIdx);
    setClaimedMap((m) => ({ ...m, [k]: !(m[k] ?? true) }));
  };
  const handleToggleSwitch = (rowIdx) => {
    const k = tierKey(rowIdx);
    setSwitchMap((m) => ({ ...m, [k]: !(m[k] ?? true) }));
  };
  const rowClaimedMap = {};
  const rowSwitchMap = {};
  MU_BENEFIT_DEFS.forEach((_, idx) => {
    const k = tierKey(idx);
    if (k in claimedMap) rowClaimedMap[idx] = claimedMap[k];
    if (k in switchMap) rowSwitchMap[idx] = switchMap[k];
  });

  useEffect(() => {
    if (tab !== 'benefits') return;
    const el = swiperRef.current;
    if (!el) return;
    const slides = el.querySelectorAll('[data-tier-slide]');
    const slide = slides[activeTier];
    if (slide) {
      const target = slide.offsetLeft - (el.clientWidth - slide.offsetWidth) / 2;
      el.scrollTo({ left: target, behavior: 'auto' });
    }
  }, [tab]);

  const handleSwiperScroll = () => {
    if (scrollFrame.current) return;
    scrollFrame.current = requestAnimationFrame(() => {
      scrollFrame.current = 0;
      const el = swiperRef.current;
      if (!el) return;
      const slides = el.querySelectorAll('[data-tier-slide]');
      if (!slides.length) return;
      const center = el.scrollLeft + el.clientWidth / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      slides.forEach((slide, idx) => {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const dist = Math.abs(slideCenter - center);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });
      setActiveTier((prev) => (prev === bestIdx ? prev : bestIdx));
    });
  };

  const currentTier = MU_BENEFIT_TIERS[activeTier];

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="BENEFITS" title="会員特典" />

        <div style={{ margin: '6px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `0.5px solid ${MU_M.hairline}` }}>
          {[
            { id: 'benefits', label: '会員特典', count: `${benefitsTabCount} / ${benefitsTabCount}` },
            { id: 'tasks', label: '期間限定ミッション', count: '8 / 14' },
          ].map((t) => {
            const active = tab === t.id;
            return (
              <button key={t.id} type="button" onClick={() => setTab(t.id)} style={{ padding: '14px 0', background: 'transparent', border: 'none', position: 'relative', cursor: 'pointer', fontFamily: MU_M.fontSerif, fontSize: 13, color: active ? MU_M.ink : MU_M.inkLow, letterSpacing: '0.06em', display: 'inline-flex', alignItems: 'baseline', justifyContent: 'center', gap: 6 }}>
                <span>{t.label}</span>
                <span style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.inkLow, letterSpacing: '0.04em' }}>{t.count}</span>
                {active ? <span style={{ position: 'absolute', bottom: -0.5, left: '50%', transform: 'translateX(-50%)', width: 40, height: 1.2, background: MU_M.gold }} /> : null}
              </button>
            );
          })}
        </div>

        {tab === 'benefits' ? (
          <>
            <div style={{ marginTop: 16 }}>
              <style>{`.mu-tier-swiper::-webkit-scrollbar{display:none}`}</style>
              <div
                ref={swiperRef}
                className="mu-tier-swiper"
                onScroll={handleSwiperScroll}
                style={{ width: '100%', overflowX: 'auto', overflowY: 'visible', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
              >
                <div style={{ display: 'flex', padding: '4px 0', paddingLeft: 20, paddingRight: 8 }}>
                  {MU_BENEFIT_TIERS.map((tier, idx) => (
                    <MU_TierIntroCard key={tier.id} tier={tier} isActive={idx === activeTier} />
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'center', gap: 6 }}>
              {MU_BENEFIT_TIERS.map((tier, idx) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => {
                    const el = swiperRef.current;
                    if (!el) return;
                    const slide = el.querySelectorAll('[data-tier-slide]')[idx];
                    if (!slide) return;
                    el.scrollTo({ left: slide.offsetLeft - (el.clientWidth - slide.offsetWidth) / 2, behavior: 'smooth' });
                  }}
                  aria-label={tier.name}
                  style={{ width: idx === activeTier ? 20 : 6, height: 3, padding: 0, borderRadius: 999, background: idx === activeTier ? MU_M.gold : MU_M.hairlineStrong, border: 'none', cursor: 'pointer', transition: 'width 240ms cubic-bezier(0.22, 0.61, 0.36, 1), background 240ms ease' }}
                />
              ))}
            </div>

            <div key={`benefits-${activeTier}`} style={{ margin: '18px 20px 0', background: '#FBF8F4', border: `0.5px solid ${MU_M.hairline}`, borderRadius: 8, overflow: 'hidden', animation: 'muBenefitFade 280ms cubic-bezier(0.22, 0.61, 0.36, 1) both' }}>
              <style>{`@keyframes muBenefitFade{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}`}</style>
              {MU_BENEFIT_DEFS.map((def, idx) => {
                const cell = MU_BENEFIT_MATRIX[idx][activeTier];
                return <MU_BenefitRow key={idx} tier={currentTier} def={def} cell={cell} idx={idx} claimedMap={rowClaimedMap} onToggleClaim={handleToggleClaim} switchMap={rowSwitchMap} onToggleSwitch={handleToggleSwitch} />;
              })}
            </div>
          </>
        ) : (
          <MU_MyBenefitsTasks />
        )}

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_MyBenefitsTasks() {
  const [taskState, setTaskState] = useState({
    register: 'done',
    profile: 'done',
    verify: 'done',
    login: 'done',
    castFollow: 'progress',
    shopFollow: 'progress',
    couponGet: 'progress',
    referral: 3,
    gift10k: 8,
    muchupon: 12,
    muchupay: 3,
    multiCast: 3,
    levelUp: 10,
    giftCount: 45,
  });
  const setOne = (key, val) => setTaskState((s) => ({ ...s, [key]: val }));

  const SimpleTaskRow = ({ name, reward, stateKey, claimText = '受け取る', doneText = '受け取り済み' }) => {
    const state = taskState[stateKey];
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderTop: `0.5px solid ${MU_M.hairline}` }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: MU_M.fontSerif, fontSize: 13, color: MU_M.ink, letterSpacing: '0.02em' }}>{name}</div>
          <div style={{ marginTop: 3, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.5 }}>{reward}</div>
        </div>
        {state === 'done' ? (
          <button type="button" onClick={() => setOne(stateKey, 'claim')} style={{ background: 'transparent', border: 'none', padding: '4px 0', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: MU_M.fontSerif, fontSize: 11, color: MU_M.inkLow, letterSpacing: '0.04em' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12l5 5 9-11" /></svg>
            <span>{doneText}</span>
          </button>
        ) : (
          <button type="button" onClick={() => setOne(stateKey, 'done')} style={{ padding: '6px 12px', border: `0.5px solid ${MU_M.gold}`, borderRadius: 999, background: 'transparent', color: MU_M.goldDeep, fontFamily: MU_M.fontSerif, fontSize: 11, letterSpacing: '0.06em', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {claimText}
          </button>
        )}
      </div>
    );
  };

  const MilestoneRow = ({ name, reward, stateKey, current, target, unit }) => {
    const state = taskState[stateKey];
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderTop: `0.5px solid ${MU_M.hairline}` }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: MU_M.fontSerif, fontSize: 13, color: MU_M.ink, letterSpacing: '0.02em' }}>{name}</div>
          <div style={{ marginTop: 3, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.5 }}>{reward}</div>
        </div>
        {state === 'done' ? (
          <span style={{ fontFamily: MU_M.fontSerif, fontSize: 11, color: MU_M.inkLow, letterSpacing: '0.02em' }}>{current} / {target} {unit}(済)</span>
        ) : state === 'claim' ? (
          <button type="button" onClick={() => setOne(stateKey, 'done')} style={{ padding: '6px 12px', border: `0.5px solid ${MU_M.gold}`, borderRadius: 999, background: 'transparent', color: MU_M.goldDeep, fontFamily: MU_M.fontSerif, fontSize: 11, letterSpacing: '0.06em', cursor: 'pointer', whiteSpace: 'nowrap' }}>受け取る</button>
        ) : (
          <button type="button" onClick={() => setOne(stateKey, 'claim')} style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', fontFamily: MU_M.fontSerif, fontSize: 13, color: MU_M.goldDeep, letterSpacing: '0.04em' }}>{current} / {target} {unit}</button>
        )}
      </div>
    );
  };

  const RepeatRow = ({ name, reward, stateKey, count, carry }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderTop: `0.5px solid ${MU_M.hairline}` }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: MU_M.fontSerif, fontSize: 13, color: MU_M.ink, letterSpacing: '0.02em' }}>{name}</div>
        <div style={{ marginTop: 3, fontSize: 10, color: MU_M.inkMid, lineHeight: 1.5 }}>{reward}</div>
      </div>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
        <button type="button" onClick={() => setOne(stateKey, Math.max(0, count - 1))} style={{ padding: '6px 12px', border: `0.5px solid ${MU_M.gold}`, borderRadius: 999, background: 'transparent', color: MU_M.goldDeep, fontFamily: MU_M.fontSerif, fontSize: 11, letterSpacing: '0.06em', cursor: 'pointer', whiteSpace: 'nowrap', position: 'relative' }}>
          受け取る
          {count > 0 ? <span style={{ position: 'absolute', top: -6, right: -6, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 999, background: MU_M.gold, color: '#FBF7F4', fontSize: 9, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{count}</span> : null}
        </button>
        {carry ? <span style={{ fontSize: 9, color: MU_M.inkLow, letterSpacing: '0.02em' }}>{carry}</span> : null}
      </div>
    </div>
  );

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ margin: '0 0 8px', borderTop: `0.5px solid transparent` }}>
        <SimpleTaskRow name="新規登録完了" reward="+20,000 EXP" stateKey="register" claimText="受け取る" doneText="クリア" />
        <SimpleTaskRow name="プロフィール完成" reward="+10,000 EXP" stateKey="profile" claimText="受け取る" doneText="クリア" />
        <SimpleTaskRow name="本人確認" reward="+30,000 EXP / クレカ・身分証いずれか" stateKey="verify" claimText="認証する" doneText="達成" />
        <SimpleTaskRow name="毎日ログイン" reward="+1,000 EXP / 日" stateKey="login" claimText="受け取る" doneText="受け取り済み" />
        <MilestoneRow name="キャストをフォロー" reward="マンスリー限定ミッション · +6,000 EXP" stateKey="castFollow" current={30} target={30} unit="人" />
        <MilestoneRow name="店舗をフォロー" reward="マンスリー限定ミッション · +6,000 EXP" stateKey="shopFollow" current={30} target={30} unit="店" />
        <MilestoneRow name="店舗クーポンをGET" reward="+1,000 EXP / 回 · 月 10 回まで" stateKey="couponGet" current={5} target={10} unit="" />
      </div>

      <div style={{ margin: '14px 0 8px', paddingTop: 14, borderTop: `0.5px solid ${MU_M.hairline}` }}>
        <RepeatRow name="友達紹介ミッション" reward="1人紹介ごとに +20,000 EXP（累計無制限）" stateKey="referral" count={taskState.referral} />
      </div>

      <div style={{ margin: '14px 0 0', paddingTop: 14, borderTop: `0.5px solid ${MU_M.hairline}` }}>
        <RepeatRow name="1万円以上のギフトを送信" reward="マンスリー限定 · +2,000 EXP / 件" stateKey="gift10k" count={taskState.gift10k} />
        <RepeatRow name="muchuポンを購入" reward="+3,000 EXP / 枚" stateKey="muchupon" count={taskState.muchupon} />
        <RepeatRow name="muchupayでお支払い" reward="+3,000 EXP / 回（1日最大 3 回まで）" stateKey="muchupay" count={taskState.muchupay} />
        <RepeatRow name="いろんなキャストへギフトを送信" reward="初めて送るキャストごと +1,000 EXP" stateKey="multiCast" count={taskState.multiCast} />
        <RepeatRow name="ポイント購入で無限レベルUP" reward="10,000円ごと +2,000 EXP（何度ももらえる）" stateKey="levelUp" count={taskState.levelUp} carry="次回まであと ¥5,000" />
        <RepeatRow name="ギフト送付回数" reward="+1,000 EXP / 回" stateKey="giftCount" count={taskState.giftCount} />
      </div>
    </div>
  );
}

function MU_MyPointDetail() {
  const summary = { total: '128,600', paid: '90,600', free: '30,000', limited: '8,000' };
  const history = [
    { tag: '限定', tone: 'limited', source: '月間限定ポイント', amount: '8,000', got: '2026.05.10', expire: '2026.05.30', expireWarn: true },
    { tag: '有償', tone: 'paid', source: 'ポイント購入', amount: '50,000', got: '2026.05.08', expire: '2026.11.04' },
    { tag: '無償', tone: 'free', source: '購入ボーナス (+18%)', amount: '9,000', got: '2026.05.08', expire: '2026.11.04' },
    { tag: '有償', tone: 'paid', source: 'ポイント購入', amount: '40,600', got: '2026.04.20', expire: '2026.10.17' },
    { tag: '無償', tone: 'free', source: '購入ボーナス (+18%)', amount: '7,300', got: '2026.04.20', expire: '2026.10.17' },
    { tag: '無償', tone: 'free', source: 'ランクアップ特典 (GM)', amount: '13,700', got: '2026.04.10', expire: '2026.10.07' },
  ];

  const tagStyle = (tone) => {
    if (tone === 'paid') return { background: MU_M.goldDeep, color: '#FBF7F4', border: 'none', padding: '2px 7px' };
    if (tone === 'limited') return { background: 'rgba(184, 137, 107, 0.08)', color: MU_M.goldDeep, border: `0.5px solid ${MU_M.hairlineStrong}`, padding: '1.5px 6.5px' };
    return { background: 'transparent', color: MU_M.goldDeep, border: `0.5px solid ${MU_M.hairline}`, padding: '1.5px 6.5px' };
  };

  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="POINT" title="ポイント明細" />

        <div style={{ margin: '14px 20px 0', padding: '22px 22px 18px', borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairline}` }}>
          <div style={{ fontFamily: MU_M.fontSerif, fontSize: 11, color: MU_M.goldDeep, letterSpacing: '0.24em', fontWeight: 500 }}>総保有ポイント</div>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <div style={{ fontFamily: MU_M.fontSerif, fontSize: 32, color: MU_M.ink, letterSpacing: '0.03em', fontWeight: 500, lineHeight: 1 }}>{summary.total}</div>
            <div style={{ fontFamily: MU_M.fontBrand, fontSize: 11, color: MU_M.inkMid, letterSpacing: '0.18em' }}>PT</div>
          </div>
          <div style={{ marginTop: 14, height: 1, background: MU_M.hairline }} />
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { label: '有償', val: summary.paid },
              { label: '無償', val: summary.free },
              { label: '限定', val: summary.limited, expiry: '今月末失効' },
            ].map((it) => (
              <div key={it.label} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontFamily: MU_M.fontSerif, fontSize: 11, color: MU_M.inkMid, letterSpacing: '0.06em', minWidth: 34 }}>{it.label}</span>
                <span style={{ fontFamily: MU_M.fontSerif, fontSize: 15, color: MU_M.ink, fontWeight: 500 }}>{it.val}<span style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.inkLow, marginLeft: 4 }}>PT</span></span>
                {it.expiry ? <span style={{ marginLeft: 'auto', fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.04em' }}>{it.expiry}</span> : null}
              </div>
            ))}
          </div>
        </div>

        <div style={{ margin: '22px 20px 8px', fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.3em' }}>取得明細</div>

        <div style={{ margin: '0 20px' }}>
          {history.map((row, i) => (
            <div key={i} style={{ padding: '14px 0', borderBottom: i < history.length - 1 ? `0.5px solid ${MU_M.hairline}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span style={{ display: 'inline-block', borderRadius: 2, fontFamily: MU_M.fontSerif, fontSize: 9.5, letterSpacing: '0.06em', lineHeight: 1.5, flexShrink: 0, ...tagStyle(row.tone) }}>{row.tag}</span>
                <span style={{ flex: 1, fontFamily: MU_M.fontSerif, fontSize: 13, color: MU_M.ink, letterSpacing: '0.02em' }}>{row.source}</span>
                <span style={{ fontFamily: MU_M.fontSerif, fontSize: 16, color: MU_M.ink, letterSpacing: '0.03em', fontWeight: 500, flexShrink: 0 }}>{row.amount}<span style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.inkMid, marginLeft: 2 }}>PT</span></span>
              </div>
              <div style={{ marginTop: 5, display: 'flex', gap: 14, fontFamily: MU_M.fontBrand, fontSize: 9.5, color: MU_M.inkLow, letterSpacing: '0.04em' }}>
                <span>取得 {row.got}</span>
                <span style={{ color: row.expireWarn ? MU_M.goldDeep : MU_M.inkLow }}>失効 {row.expire}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function MU_MyMuchuponHistory() {
  const records = [
    { date: '2026-05-12', time: '21:08', name: 'リピーターmuchuポン', cast: 'YUKA · LOUNGE ARIA', price: '8,000', status: '使用済み' },
    { date: '2026-05-05', time: '20:44', name: 'プラチナmuchuポン', cast: 'AYA · LOUNGE ARIA', price: '15,000', status: '使用済み' },
    { date: '2026-04-28', time: '23:20', name: 'THE VIPmuchuポン', cast: 'NANA · CLUB MIRROR', price: '28,000', status: '保留中', warn: true },
  ];
  return (
    <div style={{ width: '100%', height: '100%', background: MU_M.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 90 }}>
        <MU_SubpageHeader eyebrow="MUCHU PASS" title="muchuポン購入履歴" />

        <div style={{ margin: '14px 20px 0', padding: '20px 22px 18px', borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_M.hairline}`, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.goldDeep, letterSpacing: '0.24em' }}>TOTAL</div>
            <div style={{ marginTop: 4, fontFamily: MU_M.fontSerif, fontSize: 22, color: MU_M.ink, fontWeight: 500 }}>{records.length}<span style={{ fontSize: 11, color: MU_M.inkMid, marginLeft: 4 }}>件</span></div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: MU_M.fontBrand, fontSize: 10, color: MU_M.inkMid, letterSpacing: '0.18em' }}>AMOUNT</div>
            <div style={{ marginTop: 4, fontFamily: MU_M.fontSerif, fontSize: 16, color: MU_M.goldDeep, fontWeight: 500 }}>¥ 51,000</div>
          </div>
        </div>

        <div style={{ margin: '14px 20px 0' }}>
          {records.map((r, i) => (
            <div key={i} style={{ padding: '14px 0', borderTop: i > 0 ? `0.5px solid ${MU_M.hairline}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span style={{ flex: 1, fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.ink, letterSpacing: '0.02em' }}>{r.name}</span>
                <span style={{ fontFamily: MU_M.fontSerif, fontSize: 14, color: MU_M.goldDeep, fontWeight: 500 }}>¥ {r.price}</span>
              </div>
              <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 10, fontSize: 10.5, color: MU_M.inkMid }}>
                <span>{r.cast}</span>
                <span style={{ marginLeft: 'auto', color: r.warn ? MU_M.rouge : MU_M.inkLow, fontFamily: MU_M.fontBrand, letterSpacing: '0.06em' }}>{r.status}</span>
              </div>
              <div style={{ marginTop: 3, fontFamily: MU_M.fontBrand, fontSize: 9.5, color: MU_M.inkLow, letterSpacing: '0.04em' }}>{r.date} {r.time}</div>
            </div>
          ))}
        </div>

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

Object.assign(window, {
  MU_MyPage,
  MU_Booking: MU_BookingConfirm,
  MU_BookingDetail,
  MU_MyOrders,
  MU_MyCoupons,
  MU_MyFavorites,
  MU_MyFollowing,
  MU_MyFollowers,
  MU_MyBadges,
  MU_MySearch,
  MU_MyShare,
  MU_MyQRCode,
  MU_MyGiftRecords,
  MU_MyVisitHistory,
  MU_MyVerification,
  MU_MyVerificationUpload,
  MU_MyPaymentBinding,
  MU_MyPaymentAddCard,
  MU_MyPhoneChange,
  MU_MySupport,
  MU_MyBusiness,
  MU_MyInvite,
  MU_MyRecharge,
  MU_MyRechargeRecords,
  MU_MyFinanceDetail,
  MU_MySettings,
  MU_MyBenefits,
  MU_MyPointDetail,
  MU_MyMuchuponHistory,
});


