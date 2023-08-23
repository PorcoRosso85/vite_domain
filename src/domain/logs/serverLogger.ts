import { LogLevels, logFormat } from './logConfig';
import { BaseLogger } from './loggerInterface';

const createServerLogger = (): BaseLogger => {
  const logger: Partial<BaseLogger> = {};

  Object.keys(LogLevels).forEach((key) => {
    const level = LogLevels[key as keyof typeof LogLevels];
    logger[level] = (message: string, ...args: any[]) => {
      console[level](logFormat(level, message), ...args);
    };
  });

  return logger as BaseLogger;
};
export default createServerLogger;

// TODO: もしwinstonを機能として追加する場合
// import winston from 'winston';
//
// const isServer = typeof window === "undefined";
//
// // Server-side logger
// const serverLogger = winston.createLogger({
//   transports: [
//     new winston.transports.Console(),
//     // other transports like File, Http, etc.
//   ],
// });

// // Common logger interface
// const createCommonLogger = (): BaseLogger => {
//   const logger: Partial<BaseLogger> = {};

//   Object.keys(LogLevels).forEach((key) => {
//     const level = LogLevels[key as keyof typeof LogLevels];
//     logger[level] = (message: string, ...args: any[]) => {
//       if (isServer) {
//         serverLogger.log({ level, message, meta: args });
//       } else {
//         console[level](logFormat(level, message), ...args);
//       }
//     };
//   });

//   return logger as BaseLogger;
// };

// const logger = createCommonLogger();

// // Use `logger` throughout your application.

if (import.meta.vitest) {
  const { describe, it, expect, afterEach, vi } = import.meta.vitest;

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
