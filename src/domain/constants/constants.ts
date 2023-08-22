// TODO: ここで型を決めて置いて、infra層に必要な変数をとってこさせる、ここに依存させる、ここがスキーマ・API
// アプリケーション情報
export const APP_NAME = 'MyAwesomeApp';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'This is an amazing application for ...';

// ユーザ関連
export const MAX_LOGIN_ATTEMPTS = 5;
export const PASSWORD_MIN_LENGTH = 8;
export const DEFAULT_AVATAR_URL = '/path/to/default/avatar.png';
export const MAX_PROFILE_NAME_LENGTH = 50;

// API関連
export const API_TIMEOUT = 15000; // 15 seconds
export const API_RETRY_COUNT = 3;

// ページネーション
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// データベース関連
export const DB_RETRY_LIMIT = 5;
export const DB_RETRY_DELAY = 3000; // 3 seconds

// 通知・メッセージ
export const ERROR_MESSAGE = 'Something went wrong. Please try again later.';
export const SUCCESS_MESSAGE = 'Operation completed successfully.';

// 日付・時間関連
export const DEFAULT_TIMEZONE = 'UTC';
export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';
export const DEFAULT_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

// その他
export const MAX_UPLOAD_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
export const SUPPORTED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'application/pdf',
];
export const LOCAL_STORAGE_KEY = 'my_app_local_storage_key';
export const SESSION_EXPIRY_TIME = 3600; // 1 hour

// constants.ts

// ... [前述の定数]

// 色関連
export const PRIMARY_COLOR = '#3498db';
export const SECONDARY_COLOR = '#2c3e50';
export const SUCCESS_COLOR = '#2ecc71';
export const ERROR_COLOR = '#e74c3c';

// ロケール・言語関連
export const DEFAULT_LOCALE = 'en-US';
export const SUPPORTED_LANGUAGES = ['en-US', 'fr-FR', 'es-ES', 'ja-JP'];

// ユーザーロール
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

// アクションタイプ
export const ACTION_CREATE = 'create';
export const ACTION_READ = 'read';
export const ACTION_UPDATE = 'update';
export const ACTION_DELETE = 'delete';

// システム関連
export const SYSTEM_MAINTENANCE_WINDOW = 'Sunday 2AM-4AM UTC';
export const SYSTEM_NOTIFICATION_EMAIL = 'notifications@myapp.com';

// イベント関連
export const EVENT_TYPES = ['webinar', 'workshop', 'meetup'];

// 製品関連
export const MAX_PRODUCT_NAME_LENGTH = 100;
export const MAX_PRODUCT_DESCRIPTION_LENGTH = 1000;
export const DEFAULT_CURRENCY = 'USD';
export const TAX_RATE = 0.1; // 10%

// アンケート・フィードバック関連
export const FEEDBACK_CATEGORIES = ['bug_report', 'feature_request', 'general'];

// テーマ関連
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

// テキスト関連
export const TEXT_TRUNCATE_LENGTH = 150;

// アニメーション
export const DEFAULT_ANIMATION_DURATION = 300; // milliseconds

// キャッシュ関連
export const CACHE_EXPIRATION_TIME = 3600; // 1 hour

// リンク関連
export const PRIVACY_POLICY_URL = '/path/to/privacy-policy';
export const TERMS_OF_SERVICE_URL = '/path/to/terms-of-service';

// その他
export const MAX_API_RATE_LIMIT = 1000; // requests per hour
export const MIN_PASSWORD_COMPLEXITY_SCORE = 3; // Based on some scoring system
export const SESSION_COOKIE_NAME = 'my_app_session';

// constants.ts

// ... [前述の定数]

// メディア関連
export const SUPPORTED_IMAGE_FORMATS = ['jpeg', 'jpg', 'png', 'gif'];
export const SUPPORTED_VIDEO_FORMATS = ['mp4', 'avi', 'mov'];
export const MAX_IMAGE_DIMENSION = 4000; // pixels
export const MIN_IMAGE_DIMENSION = 100; // pixels

// 認証・認可関連
export const OAUTH_PROVIDERS = ['google', 'facebook', 'twitter'];
export const JWT_EXPIRATION_TIME = '1h'; // JSON Web Tokensの有効期限
export const REFRESH_TOKEN_EXPIRATION_TIME = '7d'; // リフレッシュトークンの有効期限

// カート・購入関連
export const CART_MAX_ITEMS = 20;
export const CHECKOUT_MIN_AMOUNT = 10.0; // Minimum amount for checking out
export const SHIPPING_FEE_STANDARD = 5.0;
export const SHIPPING_FEE_EXPRESS = 15.0;

// メッセージング関連
export const MAX_MESSAGE_LENGTH = 500;
export const MIN_MESSAGE_LENGTH = 1;

// レポート関連
export const REPORT_TYPES = ['daily', 'weekly', 'monthly'];
export const REPORT_DEFAULT_FORMAT = 'pdf';

// サードパーティサービス関連
export const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY_HERE';
export const STRIPE_API_KEY = 'YOUR_STRIPE_API_KEY_HERE';

// ネットワーク関連
export const MAX_API_RESPONSE_SIZE = 10 * 1024 * 1024; // 10 MB

// UI/UX関連
export const DEFAULT_FONT_SIZE = '16px';
export const HEADER_HEIGHT = '60px';
export const FOOTER_HEIGHT = '40px';

// グラフ・チャート関連
export const DEFAULT_CHART_COLORS = [
  '#FF5733',
  '#33FF57',
  '#3357FF',
  '#FF33A6',
];
export const CHART_MAX_ITEMS = 12;

// 通信・メール関連
export const SUPPORT_EMAIL = 'support@myapp.com';
export const NEWSLETTER_SEND_TIME = 'Thursday 10AM UTC';

// フィルタ関連
export const DEFAULT_SEARCH_RADIUS = 10; // km or miles

// リソース利用制限
export const MAX_CONCURRENT_SESSIONS = 3; // 最大同時セッション数

// バッジ・報酬関連
export const BADGE_TYPES = ['gold', 'silver', 'bronze'];
export const REWARD_POINTS_PER_PURCHASE = 10;

// など...
