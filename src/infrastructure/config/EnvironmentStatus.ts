import { EnvConfigProvider } from 'infrastructure/config/EnvConfigProvider';

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
    envPhase !== 'production'
  ) {
    throw new Error(`Invalid ENV_PHASE: ${envPhase}`);
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

// APP_ENVのバリデーション
export function isValidEnvPhase(
  value: string,
): value is EnvironmentStatus.EnvPhase {
  return Object.values(EnvironmentStatus.EnvPhases).includes(
    value as EnvironmentStatus.EnvPhase,
  );
}
