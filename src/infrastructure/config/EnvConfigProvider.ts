import { ConfigProvider } from 'domain/interfaces/ConfigProvider';

export class EnvConfigProvider implements ConfigProvider {
  private static instance: EnvConfigProvider;

  private constructor() {
    require('dotenv').config();
  }

  static getInstance(): EnvConfigProvider {
    if (!EnvConfigProvider.instance) {
      EnvConfigProvider.instance = new EnvConfigProvider();
    }
    return EnvConfigProvider.instance;
  }

  get(key: string): string | undefined {
    return process.env[key];
  }

  getEnvPhase(): string {
    if (process.env.STAGING === '1') {
      return 'staging';
    }
    return process.env.NODE_ENV || 'development';
  }
}

import { SSM } from 'aws-sdk';
class CloudConfigProvider implements ConfigProvider {
  private ssm: SSM;

  constructor() {
    this.ssm = new SSM();
  }

  async get(key: string): Promise<string | undefined> {
    try {
      const result = await this.ssm
        .getParameter({
          Name: key,
          WithDecryption: true,
        })
        .promise();

      return result.Parameter?.Value;
    } catch (error) {
      Logger.error(
        `Error fetching parameter ${key} from AWS Parameter Store:`,
        error,
      );
      return undefined;
    }
  }
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('環境設定のテスト', () => {
    describe('isValiedEnvPhase関数のテスト', () => {
      it('APP_ENVバリューが正しければtrueを返す', () => {
        expect(isValidEnvPhase('development')).toBe(true);
        expect(isValidEnvPhase('staging')).toBe(true);
        expect(isValidEnvPhase('production')).toBe(true);
      });

      it('APP_ENVバリューが誤っていればfalseを返す', () => {
        expect(isValidEnvPhase('invalid_env')).toBe(false);
      });
    });

    describe('createConfigProvider関数のテスト', () => {
      // 一時的にprocess.env.APP_ENVをモックするためのヘルパー関数
      function mockAppEnv(value: string) {
        process.env.APP_ENV = value;
      }

      it('DEV・STG環境ならEnvConfigProviderを返す', () => {
        mockAppEnv('development');
        let [provider, env] = createConfigProvider();
        expect(provider instanceof EnvConfigProvider).toBe(true);
        expect(env).toBe('development');

        mockAppEnv('staging');
        [provider, env] = createConfigProvider();
        expect(provider instanceof EnvConfigProvider).toBe(true);
        expect(env).toBe('staging');
      });

      it('PRD環境ならCloudConfigProviderを返す', () => {
        mockAppEnv('production');
        const [provider, env] = createConfigProvider();
        expect(provider instanceof CloudConfigProvider).toBe(true);
        expect(env).toBe('production');
      });

      it('不正なAPP_ENVバリューだとエラーを返す', () => {
        mockAppEnv('invalid');
        expect(() => createConfigProvider()).toThrowError(
          'Invalid APP_ENV value: invalid',
        );
      });
    });

    describe('ConfigProviderの動作テスト', () => {
      it('EnvConfigProviderが.envから設定を取得する', () => {
        const provider = new EnvConfigProvider();
        expect(provider.get('TEST_KEY')).toBe('test_key_sample');
      });

      // // TODO: 本番環境のテスト
      // function mockSsmGetParameter(response: any) {
      //   // import.meta.vitestのモック機能
      // }

      // it('CloutConfigProviderがクラウドサービスから設定を取得する', async () => {
      //   const expectedValue = 'mock_value_from_aws';
      //   mockSsmGetParameter({ Parameter: { Value: expectedValue } });

      //   const provider = new CloudConfigProvider();
      //   const gotValue = await provider.get('TEST_KEY_MOCK');
      //   expect(gotValue).toBe(expectedValue);
      // });
    });
  });
}
