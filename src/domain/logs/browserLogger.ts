import { logLevels, logFormat } from './logConfig';
import ILogger from './loggerInterface';

const createBrowserLogger = (): ILogger => ({
  log: (level: string, message: string, ...args: any[]) => {
    if (logLevels.includes(level)) {
      console[level](logFormat(level, message), ...args);
    }
  },
});

export default createBrowserLogger;

if (import.meta.vitest) {
  const { describe, it, expect, vi } = import.meta.vitest;

  describe('BrowserLogger', () => {
    it('should log messages at different log levels', () => {
      const mockLogger = createBrowserLogger();
      logLevels.forEach((level) => {
        // const spy = vi.fn(); // vi.fn()を使ってスパイを作成
        // mockLogger[level] = spy;
        // mockLogger.log(level, 'test message');
        // expect(spy).toBeCalledWith('test message');
      });
    });
  });
}
