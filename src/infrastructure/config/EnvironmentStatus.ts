import { EnvConfigProvider } from 'infrastructure/config/EnvConfigProvider';
import {
  ValidationError,
  AuthenticationError,
} from 'domain/errors/specifiedErrors';
import { ErrorStatus } from 'domain/errors/errorStatus';
import { logger } from 'domain/logs/createLoggerFactory';

export namespace EnvironmentStatus {
  const envProvider = EnvConfigProvider.getInstance();
  const envPhase = async () => {
    return await envProvider.getEnvPhase();
  };
  const isEnvPhaseValid = (phase: string): phase is EnvPhase => {
    return (
      Object.values(EnvPhases).includes(phase as EnvPhase) || phase === 'test'
    );
  };

  const getEnvVar = async (key: string): Promise<string | undefined> => {
    return await envProvider.get(key);
  };

  export const EnvPhases = {
    DEV: 'development',
    STG: 'staging',
    PRD: 'production',
  } as const;

  export type EnvPhase = (typeof EnvPhases)[keyof typeof EnvPhases];

  let currentEnvPhase: EnvPhase | null = null;
  export const initialize = async () => {
    const phase = await envPhase(); // 非同期関数の結果を変数に格納
    if (phase !== null && isEnvPhaseValid(phase)) {
      // ここでnullチェックを追加
      currentEnvPhase = phase;
    } else {
      logger.debug('invalid phase in EnvironmentStatus');
      throw new ValidationError(`Invalid ENV_PHASE: ${phase}`);
    }
  };

  export const getCurrentEnvPhase = (): EnvPhase => {
    if (currentEnvPhase === null) {
      throw new Error('Not initialized');
    }
    return currentEnvPhase;
  };

  export const EnvVars = {
    DATABASE_URL: getEnvVar('DATABASE_URL') || '',
    API_URL: getEnvVar('API_URL') || '',
  } as const;

  export type EnvVar = keyof typeof EnvVars;
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('Error継承クラス', () => {
    it('AuthenticationError、適切にエラーコードを返しているか', () => {
      const error = new AuthenticationError('Test error');
      expect(error.code).toEqual(ErrorStatus.ErrorCodes.AUTHENTICATION_ERROR);
    });

    it('AuthenticationError、追加情報が与えられていた時処理できているか', () => {
      const additionalInfo = { key: 'value' };
      const error = new AuthenticationError('Test error', additionalInfo);
      expect(error.additionalInfo).toEqual(additionalInfo);
    });
    // 他のエラーサブクラスも同様にテスト
  });
}
