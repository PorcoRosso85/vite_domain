import Logger from 'domain/logs/logs';

interface AdditionalInfo {
  [key: string]: any;
}

namespace ErrorStatus {
  export const ErrorCodes = {
    AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
    AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
    DATABASE_ERROR: 'DATABASE_ERROR',
    EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    // 他のエラーコードを追加することができます
  } as const;

  export type ErrorCodeType = (typeof ErrorCodes)[keyof typeof ErrorCodes];

  export const ErrorCategories = {
    USER_ERROR: 'USER_ERROR',
    SYSTEM_ERROR: 'SYSTEM_ERROR',
    // 他のカテゴリを追加することができます
  } as const;

  export type ErrorCategoryType =
    (typeof ErrorCategories)[keyof typeof ErrorCategories];

  export const HttpStatusCodes = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    // 他のHTTPステータスコードを追加することができます
  } as const;

  export type HttpStatusCodeType =
    (typeof HttpStatusCodes)[keyof typeof HttpStatusCodes];

  export const ErrorTitles = {
    VALIDATION_ERROR: 'Validation Error',
    AUTHENTICATION_ERROR: 'Authentication Error',
    AUTHORIZATION_ERROR: 'Authorization Error',
    DATABASE_ERROR: 'Database Error',
    EXTERNAL_SERVICE_ERROR: 'External Service Error',
    // 必要に応じて他のタイトルを追加することができます
  } as const;

  export type ErrorTitle = (typeof ErrorTitles)[keyof typeof ErrorTitles];
}

class BaseError extends Error {
  // エラーオブジェクトが作成された後に変更されるべき
  public readonly timestamp: Date;

  // コンストラクタの引数として受け取った値でプロパティを初期化
  constructor(
    message: string,
    public code: ErrorStatus.ErrorCodeType,
    public title: ErrorStatus.ErrorTitle,
    public description?: string,
    public category?: ErrorStatus.ErrorCategoryType,
    public httpStatusCode?: ErrorStatus.HttpStatusCodeType,
    public additionalInfo?: AdditionalInfo,
  ) {
    super(message);
    this.timestamp = new Date(); // エラー発生日時を取得したい, 外部からの入力やコンストラクタの引数に依存せず、コンストラクタ内で明示的に初期化

    Logger.error(
      `${this.code}: ${this.message} - ${this.title}...${this.description}`,
      {
        timestamp: this.timestamp,
        category: this.category,
        additionalInfo: this.additionalInfo,
      },
    );
  }
}

class AuthenticationError extends BaseError {
  constructor(message: string, additionalInfo?: AdditionalInfo) {
    super(
      message,
      ErrorStatus.ErrorCodes.AUTHENTICATION_ERROR,
      ErrorStatus.ErrorTitles.AUTHENTICATION_ERROR,
      'ユーザーは認証されませんでした',
      ErrorStatus.ErrorCategories.USER_ERROR,
      ErrorStatus.HttpStatusCodes.UNAUTHORIZED,
      additionalInfo,
    );
  }
}

class AuthorizationError extends BaseError {
  constructor(message: string, additionalInfo?: AdditionalInfo) {
    super(
      message,
      ErrorStatus.ErrorCodes.AUTHORIZATION_ERROR,
      ErrorStatus.ErrorTitles.AUTHORIZATION_ERROR,
      'ユーザーは必要な認可がありません',
      ErrorStatus.ErrorCategories.USER_ERROR,
      ErrorStatus.HttpStatusCodes.FORBIDDEN,
      additionalInfo,
    );
  }
}

class DatabaseError extends BaseError {
  constructor(message: string, additionalInfo?: AdditionalInfo) {
    super(
      message,
      ErrorStatus.ErrorCodes.DATABASE_ERROR,
      ErrorStatus.ErrorTitles.DATABASE_ERROR,
      'データベースとの対話中にエラーが発生しました',
      ErrorStatus.ErrorCategories.SYSTEM_ERROR,
      ErrorStatus.HttpStatusCodes.INTERNAL_SERVER_ERROR,
      additionalInfo,
    );
  }
}

class ExternalServiceError extends BaseError {
  constructor(message: string, additionalInfo?: AdditionalInfo) {
    super(
      message,
      ErrorStatus.ErrorCodes.EXTERNAL_SERVICE_ERROR,
      ErrorStatus.ErrorTitles.EXTERNAL_SERVICE_ERROR,
      '外部サービスとの対話中にエラーが発生しました',
      ErrorStatus.ErrorCategories.SYSTEM_ERROR,
      ErrorStatus.HttpStatusCodes.BAD_GATEWAY,
      additionalInfo,
    );
  }
}

class ValidationError extends BaseError {
  constructor(message: string, additionalInfo?: AdditionalInfo) {
    super(
      message,
      ErrorStatus.ErrorCodes.VALIDATION_ERROR,
      ErrorStatus.ErrorTitles.VALIDATION_ERROR,
      '検証の結果入力を失敗しました',
      ErrorStatus.ErrorCategories.USER_ERROR,
      ErrorStatus.HttpStatusCodes.BAD_REQUEST,
      additionalInfo,
    );
  }
}
