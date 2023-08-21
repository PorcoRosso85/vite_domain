import { AdditionalErrorInfo } from 'domain/errors/additionalErrorInfo';
import { ErrorStatus } from 'domain/errors/errorStatus';
import ILogger from 'domain/logs/loggerInterface';

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
    public logger?: ILogger, //DI, Dependency Injection, このコンストラクタに渡すタイミングをLoggerインスタンスを非同期生成した後にできる
  ) {
    super(message);
    this.timestamp = new Date(); // エラー発生日時を取得したい, 外部からの入力やコンストラクタの引数に依存せず、コンストラクタ内で明示的に初期化

    if (this.logger) {
      this.logger.log(
        'error',
        `${this.code}: ${this.message} - ${this.title}...${this.description}`,
        {
          timestamp: this.timestamp,
          category: this.category,
          additionalInfo: this.additionalInfo,
        },
      );
    }
  }
}

/*
  * awaitしてから渡せるようにしてある 
// ロガーを生成
const logger = await createLogger();

// エラーを生成して、ロガーを渡す
const error = new BaseError("Something went wrong", "CODE_HERE", "TITLE_HERE", "DESCRIPTION_HERE", "CATEGORY_HERE", 500, {}, logger);

*/
