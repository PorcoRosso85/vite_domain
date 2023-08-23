import { ConfigProvider } from 'domain/interfaces/ConfigProvider';
import { ExternalServiceError } from 'domain/errors/specifiedErrors';

export class EnvConfigProvider implements ConfigProvider {
  private static instance: EnvConfigProvider | null = null;

  // singleton採用、１回だけロードすることの制約を設けているから
  private constructor() {
    try {
      require('dotenv').config();
    } catch (error) {
      throw new ExternalServiceError('Failed to load environment variables.');
    }
  }

  static getInstance(): EnvConfigProvider {
    if (!EnvConfigProvider.instance) {
      EnvConfigProvider.instance = new EnvConfigProvider();
    }
    return EnvConfigProvider.instance;
  }

  async get(key: string): Promise<string | undefined> {
    return Promise.resolve(process.env[key]);
  }

  getEnvPhase(): string {
    if (process.env.STAGING === '1') {
      return 'staging';
    }
    return process.env.NODE_ENV || 'development';
  }

  static resetInstance(): void {
    EnvConfigProvider.instance = null;
  }
}

if (import.meta.vitest) {
  const { describe, it, expect, vi, afterEach } = import.meta.vitest;

  describe('環境設定のテスト', () => {
    //各テスト後にインスタンスリセット
    afterEach(() => {
      EnvConfigProvider.resetInstance();
      vi.restoreAllMocks();
    });

    describe('ConfigProviderの動作テスト', () => {
      beforeEach(() => {
        EnvConfigProvider.resetInstance();
      });

      it('EnvConfigProviderが.envから設定を取得する', () => {
        process.env['TEST_KEY'] = 'test_key_sample';

        const provider = EnvConfigProvider.getInstance();
        expect(provider.get('TEST_KEY')).toBe('test_key_sample');
      });

      // FIXME:
      it('存在しないキーの取得', () => {
        const provider = EnvConfigProvider.getInstance();
        expect(provider.get('NON_EXISTENT_KEY')).toBeUndefined();
      });

      it('環境フェーズの取得', () => {
        process.env['NODE_ENV'] = 'production';
        const provider = EnvConfigProvider.getInstance();
        expect(provider.getEnvPhase()).toBe('production');
      });

      it('Singletonの一貫性', () => {
        const provider1 = EnvConfigProvider.getInstance();
        const provider2 = EnvConfigProvider.getInstance();
        expect(provider1).toBe(provider2);
      });

      it('リセットの機能テスト', () => {
        const provider1 = EnvConfigProvider.getInstance();
        EnvConfigProvider.resetInstance();
        const provider2 = EnvConfigProvider.getInstance();
        expect(provider1).not.toBe(provider2);
      });

      // FIXME:
      // it('エラーハンドリング：dotenvの読み込み失敗', () => {
      //   EnvConfigProvider.resetInstance();

      //   const dotenvMock = vi.fn(() => {
      //     throw new Error('Mock dotenv error');
      //   });
      //   vi.mock('dotenv', { config: dotenvMock });

      //   expect(() => {
      //     EnvConfigProvider.getInstance();
      //   }).toThrow(ExternalServiceError);
    });
  });
}
