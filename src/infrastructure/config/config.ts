import Logger from 'domain/logs/logs';

namespace Environment {
  export const EnvPhases = {
    DEV: 'development',
    STG: 'staging',
    PRD: 'production',
  } as const;

  export type EnvPhase = (typeof EnvPhases)[keyof typeof EnvPhases];

  export const EnvVerLibraries = {
    [Environment.EnvPhases.DEV]: {
      DATABASE_URL: 'DEV_DATABASE_URL',
      API_URL: 'DEV_API_URL',
    },
    [Environment.EnvPhases.STG]: {
      DATABASE_URL: 'STG_DATABASE_URL',
      API_URL: 'STG_API_URL',
    },
    [Environment.EnvPhases.PRD]: {
      DATABASE_URL: 'PRD_DATABASE_URL',
      API_URL: 'PRD_API_URL',
    },
  } as const;

  export type EnvVarLibrary =
    (typeof EnvVerLibraries)[keyof typeof EnvVerLibraries];
}

interface ConfigProvider {
  get(key: string): string | undefined;
}

class EnvConfigProvider implements ConfigProvider {
  constructor() {
    require('dotenv').config();
  }

  get(key: string): string | undefined {
    return process.env[key];
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

// APP_ENVのバリデーション
function isValidEnvPhase(value: string): value is Environment.EnvPhase {
  return Object.values(Environment.EnvPhases).includes(
    value as Environment.EnvPhase,
  );
}
function createConfigProvider(): [ConfigProvider, Environment.EnvPhase] {
  const processAppEnv = process.env.APP_ENV || Environment.EnvPhases.DEV;

  // APP_ENVのバリデーション
  if (!isValidEnvPhase(processAppEnv)) {
    throw new Error(`Invalid APP_ENV value: ${processAppEnv}`);
  }

  if (processAppEnv === Environment.EnvPhases.PRD) {
    return [new CloudConfigProvider(), processAppEnv];
  } else {
    return [new EnvConfigProvider(), processAppEnv];
  }
}

const [configProvider, processAppEnv] = createConfigProvider();

const DATABASE_URL = configProvider.get(
  Environment.EnvVerLibraries[processAppEnv].DATABASE_URL,
);
const API_URL = configProvider.get(
  Environment.EnvVerLibraries[processAppEnv].API_URL,
);

export { DATABASE_URL, API_URL };

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
