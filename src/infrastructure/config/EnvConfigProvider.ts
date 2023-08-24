import { IConfigProvider } from 'domain/interfaces/ConfigProvider';
import {
  GetConfigInput,
  ConfigSourceTypes,
} from 'domain/interfaces/GetConfigInput';
import { ConstantsProvider } from 'domain/interfaces/ConstantsProvider';
import { ExternalServiceError } from 'domain/errors/specifiedErrors';
import { logger } from 'domain/logs/createLoggerFactory';

export class EnvConfigProvider implements IConfigProvider {
  private ConstantsProvider: ConstantsProvider;

  constructor(constantsProvider: ConstantsProvider) {
    this.ConstantsProvider = constantsProvider;
  }

  async get(input: GetConfigInput): Promise<string | number | undefined> {
    switch (input.source) {
      case ConfigSourceTypes.LOCAL:
        return Promise.resolve(process.env[input.key]);
      case ConfigSourceTypes.APP:
        return Promise.resolve(this.ConstantsProvider.getConstants(input.key));
      default:
        return Promise.reject(new Error('Invalid source type'));
    }
  }
}

/*
使用例
1, EnvConfigProviderのインスタンスを取得
const envConfigProvider = EnvConfigProvider.getInstance(new ConstantsService());

1, 環境変数から設定を取得
const nodeEnv = await envConfigProvider.get({ source: ConfigSourceTypes.ENV, key: 'NODE_ENV' });
TODO: key一覧

1, アプリ内の定数から設定を取得
const apiTimeout = await envConfigProvider.get({ source: ConfigSourceTypes.APP, key: 'apiTimeout' });
TODO: key一覧

この設計は非常に堅牢で、柔軟性もあります。ただし、Singletonパターンはテストが難しいとされることがありますので、その点を考慮することも重要です。特にユニットテストを実施する場合、resetInstance メソッドを使ってSingletonインスタンスをリセットする可能性があります。
*/

if (import.meta.vitest) {
  const { describe, it, expect, vi } = import.meta.vitest;
  let constantsProviderMock: any;
  let envConfigProvider: EnvConfigProvider;

  describe('EnvConfigProvider', () => {
    beforeEach(() => {
      constantsProviderMock = {
        getConstants: vi.fn(),
      };
      envConfigProvider = new EnvConfigProvider(constantsProviderMock);
    });

    it('EnvConfigProvider がローカル環境変数から設定を適切に取得する', async () => {
      process.env.TEST_KEY = 'testValue';
      const input: GetConfigInput = {
        key: 'TEST_KEY',
        source: ConfigSourceTypes.LOCAL,
      };

      const value = await envConfigProvider.get(input);

      expect(value).toBe('testValue');
    });
    it('EnvConfigProvider が ConstantsProvider から設定を適切に取得する', async () => {
      constantsProviderMock.getConstants.mockReturnValue('testValue');
      const input: GetConfigInput = {
        key: 'TEST_KEY',
        source: ConfigSourceTypes.APP,
      };

      const value = await envConfigProvider.get(input);

      expect(value).toBe('testValue');
      expect(constantsProviderMock.getConstants.mock.calls[0]).toEqual([
        'TEST_KEY',
      ]);
    });

    it('不正な source が渡された場合、適切なエラーがスローされる', async () => {
      const input: GetConfigInput = {
        key: 'TEST_KEY',
        source: 'INVALID' as any,
      };

      try {
        await envConfigProvider.get(input);
        fail('Should have thrown an error');
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message).toBe('Invalid source type');
        } else {
          fail('Caught exception is not an instance of Error');
        }
      }
    });
  });
}
