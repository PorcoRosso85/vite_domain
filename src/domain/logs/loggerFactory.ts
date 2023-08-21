import createServerLogger from './serverLogger';
import createBrowserLogger from './browserLogger';
import ILogger from './loggerInterface';

const createLogger = async (): Promise<ILogger> => {
  if (typeof window === 'undefined') {
    return createServerLogger();
  } else {
    return Promise.resolve(createBrowserLogger());
  }
};

export default createLogger;

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

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
  });
}
