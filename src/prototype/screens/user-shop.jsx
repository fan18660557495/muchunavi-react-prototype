import { useEffect, useMemo, useState } from 'react';

const MU_S = window.MU_TOKENS;
const MU_TOP_SPACING = window.MU_TOP_SPACING || 32;

const MU_SHOP_IMAGES = {
  aria: 'https://images.pexels.com/photos/36092418/pexels-photo-36092418.jpeg?auto=compress&cs=tinysrgb&w=1200',
  velvet: 'https://images.pexels.com/photos/6266446/pexels-photo-6266446.jpeg?auto=compress&cs=tinysrgb&w=1200',
  laRose: 'https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=1200',
  blackRose: 'https://images.pexels.com/photos/941864/pexels-photo-941864.jpeg?auto=compress&cs=tinysrgb&w=1200',
  noble: 'https://images.pexels.com/photos/7245333/pexels-photo-7245333.jpeg?auto=compress&cs=tinysrgb&w=1200',
  lumiere: 'https://images.pexels.com/photos/5371577/pexels-photo-5371577.jpeg?auto=compress&cs=tinysrgb&w=1200',
  lune: 'https://images.pexels.com/photos/29737994/pexels-photo-29737994.jpeg?auto=compress&cs=tinysrgb&w=1200',
  aoyama: 'https://images.pexels.com/photos/2531186/pexels-photo-2531186.jpeg?auto=compress&cs=tinysrgb&w=1200',
};
const MU_SHOP_LOCATION_STORAGE_KEY = 'mu_home_location';

const MU_SHOP_FILTER_TABS = [
  { id: 'recommend', label: 'おすすめ' },
  { id: 'nearby', label: '近くの店舗' },
  { id: 'favorites', label: 'お気に入り' },
];

const MU_SHOP_CATEGORIES = [
  { id: 'all', label: 'すべて' },
  { id: 'lounge', label: 'Lounge' },
  { id: 'club', label: 'Club' },
  { id: 'snack', label: 'Snack' },
  { id: 'cabaret', label: 'Cabaret' },
  { id: 'bar', label: 'Bar' },
];

const MU_SHOP_REGIONS = [
  { id: 'tokyo', label: '東京都', area: '銀座 · 六本木', en: 'TOKYO', desc: '中央区 / 港区', hot: '人気 128 店舗' },
  { id: 'osaka', label: '大阪府', area: '北新地 · 心斎橋', en: 'OSAKA', desc: '北区 / 中央区', hot: '人気 96 店舗' },
  { id: 'fukuoka', label: '福岡県', area: '中洲 · 天神', en: 'FUKUOKA', desc: '博多区 / 中央区', hot: '人気 54 店舗' },
  { id: 'aichi', label: '愛知県', area: '錦三丁目 · 栄', en: 'AICHI', desc: '名古屋市中区', hot: '人気 63 店舗' },
  { id: 'hokkaido', label: '北海道', area: 'すすきの · 札幌駅', en: 'HOKKAIDO', desc: '札幌市中央区', hot: '人気 41 店舗' },
];

const MU_SHOP_ITEMS = [
  { id: 'mio', region: 'tokyo', size: 'L', name: '銀座 澪', en: 'Ginza Mio', area: '銀座', sub: '会員制ラウンジ', dist: 1.2, casts: 32, setPrice: 30000, features: ['個室あり', '同伴可', '高層階'], tag: 'PREMIUM', open: true, src: MU_SHOP_IMAGES.aria, category: 'lounge', favorite: true, recommendScore: 98 },
  { id: 'yohaku', region: 'tokyo', size: 'M', name: '南青山 余白', en: 'Minamiaoyama Yohaku', area: '南青山', sub: 'ラウンジ', dist: 3.1, casts: 28, setPrice: 28000, features: ['静か', 'カウンター', '同伴可'], open: true, src: MU_SHOP_IMAGES.laRose, category: 'lounge', favorite: false, recommendScore: 92 },
  { id: 'en', region: 'tokyo', size: 'M', name: '六本木 en', en: 'Roppongi en', area: '六本木', sub: 'バーラウンジ', dist: 2.4, casts: 35, setPrice: 32000, features: ['カウンター', '夜景', '同伴可'], tag: 'ACTIVE', open: true, src: MU_SHOP_IMAGES.velvet, category: 'club', favorite: true, recommendScore: 90 },
  { id: 'calm', region: 'tokyo', size: 'L', name: '麻布 Calm', en: 'Azabu Calm', area: '麻布', sub: 'プライベートラウンジ', dist: 2.0, casts: 24, setPrice: 35000, features: ['個室あり', '静か', '同伴可'], tag: 'NEW', open: true, src: MU_SHOP_IMAGES.noble, category: 'lounge', favorite: false, recommendScore: 88 },
  { id: 'kuro', region: 'tokyo', size: 'L', name: '恵比寿 Kuro', en: 'Ebisu Kuro', area: '恵比寿', sub: 'ラウンジ', dist: 2.6, casts: 26, setPrice: 27000, features: ['夜景', 'カウンター', '同伴可'], open: true, src: MU_SHOP_IMAGES.lumiere, category: 'lounge', favorite: false, recommendScore: 95 },
  { id: 'aria', region: 'tokyo', size: 'L', name: 'LOUNGE ARIA', en: 'Lounge Aria', area: '銀座', sub: '会員制ラウンジ', dist: 1.2, casts: 18, setPrice: 32000, features: ['個室あり', '同伴可', 'PREMIUM'], tag: 'PREMIUM', open: true, src: MU_SHOP_IMAGES.aria, category: 'lounge', favorite: true, recommendScore: 96 },
  { id: 'noble', region: 'tokyo', size: 'M', name: 'NOBLE 銀座', en: 'NOBLE', area: '銀座', sub: 'キャバレー', dist: 0.9, casts: 12, setPrice: 26000, features: ['個室あり', '同伴可'], tag: 'NEW', open: true, src: MU_SHOP_IMAGES.noble, category: 'cabaret', favorite: true, recommendScore: 86 },
  { id: 'lumiere', region: 'tokyo', size: 'L', name: 'Salon Lumiere', en: 'Salon Lumiere', area: '六本木', sub: 'ラウンジ', dist: 2.8, casts: 20, setPrice: 34000, features: ['夜景', '個室あり', 'PREMIUM'], tag: 'PREMIUM', open: true, src: MU_SHOP_IMAGES.lumiere, category: 'lounge', favorite: false, recommendScore: 93 },
  { id: 'lune', region: 'tokyo', size: 'M', name: 'Club Lune', en: 'Club Lune', area: '麻布', sub: 'クラブ', dist: 3.6, casts: 11, setPrice: 25000, features: ['夜景', '同伴可'], src: MU_SHOP_IMAGES.lune, category: 'club', favorite: false, recommendScore: 78 },
  { id: 'aoyama', region: 'tokyo', size: 'L', name: 'ARIA 青山', en: 'ARIA Aoyama', area: '南青山', sub: 'ラウンジ', dist: 3.4, casts: 16, setPrice: 30000, features: ['静か', '個室あり', '同伴可'], open: true, src: MU_SHOP_IMAGES.aoyama, category: 'lounge', favorite: true, recommendScore: 84 },
  { id: 'blackrose', region: 'tokyo', size: 'S', name: 'BLACK ROSE', en: 'Black Rose', area: '銀座', sub: 'バー', dist: 0.7, casts: 9, setPrice: 22000, features: ['カウンター', '深夜営業'], src: MU_SHOP_IMAGES.blackRose, category: 'bar', favorite: false, recommendScore: 76 },
  { id: 'larose', region: 'tokyo', size: 'L', name: 'La Rose', en: 'La Rose', area: '南青山', sub: 'スナック', dist: 3.1, casts: 15, setPrice: 24000, features: ['同伴可', '静か'], open: true, src: MU_SHOP_IMAGES.laRose, category: 'snack', favorite: true, recommendScore: 80 },
  { id: 'osaka-lux', region: 'osaka', size: 'L', name: 'CLUB LUXE', en: 'Club Luxe', area: '北新地', dist: 1.1, casts: 17, tag: 'PREMIUM', open: true, src: MU_SHOP_IMAGES.velvet, category: 'club', favorite: false, recommendScore: 94 },
  { id: 'osaka-rouge', region: 'osaka', size: 'M', name: 'Rouge Kitashinchi', en: 'Rouge', area: '北新地', dist: 1.6, casts: 13, open: true, src: MU_SHOP_IMAGES.aria, category: 'lounge', favorite: false, recommendScore: 87 },
  { id: 'fukuoka-nakasu', region: 'fukuoka', size: 'L', name: 'NADIA NAKASU', en: 'Nadia', area: '中洲', dist: 1.5, casts: 16, tag: 'HOT', open: true, src: MU_SHOP_IMAGES.blackRose, category: 'lounge', favorite: false, recommendScore: 91 },
  { id: 'fukuoka-tenjin', region: 'fukuoka', size: 'M', name: 'Club Tenjin', en: 'Club Tenjin', area: '天神', dist: 2.1, casts: 10, open: true, src: MU_SHOP_IMAGES.lune, category: 'club', favorite: false, recommendScore: 82 },
  { id: 'aichi-sakae', region: 'aichi', size: 'L', name: 'SAKAE THE LOUNGE', en: 'Sakae Lounge', area: '栄', dist: 1.3, casts: 15, tag: 'NEW', open: true, src: MU_SHOP_IMAGES.aoyama, category: 'lounge', favorite: false, recommendScore: 89 },
  { id: 'aichi-nishiki', region: 'aichi', size: 'M', name: 'NISHIKI No.8', en: 'Nishiki', area: '錦三丁目', dist: 1.9, casts: 12, open: true, src: MU_SHOP_IMAGES.noble, category: 'cabaret', favorite: false, recommendScore: 84 },
  { id: 'hokkaido-susukino', region: 'hokkaido', size: 'L', name: 'Susukino Rouge', en: 'Susukino Rouge', area: 'すすきの', dist: 1.4, casts: 14, tag: 'ACTIVE', open: true, src: MU_SHOP_IMAGES.laRose, category: 'snack', favorite: false, recommendScore: 88 },
  { id: 'hokkaido-sapporo', region: 'hokkaido', size: 'M', name: 'SAPPORO NINE', en: 'Sapporo Nine', area: '札幌駅', dist: 2.2, casts: 9, open: true, src: MU_SHOP_IMAGES.lumiere, category: 'bar', favorite: false, recommendScore: 79 },
];

