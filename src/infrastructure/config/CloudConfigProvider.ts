import { IConfigProvider } from 'domain/interfaces/ConfigProvider';
import { GetConfigInput } from 'domain/interfaces/GetConfigInput';
import { ConfigSourceTypes } from 'domain/interfaces/GetConfigInput';
import { logger } from 'domain/logs/createLoggerFactory';
import { SSM } from 'aws-sdk';

export class CloudConfigProvider implements IConfigProvider {
  private ssm: SSM;

  constructor(ssmInstance: SSM) {
    this.ssm = ssmInstance;
  }

  async get(input: GetConfigInput): Promise<string | number | undefined> {
    try {
      if (input.source !== ConfigSourceTypes.CLOUD) {
        return Promise.reject(new Error('Invalid source type'));
      }
      logger.debug('calling getParameter');
      const result = await this.ssm
        .getParameter({
          Name: input.key,
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
}

if (import.meta.vitest) {
  describe('CloudConfigProviderテスト', () => {
    let ssmMock: any;
    let cloudConfigProvider: CloudConfigProvider;

    beforeEach(() => {
      ssmMock = {
        getParameter: vi.fn(),
      };
      cloudConfigProvider = new CloudConfigProvider(ssmMock as SSM);
    });

    // FIXME
    it('CloudConfigProviderがクラウドから設定を正確に取得する', async () => {
      const mockResponse = {
        Parameter: {
          Value: 'testValue',
        },
      };
      ssmMock.getParameter.mockResolvedValue(mockResponse);

      const input: GetConfigInput = {
        key: 'someKey',
        source: ConfigSourceTypes.CLOUD,
      };
      const value = await cloudConfigProvider.get(input);

      expect(value).toEqual('testValue');
    });

    it('CloudConfigProviderが例外を適切に処理する', async () => {
      ssmMock.getParameter.mockRejectedValue(new Error('Test Error'));

      const input: GetConfigInput = {
        key: 'someKey',
        source: ConfigSourceTypes.CLOUD,
      };
      const value = await cloudConfigProvider.get(input);

      expect(value).toBeUndefined();
    });

    it('CloudConfigProviderが不正なソースタイプで呼び出された場合にエラーを返す', async () => {
      const input: GetConfigInput = {
        key: 'someKey',
        source: ConfigSourceTypes.LOCAL,
      };

      await expect(cloudConfigProvider.get(input)).rejects.toThrow(
        'Invalid source type',
      );
    });
  });
}
