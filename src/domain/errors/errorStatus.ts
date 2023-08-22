export namespace ErrorStatus {
  export const ErrorCodes = {
    AUTHENTICATION_ERROR: 'RC0000',
    AUTHORIZATION_ERROR: 'RC0000',
    DATABASE_ERROR: 'RC0000',
    EXTERNAL_SERVICE_ERROR: 'RC0000',
    VALIDATION_ERROR: 'RC000',
    // 他のエラーコードを追加することができます
  } as const;

  export type ErrorCodeType = (typeof ErrorCodes)[keyof typeof ErrorCodes];

  export const ErrorTitles = {
    VALIDATION_ERROR: 'Validation Error',
    AUTHENTICATION_ERROR: 'Authentication Error',
    AUTHORIZATION_ERROR: 'Authorization Error',
    DATABASE_ERROR: 'Database Error',
    EXTERNAL_SERVICE_ERROR: 'External Service Error',
    // 必要に応じて他のタイトルを追加することができます
  } as const;

  export type ErrorTitle = (typeof ErrorTitles)[keyof typeof ErrorTitles];

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
}