const MU_SHOP_DETAIL_MAP = {
  aria: {
    info: {
      title: 'LOUNGE ARIA',
      sub: '銀座7丁目本店 · 営業中',
      premium: 'PREMIUM',
      type: 'LOUNGE',
      coupon: '初回来店 10,000円OFF',
      address: '東京都中央区銀座 X-X-X 4F',
      phone: '03-XXXX-1024',
      hours: '20:00 - 翌 4:00 (L.O. 3:30)',
      closed: '日曜',
      budget: '30,000 - 80,000 円 / 1名',
    },
    recruit: {
      title: 'LOUNGE ARIA 求人情報',
      summary: '銀座の上質なLounge。経験者キャストとホールスタッフを中心に募集中で、日払い相談や寮紹介にも対応しています。',
      salary: '時給 6,500 - 12,000円 + 高額指名バック',
      shifts: '20:00 - 翌1:00、自由シフト、週1日から相談可',
      benefits: ['日払い相談可', '送迎あり', '寮紹介', '未経験研修'],
      contact: '店長直通：090-XXXX-2201',
    },
    coupons: [
      { title: '初回来店 10,000円OFF', sub: '50,000円以上で利用可 · 新規限定', tag: 'おすすめ', status: '受取可能' },
      { title: 'シャンパンコース 15%OFF', sub: '対象シャンパンコースに会員PT併用可', tag: '期間限定', status: '受取可能' },
      { title: '平日個室優先クーポン', sub: '月曜から木曜の20:00前来店で利用可', tag: '平日', status: '受取済み' },
      { title: 'ペア同卓 6,000円OFF', sub: '2名来店かつ同卓予約時に利用可', tag: 'ペア', status: '受取可能' },
      { title: '誕生月指名特典クーポン', sub: '誕生月の来店で指名ドリンク1杯進呈', tag: '誕生月', status: '受取可能' },
      { title: '深夜再来店クーポン', sub: '00:30以降の再入店で 5,000円OFF', tag: '深夜', status: '受取済み' },
      { title: '雨の日来店サポート券', sub: '雨天の21:00以降入店で 3,000円OFF', tag: '天候', status: '受取可能' },
      { title: 'VIP 同伴フレンド券', sub: '新規の友人1名同伴で 8,000円OFF', tag: 'VIP', status: '受取可能' },
    ],
    events: [
      { title: 'Friday Champagne Night', sub: '22:00以降は対象シャンパンが1本無料', meta: '今週人気 98' },
      { title: '4月ニューキャストウィーク', sub: '初回来店なら新規割引を重ねて利用可能', meta: '開催中' },
      { title: '七海バースデー月間ナイト', sub: '限定シャンパンタワーと記念撮影特典', meta: '4/26 開始' },
      { title: '銀座 After 1AM', sub: '深夜帯は営業時間延長、来店特典も強化', meta: '深夜限定' },
      { title: 'VIP 指名ランキング週間', sub: '週間指名売上TOP3に限定席を案内', meta: 'ランキング企画' },
      { title: '平日個室アップグレード週', sub: '月曜から木曜の個室予約は1ランク無料アップ', meta: '平日限定' },
      { title: 'セレクトボトルナイト', sub: '限定ドリンクメニュー、対象ボトルは半額試飲', meta: '限定席' },
      { title: '月末リピーター感謝デー', sub: '再来店会員に追加PTとウェルカムドリンク進呈', meta: '月末限定' },
    ],
    casts: [
      { name: '七海', lvl: 7, state: '出勤中', src: 'https://images.pexels.com/photos/11746333/pexels-photo-11746333.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '美咲', lvl: 6, state: '22:00 オンライン', src: 'https://images.pexels.com/photos/1066134/pexels-photo-1066134.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '凛', lvl: 5, state: '出勤中', src: 'https://images.pexels.com/photos/15262855/pexels-photo-15262855.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '蘭', lvl: 6, state: '予約可', src: 'https://images.pexels.com/photos/14456935/pexels-photo-14456935.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '優花', lvl: 4, state: '予約可', src: 'https://images.pexels.com/photos/32197366/pexels-photo-32197366.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '葵', lvl: 5, state: '休み', src: 'https://images.pexels.com/photos/32280799/pexels-photo-32280799.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '真由', lvl: 5, state: '23:30 オンライン', src: 'https://images.pexels.com/photos/14456935/pexels-photo-14456935.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '玲奈', lvl: 4, state: '予約可', src: 'https://images.pexels.com/photos/32197366/pexels-photo-32197366.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '莉子', lvl: 6, state: '出勤中', src: 'https://images.pexels.com/photos/1066134/pexels-photo-1066134.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '沙耶', lvl: 4, state: '予約可', src: 'https://images.pexels.com/photos/15262855/pexels-photo-15262855.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '結衣', lvl: 5, state: '22:30 オンライン', src: 'https://images.pexels.com/photos/32280799/pexels-photo-32280799.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '心春', lvl: 4, state: '予約可', src: 'https://images.pexels.com/photos/11746333/pexels-photo-11746333.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '奈緒', lvl: 5, state: '休み', src: 'https://images.pexels.com/photos/14456935/pexels-photo-14456935.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '由奈', lvl: 6, state: '出勤中', src: 'https://images.pexels.com/photos/32197366/pexels-photo-32197366.jpeg?auto=compress&cs=tinysrgb&w=800' },
    ],
  },
  velvet: {
    info: {
      title: 'Club Velvet',
      sub: '六本木 · 営業中',
      premium: 'ACTIVE',
      type: 'CLUB',
      coupon: '平日ペア来店 8,000円OFF',
      address: '東京都港区六本木 X-X-X B1',
      phone: '03-XXXX-2308',
      hours: '21:00 - 翌 5:00',
      closed: '年中無休',
      budget: '25,000 - 70,000 円 / 1名',
    },
    recruit: {
      title: 'Club Velvet 求人情報',
      summary: '六本木で人気のClub。盛り上げ上手なキャスト、バーカウンター、イベント接客を中心に募集中で、遅番にも向いています。',
      salary: '時給 5,800 - 10,500円 + ドリンクバック',
      shifts: '21:00 - 翌3:00、週末優先',
      benefits: ['高額ドリンクバック', 'ヘアメイク補助', '深夜送迎', 'イベント報奨金'],
      contact: '採用専用ライン：080-XXXX-6618',
    },
    coupons: [
      { title: '平日ペア来店 8,000円OFF', sub: '火曜から木曜に利用可', tag: 'ペア', status: '受取可能' },
      { title: 'ウェルカムドリンク券', sub: '対象セットでスパークリング1本進呈', tag: 'ドリンク', status: '受取可能' },
      { title: 'DJ ナイト優先入場券', sub: '金土の22:00前来店で優先入場', tag: '人気', status: '受取可能' },
      { title: 'リピーター限定 10%OFF券', sub: '30日以内の再来店で利用可', tag: '再来店', status: '受取済み' },
      { title: '深夜延長クーポン', sub: '00:00以降の延長1時間が10%OFF', tag: '深夜', status: '受取可能' },
      { title: '3名同伴特典券', sub: '3名以上の来店でフルーツ盛りとウェルカムドリンク進呈', tag: 'グループ', status: '受取可能' },
      { title: 'バーカウンター優先券', sub: 'イベント夜はバーカウンター席を優先案内', tag: '優先', status: '受取済み' },
      { title: '新規指名トライアル券', sub: '新しく入店したキャストの初回指名が4,000円OFF', tag: '新人', status: '受取可能' },
    ],
    events: [
      { title: 'Velvet Friday Rush', sub: '金曜はDJコラボのスペシャルナイト', meta: '今週金曜' },
      { title: 'ニューキャストミート週間', sub: '新メンバーがオンライン、予約特典も増量中', meta: '開催中' },
      { title: 'Saturday Champagne Run', sub: '土曜24:00以降はシャンパンランキング加点あり', meta: '今週土曜' },
      { title: 'VIP 個室オープンナイト', sub: '限定で内場席を開放、記念撮影特典つき', meta: '席数限定' },
      { title: 'Midnight DJ Relay', sub: '01:00以降は第2部DJセットでさらに加速', meta: '深夜帯' },
      { title: 'はじめて来店パーティー', sub: '新規来店の相席入場で1杯目の特製ドリンク進呈', meta: '初回歓迎' },
      { title: '人気キャスト集中出勤ナイト', sub: '注目キャストが集まり、予約順で優先案内', meta: '予約ピーク' },
      { title: '月間ランキング表彰ナイト', sub: '売上ランキングと指名ランキングを店内発表', meta: 'ランキング夜' },
    ],
    casts: [
      { name: '美咲', lvl: 6, state: '出勤中', src: 'https://images.pexels.com/photos/1066134/pexels-photo-1066134.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '凛花', lvl: 5, state: '予約可', src: 'https://images.pexels.com/photos/11746333/pexels-photo-11746333.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '遥', lvl: 4, state: '23:00 オンライン', src: 'https://images.pexels.com/photos/32197366/pexels-photo-32197366.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '唯', lvl: 5, state: '出勤中', src: 'https://images.pexels.com/photos/15262855/pexels-photo-15262855.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '朱里', lvl: 4, state: '予約可', src: 'https://images.pexels.com/photos/14456935/pexels-photo-14456935.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '愛理', lvl: 5, state: '休み', src: 'https://images.pexels.com/photos/32280799/pexels-photo-32280799.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '詩織', lvl: 6, state: '出勤中', src: 'https://images.pexels.com/photos/11746333/pexels-photo-11746333.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '桃香', lvl: 4, state: '予約可', src: 'https://images.pexels.com/photos/32197366/pexels-photo-32197366.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '梨紗', lvl: 5, state: '23:30 オンライン', src: 'https://images.pexels.com/photos/1066134/pexels-photo-1066134.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '真奈', lvl: 4, state: '予約可', src: 'https://images.pexels.com/photos/15262855/pexels-photo-15262855.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '花音', lvl: 5, state: '休み', src: 'https://images.pexels.com/photos/14456935/pexels-photo-14456935.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '千夏', lvl: 6, state: '出勤中', src: 'https://images.pexels.com/photos/32280799/pexels-photo-32280799.jpeg?auto=compress&cs=tinysrgb&w=800' },
    ],
  },
  default: {
    info: {
      title: '店舗詳細',
      sub: '営業中',
      premium: 'SHOP',
      type: 'LOUNGE',
      coupon: '来店特典実施中',
      address: '東京都内店舗',
      phone: '03-XXXX-XXXX',
      hours: '20:00 - 翌 4:00',
      closed: '店舗告知に準ずる',
      budget: '25,000 - 80,000 円 / 1名',
    },
    recruit: {
      title: '店舗求人情報',
      summary: '現在この店舗ではキャスト・ホールスタッフを募集しています。詳細はまずご相談ください。',
      salary: '給与応相談',
      shifts: '自由シフト',
      benefits: ['研修サポート', '柔軟シフト'],
      contact: '店舗までお問い合わせください',
    },
    coupons: [
      { title: '来店クーポン', sub: 'この店舗で受け取れる特典', tag: '店舗', status: '受取可能' },
      { title: '初回来店 5,000円OFF', sub: '新規初回で利用可', tag: '新規', status: '受取可能' },
      { title: '平日予約特典', sub: '月曜から木曜の予約で利用可', tag: '平日', status: '受取可能' },
      { title: 'ペア来店クーポン', sub: '2名来店で4,000円OFF', tag: 'ペア', status: '受取済み' },
      { title: '深夜来店クーポン', sub: '0:00以降の来店で3,000円OFF', tag: '深夜', status: '受取可能' },
      { title: '再来店割引券', sub: '30日以内の再来店で利用可', tag: '再来店', status: '受取可能' },
      { title: '誕生月特典券', sub: '誕生月はウェルカムドリンク追加', tag: '誕生月', status: '受取可能' },
      { title: '個室アップグレード券', sub: '当日空席時にアップグレード申請可', tag: '個室', status: '受取済み' },
    ],
    events: [
      { title: '店舗イベント開催中', sub: '詳細は店舗へお問い合わせください。', meta: '更新中' },
      { title: '今週のテーマ営業', sub: '週替わりイベントとドリンク特典', meta: '今週' },
      { title: '新人キャスト特集', sub: '新メンバー登場、予約優先案内', meta: '開催中' },
      { title: '週末人気タイム', sub: '金土の人気時間帯は事前予約推奨', meta: '週末' },
      { title: '月間リピート特典', sub: 'リピーター向け店舗ポイント特典', meta: '月末' },
      { title: '深夜延長営業', sub: '深夜帯は延長営業・席数追加', meta: '深夜' },
      { title: 'ランキングイベント開催中', sub: '売上・指名ランキングを同時更新', meta: 'ランキング' },
      { title: '限定ドリンクメニュー', sub: '対象ボトルの週替わり特典', meta: 'ドリンク' },
    ],
    casts: [
      { name: '在籍キャスト', lvl: 5, state: '案内可能', src: 'https://images.pexels.com/photos/11746333/pexels-photo-11746333.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '小百合', lvl: 6, state: '出勤中', src: 'https://images.pexels.com/photos/1066134/pexels-photo-1066134.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '由依', lvl: 4, state: '22:00 オンライン', src: 'https://images.pexels.com/photos/15262855/pexels-photo-15262855.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '真央', lvl: 5, state: '予約可', src: 'https://images.pexels.com/photos/14456935/pexels-photo-14456935.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '琴音', lvl: 4, state: '出勤中', src: 'https://images.pexels.com/photos/32197366/pexels-photo-32197366.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '澪', lvl: 5, state: '休み', src: 'https://images.pexels.com/photos/32280799/pexels-photo-32280799.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '桃子', lvl: 4, state: '予約可', src: 'https://images.pexels.com/photos/11746333/pexels-photo-11746333.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '莉奈', lvl: 6, state: '出勤中', src: 'https://images.pexels.com/photos/1066134/pexels-photo-1066134.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '紗月', lvl: 5, state: '23:00 オンライン', src: 'https://images.pexels.com/photos/15262855/pexels-photo-15262855.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '結愛', lvl: 4, state: '予約可', src: 'https://images.pexels.com/photos/14456935/pexels-photo-14456935.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '心美', lvl: 5, state: '出勤中', src: 'https://images.pexels.com/photos/32197366/pexels-photo-32197366.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: '奈奈', lvl: 4, state: '予約可', src: 'https://images.pexels.com/photos/32280799/pexels-photo-32280799.jpeg?auto=compress&cs=tinysrgb&w=800' },
    ],
  },
};

const MU_SHOP_FAVORITE_KEY = '__MU_SHOP_FAVORITES';
const MU_SHOP_COUPON_DETAIL_KEY = '__MU_SHOP_COUPON_DETAIL';
const MU_SHOP_CLAIMED_COUPON_KEY = '__MU_SHOP_CLAIMED_COUPONS';
const MU_SHOP_EVENT_DETAIL_KEY = '__MU_SHOP_EVENT_DETAIL';

function MU_getFavoriteShopIds() {
  if (!window[MU_SHOP_FAVORITE_KEY]) {
    window[MU_SHOP_FAVORITE_KEY] = new Set(MU_SHOP_ITEMS.filter((shop) => shop.favorite).map((shop) => shop.id));
  }
  return window[MU_SHOP_FAVORITE_KEY];
}

function MU_isFavoriteShop(id) {
  return MU_getFavoriteShopIds().has(id);
}

function MU_getShopGallery(shop) {
  return [
    shop.src,
    MU_SHOP_IMAGES.aria,
    MU_SHOP_IMAGES.velvet,
    MU_SHOP_IMAGES.lumiere,
    MU_SHOP_IMAGES.noble,
    MU_SHOP_IMAGES.aoyama,
  ];
}

function MU_getShopVideos(shop) {
  return [
    { title: '店内の雰囲気', time: '00:18', cover: shop.src, src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4' },
    { title: '個室のムード', time: '00:12', cover: MU_SHOP_IMAGES.velvet, src: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4' },
    { title: 'バーカウンター', time: '00:09', cover: MU_SHOP_IMAGES.lumiere, src: 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4' },
  ];
}

function MU_toggleFavoriteShop(id) {
  const favorites = MU_getFavoriteShopIds();
  if (favorites.has(id)) {
    favorites.delete(id);
  } else {
    favorites.add(id);
  }
  window.dispatchEvent(new CustomEvent('mu-shop-favorites-change', { detail: { id, favorite: favorites.has(id) } }));
  return favorites.has(id);
}

function MU_setShopContext(shop) {
  window.__MU_SHOP_CONTEXT = shop;
}

function MU_getShopContext() {
  const current = window.__MU_SHOP_CONTEXT;
  if (current) return { ...current, favorite: MU_isFavoriteShop(current.id) };
  return { ...MU_SHOP_ITEMS[0], favorite: MU_isFavoriteShop(MU_SHOP_ITEMS[0].id) };
}

function MU_getClaimedCouponTitles(shopId) {
  const store = window[MU_SHOP_CLAIMED_COUPON_KEY] || (window[MU_SHOP_CLAIMED_COUPON_KEY] = {});
  if (!store[shopId]) {
    const detail = MU_SHOP_DETAIL_MAP[shopId] || MU_SHOP_DETAIL_MAP.default;
    store[shopId] = new Set(detail.coupons.filter((item) => item.status === '受取済み').map((item) => item.title));
  }
  return store[shopId];
}

function MU_isCouponClaimed(shopId, title) {
  return MU_getClaimedCouponTitles(shopId).has(title);
}

function MU_claimCoupon(shopId, title) {
  const claimed = MU_getClaimedCouponTitles(shopId);
  claimed.add(title);
  window.dispatchEvent(new CustomEvent('mu-shop-coupons-change', { detail: { shopId, title } }));
  return true;
}

function MU_buildCouponDetail(shop, item, index = 0) {
  const title = item.title;
  const titleAmount = title.match(/\d[\d,]*円OFF|[\d,]+%OFF|ドリンク1杯進呈|特典/);
  const benefitTitle = titleAmount ? titleAmount[0] : title;
  const deadline = index % 2 === 0 ? '2026/12/31 23:59まで' : '2026/11/30 23:59まで';
  const audience = item.tag === 'ペア' ? '2名様以上' : item.tag === 'グループ' ? '3名様以上' : '1名様から';
  const usageLimit = item.status === '受取済み' ? '使用済み' : '1回限り';
  const canCombine = item.tag === 'VIP' || item.tag === '期間限定' ? '他のクーポンとの併用不可' : '一部ポイントのみ併用可';
  const notes = item.sub.includes('新規') ? '新規会員または初回来店時のみご利用いただけます。' : '他の割引サービスとの併用はできません。';

  return {
    ...item,
    shopName: shop.name,
    eyebrow: `${item.tag}クーポン`,
    benefitTitle,
    deadline,
    usageLimit,
    availableStore: `${shop.name} ${shop.area}店`,
    audience,
    canCombine,
    notes,
    conditions: [
      'ご来店時に本クーポンをご提示ください。',
      `「${item.sub}」の条件を満たす場合のみ利用できます。`,
      '他のクーポン・割引との併用はできません。',
      '現金への換金はできません。',
      '本クーポンの転売・譲渡はできません。',
    ],
  };
}

function MU_setCouponDetailContext(detail) {
  window[MU_SHOP_COUPON_DETAIL_KEY] = detail;
}

function MU_getCouponDetailContext() {
  const current = window[MU_SHOP_COUPON_DETAIL_KEY];
  if (current) return current;
  const shop = MU_getShopContext();
  const detail = MU_SHOP_DETAIL_MAP[shop.id] || MU_SHOP_DETAIL_MAP.default;
  return MU_buildCouponDetail(shop, detail.coupons[0], 0);
}

function MU_buildEventDetail(shop, item, index = 0) {
  const schedules = ['19:00 - 21:00', '21:00 - 23:30', '23:30 - LAST'];
  const tones = ['SPECIAL NIGHT', 'LIMITED EVENT', 'WEEKLY FEATURE'];
  const perks = [
    '対象時間帯の来店で優先案内',
    'イベント対象ドリンクまたは特典あり',
    '混雑時は予約順で案内',
  ];

  return {
    ...item,
    shopName: shop.name,
    heroLabel: tones[index % tones.length],
    schedule: schedules[index % schedules.length],
    overview: `${item.sub} イベント対象時間や特典内容は当日の店舗案内を優先します。`,
    highlights: [
      `${shop.name} の注目イベント`,
      `${item.meta} に合わせた特典を案内`,
      '予約・来店前の確認がおすすめ',
    ],
    perks,
    notes: [
      'イベント内容は当日の営業状況により一部変更となる場合があります。',
      '人気時間帯は満席となる場合があるため、事前予約を推奨します。',
      '限定特典は対象条件を満たした場合のみ適用されます。',
    ],
  };
}

function MU_setEventDetailContext(detail) {
  window[MU_SHOP_EVENT_DETAIL_KEY] = detail;
}

function MU_getEventDetailContext() {
  const current = window[MU_SHOP_EVENT_DETAIL_KEY];
  if (current) return current;
  const shop = MU_getShopContext();
  const detail = MU_SHOP_DETAIL_MAP[shop.id] || MU_SHOP_DETAIL_MAP.default;
  return MU_buildEventDetail(shop, detail.events[0], 0);
}

function MU_normalizeShopLocationText(value) {
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

function MU_getShopStoredLocation() {
  try {
    const stored = JSON.parse(window.localStorage?.getItem(MU_SHOP_LOCATION_STORAGE_KEY) || 'null');
    if (!stored?.regionId) return { regionId: 'tokyo', prefecture: '東京都', city: '中央区', area: '銀座' };
    return {
      regionId: stored.regionId,
      prefecture: MU_normalizeShopLocationText(stored.prefecture || '東京都'),
      city: MU_normalizeShopLocationText(stored.city || '中央区'),
      area: MU_normalizeShopLocationText(stored.area || '銀座'),
    };
  } catch {
    return { regionId: 'tokyo', prefecture: '東京都', city: '中央区', area: '銀座' };
  }
}

function MU_ShopPhoto({ src, w, h, radius = 12, fullSize = false, overlay = true }) {
  const style = fullSize ? { position: 'absolute', inset: 0, width: '100%', height: '100%' } : { width: w, height: h };
  return (
    <div style={{ ...style, overflow: 'hidden', borderRadius: radius, position: fullSize ? 'absolute' : 'relative', background: '#1a2c31' }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      {overlay ? <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26, 44, 49, 0.06) 0%, rgba(26, 44, 49, 0.18) 100%)' }} /> : null}
    </div>
  );
}

function MU_getCastStatusMeta(state) {
  if (state === '出勤中') {
    return {
      label: '出勤中',
      tone: MU_S.success,
      text: '#1A2C31',
      chipBg: 'rgba(18, 226, 154, 0.16)',
      chipBorder: 'rgba(18, 226, 154, 0.42)',
      chipText: '#14875F',
      active: true,
      dimmed: false,
    };
  }

  if (state.includes('オンライン')) {
    return {
      label: state,
      tone: 'rgba(240,208,144,0.95)',
      text: '#1A2C31',
      chipBg: 'rgba(240,208,144,0.18)',
      chipBorder: 'rgba(240,208,144,0.42)',
      chipText: MU_S.goldDeep,
      active: false,
      dimmed: false,
    };
  }

  if (state === '予約可' || state === '案内可能') {
    return {
      label: state,
      tone: 'rgba(255,255,255,0.9)',
      text: '#5F5147',
      chipBg: 'rgba(164,150,115,0.1)',
      chipBorder: 'rgba(164,150,115,0.24)',
      chipText: MU_S.inkMid,
      active: false,
      dimmed: false,
    };
  }

  return {
    label: state,
    tone: 'rgba(26,44,49,0.76)',
    text: 'rgba(251,247,244,0.78)',
    chipBg: 'rgba(26,44,49,0.06)',
    chipBorder: 'rgba(26,44,49,0.12)',
    chipText: 'rgba(26,44,49,0.45)',
    active: false,
    dimmed: true,
  };
}

function MU_ShopCard({ id, size, name, en, area, dist, casts, tag, open, src, favorite = false }) {
  const heights = { S: 140, M: 180, L: 230 };
  const h = heights[size];
  const favoriteButtonSize = size === 'S' ? 24 : 28;

  return (
    <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', height: h, cursor: 'pointer' }} onClick={() => { MU_setShopContext({ id, size, name, en, area, dist, casts, tag, open, src, favorite }); window.__nav?.open('shop-detail'); }}>
      <MU_ShopPhoto src={src} w="100%" h={h} radius={10} fullSize />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26, 44, 49, 0.25) 0%, transparent 40%, rgba(26, 44, 49, 0.7) 100%)' }} />
      <div style={{ position: 'absolute', top: 7, left: 7, right: 7, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {tag ? <div style={{ padding: '2px 6px', borderRadius: 3, background: MU_S.rouge, border: `0.5px solid ${MU_S.gold}`, fontSize: 8, fontWeight: 700, color: MU_S.gold, letterSpacing: '0.15em', fontFamily: MU_S.fontBrand, alignSelf: 'flex-start' }}>{tag}</div> : null}
          {open ? (
            <div style={{ height: 18, padding: '0 7px', borderRadius: 9, background: MU_S.success, color: '#1A2C31', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3, letterSpacing: '0.05em', alignSelf: 'flex-start' }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#1A2C31' }} />
              営業中
            </div>
          ) : null}
        </div>
        <button
          type="button"
          aria-label={favorite ? 'お気に入り解除' : 'お気に入り登録'}
          onClick={(event) => {
            event.stopPropagation();
            MU_toggleFavoriteShop(id);
          }}
          style={{
            width: favoriteButtonSize,
            height: favoriteButtonSize,
            borderRadius: '50%',
            border: `0.5px solid ${favorite ? 'transparent' : 'rgba(255,255,255,0.34)'}`,
            background: 'rgba(26, 44, 49, 0.36)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: favorite ? MU_S.shadowGold : '0 6px 18px rgba(0, 0, 0, 0.18)',
            padding: 0,
          }}
        >
          <svg width={size === 'S' ? 10 : 12} height={size === 'S' ? 10 : 12} viewBox="0 0 24 24" fill={favorite ? '#1A2C31' : 'none'} stroke={favorite ? '#1A2C31' : '#F6F2EF'} strokeWidth="2">
            <path d="M12 21 C5 15 2 11 2 7 A5 5 0 0 1 12 5 A5 5 0 0 1 22 7 C22 11 19 15 12 21 Z" />
          </svg>
        </button>
      </div>
      <div style={{ position: 'absolute', bottom: 8, left: 9, right: 9 }}>
        <div style={{ fontFamily: MU_S.fontSerif, fontSize: size === 'S' ? 12 : 14, color: '#F6F2EF', letterSpacing: '0.03em', fontWeight: 500, textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>{name}</div>
        <div style={{ marginTop: 1, fontSize: 8, color: '#E5D5B2', letterSpacing: '0.1em', fontFamily: MU_S.fontBrand, textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>{en}</div>
        <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 8, fontSize: 9, color: 'rgba(251, 247, 244, 0.85)', textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
          <span>{area} · {dist}</span>
          <span style={{ color: MU_S.gold, fontFamily: MU_S.fontBrand, letterSpacing: '0.08em' }}>{casts} CASTS</span>
        </div>
      </div>
    </div>
  );
}

function MU_ShopList() {
  const [activeArea, setActiveArea] = useState('all');
  const [favoriteVersion, setFavoriteVersion] = useState(0);

  const AREA_CHIPS = ['all', '銀座', '六本木', '西麻布', '麻布', '恵比寿', '新宿', '丸の内'];

  const shops = useMemo(() => {
    let list = MU_SHOP_ITEMS.filter((s) => s.region === 'tokyo');
    if (activeArea !== 'all') {
      list = list.filter((s) => s.area === activeArea);
    }
    return list.sort((a, b) => b.recommendScore - a.recommendScore);
  }, [activeArea, favoriteVersion]);

  useEffect(() => {
    function handleFavoriteChange() {
      setFavoriteVersion((prev) => prev + 1);
    }
    window.addEventListener('mu-shop-favorites-change', handleFavoriteChange);
    return () => window.removeEventListener('mu-shop-favorites-change', handleFavoriteChange);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', background: MU_S.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 82 }}>
        <div style={{ height: MU_TOP_SPACING }} />

        <div style={{ padding: '8px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: 84, fontFamily: '"Italiana", "Shippori Mincho", serif', fontSize: 14, fontStyle: 'italic', color: MU_S.gold, letterSpacing: '0.18em' }}>muchunavi</div>
          <div style={{ fontFamily: MU_S.fontSerif, fontSize: 22, color: MU_S.ink, letterSpacing: '0.18em', fontWeight: 500 }}>店舗</div>
          <button type="button" onClick={() => window.__nav?.open('home-filter')} style={{ width: 84, display: 'flex', justifyContent: 'flex-end', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }} aria-label="筛选">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={MU_S.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 5 H21 L14 13 V20 L10 18 V13 L3 5 Z" />
            </svg>
          </button>
        </div>

        <div className="mu-hide-scrollbar" style={{ display: 'flex', gap: 10, padding: '14px 20px 4px', overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {AREA_CHIPS.map((area) => {
            const active = activeArea === area;
            return (
              <button
                key={area}
                type="button"
                onClick={() => setActiveArea(area)}
                data-no-global-translate="true"
                style={{
                  flexShrink: 0,
                  padding: '8px 18px',
                  borderRadius: 3,
                  border: `0.5px solid ${active ? MU_S.gold : MU_S.hairlineStrong}`,
                  background: 'transparent',
                  color: active ? MU_S.ink : MU_S.inkMid,
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  fontFamily: MU_S.fontSans,
                  whiteSpace: 'nowrap',
                }}
              >
                {area === 'all' ? 'すべて' : area}
              </button>
            );
          })}
        </div>

        <window.MU_FlatRowGroup marginTop={6}>
          {shops.map((shop) => (
            <div
              key={shop.id}
              onClick={() => { MU_setShopContext(shop); window.__nav?.open('shop-detail'); }}
              style={{ display: 'flex', padding: '18px 0', gap: 16, cursor: 'pointer' }}
            >
              <div style={{ width: 138, height: 104, flexShrink: 0, overflow: 'hidden', background: MU_S.bgDeep }}>
                <img src={shop.src} alt={shop.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: MU_S.fontSerif, fontSize: 18, color: MU_S.ink, letterSpacing: '0.04em', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{shop.name}</div>
                <div style={{ marginTop: 4, fontSize: 11, color: MU_S.inkMid, letterSpacing: '0.04em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{shop.area} · {shop.sub}</div>
                <div style={{ marginTop: 8, fontSize: 11, color: MU_S.inkMid, letterSpacing: '0.04em' }}>
                  在籍 {shop.casts}名　セット ¥{shop.setPrice.toLocaleString()}〜
                </div>
                <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {(shop.features || []).slice(0, 3).map((feat) => (
                    <span key={feat} data-no-global-translate="true" style={{ padding: '3px 8px', border: `0.5px solid ${MU_S.hairlineStrong}`, fontSize: 10, color: MU_S.inkMid, letterSpacing: '0.04em' }}>
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </window.MU_FlatRowGroup>
      </div>
    </div>
  );
}

function MU_ShopDetail() {
  const [favoriteVersion, setFavoriteVersion] = useState(0);
  const shop = MU_getShopContext();
  const detail = MU_SHOP_DETAIL_MAP[shop.id] || MU_SHOP_DETAIL_MAP.default;
  const favorite = MU_isFavoriteShop(shop.id);
  const castList = detail.casts;
  useEffect(() => {
    function handleFavoriteChange() {
      setFavoriteVersion((prev) => prev + 1);
    }

    window.addEventListener('mu-shop-favorites-change', handleFavoriteChange);
    return () => window.removeEventListener('mu-shop-favorites-change', handleFavoriteChange);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', background: MU_S.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 110 }}>
        <div style={{ position: 'relative', width: '100%', height: 310 }}>
          <MU_ShopPhoto src={shop.src} w="100%" h={310} radius={0} fullSize />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20, 16, 15, 0.5) 0%, transparent 30%, rgba(26, 44, 49, 0.75) 100%)' }} />
          <div style={{ position: 'absolute', top: MU_TOP_SPACING, left: 0, right: 0, padding: '8px 20px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(255, 255, 255, 0.7)', border: `0.5px solid ${MU_S.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => window.__nav?.back()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MU_S.ink} strokeWidth="2"><path d="M15 6 L9 12 L15 18" strokeLinecap="round" /></svg>
            </div>
            <button
              key={favoriteVersion}
              type="button"
              onClick={() => {
                const next = MU_toggleFavoriteShop(shop.id);
                MU_setShopContext({ ...shop, favorite: next });
              }}
              style={{ padding: '7px 14px', borderRadius: 18, background: favorite ? MU_S.gradGold : 'rgba(255, 255, 255, 0.7)', border: `0.5px solid ${favorite ? 'transparent' : MU_S.hairlineStrong}`, fontSize: 11, color: favorite ? '#1A2C31' : MU_S.gold, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', boxShadow: favorite ? MU_S.shadowGold : 'none' }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill={favorite ? '#1A2C31' : 'none'} stroke={favorite ? '#1A2C31' : MU_S.gold} strokeWidth="2"><path d="M12 21 C5 15 2 11 2 7 A5 5 0 0 1 12 5 A5 5 0 0 1 22 7 C22 11 19 15 12 21 Z" /></svg>
              {favorite ? 'お気に入り済み' : 'お気に入り'}
            </button>
          </div>

          <div style={{ position: 'absolute', bottom: 16, left: 20, right: 20 }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              <div style={{ padding: '3px 8px', borderRadius: 3, background: MU_S.rouge, border: `0.5px solid ${MU_S.gold}`, fontSize: 9, color: MU_S.gold, letterSpacing: '0.2em', fontFamily: MU_S.fontBrand, fontWeight: 700 }}>PREMIUM</div>
              <div style={{ padding: '3px 8px', borderRadius: 3, background: 'rgba(164, 150, 115, 0.1)', border: `0.5px solid ${MU_S.hairlineStrong}`, fontSize: 9, color: MU_S.gold, letterSpacing: '0.15em', fontFamily: MU_S.fontBrand }}>{detail.info.type}</div>
            </div>
            <div style={{ fontFamily: MU_S.fontSerif, fontSize: 24, color: '#F6F2EF', letterSpacing: '0.06em', fontWeight: 500 }}>{detail.info.title}</div>
            <div style={{ fontSize: 11, color: '#E5D5B2', letterSpacing: '0.15em', marginTop: 2 }}>{detail.info.sub}</div>
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              {[
                { label: 'アルバム', icon: 'gallery', target: 'shop-gallery' },
                { label: '動画', icon: 'video', target: 'shop-videos' },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => window.__nav?.open(item.target)}
                  style={{ height: 28, padding: '0 10px', borderRadius: 999, background: 'rgba(26, 44, 49, 0.4)', border: '0.5px solid rgba(251, 247, 244, 0.2)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 6, color: '#F6F2EF', fontSize: 11, letterSpacing: '0.06em', cursor: 'pointer' }}
                >
                  {item.icon === 'gallery' ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F6F2EF" strokeWidth="1.8">
                      <rect x="4" y="5" width="16" height="14" rx="2" />
                      <path d="M8 14 L11 11 L14 14 L16 12 L20 16" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="9" cy="9" r="1.3" fill="#F6F2EF" stroke="none" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F6F2EF" strokeWidth="1.8">
                      <rect x="3.5" y="6" width="11" height="12" rx="2" />
                      <path d="M14.5 10 L20 7 V17 L14.5 14 Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 20px', display: 'flex', gap: 10 }}>
          {[
            { label: 'クーポン', sub: '＆システム', badge: String(detail.coupons.length), target: 'shop-coupons' },
            { label: 'キャスト', sub: '出勤ラインナップ', badge: String(detail.casts.length), target: 'shop-casts' },
            { label: 'イベント', sub: 'EVENT', badge: 'NEW', target: 'shop-events' },
            { label: '求人', sub: 'RECRUIT', badge: '募集中', target: 'shop-recruit' },
          ].map((a) => (
            <button key={a.label} type="button" onClick={() => window.__nav?.open(a.target)} style={{ flex: 1, padding: '12px 0', borderRadius: 12, background: MU_S.surface, border: `0.5px solid ${MU_S.hairline}`, textAlign: 'center', position: 'relative', cursor: 'pointer' }}>
              <div style={{ marginTop: 4, fontSize: 10, color: MU_S.ink, letterSpacing: '0.08em', fontFamily: MU_S.fontSerif }}>{a.label}</div>
              <div style={{ fontSize: 7, color: MU_S.goldDeep, letterSpacing: '0.2em', fontFamily: MU_S.fontBrand, marginTop: 1 }}>{a.sub}</div>
              <div style={{ position: 'absolute', top: 6, right: 8, fontSize: 8, color: MU_S.gold, background: MU_S.rouge, padding: '1px 5px', borderRadius: 3, fontWeight: 600, letterSpacing: '0.05em' }}>{a.badge}</div>
            </button>
          ))}
        </div>

        <div style={{ margin: '0 20px 18px', padding: '14px 16px', borderRadius: 12, background: MU_S.gradRouge, border: `0.5px solid ${MU_S.rougeSoft}`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 20, background: 'rgba(164, 150, 115, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={MU_S.gold} strokeWidth="1.6"><path d="M4 8 V16 A1 1 0 0 0 5 17 H19 A1 1 0 0 0 20 16 V8 A1 1 0 0 0 19 7 H5 A1 1 0 0 0 4 8 Z" /><path d="M4 12 H20" strokeDasharray="2 2" /></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: MU_S.fontBrand, fontSize: 10, color: 'rgba(234, 212, 167, 0.86)', letterSpacing: '0.25em' }}>COUPON</div>
            <div style={{ fontFamily: MU_S.fontSerif, fontSize: 14, color: '#F6F2EF', marginTop: 2, letterSpacing: '0.05em', textShadow: '0 1px 2px rgba(0,0,0,0.18)' }}>{detail.info.coupon}</div>
          </div>
          <div style={{ padding: '7px 14px', borderRadius: 14, background: MU_S.gold, color: '#1A2C31', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', cursor: 'pointer' }} onClick={() => window.__nav?.open('shop-coupons')}>見る</div>
        </div>

        <window.MU_SectionTitle ja="オンラインキャスト" en={`CASTS · ${castList.length}`} action="すべて見る" onAction={() => window.__nav?.open('shop-casts')} />
        <div className="mu-hide-scrollbar" style={{ overflowX: 'auto', display: 'flex', gap: 10, padding: '0 20px 18px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {castList.map((cast) => {
            const statusMeta = MU_getCastStatusMeta(cast.state);

            return (
            <div key={cast.name} style={{ width: 90, flexShrink: 0, cursor: 'pointer', opacity: statusMeta.dimmed ? 0.62 : 1 }} onClick={() => window.__nav?.open('cast-detail')}>
              <div style={{ position: 'relative' }}>
                <div style={{ filter: statusMeta.dimmed ? 'grayscale(0.9)' : 'none' }}>
                  <MU_ShopPhoto src={cast.src} w={90} h={115} radius={8} />
                </div>
                <div style={{ position: 'absolute', top: 5, left: 5, padding: '2px 6px', borderRadius: 999, background: statusMeta.tone, fontSize: 8, fontWeight: 800, color: statusMeta.text, letterSpacing: '0.05em', boxShadow: statusMeta.active ? '0 0 0 1px rgba(18,226,154,0.2), 0 4px 10px rgba(18,226,154,0.18)' : 'none' }}>{statusMeta.label}</div>
                {statusMeta.active ? <div style={{ position: 'absolute', top: 10, right: 8, width: 8, height: 8, borderRadius: '50%', background: MU_S.success, boxShadow: '0 0 10px rgba(18,226,154,0.8)' }} /> : null}
              </div>
              <div style={{ marginTop: 6, fontSize: 11, color: MU_S.ink, fontFamily: MU_S.fontSerif, letterSpacing: '0.04em' }}>{cast.name}</div>
              <div style={{ marginTop: 2, display: 'inline-flex', alignItems: 'center', gap: 5, minHeight: 18, padding: '0 6px', borderRadius: 999, background: statusMeta.chipBg, border: `0.5px solid ${statusMeta.chipBorder}`, fontSize: 8, color: statusMeta.chipText, letterSpacing: '0.05em' }}>
                <span>Lv.{cast.lvl}</span>
              </div>
            </div>
          )})}
        </div>

        <div style={{ margin: '0 20px', padding: 16, borderRadius: 12, background: MU_S.surface, border: `0.5px solid ${MU_S.hairline}` }}>
          <div style={{ fontFamily: MU_S.fontBrand, fontSize: 10, color: MU_S.goldDeep, letterSpacing: '0.25em', marginBottom: 10 }}>INFO</div>
          {[
            ['住所', detail.info.address],
            ['電話', detail.info.phone],
            ['営業時間', detail.info.hours],
            ['休息日', detail.info.closed],
            ['予算目安', detail.info.budget],
          ].map(([k, v], i) => (
            <div key={k} style={{ display: 'flex', padding: '7px 0', borderTop: i > 0 ? `0.5px solid ${MU_S.hairline}` : 'none' }}>
              <div style={{ width: 60, fontSize: 10, color: MU_S.inkMid, letterSpacing: '0.15em' }}>{k}</div>
              <div style={{ flex: 1, fontSize: 12, color: MU_S.ink, fontFamily: MU_S.fontSerif, letterSpacing: '0.04em' }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ height: 20 }} />
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 20px 20px', display: 'flex', gap: 10 }}>
        <div style={{ flex: 1, height: 48, borderRadius: 24, border: `0.5px solid ${MU_S.gold}`, background: 'rgba(251, 247, 244, 0.08)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }} onClick={() => window.__nav?.open('shop-recruit')}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MU_S.gold} strokeWidth="1.6"><rect x="3" y="7" width="18" height="13" rx="1" /><path d="M9 7 V5 A1 1 0 0 1 10 4 H14 A1 1 0 0 1 15 5 V7" /></svg>
          <span style={{ fontSize: 12, color: MU_S.gold, fontWeight: 600, letterSpacing: '0.15em', fontFamily: MU_S.fontSerif }}>採用相談</span>
        </div>
        <div style={{ flex: 1.3, height: 48, borderRadius: 24, background: MU_S.gradGold, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: MU_S.shadowGold, cursor: 'pointer' }} onClick={() => window.__nav?.open('chat')}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A2C31" strokeWidth="1.8"><path d="M4 5 H20 A1 1 0 0 1 21 6 V17 A1 1 0 0 1 20 18 H10 L5 21 V18 H4 A1 1 0 0 1 3 17 V6 A1 1 0 0 1 4 5 Z" strokeLinejoin="round" /></svg>
          <span style={{ fontSize: 13, color: '#1A2C31', fontWeight: 700, letterSpacing: '0.15em' }}>店舗に連絡</span>
        </div>
      </div>
    </div>
  );
}

function MU_ShopRecruit() {
  const shop = MU_getShopContext();
  const detail = MU_SHOP_DETAIL_MAP[shop.id] || MU_SHOP_DETAIL_MAP.default;
  const recruit = detail.recruit;

  return (
    <div style={{ width: '100%', height: '100%', background: MU_S.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 40 }}>
        <MU_SubHeader title="採用相談" subtitle={shop.name} />
        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 16, background: 'linear-gradient(135deg, #EFEBE7 0%, #FFFFFF 100%)', border: `0.5px solid ${MU_S.hairlineStrong}` }}>
          <div style={{ fontFamily: MU_S.fontBrand, fontSize: 10, color: MU_S.goldDeep, letterSpacing: '0.24em' }}>RECRUIT INFO</div>
          <div style={{ marginTop: 5, fontFamily: MU_S.fontSerif, fontSize: 18, color: MU_S.ink }}>{recruit.title}</div>
          <div style={{ marginTop: 8, fontSize: 11, color: MU_S.inkMid, lineHeight: 1.7 }}>{recruit.summary}</div>
        </div>
        <div style={{ margin: '14px 20px 0', padding: 14, borderRadius: 14, background: MU_S.surface, border: `0.5px solid ${MU_S.hairline}` }}>
          {[
            ['給与目安', recruit.salary],
            ['シフト時間', recruit.shifts],
            ['問い合わせ窓口', recruit.contact],
          ].map(([k, v], i) => (
            <div key={k} style={{ display: 'flex', padding: '8px 0', borderTop: i > 0 ? `0.5px solid ${MU_S.hairline}` : 'none' }}>
              <div style={{ width: 72, fontSize: 10, color: MU_S.inkMid }}>{k}</div>
              <div style={{ flex: 1, fontSize: 12, color: MU_S.ink, fontFamily: MU_S.fontSerif }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ margin: '14px 20px 0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {recruit.benefits.map((item) => (
            <div key={item} style={{ padding: '14px 12px', borderRadius: 14, background: MU_S.surface, border: `0.5px solid ${MU_S.hairline}`, textAlign: 'center', fontSize: 11, color: MU_S.ink }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MU_ShopCoupons() {
  const shop = MU_getShopContext();
  const detail = MU_SHOP_DETAIL_MAP[shop.id] || MU_SHOP_DETAIL_MAP.default;
  const [activeTab, setActiveTab] = useState('coupons');
  const [couponVersion, setCouponVersion] = useState(0);
  const claimed = MU_getClaimedCouponTitles(shop.id);
  const availableCount = detail.coupons.filter((item) => !claimed.has(item.title)).length;
  const claimedCount = claimed.size;
  const systemSections = [
    {
      title: '1SET 40分',
      rows: [
        { left: 'OPEN〜19:55', right: '3,900円 (4,680円)', highlight: true },
        { left: '20:00〜20:55', right: '4,900円 (5,880円)', highlight: true },
        { left: '21:00〜LAST', right: '5,900円 (7,080円)', highlight: true },
        { left: '延長料金', center: '20分', right: '2,900円 (3,480円)' },
      ],
    },
    {
      title: '1SET 40分（VIP）',
      rows: [
        { left: 'OPEN〜LAST', right: '7,900円 (9,480円)', highlight: true },
        { left: '延長料金', center: '20分', right: '3,900円 (4,680円)' },
      ],
    },
    {
      title: 'その他',
      rows: [
        { left: '本指名料金・場内指名料金', right: '1,900円 (2,280円)' },
        { left: '同伴料金', right: '無料', note: '（オプションサービスです。）' },
        { left: '税・サービス料金合計', right: '20%' },
      ],
    },
  ];
  const systemPayments = ['JCB', 'VISA', 'MC', 'AMEX', 'Diners'];

  useEffect(() => {
    function syncCoupons(event) {
      if (!event.detail?.shopId || event.detail.shopId === shop.id) {
        setCouponVersion((prev) => prev + 1);
      }
    }

    window.addEventListener('mu-shop-coupons-change', syncCoupons);
    return () => window.removeEventListener('mu-shop-coupons-change', syncCoupons);
  }, [shop.id]);

  return (
    <div style={{ width: '100%', height: '100%', background: MU_S.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 40 }}>
        <MU_SubHeader title="店舗クーポン" subtitle={shop.name} />
        <div style={{ margin: '14px 20px 0', padding: 18, borderRadius: 20, background: 'linear-gradient(135deg, #452d27 0%, #7A4A3B 42%, #C08B61 100%)', border: '1px solid rgba(234,212,167,0.22)', boxShadow: '0 16px 34px rgba(201,122,122,0.12)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14 }}>
            <div>
              <div style={{ fontFamily: MU_S.fontBrand, fontSize: 10, color: 'rgba(251,247,244,0.78)', letterSpacing: '0.28em' }}>COUPON LOUNGE</div>
              <div style={{ marginTop: 6, fontFamily: MU_S.fontSerif, fontSize: 20, color: '#F6F2EF', letterSpacing: '0.04em', textShadow: '0 1px 2px rgba(0,0,0,0.16)' }}>{shop.name} 特典チケット</div>
              <div style={{ marginTop: 6, fontSize: 11, color: 'rgba(251,247,244,0.8)', lineHeight: 1.6 }}>
                今すぐ使えるクーポンと、受け取り済みチケットをまとめて管理
              </div>
            </div>
            <div style={{ flexShrink: 0, width: 56, height: 56, borderRadius: 18, background: 'rgba(251,247,244,0.12)', border: '1px solid rgba(251,247,244,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F0D8B8" strokeWidth="1.7">
                <path d="M4 8 V16 A1 1 0 0 0 5 17 H19 A1 1 0 0 0 20 16 V8 A1 1 0 0 0 19 7 H5 A1 1 0 0 0 4 8 Z" />
                <path d="M4 12 H20" strokeDasharray="2 2" />
              </svg>
            </div>
          </div>
          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            <div style={{ padding: '12px 12px', borderRadius: 14, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div style={{ fontSize: 9, color: 'rgba(251,247,244,0.72)', letterSpacing: '0.08em' }}>総チケット</div>
              <div style={{ marginTop: 5, fontFamily: MU_S.fontSerif, fontSize: 22, color: '#F6F2EF' }}>{detail.coupons.length}</div>
            </div>
            <div style={{ padding: '12px 12px', borderRadius: 14, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div style={{ fontSize: 9, color: 'rgba(251,247,244,0.72)', letterSpacing: '0.08em' }}>受取可能</div>
              <div style={{ marginTop: 5, fontFamily: MU_S.fontSerif, fontSize: 22, color: '#F0D8B8' }}>{availableCount}</div>
            </div>
            <div style={{ padding: '12px 12px', borderRadius: 14, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div style={{ fontSize: 9, color: 'rgba(251,247,244,0.72)', letterSpacing: '0.08em' }}>受取済み</div>
              <div style={{ marginTop: 5, fontFamily: MU_S.fontSerif, fontSize: 22, color: '#F6F2EF' }}>{claimedCount}</div>
            </div>
          </div>
        </div>

        <div style={{ margin: '14px 20px 0', padding: 4, borderRadius: 16, background: MU_S.surface, border: `0.5px solid ${MU_S.hairline}`, display: 'flex' }}>
          {[ 
            { id: 'coupons', label: 'クーポン' },
            { id: 'system', label: '料金システム' },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} style={{ flex: 1, height: 34, borderRadius: 12, background: active ? MU_S.gradGold : 'transparent', color: active ? '#1A2C31' : MU_S.inkMid, fontSize: 11, fontWeight: active ? 700 : 500, cursor: 'pointer' }}>
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'coupons' ? (
          <>
          <div style={{ margin: '14px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {detail.coupons.map((item, index) => {
              const isClaimed = MU_isCouponClaimed(shop.id, item.title);
              const accent = isClaimed ? '#CFC5BC' : index % 3 === 0 ? '#A49673' : index % 3 === 1 ? '#C97A7A' : '#C9BC9A';

            return (
              <div key={item.title} style={{ position: 'relative', padding: '16px 16px 16px 18px', borderRadius: 18, background: isClaimed ? 'linear-gradient(135deg, #F6F2EE 0%, #FFFFFF 100%)' : 'linear-gradient(135deg, #FFF9F3 0%, #FFFFFF 100%)', border: `1px solid ${isClaimed ? 'rgba(207,197,188,0.55)' : 'rgba(164,150,115,0.22)'}`, boxShadow: isClaimed ? '0 8px 18px rgba(26,44,49,0.04)' : '0 12px 26px rgba(164,150,115,0.08)', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 6, background: accent }} />
                <div style={{ position: 'absolute', left: -10, top: '50%', transform: 'translateY(-50%)', width: 20, height: 20, borderRadius: '50%', background: MU_S.bg }} />
                <div style={{ position: 'absolute', right: -10, top: '50%', transform: 'translateY(-50%)', width: 20, height: 20, borderRadius: '50%', background: MU_S.bg }} />
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: isClaimed ? 'linear-gradient(135deg, #EFEBE7 0%, #FFFFFF 100%)' : `linear-gradient(135deg, ${accent} 0%, #FFFFFF 130%)`, border: `1px solid ${isClaimed ? 'rgba(220,203,188,0.8)' : 'rgba(164,150,115,0.28)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: isClaimed ? MU_S.inkMid : '#1A2C31', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)' }}>
                      {index % 4 === 0 ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                          <path d="M4 8 V16 A1 1 0 0 0 5 17 H19 A1 1 0 0 0 20 16 V8 A1 1 0 0 0 19 7 H5 A1 1 0 0 0 4 8 Z" />
                          <path d="M4 12 H20" strokeDasharray="2 2" />
                        </svg>
                      ) : index % 4 === 1 ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                          <path d="M12 21 C5 15 2 11 2 7 A5 5 0 0 1 12 5 A5 5 0 0 1 22 7 C22 11 19 15 12 21 Z" />
                        </svg>
                      ) : index % 4 === 2 ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                          <path d="M7 4 H17 L20 8 V18 A2 2 0 0 1 18 20 H6 A2 2 0 0 1 4 18 V8 Z" />
                          <path d="M9 11 H15" />
                        </svg>
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                          <path d="M12 3 L14.8 8.7 L21 9.6 L16.5 14 L17.6 20.2 L12 17.2 L6.4 20.2 L7.5 14 L3 9.6 L9.2 8.7 Z" />
                        </svg>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                        <div style={{ fontFamily: MU_S.fontSerif, fontSize: 15, color: MU_S.ink, lineHeight: 1.4 }}>{item.title}</div>
                        <button
                          type="button"
                          onClick={() => {
                            MU_setCouponDetailContext(MU_buildCouponDetail(shop, item, index));
                            window.__nav?.open('shop-coupon-detail');
                          }}
                          style={{ flexShrink: 0, height: 22, padding: '0 8px', borderRadius: 999, background: isClaimed ? 'rgba(26,44,49,0.08)' : 'rgba(201,122,122,0.1)', color: isClaimed ? MU_S.inkMid : MU_S.rouge, fontSize: 9, fontWeight: 800, letterSpacing: '0.06em', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                        >
                          {isClaimed ? 'CLAIMED' : '查看详情'}
                        </button>
                      </div>
                      <div style={{ marginTop: 6, fontSize: 11, color: MU_S.inkMid, lineHeight: 1.6 }}>{item.sub}</div>
                      <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 9, color: MU_S.goldDeep, letterSpacing: '0.08em' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent }} />
                          <span>{isClaimed ? '保存済みチケット' : '今すぐ受け取り可能'}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (!isClaimed) {
                              MU_claimCoupon(shop.id, item.title);
                              setCouponVersion((prev) => prev + 1);
                            }
                          }}
                          style={{ height: 32, padding: '0 14px', borderRadius: 999, background: isClaimed ? MU_S.bgSoft : MU_S.gradGold, color: isClaimed ? MU_S.inkMid : '#1A2C31', fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', cursor: 'pointer', boxShadow: isClaimed ? 'none' : '0 8px 18px rgba(164,150,115,0.18)' }}
                        >
                          {isClaimed ? '受取済み' : '受け取る'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
          </div>
          <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 16, background: MU_S.gradRouge, border: `0.5px solid ${MU_S.rougeSoft}` }}>
            <div style={{ fontFamily: MU_S.fontBrand, fontSize: 10, color: 'rgba(234, 212, 167, 0.86)', letterSpacing: '0.24em' }}>USAGE NOTE</div>
            <div style={{ marginTop: 6, fontSize: 11, color: '#F6F2EF', lineHeight: 1.7, textShadow: '0 1px 2px rgba(0,0,0,0.18)' }}>
              店舗クーポンは通常、会員ポイントと併用できますが、複数の割引は同時適用できません。混雑時間帯と個室クーポンは店舗最終確認が優先されます。
            </div>
          </div>
          </>
        ) : null}

        {activeTab === 'system' ? (
          <>
          <div style={{ margin: '14px 20px 0', borderRadius: 14, background: '#FFFCF9', border: `0.5px solid ${MU_S.goldLight}`, overflow: 'hidden', boxShadow: '0 10px 28px rgba(26,44,49,0.04)' }}>
            <div style={{ height: 36, padding: '0 14px', background: '#C97A7A', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 0, height: 0, borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '8px solid #FFFFFF' }} />
              <div style={{ fontSize: 15, color: '#FFFFFF', fontWeight: 700, letterSpacing: '0.02em' }}>料金情報</div>
            </div>

            {systemSections.map((section, sectionIndex) => (
              <div key={section.title} style={{ borderTop: sectionIndex > 0 ? `1px solid ${MU_S.hairline}` : 'none' }}>
                <div style={{ padding: '10px 14px', background: '#F5F0EA', fontSize: 14, color: MU_S.ink, fontWeight: 700, letterSpacing: '0.02em' }}>
                  {section.title}
                </div>
                {section.rows.map((row, rowIndex) => (
                  <div key={`${section.title}-${row.left}-${rowIndex}`} style={{ padding: '10px 14px', display: 'flex', alignItems: 'flex-start', gap: 10, borderTop: rowIndex > 0 ? `0.5px solid ${MU_S.hairline}` : 'none', background: '#FFFFFF' }}>
                    <div style={{ flex: row.center ? '0 0 38%' : '1 1 auto', fontSize: 13, color: MU_S.ink, lineHeight: 1.6, fontWeight: row.highlight ? 700 : 500 }}>
                      {row.left}
                    </div>
                    {row.center ? (
                      <div style={{ width: 56, textAlign: 'center', fontSize: 13, color: MU_S.inkMid, lineHeight: 1.6, flexShrink: 0 }}>
                        {row.center}
                      </div>
                    ) : null}
                    <div style={{ marginLeft: 'auto', textAlign: 'right', fontSize: 13, color: row.highlight ? '#5B6B70' : MU_S.ink, lineHeight: 1.6, fontWeight: 700, flexShrink: 0 }}>
                      <div>{row.right}</div>
                      {row.note ? <div style={{ marginTop: 2, fontSize: 11, color: '#B4A395', fontWeight: 600 }}>{row.note}</div> : null}
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <div style={{ padding: '10px 14px', borderTop: `1px solid ${MU_S.hairline}`, background: '#FBF6F1', fontSize: 11, color: '#B4A395', lineHeight: 1.6 }}>
              ※（）の金額が税・サ計20%込みの価格となります。
            </div>

            <div style={{ borderTop: `1px solid ${MU_S.hairline}`, background: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', borderTop: `0.5px solid ${MU_S.hairline}` }}>
                <div style={{ width: 90, fontSize: 13, color: MU_S.ink, fontWeight: 700 }}>予算目安</div>
                <div style={{ flex: 1, textAlign: 'right', fontSize: 13, color: MU_S.ink, lineHeight: 1.6, fontWeight: 700 }}>
                  <div>4,680円〜</div>
                  <div style={{ color: '#B4A395' }}>初回 3,000円〜（税込）</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', borderTop: `0.5px solid ${MU_S.hairline}` }}>
                <div style={{ width: 90, fontSize: 13, color: MU_S.ink, fontWeight: 700 }}>延長方法</div>
                <div style={{ flex: 1, textAlign: 'right', fontSize: 13, color: MU_S.ink, lineHeight: 1.6, fontWeight: 700 }}>
                  自動延長制
                </div>
              </div>
              <div style={{ padding: '12px 14px', borderTop: `0.5px solid ${MU_S.hairline}` }}>
                <div style={{ fontSize: 12, color: MU_S.ink, fontWeight: 700 }}>■ 以下の支払方法がご利用頂けます。</div>
                <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {systemPayments.map((payment) => (
                    <div key={payment} style={{ minWidth: 48, height: 28, padding: '0 10px', borderRadius: 6, background: '#F5F0EA', border: `0.5px solid ${MU_S.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#5B6B70', fontWeight: 800, letterSpacing: '0.02em' }}>
                      {payment}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function MU_ShopCouponDetail() {
  const shop = MU_getShopContext();
  const coupon = MU_getCouponDetailContext();
  const claimed = MU_isCouponClaimed(shop.id, coupon.title);
  const qrSeed = `${shop.id}-${coupon.title}-${coupon.deadline}`;
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
    const seed = qrSeed.charCodeAt((row + col) % qrSeed.length);
    return ((row * 13 + col * 7 + seed) % 5) < 2;
  });

  return (
    <div style={{ width: '100%', height: '100%', background: MU_S.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 36 }}>
        <MU_SubHeader title="クーポン詳細" subtitle={shop.name} />

        <div style={{ margin: '14px 20px 0', padding: 0, borderRadius: 22, background: '#FFFFFF', border: `0.5px solid ${MU_S.hairlineStrong}`, boxShadow: '0 12px 32px rgba(26,44,49,0.05)', overflow: 'hidden' }}>
          <div style={{ position: 'relative', padding: '26px 18px 18px', background: 'linear-gradient(180deg, #FFFCFA 0%, #FFFFFF 100%)' }}>
            <div style={{ position: 'absolute', left: -10, top: 116, width: 20, height: 20, borderRadius: '50%', background: MU_S.bg, border: `0.5px solid ${MU_S.hairline}` }} />
            <div style={{ position: 'absolute', right: -10, top: 116, width: 20, height: 20, borderRadius: '50%', background: MU_S.bg, border: `0.5px solid ${MU_S.hairline}` }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ width: 62, height: 62, borderRadius: 18, background: 'linear-gradient(135deg, #D7B193 0%, #F5EDE5 100%)', border: '1px solid rgba(164,150,115,0.34)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5F5147', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.58), 0 6px 18px rgba(164,150,115,0.08)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 8 V16 A1 1 0 0 0 5 17 H19 A1 1 0 0 0 20 16 V8 A1 1 0 0 0 19 7 H5 A1 1 0 0 0 4 8 Z" />
                  <path d="M4 12 H20" strokeDasharray="2 2" />
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ height: 22, padding: '0 8px', borderRadius: 999, background: 'rgba(201,122,122,0.08)', color: MU_S.rouge, fontSize: 10, fontWeight: 700, letterSpacing: '0.02em', display: 'inline-flex', alignItems: 'center' }}>
                    {coupon.eyebrow}
                  </div>
                  <div style={{ height: 24, padding: '0 10px', borderRadius: 999, background: claimed ? 'rgba(26,44,49,0.08)' : 'rgba(201,122,122,0.08)', color: claimed ? MU_S.inkMid : MU_S.rouge, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    {claimed ? '受取済み' : '受取可能'}
                  </div>
                </div>
                <div style={{ marginTop: 10, fontFamily: MU_S.fontSerif, fontSize: 28, lineHeight: 1.18, color: MU_S.ink, letterSpacing: '0.04em' }}>{coupon.title}</div>
                <div style={{ marginTop: 6, fontSize: 12, color: MU_S.inkMid, lineHeight: 1.7 }}>{coupon.sub}</div>
              </div>
            </div>

            <div style={{ marginTop: 18, borderTop: '1px dashed rgba(164,150,115,0.25)', padding: '20px 2px 4px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 54, fontSize: 11, color: MU_S.goldDeep, fontWeight: 700, letterSpacing: '0.04em', paddingTop: 8 }}>特典内容</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: MU_S.fontSerif, fontSize: 24, color: MU_S.ink, letterSpacing: '0.03em', lineHeight: 1.25 }}>{coupon.benefitTitle}</div>
                  <div style={{ marginTop: 8, fontSize: 11, color: MU_S.inkMid }}>有効期限： {coupon.deadline}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '20px 20px 0' }}>
          <button
            type="button"
            onClick={() => {
              if (!claimed) MU_claimCoupon(shop.id, coupon.title);
            }}
            style={{ width: '100%', height: 44, borderRadius: 999, background: claimed ? MU_S.bgSoft : 'linear-gradient(90deg, #D9B394 0%, #A96E47 100%)', color: claimed ? MU_S.inkMid : '#FFFFFF', fontSize: 16, fontWeight: 800, letterSpacing: '0.08em', cursor: 'pointer', boxShadow: claimed ? 'none' : '0 10px 24px rgba(169,110,71,0.22)' }}
          >
            {claimed ? '受取済み' : '受け取る'}
          </button>
        </div>

        <div style={{ margin: '18px 20px 0', padding: '18px 16px', borderRadius: 18, background: '#FFFFFF', border: `0.5px solid ${MU_S.hairline}`, boxShadow: '0 10px 28px rgba(26,44,49,0.03)' }}>
          <div style={{ fontFamily: MU_S.fontBrand, fontSize: 10, color: MU_S.goldDeep, letterSpacing: '0.24em', textAlign: 'center' }}>REDEEM QR</div>
          <div style={{ marginTop: 8, fontFamily: MU_S.fontSerif, fontSize: 16, color: MU_S.ink, letterSpacing: '0.04em', textAlign: 'center' }}>到店核销二维码</div>
          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 168, height: 168, padding: 10, borderRadius: 20, background: '#FFFFFF', border: `0.5px solid ${MU_S.hairlineStrong}`, boxShadow: '0 10px 24px rgba(26,44,49,0.06)' }}>
              <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: 'repeat(21, 1fr)', gridTemplateRows: 'repeat(21, 1fr)', gap: 1 }}>
                {qrCells.map((filled, index) => (
                  <div key={index} style={{ background: filled ? '#1A2C31' : 'transparent', borderRadius: 1 }} />
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12, fontSize: 11, color: MU_S.inkMid, lineHeight: 1.7, textAlign: 'center' }}>
            到店时出示此二维码，
            <br />
            门店可直接扫码核销
          </div>
        </div>

        <div style={{ margin: '22px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontFamily: MU_S.fontSerif, fontSize: 18, color: MU_S.ink, fontWeight: 700, letterSpacing: '0.03em', whiteSpace: 'nowrap' }}>クーポン詳細</div>
          <div style={{ flex: 1, height: 1, background: 'rgba(164,150,115,0.16)' }} />
        </div>

        <div style={{ margin: '10px 20px 0', borderRadius: 18, background: '#FFFFFF', border: `0.5px solid ${MU_S.hairline}`, overflow: 'hidden', boxShadow: '0 10px 28px rgba(26,44,49,0.03)' }}>
          {[
            ['有効期限', coupon.deadline, 'calendar'],
            ['利用可能回数', coupon.usageLimit, 'person'],
            ['利用可能店舗', coupon.availableStore, 'shop'],
            ['対象人数', coupon.audience, 'group'],
            ['併用可否', coupon.canCombine, 'tag'],
            ['備考', coupon.notes, 'note'],
          ].map(([label, value, icon], index) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', margin: '0 14px', borderTop: index > 0 ? `0.5px solid ${MU_S.hairline}` : 'none' }}>
              <div style={{ width: 28, height: 28, borderRadius: 14, background: 'linear-gradient(135deg, #FBF6F1 0%, #FFFFFF 100%)', border: `0.5px solid ${MU_S.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MU_S.goldDeep, flexShrink: 0 }}>
                {icon === 'calendar' ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3 V7" /><path d="M16 3 V7" /><path d="M4 10 H20" /></svg> : null}
                {icon === 'person' ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="3.2" /><path d="M6 19 C6 15.8 8.7 14 12 14 C15.3 14 18 15.8 18 19" /></svg> : null}
                {icon === 'shop' ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 10 H19 V19 H5 Z" /><path d="M4 10 L6 5 H18 L20 10" /><path d="M10 14 H14" /></svg> : null}
                {icon === 'group' ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="9" r="2.5" /><circle cx="16.5" cy="10" r="2" /><path d="M4.5 18 C4.5 15.5 6.8 14 9 14 C11.2 14 13.5 15.5 13.5 18" /><path d="M14 17 C14.3 15.4 15.7 14.2 17.5 14.2 C19.1 14.2 20.5 15.1 21 16.6" /></svg> : null}
                {icon === 'tag' ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 4 H6 A2 2 0 0 0 4 6 V11 L13 20 L20 13 Z" /><circle cx="8" cy="8" r="1" fill="currentColor" stroke="none" /></svg> : null}
                {icon === 'note' ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="4" width="14" height="16" rx="2" /><path d="M8 9 H16" /><path d="M8 13 H14" /></svg> : null}
              </div>
              <div style={{ width: 92, fontSize: 11, color: MU_S.inkMid }}>{label}</div>
              <div style={{ flex: 1, textAlign: 'right', fontSize: 12, color: MU_S.ink, lineHeight: 1.6 }}>{value}</div>
            </div>
          ))}
        </div>

        <div style={{ margin: '22px 20px 0', fontFamily: MU_S.fontSerif, fontSize: 18, color: MU_S.ink, fontWeight: 700, letterSpacing: '0.03em' }}>ご利用条件</div>
        <div style={{ margin: '10px 20px 0', paddingLeft: 18, fontSize: 11, color: MU_S.inkMid, lineHeight: 1.9 }}>
          {coupon.conditions.map((line) => (
            <div key={line}>• {line}</div>
          ))}
        </div>

        <div style={{ padding: '18px 20px 0' }}>
          <button type="button" onClick={() => window.__nav?.back()} style={{ width: '100%', height: 42, borderRadius: 999, background: '#FFFFFF', border: `0.5px solid ${MU_S.goldLight}`, color: MU_S.ink, fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 22px rgba(26,44,49,0.02)' }}>
            クーポン一覧に戻る
          </button>
        </div>
      </div>
    </div>
  );
}

function MU_ShopCasts() {
  const shop = MU_getShopContext();
  const detail = MU_SHOP_DETAIL_MAP[shop.id] || MU_SHOP_DETAIL_MAP.default;
  const onlineCount = detail.casts.filter((cast) => cast.state === '出勤中').length;

  return (
    <div style={{ width: '100%', height: '100%', background: MU_S.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 40 }}>
        <MU_SubHeader title="キャスト一覧" subtitle={shop.name} />
        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 16, background: 'linear-gradient(135deg, #EFEBE7 0%, #FFFFFF 100%)', border: `0.5px solid ${MU_S.hairlineStrong}` }}>
          <div style={{ fontFamily: MU_S.fontBrand, fontSize: 10, color: MU_S.goldDeep, letterSpacing: '0.24em' }}>CAST LINEUP</div>
          <div style={{ marginTop: 5, fontFamily: MU_S.fontSerif, fontSize: 18, color: MU_S.ink }}>{shop.name} は現在 {onlineCount} 名出勤中、予約可能 {detail.casts.length - onlineCount} 名です</div>
        </div>
        <div style={{ margin: '14px 20px 0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {detail.casts.map((cast) => {
            const statusMeta = MU_getCastStatusMeta(cast.state);

            return (
            <div key={cast.name} onClick={() => window.__nav?.open('cast-detail')} style={{ padding: 10, borderRadius: 16, background: statusMeta.dimmed ? 'rgba(244,240,236,0.92)' : MU_S.surface, border: statusMeta.active ? '1px solid rgba(18,226,154,0.34)' : statusMeta.dimmed ? '1px solid rgba(26,44,49,0.14)' : `0.5px solid ${MU_S.hairline}`, boxShadow: statusMeta.active ? '0 10px 24px rgba(18,226,154,0.08)' : 'none', cursor: 'pointer', opacity: statusMeta.dimmed ? 0.78 : 1 }}>
              <div style={{ position: 'relative' }}>
                <div style={{ filter: statusMeta.dimmed ? 'grayscale(0.95)' : 'none', opacity: statusMeta.dimmed ? 0.72 : 1 }}>
                  <MU_ShopPhoto src={cast.src} w="100%" h={180} radius={12} />
                </div>
                <div style={{ position: 'absolute', top: 8, left: 8, padding: '4px 8px', borderRadius: 999, background: statusMeta.tone, color: statusMeta.text, fontSize: 9, fontWeight: 800, letterSpacing: '0.05em', boxShadow: statusMeta.active ? '0 4px 10px rgba(18,226,154,0.18)' : 'none' }}>
                  {statusMeta.label}
                </div>
                {statusMeta.active ? <div style={{ position: 'absolute', top: 12, right: 12, width: 10, height: 10, borderRadius: '50%', background: MU_S.success, boxShadow: '0 0 12px rgba(18,226,154,0.85)' }} /> : null}
                {statusMeta.dimmed ? <div style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'linear-gradient(180deg, rgba(26,44,49,0.02) 0%, rgba(26,44,49,0.28) 100%)' }} /> : null}
              </div>
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <div>
                  <div style={{ fontFamily: MU_S.fontSerif, fontSize: 14, color: MU_S.ink }}>{cast.name}</div>
                  <div style={{ marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 6, minHeight: 20, padding: '0 8px', borderRadius: 999, background: statusMeta.chipBg, border: `0.5px solid ${statusMeta.chipBorder}`, fontSize: 9, color: statusMeta.chipText }}>
                    <span>Lv.{cast.lvl}</span>
                    <span style={{ opacity: 0.55 }}>•</span>
                    <span>{statusMeta.dimmed ? '未出勤' : statusMeta.active ? '出勤中' : '待機/予約'}</span>
                  </div>
                </div>
                <button type="button" onClick={(event) => { event.stopPropagation(); window.__nav?.open('chat'); }} style={{ height: 26, padding: '0 10px', borderRadius: 999, background: MU_S.gradGold, color: '#1A2C31', fontSize: 9, fontWeight: 700, cursor: 'pointer' }}>連絡</button>
              </div>
            </div>
          )})}
        </div>
        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 16, background: MU_S.surface, border: `0.5px solid ${MU_S.hairline}` }}>
          <div style={{ fontFamily: MU_S.fontBrand, fontSize: 10, color: MU_S.goldDeep, letterSpacing: '0.24em' }}>BOOKING TIP</div>
          <div style={{ marginTop: 6, fontSize: 11, color: MU_S.inkMid, lineHeight: 1.7 }}>
            `出勤中` はすぐ連絡可能、`予約可` は事前確保向け、`オンライン` は通常 30 - 60 分後の来店予定です。
          </div>
        </div>
      </div>
    </div>
  );
}

function MU_ShopEvents() {
  const shop = MU_getShopContext();
  const detail = MU_SHOP_DETAIL_MAP[shop.id] || MU_SHOP_DETAIL_MAP.default;

  return (
    <div style={{ width: '100%', height: '100%', background: MU_S.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 40 }}>
        <MU_SubHeader title="店舗イベント" subtitle={shop.name} />
        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 16, background: MU_S.gradRouge, border: `0.5px solid ${MU_S.rougeSoft}` }}>
          <div style={{ fontFamily: MU_S.fontBrand, fontSize: 10, color: 'rgba(234, 212, 167, 0.86)', letterSpacing: '0.24em' }}>EVENT BOARD</div>
          <div style={{ marginTop: 5, fontFamily: MU_S.fontSerif, fontSize: 18, color: '#F6F2EF' }}>{shop.name} の開催中イベントと日程</div>
        </div>
        <div style={{ margin: '14px 20px 0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          <div style={{ padding: '14px 12px', borderRadius: 14, background: MU_S.surface, border: `0.5px solid ${MU_S.hairline}` }}>
            <div style={{ fontSize: 9, color: MU_S.inkMid, letterSpacing: '0.08em' }}>今週のイベント</div>
            <div style={{ marginTop: 4, fontFamily: MU_S.fontSerif, fontSize: 18, color: MU_S.gold }}>{detail.events.length}</div>
          </div>
          <div style={{ padding: '14px 12px', borderRadius: 14, background: MU_S.surface, border: `0.5px solid ${MU_S.hairline}` }}>
            <div style={{ fontSize: 9, color: MU_S.inkMid, letterSpacing: '0.08em' }}>人気日程</div>
            <div style={{ marginTop: 4, fontFamily: MU_S.fontSerif, fontSize: 18, color: MU_S.ink }}>Fri / Sat</div>
          </div>
        </div>
        <div style={{ margin: '14px 20px 0', borderRadius: 16, overflow: 'hidden', background: MU_S.surface, border: `0.5px solid ${MU_S.hairline}` }}>
          {detail.events.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => {
                MU_setEventDetailContext(MU_buildEventDetail(shop, item, index));
                window.__nav?.open('shop-event-detail');
              }}
              style={{ width: '100%', padding: '14px 16px', borderTop: index > 0 ? `0.5px solid ${MU_S.hairline}` : 'none', textAlign: 'left', cursor: 'pointer', background: '#FFFFFF' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                <div style={{ fontFamily: MU_S.fontSerif, fontSize: 14, color: MU_S.ink }}>{item.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontSize: 10, color: MU_S.goldDeep, fontWeight: 700 }}>{item.meta}</div>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={MU_S.goldDeep} strokeWidth="2"><path d="M8 5 L16 12 L8 19" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
              <div style={{ marginTop: 6, fontSize: 10, color: MU_S.inkMid, lineHeight: 1.6 }}>{item.sub}</div>
            </button>
          ))}
        </div>
        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 16, background: MU_S.surface, border: `0.5px solid ${MU_S.hairline}` }}>
          <div style={{ fontFamily: MU_S.fontBrand, fontSize: 10, color: MU_S.goldDeep, letterSpacing: '0.24em' }}>RESERVATION NOTE</div>
          <div style={{ marginTop: 6, fontSize: 11, color: MU_S.inkMid, lineHeight: 1.7 }}>
            イベント期間は人気キャストの予約が集中しやすいため、先にクーポンを受け取ってから店舗またはキャストへ連絡するのがおすすめです。
          </div>
        </div>
      </div>
    </div>
  );
}

function MU_ShopEventDetail() {
  const shop = MU_getShopContext();
  const event = MU_getEventDetailContext();

  return (
    <div style={{ width: '100%', height: '100%', background: MU_S.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 40 }}>
        <MU_SubHeader title="イベント詳細" subtitle={shop.name} />

        <div style={{ margin: '14px 20px 0', padding: 18, borderRadius: 18, background: MU_S.gradRouge, border: `0.5px solid ${MU_S.rougeSoft}` }}>
          <div style={{ fontFamily: MU_S.fontBrand, fontSize: 10, color: 'rgba(234, 212, 167, 0.86)', letterSpacing: '0.24em' }}>{event.heroLabel}</div>
          <div style={{ marginTop: 6, fontFamily: MU_S.fontSerif, fontSize: 22, color: '#F6F2EF', lineHeight: 1.35 }}>{event.title}</div>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ height: 24, padding: '0 10px', borderRadius: 999, background: 'rgba(251,247,244,0.12)', color: '#F6F2EF', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center' }}>{event.meta}</div>
            <div style={{ height: 24, padding: '0 10px', borderRadius: 999, background: 'rgba(251,247,244,0.12)', color: '#F0D8B8', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center' }}>{event.schedule}</div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11, color: 'rgba(251,247,244,0.82)', lineHeight: 1.75 }}>{event.overview}</div>
        </div>

        <div style={{ margin: '14px 20px 0', borderRadius: 16, background: '#FFFFFF', border: `0.5px solid ${MU_S.hairline}`, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: `0.5px solid ${MU_S.hairline}`, fontFamily: MU_S.fontSerif, fontSize: 16, color: MU_S.ink }}>イベント概要</div>
          {event.highlights.map((item, index) => (
            <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px', borderTop: index > 0 ? `0.5px solid ${MU_S.hairline}` : 'none' }}>
              <div style={{ width: 18, height: 18, borderRadius: 9, background: 'rgba(164,150,115,0.12)', color: MU_S.goldDeep, fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{index + 1}</div>
              <div style={{ fontSize: 12, color: MU_S.ink, lineHeight: 1.7 }}>{item}</div>
            </div>
          ))}
        </div>

        <div style={{ margin: '14px 20px 0', borderRadius: 16, background: MU_S.surface, border: `0.5px solid ${MU_S.hairline}` }}>
          <div style={{ padding: '14px 16px 8px', fontFamily: MU_S.fontSerif, fontSize: 16, color: MU_S.ink }}>来店特典</div>
          <div style={{ padding: '0 16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {event.perks.map((perk) => (
              <div key={perk} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ width: 16, height: 16, borderRadius: 8, background: MU_S.gradGold, color: '#1A2C31', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>+</div>
                <div style={{ fontSize: 12, color: MU_S.inkMid, lineHeight: 1.7 }}>{perk}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 16, background: '#FFFFFF', border: `0.5px solid ${MU_S.hairline}` }}>
          <div style={{ fontFamily: MU_S.fontBrand, fontSize: 10, color: MU_S.goldDeep, letterSpacing: '0.24em' }}>NOTICE</div>
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {event.notes.map((note) => (
              <div key={note} style={{ fontSize: 11, color: MU_S.inkMid, lineHeight: 1.7 }}>• {note}</div>
            ))}
          </div>
        </div>

        <div style={{ padding: '18px 20px 0', display: 'flex', gap: 10 }}>
          <button type="button" onClick={() => window.__nav?.back()} style={{ flex: 1, height: 44, borderRadius: 22, background: '#FFFFFF', border: `0.5px solid ${MU_S.goldLight}`, color: MU_S.ink, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            イベント一覧に戻る
          </button>
          <button type="button" onClick={() => window.__nav?.open('booking')} style={{ flex: 1.15, height: 44, borderRadius: 22, background: MU_S.gradGold, color: '#1A2C31', fontSize: 13, fontWeight: 800, cursor: 'pointer', boxShadow: MU_S.shadowGold }}>
            このイベントを予約
          </button>
        </div>
      </div>
    </div>
  );
}

function MU_ShopGallery() {
  const shop = MU_getShopContext();
  const gallery = MU_getShopGallery(shop);
  const [previewIndex, setPreviewIndex] = useState(null);
  const galleryItems = [
    { src: gallery[0], title: '店舗外観', sub: 'エントランスと夜のサイン' },
    { src: gallery[1], title: 'メインロビー', sub: '入店後のウェルカムエリアと待機席' },
    { src: gallery[2], title: 'メインフロア', sub: 'バーカウンターと共用シートエリア' },
    { src: gallery[3], title: '個室空間', sub: 'プライベート個室とライティング演出' },
    { src: gallery[4], title: 'テーブルディテール', sub: 'シートレイアウトとテーブル演出' },
    { src: gallery[5], title: '深夜のムード', sub: '営業時間帯の全体的な空気感' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: MU_S.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 40 }}>
        <MU_SubHeader title="店舗アルバム" subtitle={shop.name} />
        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 18, background: 'linear-gradient(135deg, #EFEBE7 0%, #FFFFFF 100%)', border: `0.5px solid ${MU_S.hairlineStrong}` }}>
          <div style={{ fontFamily: MU_S.fontBrand, fontSize: 10, color: MU_S.goldDeep, letterSpacing: '0.24em' }}>GALLERY</div>
          <div style={{ marginTop: 5, fontFamily: MU_S.fontSerif, fontSize: 18, color: MU_S.ink }}>{shop.name} の店内アルバム</div>
        </div>
        <div style={{ margin: '14px 20px 0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {galleryItems.map((item, index) => (
            <button
              key={item.src + index}
              type="button"
              onClick={() => setPreviewIndex(index)}
              style={{ padding: 0, borderRadius: 16, overflow: 'hidden', background: MU_S.surface, border: `0.5px solid ${MU_S.hairline}`, cursor: 'pointer', textAlign: 'left' }}
            >
              <MU_ShopPhoto src={item.src} w="100%" h={156} radius={0} />
              <div style={{ padding: '10px 12px 12px' }}>
                <div style={{ fontFamily: MU_S.fontSerif, fontSize: 13, color: MU_S.ink }}>{item.title}</div>
                <div style={{ marginTop: 4, fontSize: 10, color: MU_S.inkMid, lineHeight: 1.5 }}>{item.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {previewIndex !== null ? (
        <div
          onClick={() => setPreviewIndex(null)}
          style={{ position: 'absolute', inset: 0, background: 'rgba(10, 8, 7, 0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 20 }}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setPreviewIndex(null);
            }}
            style={{ position: 'absolute', top: MU_TOP_SPACING, right: 20, width: 34, height: 34, borderRadius: 17, background: 'rgba(255,255,255,0.14)', color: '#F6F2EF', fontSize: 18, cursor: 'pointer' }}
          >
            ×
          </button>
          <div style={{ position: 'absolute', top: 60, left: 20, fontSize: 11, color: 'rgba(251,247,244,0.72)', letterSpacing: '0.12em' }}>
            {previewIndex + 1} / {gallery.length}
          </div>
          <img
            src={gallery[previewIndex]}
            alt={`${shop.name} ${previewIndex + 1}`}
            onClick={(event) => event.stopPropagation()}
            style={{ maxWidth: '100%', maxHeight: '78vh', objectFit: 'contain', borderRadius: 18, boxShadow: '0 18px 46px rgba(0,0,0,0.28)' }}
          />
        </div>
      ) : null}
    </div>
  );
}

function MU_ShopVideos() {
  const shop = MU_getShopContext();
  const videos = MU_getShopVideos(shop);
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div style={{ width: '100%', height: '100%', background: MU_S.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 40 }}>
        <MU_SubHeader title="店舗動画" subtitle={shop.name} />
        <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 18, background: MU_S.gradRouge, border: `0.5px solid ${MU_S.rougeSoft}` }}>
          <div style={{ fontFamily: MU_S.fontBrand, fontSize: 10, color: 'rgba(234, 212, 167, 0.86)', letterSpacing: '0.24em' }}>VIDEO</div>
          <div style={{ marginTop: 5, fontFamily: MU_S.fontSerif, fontSize: 18, color: '#F6F2EF' }}>{shop.name} の店舗動画</div>
        </div>
        <div style={{ margin: '14px 20px 0', display: 'grid', gap: 12 }}>
          {videos.map((video, index) => (
            <button
              key={video.title}
              type="button"
              onClick={() => setActiveVideo(index)}
              style={{ padding: 0, borderRadius: 18, overflow: 'hidden', background: MU_S.surface, border: `0.5px solid ${MU_S.hairline}`, cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ position: 'relative' }}>
                <MU_ShopPhoto src={video.cover} w="100%" h={198} radius={0} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26,44,49,0.08) 0%, rgba(26,44,49,0.7) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 58, height: 58, borderRadius: 999, background: 'rgba(251,247,244,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.14)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1A2C31"><path d="M8 6 V18 L18 12 Z" /></svg>
                  </div>
                </div>
                <div style={{ position: 'absolute', left: 14, right: 14, bottom: 12, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
                  <div>
                    <div style={{ fontFamily: MU_S.fontSerif, fontSize: 15, color: '#F6F2EF' }}>{video.title}</div>
                    <div style={{ marginTop: 4, fontSize: 10, color: 'rgba(251,247,244,0.76)' }}>タップで再生</div>
                  </div>
                  <div style={{ padding: '3px 8px', borderRadius: 999, background: 'rgba(251,247,244,0.14)', color: '#F6F2EF', fontSize: 10 }}>{video.time}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeVideo !== null ? (
        <div
          onClick={() => setActiveVideo(null)}
          style={{ position: 'absolute', inset: 0, background: 'rgba(10, 8, 7, 0.94)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 20 }}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setActiveVideo(null);
            }}
            style={{ position: 'absolute', top: MU_TOP_SPACING, right: 20, width: 34, height: 34, borderRadius: 17, background: 'rgba(255,255,255,0.14)', color: '#F6F2EF', fontSize: 18, cursor: 'pointer' }}
          >
            ×
          </button>
          <div onClick={(event) => event.stopPropagation()} style={{ width: '100%', maxWidth: 420 }}>
            <video
              key={videos[activeVideo].src}
              src={videos[activeVideo].src}
              poster={videos[activeVideo].cover}
              controls
              autoPlay
              playsInline
              style={{ width: '100%', borderRadius: 18, background: '#000', boxShadow: '0 18px 46px rgba(0,0,0,0.32)' }}
            />
            <div style={{ marginTop: 12, textAlign: 'center', fontSize: 12, color: '#F6F2EF', letterSpacing: '0.06em' }}>{videos[activeVideo].title}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MU_SubHeader({ title, subtitle }) {
  return (
    <div style={{ paddingTop: MU_TOP_SPACING }}>
      <div style={{ padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 18, background: '#FFFFFF', border: `0.5px solid ${MU_S.hairlineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => window.__nav?.back()}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MU_S.ink} strokeWidth="2"><path d="M15 6 L9 12 L15 18" strokeLinecap="round" /></svg>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontFamily: MU_S.fontBrand, fontSize: 10, color: MU_S.goldDeep, letterSpacing: '0.24em' }}>{subtitle}</div>
          <div style={{ fontFamily: MU_S.fontSerif, fontSize: 15, color: MU_S.ink, letterSpacing: '0.08em' }}>{title}</div>
        </div>
        <div style={{ width: 36 }} />
      </div>
    </div>
  );
}

Object.assign(window, {
  MU_ShopList,
  MU_ShopDetail,
  MU_ShopRecruit,
  MU_ShopCoupons,
  MU_ShopCouponDetail,
  MU_ShopCasts,
  MU_ShopEvents,
  MU_ShopEventDetail,
  MU_ShopGallery,
  MU_ShopVideos,
  MU_setShopContext,
  MU_buildCouponDetail,
  MU_setCouponDetailContext,
});

