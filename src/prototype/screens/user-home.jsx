import { useEffect, useState } from 'react';

const MU_H = window.MU_TOKENS;
const MU_TOP_SPACING = window.MU_TOP_SPACING || 32;

const MU_HOME_PICKS = [
  { name: '七海 Nanami', shop: 'LOUNGE ARIA', ago: '2分前', src: 'https://images.pexels.com/photos/11746333/pexels-photo-11746333.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: '美咲 Misaki', shop: 'Club Velvet', ago: '8分前', src: 'https://images.pexels.com/photos/1066134/pexels-photo-1066134.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: '凛 Rin', shop: 'NOBLE', ago: '15分前', src: 'https://images.pexels.com/photos/15262855/pexels-photo-15262855.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: '蘭 Ran', shop: 'La Rose', ago: '21分前', src: 'https://images.pexels.com/photos/14456935/pexels-photo-14456935.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: '優花 Yuka', shop: 'Salon Lumiere', ago: '32分前', src: 'https://images.pexels.com/photos/32197366/pexels-photo-32197366.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

const MU_HOME_LIVE = [
  {
    user: 'K***',
    shop: 'LOUNGE ARIA',
    cast: { id: 'nanami', name: '七海', fullName: '七海 Nanami', shop: 'LOUNGE ARIA', shopLabel: 'LOUNGE ARIA 銀座本店', statusText: '本日出勤 · 21:00-翌4:00', subtitle: 'LOUNGE ARIA · 21:00 - 翌4:00', meta: '出勤中', tag: 'ONLINE', thumb: 'https://images.pexels.com/photos/11746333/pexels-photo-11746333.jpeg?auto=compress&cs=tinysrgb&w=800', hero: 'https://images.pexels.com/photos/11746333/pexels-photo-11746333.jpeg?auto=compress&cs=tinysrgb&w=1200', shopThumb: 'https://images.pexels.com/photos/36092418/pexels-photo-36092418.jpeg?auto=compress&cs=tinysrgb&w=600', distance: '1.2 km', ageLine: 'LOUNGE ARIA · 銀座七丁目 · 24歳 · 162cm' },
    actionPrefix: '',
    actionText: 'ギフトを贈りました',
    gift: { emoji: '🍾', title: 'シャンパンギフト', price: '¥38,000', note: '定番のシャンパンギフト。お祝いにも初対面の場にも合わせやすい一品です。' },
  },
  {
    user: 'R***',
    shop: 'Club Velvet',
    cast: { id: 'misaki', name: '美咲', fullName: '美咲 Misaki', shop: 'Club Velvet', shopLabel: 'Club Velvet', statusText: '本日出勤 · 22:00-翌5:00', subtitle: 'Club Velvet · 22:00 - 翌5:00', meta: '出勤中', tag: 'ONLINE', thumb: 'https://images.pexels.com/photos/1066134/pexels-photo-1066134.jpeg?auto=compress&cs=tinysrgb&w=800', hero: 'https://images.pexels.com/photos/1066134/pexels-photo-1066134.jpeg?auto=compress&cs=tinysrgb&w=1200', shopThumb: 'https://images.pexels.com/photos/36092418/pexels-photo-36092418.jpeg?auto=compress&cs=tinysrgb&w=600', distance: '2.4 km', ageLine: 'Club Velvet · 六本木 · 23歳 · 160cm' },
    actionPrefix: '',
    actionText: '先ほど 22:30 の来店予約をしました',
  },
  {
    user: 'M***',
    shop: 'NOBLE',
    cast: { id: 'rin', name: '凛', fullName: '凛 Rin', shop: 'NOBLE', shopLabel: 'NOBLE', statusText: '今週アルバムを4件更新', subtitle: 'NOBLE · 今週アルバムを4件更新', meta: 'NEW', tag: 'ONLINE', thumb: 'https://images.pexels.com/photos/15262855/pexels-photo-15262855.jpeg?auto=compress&cs=tinysrgb&w=800', hero: 'https://images.pexels.com/photos/15262855/pexels-photo-15262855.jpeg?auto=compress&cs=tinysrgb&w=1200', shopThumb: 'https://images.pexels.com/photos/36092418/pexels-photo-36092418.jpeg?auto=compress&cs=tinysrgb&w=600', distance: '0.9 km', ageLine: 'NOBLE · 銀座八丁目 · 25歳 · 164cm' },
    actionPrefix: '',
    actionText: 'ギフトを贈りました',
    gift: { emoji: '💐', title: 'クリスタルブーケ', price: '¥26,000', note: '人気の高い花束ギフト。応援や記念日の贈り物としてよく選ばれます。' },
  },
  {
    user: 'T***',
    shop: 'La Rose',
    cast: { id: 'ran', name: '蘭', fullName: '蘭 Ran', shop: 'La Rose', shopLabel: 'La Rose', statusText: 'たった今オンライン', subtitle: 'La Rose · たった今オンライン', meta: 'ONLINE', tag: 'ONLINE', thumb: 'https://images.pexels.com/photos/14456935/pexels-photo-14456935.jpeg?auto=compress&cs=tinysrgb&w=800', hero: 'https://images.pexels.com/photos/14456935/pexels-photo-14456935.jpeg?auto=compress&cs=tinysrgb&w=1200', shopThumb: 'https://images.pexels.com/photos/36092418/pexels-photo-36092418.jpeg?auto=compress&cs=tinysrgb&w=600', distance: '3.1 km', ageLine: 'La Rose · 青山 · 24歳 · 161cm' },
    actionPrefix: '',
    actionText: '音声メッセージを解放しました',
  },
  {
    user: 'S***',
    shop: 'Salon Lumiere',
    cast: { id: 'yuka', name: '優花', fullName: '優花 Yuka', shop: 'Salon Lumiere', shopLabel: 'Salon Lumiere', statusText: '本日出勤 · 21:00-翌4:00', subtitle: 'Salon Lumiere · 本日の人気', meta: '人気', tag: 'ONLINE', thumb: 'https://images.pexels.com/photos/32197366/pexels-photo-32197366.jpeg?auto=compress&cs=tinysrgb&w=800', hero: 'https://images.pexels.com/photos/32197366/pexels-photo-32197366.jpeg?auto=compress&cs=tinysrgb&w=1200', shopThumb: 'https://images.pexels.com/photos/36092418/pexels-photo-36092418.jpeg?auto=compress&cs=tinysrgb&w=600', distance: '2.8 km', ageLine: 'Salon Lumiere · 六本木 · 22歳 · 163cm' },
    actionPrefix: '',
    actionText: 'ペア来店クーポンを受け取りました',
  },
];

const MU_HOME_GIFT_DETAIL_KEY = '__MU_HOME_GIFT_DETAIL';

const MU_HOME_REGIONS = [
  { id: 'tokyo', label: '東京都', area: '銀座 · 六本木', en: 'TOKYO', desc: '中央区 / 港区', hot: '人気 128 店舗' },
  { id: 'osaka', label: '大阪府', area: '北新地 · 心斎橋', en: 'OSAKA', desc: '北区 / 中央区', hot: '人気 96 店舗' },
  { id: 'fukuoka', label: '福岡県', area: '中洲 · 天神', en: 'FUKUOKA', desc: '博多区 / 中央区', hot: '人気 54 店舗' },
  { id: 'aichi', label: '愛知県', area: '錦三丁目 · 栄', en: 'AICHI', desc: '名古屋市中区', hot: '人気 63 店舗' },
  { id: 'hokkaido', label: '北海道', area: 'すすきの · 札幌駅', en: 'HOKKAIDO', desc: '札幌市中央区', hot: '人気 41 店舗' },
];
const MU_HOME_REGION_STORAGE_KEY = 'mu_home_region_id';
const MU_HOME_LOCATION_STORAGE_KEY = 'mu_home_location';
const MU_HOME_DEFAULT_LOCATION = { regionId: 'tokyo', prefecture: '東京都', city: '中央区', area: '銀座' };
const MU_HOME_CITY_GROUPS = [
  { name: 'TOKYO', title: '東京都', subtitle: 'Tokyo', regionIds: ['tokyo'], gradient: 'linear-gradient(135deg, rgba(201,122,122,0.18) 0%, rgba(26,44,49,0.52) 100%)' },
  { name: 'OSAKA', title: '大阪府', subtitle: 'Osaka', regionIds: ['osaka'], gradient: 'linear-gradient(135deg, rgba(138,99,71,0.16) 0%, rgba(26,44,49,0.56) 100%)' },
  { name: 'FUKUOKA', title: '福岡県', subtitle: 'Fukuoka', regionIds: ['fukuoka'], gradient: 'linear-gradient(135deg, rgba(164,150,115,0.18) 0%, rgba(26,44,49,0.56) 100%)' },
  { name: 'AICHI', title: '愛知県', subtitle: 'Aichi', regionIds: ['aichi'], gradient: 'linear-gradient(135deg, rgba(234,212,167,0.2) 0%, rgba(74,48,36,0.56) 100%)' },
  { name: 'HOKKAIDO', title: '北海道', subtitle: 'Hokkaido', regionIds: ['hokkaido'], gradient: 'linear-gradient(135deg, rgba(243,236,228,0.22) 0%, rgba(26,44,49,0.56) 100%)' },
];
const MU_HOME_CITY_SELECTOR_DATA = [
  {
    prefecture: '東京都',
    regionId: 'tokyo',
    hotAreas: ['銀座', '六本木', '新宿', '渋谷', '池袋'],
    cities: [
      { name: '中央区', areas: ['銀座', '日本橋', '築地', '八重洲', '月島'] },
      { name: '港区', areas: ['六本木', '赤坂', '青山', '新橋', '麻布'] },
      { name: '新宿区', areas: ['新宿', '歌舞伎町', '高田馬場', '四谷', '神楽坂'] },
      { name: '渋谷区', areas: ['渋谷', '恵比寿', '原宿', '代々木', '表参道'] },
      { name: '千代田区', areas: ['丸の内', '有楽町', '神田', '秋葉原', '麹町'] },
      { name: '台東区', areas: ['上野', '浅草', '蔵前', '御徒町', '入谷'] },
      { name: '品川区', areas: ['五反田', '大崎', '大井町', '目黒', '天王洲'] },
      { name: '世田谷区', areas: ['三軒茶屋', '下北沢', '成城学園', '二子玉川', '自由が丘'] },
    ],
  },
  {
    prefecture: '大阪府',
    regionId: 'osaka',
    hotAreas: ['北新地', '心斎橋', '難波', '梅田'],
    cities: [
      { name: '北区', areas: ['梅田', '堂島', '曽根崎', '中之島'] },
      { name: '中央区', areas: ['心斎橋', '難波', '日本橋', '道頓堀'] },
      { name: '福島区', areas: ['福島', '野田', '海老江'] },
    ],
  },
  {
    prefecture: '福岡県',
    regionId: 'fukuoka',
    hotAreas: ['中洲', '天神', '博多'],
    cities: [
      { name: '博多区', areas: ['中洲', '博多駅', '住吉', '冷泉'] },
      { name: '中央区', areas: ['天神', '大名', '今泉', '春吉'] },
    ],
  },
  {
    prefecture: '愛知県',
    regionId: 'aichi',
    hotAreas: ['錦', '栄', '名駅'],
    cities: [
      { name: '中区', areas: ['錦', '栄', '矢場町', '大須'] },
      { name: '中村区', areas: ['名駅', '則武', '太閤', '本陣'] },
    ],
  },
  {
    prefecture: '北海道',
    regionId: 'hokkaido',
    hotAreas: ['すすきの', '札幌駅'],
    cities: [
      { name: '中央区', areas: ['すすきの', '薄野', '大通', '狸小路'] },
      { name: '北区', areas: ['札幌駅', '北24条', '麻生'] },
    ],
  },
];

const MU_HOME_GRID = {
  sara: 'https://images.pexels.com/photos/32280799/pexels-photo-32280799.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ayaka: 'https://images.pexels.com/photos/24389351/pexels-photo-24389351.jpeg?auto=compress&cs=tinysrgb&w=1200',
  reina: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200',
  akane: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1200',
  chihiro: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1200',
  kanon: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1200',
  maho: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200',
  aoi: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

const MU_HOME_WALL = {
  hero: { name: 'KURUMI', shop: 'Morpheus', area: '東京都 · 新宿区 · 歌舞伎町', src: 'https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&w=1200' },
  side: [
    { name: 'Misaki', shop: 'LUMIERA', src: 'https://images.pexels.com/photos/1066134/pexels-photo-1066134.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { name: 'Shizuku', shop: 'VELVET', src: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { name: 'Yuna', shop: 'PROPOSED', src: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { name: 'Aoi', shop: 'ECLIPSE', src: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=900' },
  ],
  bottom: [
    { name: 'Hina', shop: 'UMERA', src: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { name: 'Hiyori', shop: 'RAVIVE', src: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { name: 'Sakura', shop: 'NOIR', src: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=900' },
  ],
};

const MU_HOME_WALL_REVERSE = {
  hero: { name: 'Riko', shop: 'AUBE', area: '東京都 · 港区 · 六本木', src: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1200' },
  side: [
    { name: 'Emi', shop: 'CLUB DIANA', src: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { name: 'Nao', shop: 'GLANZ', src: 'https://images.pexels.com/photos/24389351/pexels-photo-24389351.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { name: 'Saya', shop: 'ROSE LINE', src: 'https://images.pexels.com/photos/32197366/pexels-photo-32197366.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { name: 'Miu', shop: 'LUXE', src: 'https://images.pexels.com/photos/32280799/pexels-photo-32280799.jpeg?auto=compress&cs=tinysrgb&w=900' },
  ],
  bottom: [
    { name: 'Karen', shop: 'GINZA J', src: 'https://images.pexels.com/photos/15262855/pexels-photo-15262855.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { name: 'Nina', shop: 'FLEUR', src: 'https://images.pexels.com/photos/14456935/pexels-photo-14456935.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { name: 'Luna', shop: 'PRISM', src: 'https://images.pexels.com/photos/11746333/pexels-photo-11746333.jpeg?auto=compress&cs=tinysrgb&w=900' },
  ],
};

const MU_HOME_SEARCH_SECTIONS = {
  stores: [
    { title: 'LOUNGE ARIA', sub: '銀座7丁目 · Lounge · 18名在籍', target: 'shop-detail' },
    { title: 'Club Velvet', sub: '六本木 · Club · イベントナイト', target: 'shop-detail' },
    { title: 'Salon Lumiere', sub: '六本木 · Lounge · ペア特典あり', target: 'shop-detail' },
  ],
  casts: [
    { title: '七海 Nanami', sub: 'LOUNGE ARIA · 予約可', target: 'cast-detail' },
    { title: '美咲 Misaki', sub: 'Club Velvet · 出勤中', target: 'cast-detail' },
    { title: '凛 Rin', sub: 'NOBLE · 本日の人気', target: 'cast-detail' },
    { title: '蘭 Ran', sub: 'La Rose · たった今オンライン', target: 'cast-detail' },
  ],
  topics: [
    { title: 'シャンパン特集', sub: '人気イベントと営業スケジュール', target: 'shop-events' },
    { title: 'ペア特典', sub: 'グループ来店向けの優待', target: 'shop-coupons' },
    { title: '求人相談', sub: '店舗採用と待遇案内', target: 'shop-recruit' },
  ],
};

const MU_HOME_SEARCH_TAGS = ['銀座', '六本木', '七海', 'シャンパン特集', 'ペア特典', '求人相談'];
const MU_HOME_FILTER_FIELDS = [
  { key: 'region', label: 'エリア', options: ['東京都/赤坂', '東京都/六本木', '東京都/新宿', '大阪府/梅田'] },
  { key: 'storeType', label: '店舗タイプ', options: ['ラウンジ', 'クラブ', 'バー', 'レストラン'] },
  { key: 'previousJob', label: '前職', options: ['学生', 'モデル', '看護師', '美容師', '会社員'] },
  { key: 'drinking', label: 'お酒', options: ['飲まない', '少し飲む', '飲める', '強い'] },
  { key: 'smoking', label: '喫煙', options: ['吸わない', 'たまに', '気にしない'] },
  { key: 'attendance', label: '本日の出勤', options: ['本日出勤', '本日休み', '未定'] },
];
const MU_HOME_FILTER_DEFAULTS = {
  region: '東京都/赤坂',
  storeType: '選択してください',
  previousJob: '選択してください',
  drinking: '選択してください',
  smoking: '選択してください',
  attendance: '選択してください',
  ageMin: '',
  ageMax: '',
  heightMin: '',
  heightMax: '',
};
const MU_HOME_FILTER_TAGS = [
  { label: '大人っぽい', value: 'mature' },
  { label: 'スレンダー', value: 'slim' },
  { label: '明るい', value: 'lively' },
  { label: '親しみやすい', value: 'warm' },
  { label: 'お姉さん系', value: 'older_sister' },
  { label: 'アウトドア好き', value: 'outdoor' },
  { label: 'グルメ好き', value: 'foodie' },
];
const MU_HOME_OPS_CONFIG_STORAGE_KEY = 'mu_home_ops_config_cache';
const MU_HOME_DEFAULT_API_PORT = '8849';

function MU_getHomeApiBaseUrl() {
  const envBase = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_APP_API_BASE_URL;
  if (envBase) return String(envBase).replace(/\/$/, '');
  if (window.__MU_API_BASE__) return String(window.__MU_API_BASE__).replace(/\/$/, '');
  if (window.location.port === MU_HOME_DEFAULT_API_PORT) return window.location.origin;
  return `${window.location.protocol}//${window.location.hostname || '127.0.0.1'}:${MU_HOME_DEFAULT_API_PORT}`;
}

function MU_readCachedHomeOpsConfig() {
  try {
    return JSON.parse(window.localStorage?.getItem(MU_HOME_OPS_CONFIG_STORAGE_KEY) || 'null');
  } catch {
    return null;
  }
}

function MU_writeCachedHomeOpsConfig(payload) {
  try {
    window.localStorage?.setItem(MU_HOME_OPS_CONFIG_STORAGE_KEY, JSON.stringify(payload));
  } catch {}
}

function MU_requestHomeOpsConfig(location) {
  const query = new URLSearchParams({
    terminal: 'client',
    city: String(location?.prefecture || location?.city || '').trim(),
  });
  return fetch(`${MU_getHomeApiBaseUrl()}/home/ops/config?${query.toString()}`)
    .then((response) => {
      if (!response.ok) throw new Error(`home ops config http ${response.status}`);
      return response.json();
    })
    .then((payload) => (payload?.code === 0 ? payload.data || null : null));
}

function MU_buildRegionOptions(regionItems) {
  if (!Array.isArray(regionItems) || !regionItems.length) return MU_HOME_REGIONS;
  const staticRegionMap = new Map(MU_HOME_REGIONS.map((item) => [item.label, item.id]));
  const grouped = new Map();
  regionItems.forEach((item, index) => {
    const province = String(item?.province || item?.city || '').trim();
    if (!province) return;
    if (!grouped.has(province)) {
      grouped.set(province, []);
    }
    grouped.get(province).push({ ...item, __index: index });
  });
  const dynamicRegions = Array.from(grouped.entries()).map(([province, items], index) => {
    const primary = items[0] || {};
    const districts = items.map((item) => String(item?.district || item?.region_name || '').trim()).filter(Boolean);
    const cityNames = Array.from(new Set(items.map((item) => String(item?.city || '').trim()).filter(Boolean)));
    return {
      id: staticRegionMap.get(province) || String(primary.region_code || province || `region-${index}`).toLowerCase(),
      label: province,
      area: districts.slice(0, 2).join(' · ') || cityNames.slice(0, 2).join(' · ') || province,
      en: province.replace(/[^\x00-\x7F]/g, '').toUpperCase() || `AREA ${index + 1}`,
      desc: cityNames.join(' / ') || province,
      hot: `热门 ${items.filter((item) => Number(item?.is_hot || 0) === 1).length} 区域`,
    };
  });
  return dynamicRegions.length ? dynamicRegions : MU_HOME_REGIONS;
}

function MU_pickRecommendSlots(slotItems) {
  if (!Array.isArray(slotItems)) return [];
  const preferredSlots = slotItems.filter((slot) => {
    const code = String(slot?.slot_code || '').toLowerCase();
    const name = String(slot?.slot_name || '').toLowerCase();
    const contentType = String(slot?.content_type || '').toLowerCase();
    return code.includes('pick') || code.includes('recommend') || name.includes('pick') || name.includes('recommend') || contentType === 'cast';
  });
  return preferredSlots.length ? preferredSlots : slotItems;
}

function MU_buildHomePicks(slotItems) {
  const picks = MU_pickRecommendSlots(slotItems)
    .flatMap((slot) => (Array.isArray(slot?.items) ? slot.items : []))
    .map((item, index) => {
      const targetMeta = item?.target_meta || {};
      const shopName = targetMeta.current_shop_name || targetMeta.name || item?.subtitle || item?.target_name || 'RECOMMEND';
      const imageUrl = item?.image_url || targetMeta.avatar || targetMeta.cover_url || '';
      if (!imageUrl) return null;
      return {
        name: item?.title || item?.target_name || `推荐 ${index + 1}`,
        shop: shopName,
        ago: item?.start_date || '推荐中',
        src: imageUrl,
      };
    })
    .filter(Boolean);
  return picks.length ? picks.slice(0, 8) : MU_HOME_PICKS;
}

function MU_buildSearchTags(searchKeywords) {
  const hotItems = Array.isArray(searchKeywords?.hot) ? searchKeywords.hot : [];
  const tags = hotItems.map((item) => String(item?.keyword || '').trim()).filter(Boolean);
  return tags.length ? tags.slice(0, 8) : MU_HOME_SEARCH_TAGS;
}

function MU_buildSearchSections(slotItems, searchKeywords) {
  const recommendItems = MU_pickRecommendSlots(slotItems)
    .flatMap((slot) => (Array.isArray(slot?.items) ? slot.items : []))
    .slice(0, 6);
  const casts = recommendItems
    .filter((item) => ['cast', 'girl'].includes(String(item?.target_type || '').toLowerCase()))
    .map((item) => ({
      title: item?.title || item?.target_name || '',
      sub: item?.subtitle || item?.target_meta?.current_shop_name || '推荐キャスト',
      target: 'cast-detail',
    }))
    .filter((item) => item.title);
  const stores = recommendItems
    .filter((item) => String(item?.target_type || '').toLowerCase() === 'shop')
    .map((item) => ({
      title: item?.title || item?.target_name || '',
      sub: item?.subtitle || item?.target_meta?.city || '推荐店舗',
      target: 'shop-detail',
    }))
    .filter((item) => item.title);
  const topics = [
    ...(Array.isArray(searchKeywords?.suggest) ? searchKeywords.suggest : []),
    ...(Array.isArray(searchKeywords?.filter) ? searchKeywords.filter : []),
  ]
    .map((item) => ({
      title: item?.keyword || '',
      sub: item?.target_value || item?.city || 'おすすめ検索',
      target: 'home-search',
    }))
    .filter((item) => item.title)
    .slice(0, 6);
  return {
    stores: stores.length ? stores : MU_HOME_SEARCH_SECTIONS.stores,
    casts: casts.length ? casts : MU_HOME_SEARCH_SECTIONS.casts,
    topics: topics.length ? topics : MU_HOME_SEARCH_SECTIONS.topics,
  };
}

function useMUHomeOpsConfig(location) {
  const [opsConfig, setOpsConfig] = useState(() => MU_readCachedHomeOpsConfig());

  useEffect(() => {
    let cancelled = false;
    MU_requestHomeOpsConfig(location)
      .then((payload) => {
        if (!payload || cancelled) return;
        MU_writeCachedHomeOpsConfig(payload);
        setOpsConfig(payload);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [location?.prefecture, location?.city, location?.area]);

  return opsConfig;
}

function MU_getStoredRegionId() {
  try {
    const stored = window.localStorage?.getItem(MU_HOME_REGION_STORAGE_KEY);
    return MU_HOME_REGIONS.some((item) => item.id === stored) ? stored : 'tokyo';
  } catch {
    return 'tokyo';
  }
}

function MU_setStoredRegionId(regionId) {
  try {
    window.localStorage?.setItem(MU_HOME_REGION_STORAGE_KEY, regionId);
  } catch {}
}

function MU_normalizeLocationText(value) {
  const map = {
    东京: '東京都',
    银座: '銀座',
    日本桥: '日本橋',
    筑地: '築地',
    月岛: '月島',
    涩谷: '渋谷',
    惠比寿: '恵比寿',
    代代木: '代々木',
    高田马场: '高田馬場',
    神乐坂: '神楽坂',
    丸之内: '丸の内',
    有乐町: '有楽町',
    秋叶原: '秋葉原',
    台东区: '台東区',
    藏前: '蔵前',
    目黑: '目黒',
    三轩茶屋: '三軒茶屋',
    下北泽: '下北沢',
    自由之丘: '自由が丘',
    心斋桥: '心斎橋',
    难波: '難波',
    道顿堀: '道頓堀',
    福冈: '福岡県',
    博多站: '博多駅',
    爱知: '愛知県',
    锦: '錦',
    荣: '栄',
    名站: '名駅',
    大须: '大須',
    札幌站: '札幌駅',
  };
  return map[value] || value;
}

function MU_getStoredLocation() {
  try {
    const stored = JSON.parse(window.localStorage?.getItem(MU_HOME_LOCATION_STORAGE_KEY) || 'null');
    if (!stored || !MU_HOME_REGIONS.some((item) => item.id === stored.regionId)) return MU_HOME_DEFAULT_LOCATION;
    return {
      regionId: stored.regionId,
      prefecture: MU_normalizeLocationText(stored.prefecture || MU_HOME_DEFAULT_LOCATION.prefecture),
      city: MU_normalizeLocationText(stored.city || MU_HOME_DEFAULT_LOCATION.city),
      area: MU_normalizeLocationText(stored.area || MU_HOME_DEFAULT_LOCATION.area),
    };
  } catch {
    return MU_HOME_DEFAULT_LOCATION;
  }
}

function MU_setStoredLocation(location) {
  try {
    window.localStorage?.setItem(MU_HOME_LOCATION_STORAGE_KEY, JSON.stringify(location));
  } catch {}
}

function MU_setGiftDetailContext(detail) {
  window[MU_HOME_GIFT_DETAIL_KEY] = detail;
}

function MU_getGiftDetailContext() {
  return window[MU_HOME_GIFT_DETAIL_KEY] || {
    emoji: '🍾',
    title: 'シャンパンギフト',
    price: '¥38,000',
    note: 'お祝い、初対面、応援など幅広いシーンで贈りやすい定番ギフトです。',
    shop: 'LOUNGE ARIA',
    castName: '七海',
    sender: 'K***',
  };
}

function MU_HomePhoto({ src, w, h, radius = 10, fullSize = false }) {
  const style = fullSize ? { position: 'absolute', inset: 0, width: '100%', height: '100%' } : { width: w, height: h };
  return (
    <div style={{ ...style, overflow: 'hidden', borderRadius: radius, position: fullSize ? 'absolute' : 'relative', background: '#eadfd6' }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  );
}

function MU_buildHomeCast({ name, shop, src }) {
  const pureName = String(name).split(' ')[0];
  const id = pureName.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5\u3040-\u30ff]/gi, '');
  return {
    id,
    name: pureName,
    fullName: name,
    shop,
    shopLabel: shop,
    statusText: 'プロフィール公開中',
    subtitle: `${shop} · プロフィール公開中`,
    meta: 'NEW',
    tag: 'ONLINE',
    thumb: src,
    hero: src,
    shopThumb: src,
    distance: '1.2 km',
    ageLine: `${shop} · 詳細プロフィール公開中`,
  };
}

function MU_FollowHeart({ cast }) {
  const [following, setFollowing] = useState(() => window.MU_isFollowingCast?.(cast.id) || false);

  useEffect(() => {
    const sync = () => setFollowing(window.MU_isFollowingCast?.(cast.id) || false);
    window.addEventListener('mu-cast-following-change', sync);
    return () => window.removeEventListener('mu-cast-following-change', sync);
  }, [cast.id]);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        const next = window.MU_toggleFollowingCast?.(cast);
        setFollowing(!!next);
      }}
      style={{ position: 'absolute', top: 8, right: 8, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill={following ? MU_H.gold : 'none'} stroke={MU_H.gold} strokeWidth="2" style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.28))' }}>
        <path d="M12 21 C5 15 2 11 2 7 A5 5 0 0 1 12 5 A5 5 0 0 1 22 7 C22 11 19 15 12 21 Z" />
      </svg>
    </button>
  );
}

const renderSearchIcon = (key, color = MU_H.gold) => {
  if (key === 'stores') return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M3 21h18M3 7v14M21 7v14M3 7l9-4 9 4M9 21v-4a2 2 0 014 0v4M7 11h2M7 15h2M15 11h2M15 15h2" />
    </svg>
  );
  if (key === 'casts') return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z" />
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
};

const renderRankingBadge = (rank) => {
  const isTop = rank <= 3;
  const colors = [
    ['#F0D090', '#A49673', '#1A2C31'], // Gold
    ['#D9D5CC', '#8A857E', '#1A2C31'], // Silver
    ['#D9967A', '#8A5640', '#1A2C31'], // Bronze
  ];
  const [c1, c2, text] = isTop ? colors[rank - 1] : ['#F6F2EF', '#D7CEC5', MU_H.goldDeep];

  return (
    <div style={{ position: 'absolute', top: 8, left: 8, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 900, color: isTop ? c1 : text, fontFamily: MU_H.fontBrand, textShadow: '0 1px 4px rgba(0,0,0,0.38)' }}>
      {rank}
    </div>
  );
};

const MU_HOME_WALL_REVERSE_STATUS = (() => {
  const items = [MU_HOME_WALL_REVERSE.hero, ...MU_HOME_WALL_REVERSE.side, ...MU_HOME_WALL_REVERSE.bottom];
  const pool = Array.from({ length: items.length }, (_, index) => index < Math.ceil(items.length / 2));

  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
  }

  return items.reduce((acc, item, index) => {
    acc[item.name] = pool[index];
    return acc;
  }, {});
})();

const renderStatusIndicator = (isOnline = true, compact = false) => {
  const glow = isOnline ? '#12E29A' : 'rgba(255,255,255,0.38)';
  const ring = isOnline ? '#12E29A' : 'rgba(255,255,255,0.2)';

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: compact ? 8 : 10, height: compact ? 8 : 10 }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: glow, boxShadow: isOnline ? `0 0 12px ${glow}` : 'none' }} />
        {isOnline ? <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: `2px solid ${ring}`, opacity: 0.4, animation: 'mu-pulse 2s infinite' }} /> : null}
      </div>
      <style>{`
        @keyframes mu-pulse {
          0% { transform: scale(0.8); opacity: 0.6; }
          70% { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(0.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

function MU_WallCard({ name, shop, area, src, height, compact = false, badge, isOnline = true }) {
  const cast = MU_buildHomeCast({ name, shop, src });
  return (
    <div style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', height, cursor: 'pointer', background: '#0f0d0c' }} onClick={() => { window.MU_setCastContext?.(cast); window.__nav?.open('cast-detail'); }}>
      <MU_HomePhoto src={src} w="100%" h={height} radius={0} fullSize />
      <div style={{ position: 'absolute', inset: 0, background: compact ? 'linear-gradient(180deg, transparent 40%, rgba(18, 14, 12, 0.85) 100%)' : 'linear-gradient(180deg, rgba(18, 14, 12, 0.05) 0%, rgba(18, 14, 12, 0.8) 100%)' }} />
      <MU_FollowHeart cast={cast} />
      <div style={{ position: 'absolute', left: compact ? 10 : 16, right: compact ? 10 : 16, bottom: compact ? 10 : 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {renderStatusIndicator(isOnline, compact)}
          <div style={{ fontFamily: MU_H.fontSerif, fontSize: compact ? 12 : 18, color: '#F6F2EF', letterSpacing: '0.02em', fontWeight: 600, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{name}</div>
        </div>
        <div style={{ marginTop: 2, fontSize: compact ? 8 : 11, color: 'rgba(251, 247, 244, 0.8)', letterSpacing: '0.04em', textTransform: 'uppercase', textShadow: '0 1px 4px rgba(0,0,0,0.35)' }}>
          {shop}
        </div>
        {!compact && area ? (
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: 'rgba(251, 247, 244, 0.6)', letterSpacing: '0.02em' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2 C8 2 5 5 5 9 C5 14 12 22 12 22 C12 22 19 14 19 9 C19 5 16 2 12 2 Z" /><circle cx="12" cy="9" r="2" /></svg>
            {area}
          </div>
        ) : null}
      </div>
      <div style={{ position: 'absolute', inset: 0, border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 6, pointerEvents: 'none' }} />
    </div>
  );
}

function MU_Home() {
  const [liveIndex, setLiveIndex] = useState(0);
  const [liveVisible, setLiveVisible] = useState(true);
  const [giftModal, setGiftModal] = useState(null);
  const [activeLocation, setActiveLocation] = useState(() => MU_getStoredLocation());
  const [activeRegionId, setActiveRegionId] = useState(() => MU_getStoredLocation().regionId);
  const opsConfig = useMUHomeOpsConfig(activeLocation);
  const regionOptions = MU_buildRegionOptions(opsConfig?.regions);
  const activeRegion = regionOptions.find((item) => item.id === activeRegionId) || regionOptions[0] || MU_HOME_REGIONS[0];
  const homePicks = MU_buildHomePicks(opsConfig?.recommend_slots);
  const activeLive = MU_HOME_LIVE[liveIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLiveVisible(false);
      window.setTimeout(() => {
        setLiveIndex((current) => (current + 1) % MU_HOME_LIVE.length);
        setLiveVisible(true);
      }, 180);
    }, 2600);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const syncRegion = () => {
      const nextLocation = MU_getStoredLocation();
      setActiveLocation(nextLocation);
      setActiveRegionId(nextLocation.regionId);
    };
    window.addEventListener('mu:region-change', syncRegion);
    return () => window.removeEventListener('mu:region-change', syncRegion);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', background: MU_H.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 280, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(234, 212, 167, 0.35), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 82 }}>
        <div style={{ height: MU_TOP_SPACING }} />

        <div style={{ padding: '8px 20px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 10 }}>
          <button type="button" onClick={() => window.__nav?.open('city-selector')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '6px 14px 6px 8px', borderRadius: 8, background: 'rgba(251,247,244,0.4)', border: `0.5px solid ${MU_H.hairline}`, backdropFilter: 'blur(20px)' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_H.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MU_H.goldDeep }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A2C31" strokeWidth="2">
                <path d="M12 2 C8 2 5 5 5 9 C5 14 12 22 12 22 C12 22 19 14 19 9 C19 5 16 2 12 2 Z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 9, color: MU_H.goldDeep, letterSpacing: '0.15em', fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>{activeRegion.en}</div>
              <div style={{ fontFamily: MU_H.fontSerif, fontSize: 14, color: MU_H.ink, letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 4 }}>
                {`${activeLocation.prefecture} · ${activeLocation.city} · ${activeLocation.area}`}
                <svg width="10" height="10" viewBox="0 0 12 12" fill={MU_H.inkLow}><path d="M2 4 L6 8 L10 4" /></svg>
              </div>
            </div>
          </button>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="button" onClick={() => window.__nav?.open('home-search')} style={{ width: 40, height: 40, borderRadius: 8, border: `0.5px solid ${MU_H.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', cursor: 'pointer' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MU_H.gold} strokeWidth="1.8">
                <circle cx="11" cy="11" r="7" />
                <path d="M16 16 L20 20" strokeLinecap="round" />
              </svg>
            </button>
            <button type="button" onClick={() => window.__nav?.open('home-filter')} style={{ width: 40, height: 40, borderRadius: 8, border: `0.5px solid ${MU_H.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', cursor: 'pointer' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MU_H.gold} strokeWidth="1.8">
                <path d="M4 7 H20" strokeLinecap="round" />
                <path d="M7 12 H17" strokeLinecap="round" />
                <path d="M10 17 H14" strokeLinecap="round" />
                <circle cx="9" cy="7" r="2" fill="#FFFFFF" />
                <circle cx="15" cy="12" r="2" fill="#FFFFFF" />
                <circle cx="12" cy="17" r="2" fill="#FFFFFF" />
              </svg>
            </button>
          </div>
        </div>

        <div style={{ margin: '0 20px 16px', height: 44, borderRadius: 8, background: 'rgba(251,247,244,0.6)', border: `0.5px solid ${MU_H.hairline}`, backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', gap: 10, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: MU_H.goldDeep }} />
          <div style={{ marginLeft: 16, fontFamily: MU_H.fontBrand, fontSize: 10, color: '#FFFFFF', letterSpacing: '0.18em', padding: '3px 8px', background: MU_H.rouge, borderRadius: 4, flexShrink: 0, fontWeight: 700 }}>LIVE</div>
          <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
            <div style={{ fontSize: 12, color: MU_H.ink, letterSpacing: '0.02em', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)', opacity: liveVisible ? 1 : 0, transform: liveVisible ? 'translateX(0)' : 'translateX(12px)' }}>
              <span style={{ color: MU_H.rouge, fontWeight: 800 }}>{activeLive.user}</span>
              <span style={{ margin: '0 6px', color: MU_H.inkLow }}>|</span>
              <span style={{ color: MU_H.inkMid }}>{activeLive.shop} · </span>
              <button
                type="button"
                onClick={() => {
                  window.MU_setCastContext?.(activeLive.cast);
                  window.__nav?.open('cast-detail');
                }}
                style={{ color: MU_H.goldDeep, fontWeight: 700, cursor: 'pointer' }}
              >
                {activeLive.cast.name}
              </button>
              <span style={{ marginLeft: 8, color: MU_H.inkMid }}>{activeLive.actionPrefix}{activeLive.actionText}</span>
              {activeLive.gift ? (
                <>
                  <span style={{ margin: '0 6px', color: MU_H.inkLow }}>·</span>
                  <button
                    type="button"
                    onClick={() => setGiftModal({ ...activeLive.gift, shop: activeLive.shop, castName: activeLive.cast.name, sender: activeLive.user })}
                    style={{ color: MU_H.rouge, fontWeight: 700, cursor: 'pointer' }}
                  >
                    {activeLive.gift.title}
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div>
          <window.MU_SectionTitle ja="本日の注目キャスト" en="TODAY'S PICK" />
          <window.MU_HSlider
            items={homePicks}
            itemWidth={110}
            gap={12}
            padX={20}
            autoPlay
            showDots={false}
            renderItem={(p, i) => (
              <div style={{ width: 110, cursor: 'pointer' }} onClick={() => { window.MU_setCastContext?.(MU_buildHomeCast({ name: p.name, shop: p.shop, src: p.src })); window.__nav?.open('cast-detail'); }}>
                <div style={{ position: 'relative', width: 110, height: 140, borderRadius: 6, overflow: 'hidden' }}>
                  <MU_HomePhoto src={p.src} w={110} h={140} radius={0} fullSize />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(26,44,49,0.8) 100%)' }} />
                  <div style={{ position: 'absolute', inset: 0, border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: 6, pointerEvents: 'none' }} />
                  <MU_FollowHeart cast={MU_buildHomeCast({ name: p.name, shop: p.shop, src: p.src })} />
                  {renderRankingBadge(i + 1)}
                  <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8, fontSize: 9, color: '#FFFFFF', fontWeight: 700, letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 4, height: 4, borderRadius: 2, background: MU_H.gold }} />
                    {p.ago}
                  </div>
                </div>
                <div style={{ marginTop: 10, fontFamily: MU_H.fontSerif, fontSize: 13, color: MU_H.ink, letterSpacing: '0.02em', fontWeight: 600 }}>{p.name}</div>
                <div style={{ marginTop: 2, fontSize: 10, color: MU_H.inkMid, letterSpacing: '0.04em', opacity: 0.8 }}>{p.shop}</div>
              </div>
            )}
          />
        </div>

        <div onClick={() => window.__nav?.switchTab('rank')} style={{ margin: '4px 20px 24px', padding: '16px 18px', borderRadius: 8, background: MU_H.couponBg, border: `0.5px solid ${MU_H.couponBorder}`, display: 'flex', alignItems: 'center', gap: 14, position: 'relative', overflow: 'hidden', cursor: 'pointer', boxShadow: 'none' }}>
          <div style={{ width: 44, height: 44, borderRadius: 8, background: 'rgba(255,255,255,0.5)', border: `0.5px solid ${MU_H.couponBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={MU_H.goldDeep} strokeWidth="1.5">
              <path d="M12 15l-2 5 2-1 2 1-2-5z" fill={MU_H.goldDeep} fillOpacity="0.2" />
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: MU_H.fontBrand, fontSize: 10, color: MU_H.goldDeep, letterSpacing: '0.28em', fontWeight: 700 }}>GIFT RANKING · {new Date().toLocaleString('en-US', { month: 'long' }).toUpperCase()}</div>
            <div style={{ fontFamily: MU_H.fontSerif, fontSize: 16, color: MU_H.ink, letterSpacing: '0.04em', marginTop: 4 }}>エリアギフトランキングを見る</div>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MU_H.goldDeep} strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
          </div>
        </div>

        <window.MU_SectionTitle ja="すべてのキャスト" en="ALL CASTS" />
        <div style={{ padding: '0 12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 4 }}>
            <MU_WallCard {...MU_HOME_WALL.hero} height={398} />
            <div style={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gap: 4 }}>
              {MU_HOME_WALL.side.slice(0, 3).map((item) => (
                <MU_WallCard key={item.name} {...item} height={130} compact />
              ))}
            </div>
          </div>

          <div style={{ marginTop: 4, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
            {MU_HOME_WALL.bottom.map((item) => (
              <MU_WallCard key={item.name} {...item} height={130} compact />
            ))}
          </div>
        </div>

        <div style={{ height: 12 }} />

        <div style={{ padding: '0 12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 4 }}>
            <div style={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gap: 4 }}>
              {MU_HOME_WALL_REVERSE.side.slice(0, 3).map((item) => (
                <MU_WallCard key={item.name} {...item} height={130} compact isOnline={MU_HOME_WALL_REVERSE_STATUS[item.name]} />
              ))}
            </div>
            <MU_WallCard {...MU_HOME_WALL_REVERSE.hero} height={398} isOnline={MU_HOME_WALL_REVERSE_STATUS[MU_HOME_WALL_REVERSE.hero.name]} />
          </div>

          <div style={{ marginTop: 4, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
            {MU_HOME_WALL_REVERSE.bottom.map((item) => (
              <MU_WallCard key={item.name} {...item} height={130} compact isOnline={MU_HOME_WALL_REVERSE_STATUS[item.name]} />
            ))}
          </div>
        </div>

        <div style={{ height: 20 }} />
      </div>

      {giftModal ? (
        <div
          onClick={() => setGiftModal(null)}
          style={{ position: 'absolute', inset: 0, background: 'rgba(26,44,49,0.48)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 30 }}
        >
          <div onClick={(event) => event.stopPropagation()} style={{ width: '100%', maxWidth: 320, borderRadius: 8, background: MU_H.surface, border: `0.5px solid ${MU_H.hairlineStrong}`, overflow: 'hidden' }}>
            <div style={{ padding: 22, background: MU_H.gradRouge, textAlign: 'center', position: 'relative' }}>
              <button type="button" onClick={() => setGiftModal(null)} style={{ position: 'absolute', top: 12, right: 12, width: 28, height: 28, borderRadius: 8, background: 'rgba(251,247,244,0.12)', color: '#F6F2EF', fontSize: 16, cursor: 'pointer' }}>×</button>
              <div style={{ width: 74, height: 74, margin: '0 auto', borderRadius: 26, background: 'rgba(251,247,244,0.12)', border: '1px solid rgba(251,247,244,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38 }}>{giftModal.emoji}</div>
              <div style={{ marginTop: 12, fontFamily: MU_H.fontSerif, fontSize: 20, color: '#F6F2EF', letterSpacing: '0.04em' }}>{giftModal.title}</div>
              <div style={{ marginTop: 6, fontSize: 16, color: MU_H.gold, fontWeight: 800 }}>{giftModal.price}</div>
            </div>
            <div style={{ padding: '14px 16px' }}>
              {[
                ['贈ったユーザー', giftModal.sender],
                ['受け取ったキャスト', giftModal.castName],
                ['対象店舗', giftModal.shop],
                ['ギフト説明', giftModal.note],
              ].map(([label, value], index) => (
                <div key={label} style={{ padding: '10px 0', borderTop: index > 0 ? `0.5px solid ${MU_H.hairline}` : 'none', display: 'flex', gap: 12 }}>
                  <div style={{ width: 64, fontSize: 11, color: MU_H.inkMid }}>{label}</div>
                  <div style={{ flex: 1, fontSize: 12, color: MU_H.ink, lineHeight: 1.6, fontWeight: 600 }}>{value}</div>
                </div>
              ))}
              <button type="button" onClick={() => setGiftModal(null)} style={{ marginTop: 10, width: '100%', height: 42, borderRadius: 21, background: 'transparent', border: `0.5px solid ${MU_H.gold}`, color: MU_H.goldDeep, fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>了解</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MU_CitySelector() {
  const storedLocation = MU_getStoredLocation();
  const initialGroup = MU_HOME_CITY_SELECTOR_DATA.find((item) => item.regionId === storedLocation.regionId) || MU_HOME_CITY_SELECTOR_DATA[0];
  const initialCity = initialGroup.cities.find((item) => item.name === storedLocation.city) || initialGroup.cities[0];
  const initialArea = initialCity.areas.includes(storedLocation.area) ? storedLocation.area : initialCity.areas[0];

  const [keyword, setKeyword] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);
  const [expandedCities, setExpandedCities] = useState({});
  const [selectedPrefecture, setSelectedPrefecture] = useState(initialGroup.prefecture);
  const [selectedCity, setSelectedCity] = useState(initialCity.name);
  const [selectedArea, setSelectedArea] = useState(initialArea);

  const normalizedKeyword = keyword.trim().toLowerCase();
  const selectedGroup = MU_HOME_CITY_SELECTOR_DATA.find((item) => item.prefecture === selectedPrefecture) || MU_HOME_CITY_SELECTOR_DATA[0];
  const cityOptions = selectedGroup.cities;
  const selectedCityRecord = cityOptions.find((item) => item.name === selectedCity) || cityOptions[0];
  const areaOptions = selectedCityRecord.areas;
  const filteredCities = cityOptions.filter((city) => {
    if (!normalizedKeyword) return true;
    return `${city.name} ${city.areas.join(' ')}`.toLowerCase().includes(normalizedKeyword);
  });
  const hotAreas = selectedGroup.hotAreas.filter((area) => !normalizedKeyword || area.toLowerCase().includes(normalizedKeyword));

  function choosePrefecture(prefecture) {
    const nextGroup = MU_HOME_CITY_SELECTOR_DATA.find((item) => item.prefecture === prefecture) || MU_HOME_CITY_SELECTOR_DATA[0];
    setSelectedPrefecture(nextGroup.prefecture);
    setSelectedCity(nextGroup.cities[0].name);
    setSelectedArea(nextGroup.cities[0].areas[0]);
    setExpandedCities({});
    setActiveMenu(null);
  }

  function chooseCity(city) {
    const nextCity = cityOptions.find((item) => item.name === city) || cityOptions[0];
    setSelectedCity(nextCity.name);
    setSelectedArea(nextCity.areas[0]);
    setActiveMenu(null);
  }

  function chooseArea(area, cityName = selectedCity) {
    setSelectedCity(cityName);
    setSelectedArea(area);
    setActiveMenu(null);
  }

  function toggleExpanded(cityName) {
    setExpandedCities((prev) => ({ ...prev, [cityName]: !prev[cityName] }));
  }

  function confirmLocation() {
    const nextLocation = {
      regionId: selectedGroup.regionId,
      prefecture: selectedPrefecture,
      city: selectedCity,
      area: selectedArea,
    };
    MU_setStoredRegionId(selectedGroup.regionId);
    MU_setStoredLocation(nextLocation);
    window.dispatchEvent(new Event('mu:region-change'));
    window.__nav?.back();
  }

  const renderMenuButton = (label, value, menuKey, options, onSelect) => (
    <div style={{ position: 'relative', minWidth: 0 }}>
      <div style={{ marginBottom: 8, fontSize: 10, color: MU_H.inkLow, letterSpacing: '0.06em' }}>{label}</div>
      <button type="button" onClick={() => setActiveMenu((prev) => (prev === menuKey ? null : menuKey))} style={{ width: '100%', height: 42, padding: '0 12px', borderRadius: 6, background: '#FFFFFF', border: `0.5px solid ${menuKey === 'area' ? MU_H.gold : MU_H.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14, color: MU_H.ink, cursor: 'pointer' }}>
        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</span>
        <svg width="10" height="10" viewBox="0 0 12 12" fill={MU_H.inkLow}><path d="M2 4 L6 8 L10 4" /></svg>
      </button>
      {activeMenu === menuKey ? (
        <div style={{ position: 'absolute', left: 0, right: 0, top: 'calc(100% + 8px)', zIndex: 10, background: '#FFFFFF', borderRadius: 8, border: `0.5px solid ${MU_H.hairlineStrong}`, padding: 6 }}>
          {options.map((option) => (
            <button key={option} type="button" onClick={() => onSelect(option)} style={{ width: '100%', minHeight: 36, padding: '0 10px', borderRadius: 6, textAlign: 'left', background: value === option ? 'rgba(164, 150, 115, 0.1)' : 'transparent', color: value === option ? MU_H.goldDeep : MU_H.inkMid, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );

  return (
    <div style={{ width: '100%', height: '100%', background: MU_H.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 12% 0%, rgba(212,188,140,0.22), transparent 28%), linear-gradient(180deg, #F6F2EF 0%, #F2EEEB 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 116 }}>
        <div style={{ padding: 'calc(env(safe-area-inset-top, 0px) + 10px) 12px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ height: 34, padding: '0 12px', borderRadius: 17, background: 'rgba(255,255,255,0.72)', border: `0.5px solid ${MU_H.hairline}`, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: 6, background: 'transparent', border: `0.5px solid ${MU_H.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MU_H.goldDeep }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2 C8 2 5 5 5 9 C5 14 12 22 12 22 C12 22 19 14 19 9 C19 5 16 2 12 2 Z" /><circle cx="12" cy="9" r="2.5" /></svg>
              </div>
              <div style={{ fontSize: 12, color: MU_H.inkMid }}>{`${selectedPrefecture} · ${selectedCity} · ${selectedArea}`}</div>
              <svg width="10" height="10" viewBox="0 0 12 12" fill={MU_H.inkLow}><path d="M2 4 L6 8 L10 4" /></svg>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.88)', border: `0.5px solid ${MU_H.hairline}`, borderRadius: 8, overflow: 'visible' }}>
            <div style={{ padding: '16px 16px 14px', borderBottom: `0.5px solid ${MU_H.hairline}` }}>
              <div style={{ fontFamily: MU_H.fontBrand, fontSize: 10, color: MU_H.goldDeep, letterSpacing: '0.24em' }}>AREA SELECT</div>
              <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontFamily: MU_H.fontSerif, fontSize: 18, color: MU_H.ink }}>エリア選択</div>
                <button type="button" onClick={() => window.__nav?.back()} style={{ width: 30, height: 30, borderRadius: 15, border: `0.5px solid ${MU_H.hairlineStrong}`, background: '#FFF', color: MU_H.inkLow, cursor: 'pointer', fontSize: 14 }}>×</button>
              </div>
            </div>

            <div style={{ padding: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 14px 1fr 14px 1fr', alignItems: 'end', gap: 0, marginBottom: 18 }}>
                {renderMenuButton('prefecture', selectedPrefecture, 'prefecture', MU_HOME_CITY_SELECTOR_DATA.map((item) => item.prefecture), choosePrefecture)}
                <div style={{ textAlign: 'center', color: MU_H.goldDeep, paddingBottom: 13 }}>›</div>
                {renderMenuButton('city', selectedCity, 'city', cityOptions.map((item) => item.name), chooseCity)}
                <div style={{ textAlign: 'center', color: MU_H.goldDeep, paddingBottom: 13 }}>›</div>
                {renderMenuButton('region / area', selectedArea, 'area', areaOptions, (value) => chooseArea(value, selectedCity))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: MU_H.goldDeep, fontWeight: 700 }}>
                  <span style={{ color: '#F08A2B' }}>🔥</span>
                  <span>人気エリア</span>
                </div>
                <button type="button" onClick={() => setKeyword('')} style={{ fontSize: 11, color: MU_H.inkLow, cursor: 'pointer' }}>すべてのエリア ›</button>
              </div>

              <div className="mu-hide-scrollbar" style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 14, marginBottom: 14 }}>
                {hotAreas.map((area) => {
                  const active = selectedArea === area;
                  return (
                    <button key={area} type="button" onClick={() => {
                      const city = cityOptions.find((item) => item.areas.includes(area));
                      if (city) chooseArea(area, city.name);
                    }} style={{ flexShrink: 0, height: 34, padding: '0 18px', borderRadius: 17, background: '#FFFFFF', color: active ? MU_H.goldDeep : MU_H.inkMid, border: `0.5px solid ${active ? MU_H.gold : MU_H.hairline}`, fontSize: 12, fontWeight: active ? 700 : 500, boxShadow: 'none', cursor: 'pointer' }}>
                      {area}
                    </button>
                  );
                })}
              </div>

              <div style={{ paddingTop: 6, borderTop: `0.5px solid ${MU_H.hairline}` }}>
                <div style={{ marginBottom: 10, fontSize: 14, color: MU_H.inkMid }}>エリアから選択</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {filteredCities.map((city) => {
                    const expanded = !!expandedCities[city.name];
                    const shownAreas = expanded ? city.areas : city.areas.slice(0, 4);
                    return (
                      <div key={city.name} style={{ paddingTop: 12, borderTop: `0.5px solid ${MU_H.hairline}` }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '62px 1fr 18px', alignItems: 'start', gap: 10 }}>
                          <div style={{ paddingTop: 8, fontSize: 14, color: MU_H.inkMid }}>{city.name}</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {shownAreas.map((area) => {
                              const active = selectedCity === city.name && selectedArea === area;
                              return (
                                <button key={area} type="button" onClick={() => chooseArea(area, city.name)} style={{ minWidth: 50, height: 28, padding: '0 12px', borderRadius: 8, background: active ? 'rgba(212,188,140,0.26)' : '#FFFFFF', color: active ? MU_H.goldDeep : MU_H.inkLow, border: `0.5px solid ${active ? MU_H.goldLight : MU_H.hairline}`, fontSize: 11, fontWeight: active ? 700 : 500, cursor: 'pointer' }}>
                                  {area}
                                </button>
                              );
                            })}
                            {city.areas.length > 4 ? (
                              <button type="button" onClick={() => toggleExpanded(city.name)} style={{ height: 28, padding: '0 12px', borderRadius: 8, background: '#FFFFFF', color: MU_H.inkLow, border: `0.5px solid ${MU_H.hairline}`, fontSize: 11, cursor: 'pointer' }}>
                                もっと見る
                              </button>
                            ) : null}
                          </div>
                          <button type="button" onClick={() => toggleExpanded(city.name)} style={{ marginTop: 4, color: MU_H.inkLow, cursor: 'pointer' }}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill={MU_H.inkLow} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 180ms ease' }}>
                              <path d="M2 4 L6 8 L10 4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 18px calc(env(safe-area-inset-bottom, 0px) + 10px)', background: 'linear-gradient(180deg, rgba(251,247,244,0) 0%, rgba(251,247,244,0.94) 18%, rgba(251,247,244,0.98) 100%)' }}>
        <button type="button" onClick={confirmLocation} style={{ width: '100%', height: 48, borderRadius: 8, background: 'transparent', border: `0.5px solid ${MU_H.gold}`, color: MU_H.goldDeep, fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2 C8 2 5 5 5 9 C5 14 12 22 12 22 C12 22 19 14 19 9 C19 5 16 2 12 2 Z" /><circle cx="12" cy="9" r="2.5" /></svg>
            このエリアに決定
          </span>
        </button>
      </div>
    </div>
  );
}

function MU_HomeGiftDetail() {
  const detail = MU_getGiftDetailContext();

  return (
    <div style={{ width: '100%', height: '100%', background: MU_H.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 40 }}>
        <div style={{ paddingTop: MU_TOP_SPACING }}>
          <div style={{ padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <button type="button" onClick={() => window.__nav?.back()} style={{ width: 36, height: 36, borderRadius: 8, background: '#FFFFFF', border: `0.5px solid ${MU_H.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MU_H.ink} strokeWidth="2"><path d="M15 6 L9 12 L15 18" strokeLinecap="round" /></svg>
            </button>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontFamily: MU_H.fontBrand, fontSize: 10, color: MU_H.goldDeep, letterSpacing: '0.24em' }}>GIFT DETAIL</div>
              <div style={{ fontFamily: MU_H.fontSerif, fontSize: 15, color: MU_H.ink, letterSpacing: '0.08em' }}>ギフト詳細</div>
            </div>
            <div style={{ width: 36 }} />
          </div>
        </div>

        <div style={{ margin: '14px 20px 0', padding: 22, borderRadius: 8, background: MU_H.gradRouge, border: `0.5px solid ${MU_H.rougeSoft}`, textAlign: 'center' }}>
          <div style={{ width: 86, height: 86, margin: '0 auto', borderRadius: 30, background: 'rgba(251,247,244,0.12)', border: '1px solid rgba(251,247,244,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42 }}>
            {detail.emoji}
          </div>
          <div style={{ marginTop: 16, fontFamily: MU_H.fontSerif, fontSize: 22, color: '#F6F2EF', letterSpacing: '0.04em' }}>{detail.title}</div>
          <div style={{ marginTop: 8, fontSize: 18, color: MU_H.gold, fontWeight: 800 }}>{detail.price}</div>
        </div>

        <div style={{ margin: '14px 20px 0', borderRadius: 8, background: MU_H.surface, border: `0.5px solid ${MU_H.hairline}`, overflow: 'hidden' }}>
          {[
            ['贈ったユーザー', detail.sender],
            ['受け取ったキャスト', detail.castName],
            ['対象店舗', detail.shop],
            ['ギフト説明', detail.note],
          ].map(([label, value], index) => (
            <div key={label} style={{ padding: '14px 16px', borderTop: index > 0 ? `0.5px solid ${MU_H.hairline}` : 'none', display: 'flex', gap: 12 }}>
              <div style={{ width: 70, fontSize: 11, color: MU_H.inkMid }}>{label}</div>
              <div style={{ flex: 1, fontSize: 12, color: MU_H.ink, lineHeight: 1.6, fontWeight: 600 }}>{value}</div>
            </div>
          ))}
        </div>

        <div style={{ margin: '14px 20px 0', display: 'flex', gap: 10 }}>
          <button
            type="button"
            onClick={() => window.__nav?.open('cast-detail')}
            style={{ flex: 1, height: 44, borderRadius: 8, background: MU_H.surface, border: `0.5px solid ${MU_H.hairlineStrong}`, color: MU_H.goldDeep, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
          >
            キャストを見る
          </button>
          <button
            type="button"
            onClick={() => window.__nav?.open('chat')}
            style={{ flex: 1.2, height: 44, borderRadius: 8, background: 'transparent', border: `0.5px solid ${MU_H.gold}`, color: MU_H.goldDeep, fontSize: 12, fontWeight: 800, cursor: 'pointer' }}
          >
            ギフトを送る
          </button>
        </div>
      </div>
    </div>
  );
}

function MU_HomeSearch() {
  const storedLocation = MU_getStoredLocation();
  const opsConfig = useMUHomeOpsConfig(storedLocation);
  const searchTags = MU_buildSearchTags(opsConfig?.search_keywords);
  const searchSections = MU_buildSearchSections(opsConfig?.recommend_slots, opsConfig?.search_keywords);
  const [keyword, setKeyword] = useState('');
  const [history, setHistory] = useState(['七海', '銀座', 'ペア特典']);
  const normalizedKeyword = keyword.trim().toLowerCase();

  const resultGroups = [
    {
      key: 'stores',
      title: '店舗',
      items: searchSections.stores.filter((item) => !normalizedKeyword || `${item.title} ${item.sub}`.toLowerCase().includes(normalizedKeyword)),
    },
    {
      key: 'casts',
      title: 'キャスト',
      items: searchSections.casts.filter((item) => !normalizedKeyword || `${item.title} ${item.sub}`.toLowerCase().includes(normalizedKeyword)),
    },
    {
      key: 'topics',
      title: 'おすすめ検索',
      items: searchSections.topics.filter((item) => !normalizedKeyword || `${item.title} ${item.sub}`.toLowerCase().includes(normalizedKeyword)),
    },
  ].filter((group) => group.items.length > 0);

  function submitKeyword(next) {
    const finalKeyword = next.trim();
    if (!finalKeyword) return;
    setKeyword(finalKeyword);
    setHistory((prev) => [finalKeyword, ...prev.filter((item) => item !== finalKeyword)].slice(0, 6));
  }

  return (
    <div style={{ width: '100%', height: '100%', background: MU_H.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 40 }}>
        <div style={{ paddingTop: MU_TOP_SPACING }}>
          <div style={{ padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MU_H.ink} strokeWidth="2" style={{ cursor: 'pointer' }} onClick={() => window.__nav?.back()}><path d="M15 6 L9 12 L15 18" strokeLinecap="round" /></svg>
            <div style={{ flex: 1, padding: '10px 14px', borderRadius: 8, background: '#FFFFFF', border: `0.5px solid ${MU_H.hairlineStrong}`, display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MU_H.goldDeep} strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M16 16 L20 20" strokeLinecap="round" /></svg>
              <input value={keyword} onChange={(event) => setKeyword(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') submitKeyword(keyword); }} placeholder="店舗・キャスト・イベント・求人を検索" style={{ flex: 1, minWidth: 0, fontSize: 12, color: MU_H.ink, background: 'transparent' }} />
            </div>
            <button type="button" onClick={() => submitKeyword(keyword)} style={{ fontSize: 12, color: MU_H.goldDeep, fontWeight: 700, cursor: 'pointer' }}>検索</button>
          </div>
        </div>

        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_H.hairlineStrong}` }}>
          <div style={{ fontFamily: MU_H.fontBrand, fontSize: 10, color: MU_H.goldDeep, letterSpacing: '0.24em' }}>SEARCH HUB</div>
          <div style={{ marginTop: 5, fontFamily: MU_H.fontSerif, fontSize: 18, color: MU_H.ink }}>{`${storedLocation.prefecture}の店舗、キャスト、イベントをすばやく検索`}</div>
        </div>

        <window.MU_SectionTitle ja="人気検索" en="HOT KEYWORDS" pad="14px 20px 0" />
        <div className="mu-hide-scrollbar" style={{ display: 'flex', gap: 8, padding: '0 20px 8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {searchTags.map((tag) => (
            <button key={tag} type="button" onClick={() => submitKeyword(tag)} style={{ flexShrink: 0, height: 32, padding: '0 14px', borderRadius: 999, background: '#FFFFFF', border: `0.5px solid ${MU_H.hairline}`, color: MU_H.ink, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
              {tag}
            </button>
          ))}
        </div>

        <window.MU_SectionTitle ja="検索履歴" en="RECENT" pad="10px 20px 0" />
        <div style={{ margin: '0 20px 14px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {history.map((item) => (
            <button key={item} type="button" onClick={() => submitKeyword(item)} style={{ height: 30, padding: '0 12px', borderRadius: 999, background: MU_H.surface, border: `0.5px solid ${MU_H.hairline}`, fontSize: 10, color: MU_H.inkMid, cursor: 'pointer' }}>
              {item}
            </button>
          ))}
        </div>

        {resultGroups.map((group) => (
          <div key={group.key}>
            <window.MU_SectionTitle ja={group.title} en={group.key.toUpperCase()} pad="8px 20px 0" />
            <div style={{ margin: '0 20px 14px', borderRadius: 8, overflow: 'hidden', background: MU_H.surface, border: `0.5px solid ${MU_H.hairline}` }}>
              {group.items.map((item, index) => (
                <button key={item.title} type="button" onClick={() => window.__nav?.open(item.target)} style={{ width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderTop: index > 0 ? `0.5px solid ${MU_H.hairline}` : 'none', textAlign: 'left', cursor: 'pointer' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 8, background: '#FBF8F4', border: `0.5px solid ${MU_H.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {renderSearchIcon(group.key)}
                  </div>
                  <div style={{ flex: 1, marginLeft: 2 }}>
                    <div style={{ fontFamily: MU_H.fontSerif, fontSize: 15, color: MU_H.ink, fontWeight: 600 }}>{item.title}</div>
                    <div style={{ marginTop: 4, fontSize: 11, color: MU_H.inkMid, opacity: 0.8 }}>{item.sub}</div>
                  </div>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: MU_H.bgSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={MU_H.inkLow} strokeWidth="2.5"><path d="M9 6 L15 12 L9 18" /></svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MU_HomeFilter() {
  const [values, setValues] = useState(MU_HOME_FILTER_DEFAULTS);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedTags, setSelectedTags] = useState(['mature', 'lively', 'older_sister']);

  function setField(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setActiveMenu(null);
  }

  function resetFilters() {
    setValues(MU_HOME_FILTER_DEFAULTS);
    setSelectedTags([]);
    setActiveMenu(null);
  }

  function toggleTag(tag) {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]));
  }

  const topFields = MU_HOME_FILTER_FIELDS.slice(0, 2);
  const bottomFields = MU_HOME_FILTER_FIELDS.slice(2);

  return (
    <div style={{ width: '100%', height: '100%', background: MU_H.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 14% 0%, rgba(212, 188, 140, 0.24), transparent 34%), radial-gradient(circle at 86% 10%, rgba(201, 122, 122, 0.08), transparent 24%), linear-gradient(180deg, #F6F2EF 0%, #F2EEEB 100%)' }} />

      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 118 }}>
        <div style={{ padding: 'calc(env(safe-area-inset-top, 0px) + 14px) 16px 0', position: 'sticky', top: 0, zIndex: 20, background: 'rgba(251,247,244,0.92)', backdropFilter: 'blur(12px)' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 14 }}>
            <button type="button" onClick={() => window.__nav?.back()} style={{ position: 'absolute', left: 0, width: 36, height: 36, borderRadius: 8, background: MU_H.surface, border: `0.5px solid ${MU_H.hairlineStrong}`, color: MU_H.inkMid, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6 L9 12 L15 18" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div style={{ fontFamily: MU_H.fontSerif, fontSize: 28, fontWeight: 700, color: MU_H.ink, letterSpacing: '0.02em' }}>絞り込み</div>
          </div>
        </div>

        <div style={{ padding: '22px 20px 0' }}>
          <div style={{ borderRadius: 28, background: '#FBF8F4', border: `0.5px solid ${MU_H.hairlineStrong}`, padding: '20px 16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: 15 }}>
              {topFields.map((field) => (
                <div key={field.key} style={{ display: 'grid', gridTemplateColumns: '72px minmax(0, 1fr)', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: MU_H.goldDeep }}>{field.label}</div>
                  <div style={{ position: 'relative' }}>
                    <button type="button" onClick={() => setActiveMenu((prev) => (prev === field.key ? null : field.key))} style={{ width: '100%', height: 44, padding: '0 14px', borderRadius: 8, border: `0.5px solid ${MU_H.hairlineStrong}`, background: MU_H.surface, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 15, fontWeight: 700, color: MU_H.inkMid, cursor: 'pointer' }}>
                      <span>{values[field.key]}</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MU_H.inkLow} strokeWidth="2"><path d="M6 9 L12 15 L18 9" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    {activeMenu === field.key ? (
                      <div style={{ position: 'absolute', left: 0, right: 0, top: 'calc(100% + 8px)', zIndex: 5, borderRadius: 8, border: `0.5px solid ${MU_H.hairlineStrong}`, background: '#FFFFFF', padding: 8 }}>
                        {field.options.map((option) => {
                          const active = values[field.key] === option;
                          return (
                            <button key={option} type="button" onClick={() => setField(field.key, option)} style={{ width: '100%', minHeight: 38, padding: '0 10px', borderRadius: 6, textAlign: 'left', background: active ? 'rgba(164, 150, 115, 0.1)' : 'transparent', color: active ? MU_H.goldDeep : MU_H.inkMid, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}

              <div style={{ display: 'grid', gridTemplateColumns: '72px minmax(0, 1fr)', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: MU_H.goldDeep }}>年齢</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <input value={values.ageMin} onChange={(event) => setValues((prev) => ({ ...prev, ageMin: event.target.value }))} inputMode="numeric" placeholder="MIN" style={{ flex: '1 1 0', width: 0, minWidth: 0, height: 44, padding: '0 14px', borderRadius: 8, border: `0.5px solid ${MU_H.hairlineStrong}`, background: '#FFFFFF', fontSize: 14, color: MU_H.ink }} />
                  <span style={{ color: MU_H.inkLow }}>—</span>
                  <input value={values.ageMax} onChange={(event) => setValues((prev) => ({ ...prev, ageMax: event.target.value }))} inputMode="numeric" placeholder="MAX" style={{ flex: '1 1 0', width: 0, minWidth: 0, height: 44, padding: '0 14px', borderRadius: 8, border: `0.5px solid ${MU_H.hairlineStrong}`, background: '#FFFFFF', fontSize: 14, color: MU_H.ink }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '72px minmax(0, 1fr)', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: MU_H.goldDeep }}>身長</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <input value={values.heightMin} onChange={(event) => setValues((prev) => ({ ...prev, heightMin: event.target.value }))} inputMode="numeric" placeholder="MIN" style={{ flex: '1 1 0', width: 0, minWidth: 0, height: 44, padding: '0 14px', borderRadius: 8, border: `0.5px solid ${MU_H.hairlineStrong}`, background: '#FFFFFF', fontSize: 14, color: MU_H.ink }} />
                  <span style={{ color: MU_H.inkLow }}>—</span>
                  <input value={values.heightMax} onChange={(event) => setValues((prev) => ({ ...prev, heightMax: event.target.value }))} inputMode="numeric" placeholder="MAX" style={{ flex: '1 1 0', width: 0, minWidth: 0, height: 44, padding: '0 14px', borderRadius: 8, border: `0.5px solid ${MU_H.hairlineStrong}`, background: '#FFFFFF', fontSize: 14, color: MU_H.ink }} />
                </div>
              </div>

              {bottomFields.map((field) => (
                <div key={field.key} style={{ display: 'grid', gridTemplateColumns: '72px minmax(0, 1fr)', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: MU_H.goldDeep }}>{field.label}</div>
                  <div style={{ position: 'relative' }}>
                    <button type="button" onClick={() => setActiveMenu((prev) => (prev === field.key ? null : field.key))} style={{ width: '100%', height: 44, padding: '0 14px', borderRadius: 8, border: `0.5px solid ${MU_H.hairlineStrong}`, background: MU_H.surface, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 15, fontWeight: 700, color: MU_H.inkMid, cursor: 'pointer' }}>
                      <span>{values[field.key]}</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MU_H.inkLow} strokeWidth="2"><path d="M6 9 L12 15 L18 9" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    {activeMenu === field.key ? (
                      <div style={{ position: 'absolute', left: 0, right: 0, top: 'calc(100% + 8px)', zIndex: 5, borderRadius: 8, border: `0.5px solid ${MU_H.hairlineStrong}`, background: '#FFFFFF', padding: 8 }}>
                        {field.options.map((option) => {
                          const active = values[field.key] === option;
                          return (
                            <button key={option} type="button" onClick={() => setField(field.key, option)} style={{ width: '100%', minHeight: 38, padding: '0 10px', borderRadius: 6, textAlign: 'left', background: active ? 'rgba(164, 150, 115, 0.1)' : 'transparent', color: active ? MU_H.goldDeep : MU_H.inkMid, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 30 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: MU_H.goldDeep }}>その他タグ</div>
              <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {MU_HOME_FILTER_TAGS.map((tag) => {
                  const active = selectedTags.includes(tag.value);
                  return (
                    <button key={tag.value} type="button" onClick={() => toggleTag(tag.value)} style={{ padding: '10px 16px', borderRadius: 8, border: `0.5px solid ${active ? 'rgba(164, 150, 115, 0.34)' : MU_H.hairlineStrong}`, background: active ? 'linear-gradient(180deg, rgba(212,188,140,0.22), rgba(255,255,255,0.92))' : '#FFFFFF', color: active ? MU_H.goldDeep : MU_H.inkMid, fontSize: 13, fontWeight: 700, boxShadow: active ? MU_H.shadowGold : MU_H.shadowSm, cursor: 'pointer' }}>
                      {tag.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '16px 24px calc(env(safe-area-inset-bottom, 0px) + 10px)', background: 'rgba(251,247,244,0.96)', backdropFilter: 'blur(12px)', borderTop: `0.5px solid ${MU_H.hairline}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button type="button" onClick={resetFilters} style={{ flex: 1, height: 48, borderRadius: 999, border: `1px solid ${MU_H.gold}`, background: '#FFFFFF', color: MU_H.goldDeep, fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>リセット</button>
          <button type="button" onClick={() => window.__nav?.back()} style={{ flex: 2.1, height: 48, borderRadius: 999, background: 'transparent', border: `0.5px solid ${MU_H.gold}`, color: MU_H.goldDeep, fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>適用</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { MU_Home, MU_HomeSearch, MU_HomeFilter, MU_CitySelector, MU_HomeGiftDetail });
