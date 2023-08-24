// TODO: 抽象レイヤーを設ける: 環境変数やアプリ変数を取得するための共通のインターフェース（例：ConfigProvider）を用意する。このインターフェースには、ローカル環境用と本番環境用の具体的な実装があります。

import { GetConfigInput } from 'domain/interfaces/GetConfigInput';

// TODO: 環境に応じて切り替える: アプリケーションの初期化段階で、現在の環境（開発環境か本番環境か）を判断して、適切なConfigProviderの実装を使用する。
export interface IConfigProvider {
  get(input: GetConfigInput): Promise<string | number | undefined>;
}

export interface IUnifiedConfigProvider {
  get(key: string): Promise<string | undefined>;
  validate(): Promise<boolean>;
  getAll(): Promise<Record<string, string | undefined>>;
}
