import { ConfigProvider } from 'domain/interfaces/ConfigProvider';
import { logger } from 'domain/logs/createLoggerFactory';
import { SSM } from 'aws-sdk';

export class CloudConfigProvider implements ConfigProvider {
  private ssm: SSM;

  constructor(ssmInstance: SSM) {
    this.ssm = ssmInstance;
  }

  async get(key: string): Promise<string | undefined> {
    try {
      logger.debug('calling getParameter');
      const result = await this.ssm
        .getParameter({
          Name: key,
          WithDecryption: true,
        })
        .promise();

      logger.debug(`received result: ${result}`);

      return result.Parameter?.Value;
    } catch (error) {
      logger.error('Error in get: ', error);
      return undefined;
    }
  }

  async getEnvPhase(): Promise<string> {
    const env = await this.get('envPhaseKeyInSSM');
    return env || 'production';
  }
}

if (import.meta.vitest) {
  describe('環境設定のテスト', () => {
    describe('ConfigProviderの動作テスト', () => {
      let ssmMock: any;
      let cloudConfigProvider: CloudConfigProvider;

      beforeEach(() => {
        ssmMock = {
          getParameter: vi.fn(),
        };
        cloudConfigProvider = new CloudConfigProvider(ssmMock as SSM);
      });

      // FIXME
      it('CloudConfigProviderがクラウドサービスから設定を取得する', async () => {
        const mockResponse = {
          Parameter: {
            Value: 'testValue',
          },
        };
        ssmMock.getParameter.mockResolvedValue(mockResponse);

        const value = await cloudConfigProvider.get('someKey');

        expect(value).toEqual('testValue');
      });

      it('CloudConfigProviderが例外を適切に処理する', async () => {
        ssmMock.getParameter.mockRejectedValue(new Error('Test Error'));

        const value = await cloudConfigProvider.get('someKey');

        expect(value).toBeUndefined();
      });
      // FIXME
      it('getEnvPhaseが環境フェーズを適切に取得する', async () => {
        const mockResponse = {
          Parameter: {
            Value: 'staging',
          },
        };
        ssmMock.getParameter.mockResolvedValue(mockResponse);

        const envPhase = await cloudConfigProvider.getEnvPhase();

        expect(envPhase).toEqual('staging');
      });
    });
  });
}
