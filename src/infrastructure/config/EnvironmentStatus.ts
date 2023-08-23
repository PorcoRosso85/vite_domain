import { EnvConfigProvider } from 'infrastructure/config/EnvConfigProvider';
import {
  ValidationError,
  AuthenticationError,
} from 'domain/errors/specifiedErrors';
import { ErrorStatus } from 'domain/errors/errorStatus';
import { logger } from 'domain/logs/createLoggerFactory';

export namespace EnvironmentStatus {
  const envProvider = EnvConfigProvider.getInstance();

  export const EnvPhases = {
    DEV: 'development',
    STG: 'staging',
    PRD: 'production',
  } as const;

  export type EnvPhase = (typeof EnvPhases)[keyof typeof EnvPhases];

  // Validate the env phase
  const envPhase: string = envProvider.getEnvPhase();
  if (
    envPhase !== 'staging' &&
    envPhase !== 'development' &&
    envPhase !== 'production' &&
    envPhase !== 'test'
  ) {
    logger.debug('invalid phase in EnvironmentStatus');
    throw new ValidationError(`Invalid ENV_PHASE: ${envPhase}`);
  }

  export const currentEnv: EnvPhase = envPhase as EnvPhase;

  // Generalized env var getter
  export const getEnvVar = (key: string): string | undefined => {
    return envProvider.get(key);
  };

  export const EnvVarLibrary = {
    DATABASE_URL: getEnvVar('DATABASE_URL') || '',
    API_URL: getEnvVar('API_URL') || '',
  } as const;

  export type EnvVar = keyof typeof EnvVarLibrary;
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
