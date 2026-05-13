import logoImg from '../assets/muchunavi-logo.png';
import mypageLv1Img from '../assets/lv1.png';
import mypageLv2Img from '../assets/lv2.png';
import './components/user-tokens.jsx';
import './components/user-system.jsx';
import './components/user-slider.jsx';
import './screens/user-auth.jsx';
import './screens/user-home.jsx';
import './screens/user-cast-detail.jsx';
import './screens/user-shop.jsx';
import './screens/user-rank-msg.jsx';
import './screens/user-mypage-booking.jsx';

window.__resources = {
  ...(window.__resources || {}),
  logoImg,
  mypageLv1Img,
  mypageLv2Img,
};

export const mainTabs = [
  { id: 'home', title: 'ホーム', component: window.MU_Home },
  { id: 'shop', title: 'ショップ', component: window.MU_ShopList },
  { id: 'rank', title: 'ランキング', component: window.MU_Ranking },
  { id: 'msg', title: 'メッセージ', component: window.MU_Messages },
  { id: 'me', title: 'マイページ', component: window.MU_MyPage },
];

export const secondaryScreens = [
  { id: 'city-selector', title: 'エリア選択', component: window.MU_CitySelector },
  { id: 'home-search', title: '検索', component: window.MU_HomeSearch },
  { id: 'home-filter', title: '絞り込み', component: window.MU_HomeFilter },
  { id: 'home-gift-detail', title: 'ギフト詳細', component: window.MU_HomeGiftDetail },
  { id: 'cast-detail', title: 'キャスト詳細', component: window.MU_CastDetail },
  { id: 'shop-detail', title: '店舗詳細', component: window.MU_ShopDetail },
  { id: 'shop-gallery', title: '店舗アルバム', component: window.MU_ShopGallery },
  { id: 'shop-videos', title: '店舗動画', component: window.MU_ShopVideos },
  { id: 'shop-coupons', title: '店舗クーポン', component: window.MU_ShopCoupons },
  { id: 'shop-coupon-detail', title: 'クーポン詳細', component: window.MU_ShopCouponDetail },
  { id: 'shop-casts', title: '在籍キャスト', component: window.MU_ShopCasts },
  { id: 'shop-events', title: '店舗イベント', component: window.MU_ShopEvents },
  { id: 'shop-event-detail', title: 'イベント詳細', component: window.MU_ShopEventDetail },
  { id: 'shop-recruit', title: '求人相談', component: window.MU_ShopRecruit },
  { id: 'chat', title: 'チャット', component: window.MU_Chat },
  { id: 'support-chat', title: '専属客户服务', component: window.MU_SupportChat },
  { id: 'notice-detail', title: '通知详情', component: window.MU_NoticeDetail },
  { id: 'booking', title: '予約', component: window.MU_Booking },
  { id: 'booking-detail', title: '予約詳細', component: window.MU_BookingDetail },
  { id: 'mypage-orders', title: '予約注文', component: window.MU_MyOrders },
  { id: 'mypage-search', title: 'クイックアクセス', component: window.MU_MySearch },
  { id: 'mypage-share', title: '招待シェア', component: window.MU_MyShare },
  { id: 'mypage-my-qr', title: '我的二维码', component: window.MU_MyQRCode },
  { id: 'mypage-recharge', title: 'チャージ', component: window.MU_MyRecharge },
  { id: 'mypage-recharge-records', title: 'チャージ明細', component: window.MU_MyRechargeRecords },
  { id: 'mypage-finance-detail', title: '财务明细详情', component: window.MU_MyFinanceDetail },
  { id: 'mypage-coupons', title: 'クーポン', component: window.MU_MyCoupons },
  { id: 'mypage-favorites', title: 'お気に入り店舗', component: window.MU_MyFavorites },
  { id: 'mypage-following', title: 'フォロー中のキャスト', component: window.MU_MyFollowing },
  { id: 'mypage-followers', title: '私のファン', component: window.MU_MyFollowers },
  { id: 'mypage-badges', title: 'バッジ', component: window.MU_MyBadges },
  { id: 'mypage-gifts', title: 'ギフト履歴', component: window.MU_MyGiftRecords },
  { id: 'mypage-visits', title: '来店履歴', component: window.MU_MyVisitHistory },
  { id: 'mypage-verification', title: '本人確認', component: window.MU_MyVerification },
  { id: 'mypage-verification-upload', title: '上传资料', component: window.MU_MyVerificationUpload },
  { id: 'mypage-payment-binding', title: '支付绑定', component: window.MU_MyPaymentBinding },
  { id: 'mypage-payment-add-card', title: '添加信用卡', component: window.MU_MyPaymentAddCard },
  { id: 'mypage-phone-change', title: '更换手机号码', component: window.MU_MyPhoneChange },
  { id: 'mypage-support', title: 'カスタマーサポート', component: window.MU_MySupport },
  { id: 'mypage-business', title: 'ビジネス提携', component: window.MU_MyBusiness },
  { id: 'mypage-invite', title: '友だち招待', component: window.MU_MyInvite },
  { id: 'mypage-settings', title: '設定', component: window.MU_MySettings },
];
