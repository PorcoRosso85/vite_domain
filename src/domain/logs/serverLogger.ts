import { LogLevels, logFormat } from './logConfig';
import ILogger from './loggerInterface';

const createServerLogger = (): ILogger => {
  const logger: Partial<ILogger> = {};

  Object.keys(LogLevels).forEach((key) => {
    const level = LogLevels[key as keyof typeof LogLevels];
    logger[level] = (message: string, ...args: any[]) => {
      console[level](logFormat(level, message), ...args);
    };
  });

  return logger as ILogger;
};
export default createServerLogger;

if (import.meta.vitest) {
  const { describe, it, expect, beforeEach, afterEach, vi } = import.meta
    .vitest;

  describe('ServerLogger', () => {
    let consoleSpy: any;

    afterEach(() => {
      vi.restoreAllMocks();
    });

    Object.keys(LogLevels).forEach((key) => {
      const level = LogLevels[key as keyof typeof LogLevels];

      it('各ログレベルに対応したログを生成する', async () => {
        consoleSpy = vi.spyOn(console, level);
        const logger = createServerLogger();
        const message = 'test message for ${level} level';
        const extraArg = { detail: 'extra detail' };

        // ただし、createServerLogger 関数内で、すべての LogLevels に対して logger オブジェクトのプロパティを設定しているので、実際にはこれらのプロパティは undefined にはならないと考えられます。 テスト側でこの保証があると明示する方法はいくつかありますが、一般的な方法は Type Assertion を使う
        (logger[level] as (message: string, ...args: any[]) => void)(
          message,
          extraArg,
        );

        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith(
          expect.stringContaining(message),
          extraArg,
        );
      });
    });
  });
}
