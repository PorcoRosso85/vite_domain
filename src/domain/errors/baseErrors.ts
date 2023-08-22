import { AdditionalErrorInfo } from 'domain/errors/additionalErrorInfo';
import { ErrorStatus } from 'domain/errors/errorStatus';
export { BaseError };

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
    public additionalInfo?: AdditionalErrorInfo,
  ) {
    super(message);
    this.timestamp = new Date(); // エラー発生日時を取得したい, 外部からの入力やコンストラクタの引数に依存せず、コンストラクタ内で明示的に初期化
  }

  public formatError() {
    return {
      message: this.message,
      code: this.code,
      title: this.title,
      description: this.description,
      category: this.category,
      httpStatusCode: this.httpStatusCode,
      additionalInfo: this.additionalInfo,
    };
  }

  public toJSON() {
    return JSON.stringify(this.formatError());
  }
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('BaseError', () => {
    it('正しいtimestampを持っていること', () => {
      const error = new BaseError('Test error', 'RC0000', 'Validation Error');
      const diffTime = new Date().getTime() - error.timestamp.getTime();
      // エラーオブジェクトが作成されてから100ms以内にテストが実行されることを想定しています
      expect(diffTime).toBeLessThan(100);
    });

    it('formatErrorメソッドが正しいエラー情報を返すこと', () => {
      const error = new BaseError(
        'Test error',
        'RC0000',
        'Validation Error',
        'Test description',
        'USER_ERROR',
        500,
        { key: 'value' },
      );
      const formatted = error.formatError();
      expect(formatted).toEqual({
        message: 'Test error',
        code: 'RC0000',
        title: 'Validation Error',
        description: 'Test description',
        category: 'USER_ERROR',
        httpStatusCode: 500,
        additionalInfo: { key: 'value' },
      });
    });

    it('toJSONメソッドが正しいJSON形式のエラー情報を返すこと', () => {
      const error = new BaseError('Test error', 'RC0000', 'Validation Error');
      const json = error.toJSON();
      expect(json).toBe(
        JSON.stringify({
          message: 'Test error',
          code: 'RC0000',
          title: 'Validation Error',
          description: undefined,
          category: undefined,
          httpStatusCode: undefined,
          additionalInfo: undefined,
        }),
      );
    });
  });
}
