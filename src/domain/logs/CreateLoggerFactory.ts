import createServerLogger from 'domain/logs/ServerLogger';
import createBrowserLogger from 'domain/logs/BrowserLogger';
import { BaseLogger } from 'domain/logs/LoggerInterface';

const createLogger = (): BaseLogger => {
  if (typeof window === 'undefined') {
    return createServerLogger();
  } else {
    return createBrowserLogger();
  }
};
export const logger = createLogger();

// TODO: ロガーに非同期を使いたくなったら
const createLoggerAsync = async (): Promise<BaseLogger> => {
  if (typeof window === 'undefined') {
    return createServerLogger();
  } else {
    return Promise.resolve(createBrowserLogger());
  }
};

// createLoggerを使ってロガーインスタンスを生成しておきたかったら
// let createLoggerSingleton: BaseLogger | null = null;
// export async function loggerAsync(): Promise<BaseLogger> {
//   if (!createLoggerSingleton) {
//     try {
//       createLoggerSingleton = await createLogger();
//     } catch (error) {
//       console.error(
//         'Could not initialize custom logger, falling back to console: ',
//         error,
//       );
//       createLoggerSingleton = console as unknown as BaseLogger;
//     }
//   }
//   return createLoggerSingleton;
// }

// // loggerAsyncの使い方
// async function anything() {
//   const logger = await loggerAsync();
//   try {
//     // code
//     logger.debug('debug');
//   } catch (error) {
//     logger.error('error', error);
//   }
// }

if (import.meta.vitest) {
  const { describe, it, expect, vi } = import.meta.vitest;

  describe('LoggerFactory', () => {
    it('Node.jsロガーが生成される、windowが定義されないとき', async () => {
      (globalThis as any).window = undefined; // Mock Node.js environment
      const mockServerLogger = {};
      (createServerLogger as any) = async () => mockServerLogger; // Mock function

      const logger = await createLogger();

      expect(logger).toBe(mockServerLogger);
    });

    it('ブラウザロガーが生成される、windowが定義されたとき', async () => {
      (globalThis as any).window = {}; // Mock browser environment
      const mockBrowserLogger = {};
      (createBrowserLogger as any) = () => mockBrowserLogger; // Mock function

      const logger = await createLogger();

      expect(logger).toBe(mockBrowserLogger);
    });

    it('ServerLoggerはdebugログを出力できる', async () => {
      (globalThis as any).window = undefined; // Mock Node.js environment

      const mockServerLogger = {
        debug: vi.fn(),
      };

      (createServerLogger as any) = async () => mockServerLogger; // Mock function

      const logger = await createLogger();

      logger.debug('Debugging message');

      // Verify that the debug method was called with the expected arguments
      expect(mockServerLogger.debug).toHaveBeenCalledTimes(1);
      expect(mockServerLogger.debug).toHaveBeenCalledWith('Debugging message');
    });
  });
}
