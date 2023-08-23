import { EnvironmentStatus } from 'infrastructure/config/EnvironmentStatus';

export function isValidEnvPhase(
  value: string,
): value is EnvironmentStatus.EnvPhase {
  return Object.values(EnvironmentStatus.EnvPhases).includes(
    value as EnvironmentStatus.EnvPhase,
  );
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

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
}
