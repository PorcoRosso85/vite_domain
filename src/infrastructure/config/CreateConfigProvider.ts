import { EnvironmentStatus } from 'infrastructure/config/EnvironmentStatus';
import { ConfigProvider } from 'domain/interfaces/ConfigProvider';

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
  EnvironmentStatus.EnvVerLibraries[processAppEnv].DATABASE_URL,
);
const API_URL = configProvider.get(
  EnvironmentStatus.EnvVerLibraries[processAppEnv].API_URL,
);

export { DATABASE_URL, API_URL };
