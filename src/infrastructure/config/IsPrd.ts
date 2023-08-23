import { EnvironmentStatus } from 'infrastructure/config/EnvironmentStatus';

/**
 *
 *
 * @return {*}
 */
export function isPrd() {
  return (
    EnvironmentStatus?.currentEnv === EnvironmentStatus?.EnvPhases?.PRD ?? false
  );
}

// // 使い方
// if (!isPrd()) {
//   // 除外したいスコープやコードブロック
// }
