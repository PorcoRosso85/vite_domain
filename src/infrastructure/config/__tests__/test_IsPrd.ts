import { isPrd } from 'infrastructure/config/IsPrd';
import { EnvironmentStatus } from 'infrastructure/config/EnvironmentStatus';

describe('isPrd function', () => {
  beforeEach(() => {
    Object.defineProperty(EnvironmentStatus, 'currentEnv', {
      writable: true,
      value: 'development', // デフォルト値を設定する
    });
  });

  afterEach(() => {
    // テストケースが終わった後で元の状態に戻すならこちらを使う
    Object.defineProperty(EnvironmentStatus, 'currentEnv', {
      writable: true,
      value: 'development', // 元の値に戻す
    });
  });

  it('currentEnvがPRDの場合、trueを返すべき', () => {
    Object.defineProperty(EnvironmentStatus, 'currentEnv', {
      value: 'production',
    });

    expect(isPrd()).toBe(true);
  });

  it('currentEnvがPRDでない場合、falseを返すべき', () => {
    Object.defineProperty(EnvironmentStatus, 'currentEnv', {
      value: 'development',
    });

    expect(isPrd()).toBe(false);
  });

  it('currentEnvがundefinedの場合、falseを返すべき', () => {
    Object.defineProperty(EnvironmentStatus, 'currentEnv', {
      value: undefined,
    });

    expect(isPrd()).toBe(false);
  });
});
