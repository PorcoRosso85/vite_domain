/*
ファクトリのCreateConfigProviderとは違う
*/
import { IConfigProvider } from 'domain/interfaces/ConfigProvider';
import { CloudConfigProvider } from 'infrastructure/config/CloudConfigProvider';
import { EnvConfigProvider } from 'infrastructure/config/EnvConfigProvider';
import { GetConfigInput } from 'domain/interfaces/GetConfigInput';
import { ConfigSourceTypes } from 'domain/interfaces/GetConfigInput';

export class UnifiedConfigProvider implements IConfigProvider {
  private envConfigProvider: EnvConfigProvider;
  private cloudConfigProvider: CloudConfigProvider;

  constructor(
    envConfigProvider: EnvConfigProvider,
    cloudConfigProvider: CloudConfigProvider,
  ) {
    this.envConfigProvider = envConfigProvider;
    this.cloudConfigProvider = cloudConfigProvider;
  }

  async get(input: GetConfigInput): Promise<string | number | undefined> {
    switch (input.source) {
      case ConfigSourceTypes.LOCAL:
        return this.envConfigProvider.get(input);
      case ConfigSourceTypes.APP:
        return this.envConfigProvider.get(input);
      case ConfigSourceTypes.CLOUD:
        return this.cloudConfigProvider.get(input);
      default:
        return Promise.reject(new Error('Invalid source type'));
    }
  }
}

if (import.meta.vitest) {
  describe('UnifiedConfigProvider', () => {
    let envConfigProviderMock: any;
    let cloudConfigProviderMock: any;
    let unifiedConfigProvider: UnifiedConfigProvider;

    beforeEach(() => {
      envConfigProviderMock = {
        get: vi.fn(),
      };
      cloudConfigProviderMock = {
        get: vi.fn(),
      };
      unifiedConfigProvider = new UnifiedConfigProvider(
        envConfigProviderMock,
        cloudConfigProviderMock,
      );
    });

    it('sourceがLOCALまたはAPPのときに、EnvConfigProviderから正しく設定を取得できるか', async () => {
      envConfigProviderMock.get.mockResolvedValue('testValue');
      const input: GetConfigInput = {
        key: 'TEST_KEY',
        source: ConfigSourceTypes.LOCAL,
      };

      const value = await unifiedConfigProvider.get(input);

      expect(value).toBe('testValue');
      expect(envConfigProviderMock.get.mock.calls[0]).toEqual([input]);
    });

    it('sourceがLOCALまたはAPPのときに、EnvConfigProviderから正しく設定を取得できるか', async () => {
      envConfigProviderMock.get.mockResolvedValue('testValue');
      const input: GetConfigInput = {
        key: 'TEST_KEY',
        source: ConfigSourceTypes.APP,
      };

      const value = await unifiedConfigProvider.get(input);

      expect(value).toBe('testValue');
      expect(envConfigProviderMock.get.mock.calls[0]).toEqual([input]);
    });

    it('sourceがCLOUDのときに、CloudConfigProviderから正しく設定を取得できるか', async () => {
      cloudConfigProviderMock.get.mockResolvedValue('cloudValue');
      const input: GetConfigInput = {
        key: 'TEST_KEY',
        source: ConfigSourceTypes.CLOUD,
      };

      const value = await unifiedConfigProvider.get(input);

      expect(value).toBe('cloudValue');
      expect(cloudConfigProviderMock.get.mock.calls[0]).toEqual([input]);
    });

    it('無効なsourceが与えられた場合にエラーがスローされるか', async () => {
      const input: GetConfigInput = {
        key: 'TEST_KEY',
        source: 'INVALID' as any,
      };

      try {
        await unifiedConfigProvider.get(input);
        fail('Should have thrown an error');
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message).toBe('Invalid source type');
        } else {
          fail('Cout exception is not an instance of Error');
        }
      }
    });
  });
}

/*
// const envConfigProvider = new EnvConfigProvider(/* 初期化の引数 */
// const cloudConfigProvider = new CloudConfigProvider(/* 初期化の引数 */);
// const unifiedConfigProvider = new UnifiedConfigProvider(envConfigProvider, cloudConfigProvider);

// const someEnvValue = await unifiedConfigProvider.get('SOME_KEY', ConfigSource.Env);
// const someCloudValue = await unifiedConfigProvider.get('ANOTHER_KEY', ConfigSource.Cloud);
