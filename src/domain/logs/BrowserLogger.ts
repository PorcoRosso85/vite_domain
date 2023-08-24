import { LogLevels, LogLevel, logFormat } from 'domain/logs/LogConfig';
import { BaseLogger } from 'domain/logs/LoggerInterface';

const createBrowserLogger = (): BaseLogger => {
  const logger: Partial<BaseLogger> = {};

  const allowedLevels: LogLevel[] = [LogLevels.debug, LogLevels.error];

  Object.keys(LogLevels)
    .filter((key) =>
      allowedLevels.includes(LogLevels[key as keyof typeof LogLevels]),
    )
    .forEach((key) => {
      const level = LogLevels[key as keyof typeof LogLevels];
      logger[level] = (message: string, ...args: any[]) => {
        console[level](logFormat(level, message), ...args);
      };
    });

  return logger as BaseLogger;
};

export default createBrowserLogger;

if (import.meta.vitest) {
  const { describe, it, expect, afterEach, vi } = import.meta.vitest;

  describe('BrowserLogger', () => {
    let consoleSpy: any;

    afterEach(() => {
      vi.restoreAllMocks();
    });

    const allowedLevels: LogLevel[] = [LogLevels.debug, LogLevels.error];

    allowedLevels.forEach((level) => {
      it(`ブラウザロガーは ${level} レベルでログを生成する`, async () => {
        consoleSpy = vi.spyOn(console, level);
        const logger = createBrowserLogger();
        const message = `test message for ${level} level`;
        const extraArg = { detail: 'extra detail' };

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

    // Add a test for disallowed log levels
    const disallowedLevels = Object.keys(LogLevels).filter(
      (key) =>
        !allowedLevels.includes(LogLevels[key as keyof typeof LogLevels]),
    );

    disallowedLevels.forEach((level) => {
      it(`ブラウザロガーは ${level} レベルでログを生成しない`, () => {
        const logger = createBrowserLogger();
        const logLevel = LogLevels[level as keyof typeof LogLevels];
        expect(logger[logLevel]).toBeUndefined();
      });
    });
  });
}
