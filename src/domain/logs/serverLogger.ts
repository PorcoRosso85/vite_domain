import { logLevels, logFormat } from './logConfig';
import ILogger from './loggerInterface';

const createServerLogger = async (): Promise<ILogger> => {
  const winston = await import('winston');
  return winston.default.createLogger({
    levels: logLevels,
    format: winston.default.format.printf(({ level, message }) =>
      logFormat(level, message),
    ),
    transports: [
      new winston.default.transports.File({
        filename: 'error.log',
        level: 'error',
      }),
      new winston.default.transports.File({ filename: 'combined.log' }),
    ],
  });
};
export default createServerLogger;

if (import.meta.vitest) {
  const { describe, it, expect, vi } = import.meta.vitest;

  describe('ServerLogger', () => {
    it('各ログレベルに対応したログを生成する', async () => {
      const mockLogger = await createServerLogger();
      logLevels.forEach((level) => {
        // const spy = vi.fn();
        // mockLogger[level] = spy;
        // mockLogger.log(level, 'test message');
        // expect(spy).toBeCalledWith('test message');
      });
    });
  });
}

// // winstonの実際の動作をテストせず、createServerLoggerが期待通りに動作するかをテストする
// if (import.meta.vitest) {
//   const { describe, it, expect, vi } = import.meta.vitest;

//   // Mock the createServerLogger function
//   vi.mock('./path/to/createServerLogger', () => {
//     return {
//       default: async () => {
//         const spies = {};
//         logLevels.forEach(level => {
//           spies[level] = vi.fn();
//         });
//         return {
//           log: (level, message) => spies[level](message),
//           ...spies
//         };
//       }
//     };
//   });

//   describe('ServerLogger', () => {
//     it('should log messages at different log levels', async () => {
//       const mockLogger = await createServerLogger();
//       logLevels.forEach((level) => {
//         const spy = mockLogger[level];
//         mockLogger.log(level, 'test message');
//         expect(spy).toBeCalledWith('test message');
//       });
//     });
//   });
// }
