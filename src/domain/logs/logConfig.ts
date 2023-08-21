export const logLevels = ['debug', 'info', 'warn', 'error'];
export const logFormat = (level: string, message: string) =>
  `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;
