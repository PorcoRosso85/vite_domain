import { EnvironmentStatus } from 'infrastructure/config/EnvironmentStatus';
import { ConfigProvider } from 'domain/interfaces/ConfigProvider';
import { isValidEnvPhase } from 'infrastructure/config/isValidEnvPhase';
import { EnvConfigProvider } from 'infrastructure/config/EnvConfigProvider';
import { CloudConfigProvider } from 'infrastructure/config/CloudConfigProvider';

function createConfigProvider(): [ConfigProvider, EnvironmentStatus.EnvPhase] {
  const processAppEnv = process.env.APP_ENV || EnvironmentStatus.EnvPhases.DEV;

  // APP_ENVのバリデーション
  if (!isValidEnvPhase(processAppEnv)) {
    throw new Error(`Invalid APP_ENV value: ${processAppEnv}`);
  }

  if (processAppEnv === EnvironmentStatus.EnvPhases.PRD) {
    return [new CloudConfigProvider(), processAppEnv];
  } else {
    return [new EnvConfigProvider(), processAppEnv];
  }
}

const [configProvider, processAppEnv] = createConfigProvider();

const DATABASE_URL = configProvider.get(
  EnvironmentStatus.EnvVars[processAppEnv].DATABASE_URL,
);
const API_URL = configProvider.get(
  EnvironmentStatus.EnvVars[processAppEnv].API_URL,
);

export { DATABASE_URL, API_URL };

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

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
}
