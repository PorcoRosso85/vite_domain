import { EnvironmentStatus } from 'infrastructure/config/EnvironmentStatus';

/**
 * 名前空間を参照しているこのコードは、名前空間をとりに行く必要がでてきてしまうかもしれない
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

if (import.meta.vitest) {
  const { describe, it, expect, vi } = import.meta.vitest;

  describe('EnvironmentStatus and its related functionalities', () => {
    it('should return true when currentEnv is PRD', () => {
      const mockCurrentEnv = vi
        .spyOn(EnvironmentStatus, 'currentEnv', 'get')
        .mockReturnValue('production');
      const mockEnvPhases = vi
        .spyOn(EnvironmentStatus, 'EnvPhases', 'get')
        .mockReturnValue({
          DEV: 'development',
          STG: 'staging',
          PRD: 'production',
        });

      expect(isPrd()).toBe(true);

      mockCurrentEnv.mockRestore();
      mockEnvPhases.mockRestore();
    });

    it('should return false when currentEnv is not PRD', () => {
      const mockCurrentEnv = vi
        .spyOn(EnvironmentStatus, 'currentEnv', 'get')
        .mockReturnValue('development');
      const mockEnvPhases = vi
        .spyOn(EnvironmentStatus, 'EnvPhases', 'get')
        .mockReturnValue({
          DEV: 'development',
          STG: 'staging',
          PRD: 'production',
        });

      expect(isPrd()).toBe(false);

      mockCurrentEnv.mockRestore();
      mockEnvPhases.mockRestore();
    });

    it('should return false when currentEnv is undefined', () => {
      const mockCurrentEnv = vi
        .spyOn(EnvironmentStatus, 'currentEnv', 'get')
        .mockReturnValue(undefined as any);
      const mockEnvPhases = vi
        .spyOn(EnvironmentStatus, 'EnvPhases', 'get')
        .mockReturnValue({
          DEV: 'development',
          STG: 'staging',
          PRD: 'production',
        });

      expect(isPrd()).toBe(false);

      mockCurrentEnv.mockRestore();
      mockEnvPhases.mockRestore();
    });
  });

  // describe('isPrd function', () => {
  //   let mockEnvironmentStatus: any;

  //   beforeEach(() => {
  //     mockEnvironmentStatus = {
  //       currentEnv: 'production',
  //       EnvPhases: { PRD: 'production' },
  //     };

  //     // EnvironmentStatusをモック化
  //     vi.stubGlobal('EnvironmentStatus', mockEnvironmentStatus);
  //   });

  //   afterEach(() => {
  //     vi.restoreAllMocks();
  //   });

  //   it('currentEnvがPRDの場合、trueを返すべき', () => {
  //     const spy = vi.spyOn(mockEnvironmentStatus, 'currentEnv');

  //     const result = isPrd();

  //     expect(result).toBe(true);

  //     // スパイ（またはモック）が呼び出された回数を検証
  //     expect(spy).toHaveBeenCalledTimes(1);

  //     // スパイ（またはモック）が期待した引数で呼び出されたか検証
  //     // （この例では引数がないので省略）
  //     // expect(spy).toHaveBeenCalledWith(...);
  //   });
  // });

  // vi.mock('infrastructure/config/EnvironmentStatus', async () => {
  //   const actual = await vi.importActual(
  //     'infrastructure/config/EnvironmentStatus',
  //   );
  //   if (typeof actual === 'object' && actual !== null) {
  //     // 型ガード
  //     return {
  //       ...actual, // スプレッド操作
  //       get currentEnv() {
  //         return 'PRD'; // モックのデフォルト値を設定
  //       },
  //       EnvPhases: {
  //         PRD: 'PRD',
  //         // 他の環境定数もここに追加可能
  //       },
  //     };
  //   }
  //   throw new Error('Actual import is not an object'); // または適切なエラーハンドリング
  // });

  // describe('isPrd関数', () => {
  //   // vi.spyOnの戻り型がわかるならanyから変更する
  //   let envSpy: any;
  //   let envPhasesSpy: any;

  //   afterEach(() => {
  //     vi.restoreAllMocks(); // すべてのモックとスパイをリセット
  //   });

  //   beforeEach(() => {
  //     envSpy = vi.spyOn(EnvironmentStatus, 'currentEnv', 'get'); // EnvironmentStatus.currentEnvのゲッターをスパイ
  //     envPhasesSpy = vi.spyOn(EnvironmentStatus, 'EnvPhases', 'get');
  //   });
  //   it('should return true if currentEnv is PRD', () => {
  //     const mockEnvStatus = {
  //       currentEnv: 'PRD',
  //       EnvPhases: { PRD: 'PRD' },
  //     };
  //     const result = isPrd(mockEnvStatus);
  //     expect(result).toEqual(true);
  //   });

  //   it('currentEnvがPRDの場合、trueを返すべき', () => {
  //     envSpy.mockReturnValue('PRD'); // モックの値を設定
  //     expect(isPrd()).toEqual(true);
  //   });

  //   it('currentEnvがPRDでない場合、falseを返すべき', () => {
  //     envSpy.mockReturnValue('DEV'); // モックの値を設定
  //     expect(isPrd()).toEqual(false);
  //   });

  //   it('EnvironmentStatusがundefinedの場合、falseを返すべき', () => {
  //     envSpy.mockReturnValue(undefined); // モックの値を設定
  //     expect(isPrd()).toEqual(false);
  //   });

  //   it('EnvPhasesがundefinedの場合、falseを返すべき', () => {
  //     envPhasesSpy.mockReturnValue(undefined); // EnvPhasesの値をundefinedにモック
  //     expect(isPrd()).toEqual(false);
  //   });
  // });
}
