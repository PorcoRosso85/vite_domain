namespace Environment {
  export const EnvironmentPhases = {
    DEV: 'dev',
    STG: 'stg',
    PRD: 'prd',
  } as const;

  export type EnvironmentPhase =
    (typeof EnvironmentPhases)[keyof typeof EnvironmentPhases];
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

// このサンプルでは、EnvConfigProviderのみを使用していますが、
// CloudConfigProviderなどを追加することも可能です。
class CloudConfigProvider implements ConfigProvider {
  // ここでは具体的な実装を省略していますが、クラウドサービスのAPIを利用して設定を取得するロジックが入ります
  get(key: string): string | undefined {
    // AWSのParameter Storeから取得するなどの実際の取得ロジック
    // return ...;
  }
}

function createConfigProvider(): ConfigProvider {
  const env = process.env.NODE_ENV || Environment.EnvironmentPhases.DEV;
  if (env === Environment.EnvironmentPhases.PRD) {
    return new CloudConfigProvider();
  } else {
    return new EnvConfigProvider();
  }
}

const configProvider = createConfigProvider();

// 環境に応じて異なる環境変数を取得する。
const env = process.env.NODE_ENV || Environment.EnvironmentPhases.DEV;
const DATABASE_URL = configProvider.get(`${env.toUpperCase()}_DATABASE_URL`);
const API_URL = configProvider.get(`${env.toUpperCase()}_API_URL`);

export { DATABASE_URL, API_URL };
