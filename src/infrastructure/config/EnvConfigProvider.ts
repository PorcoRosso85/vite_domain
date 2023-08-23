import { ConfigProvider } from 'domain/interfaces/ConfigProvider';
import { ExternalServiceError } from 'domain/errors/specifiedErrors';
import { logger } from 'domain/logs/createLoggerFactory';

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

  async getEnvPhase(): Promise<string> {
    if (process.env.STAGING === '1') {
      return Promise.resolve('staging');
    }

    // More robust phase determination
    const env = process.env.NODE_ENV;
    if (!env) {
      // console.warn("NODE_ENV is not set. Defaulting to 'development'.");
      logger.warn("NODE_ENV is not set. Defaulting to 'development'");
      return Promise.resolve('development');
    }

    // Assuming 'production', 'development', and 'test' are possible NODE_ENV values
    if (['production', 'development', 'test'].includes(env)) {
      return Promise.resolve(env);
    }

    // console.warn(
    //   `Unknown NODE_ENV value: ${env}. Defaulting to 'development'.`,
    // );
    logger.warn(`Unknown NODE_ENV value: ${env}. Defaulting to 'development'.`);
    return Promise.resolve('development');
  }

  static resetInstance(): void {
    EnvConfigProvider.instance = null;
  }
}

if (import.meta.vitest) {
  const { describe, it, expect, vi, afterEach } = import.meta.vitest;

  afterEach(() => {
    EnvConfigProvider.resetInstance();
    vi.restoreAllMocks();
  });

  describe('ConfigProviderの動作テスト', () => {
    beforeEach(() => {
      EnvConfigProvider.resetInstance();
    });

    // FIXME: 修正された箇所
    it('EnvConfigProviderが.envから設定を取得する', async () => {
      process.env['TEST_KEY'] = 'test_key_sample';
      const provider = EnvConfigProvider.getInstance();
      const value = await provider.get('TEST_KEY');
      expect(value).toBe('test_key_sample');
    });

    // FIXME: 修正された箇所
    it('存在しないキーの取得', async () => {
      const provider = EnvConfigProvider.getInstance();
      const value = await provider.get('NON_EXISTENT_KEY');
      expect(value).toBeUndefined();
    });

    // FIXME: 修正された箇所
    it('環境フェーズの取得', async () => {
      process.env['NODE_ENV'] = 'production';
      const provider = EnvConfigProvider.getInstance();
      const phase = await provider.getEnvPhase();
      expect(phase).toBe('production');
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
}
