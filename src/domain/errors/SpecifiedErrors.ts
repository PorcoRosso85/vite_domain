import { BaseError } from 'domain/errors/BaseErrors';
import { ErrorStatus } from 'domain/errors/ErrorStatus';
import { AdditionalErrorInfo } from 'domain/errors/AdditionalErrorInfo';

export {
  AuthenticationError,
  AuthorizationError,
  DatabaseError,
  ExternalServiceError,
  ValidationError,
};

class AuthenticationError extends BaseError {
  constructor(message: string, additionalInfo?: AdditionalErrorInfo) {
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
  constructor(message: string, additionalInfo?: AdditionalErrorInfo) {
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
  constructor(message: string, additionalInfo?: AdditionalErrorInfo) {
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
  constructor(message: string, additionalInfo?: AdditionalErrorInfo) {
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
  constructor(message: string, additionalInfo?: AdditionalErrorInfo) {
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

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('Error継承クラス', () => {
    it('AuthenticationError、適切にエラーコードを返しているか', () => {
      const error = new AuthenticationError('Test error');
      expect(error.code).toEqual(ErrorStatus.ErrorCodes.AUTHENTICATION_ERROR);
    });

    it('AuthenticationError、追加情報が与えられていた時処理できているか', () => {
      const additionalInfo = { key: 'value' };
      const error = new AuthenticationError('Test error', additionalInfo);
      expect(error.additionalInfo).toEqual(additionalInfo);
    });
    // 他のエラーサブクラスも同様にテスト
  });
}
