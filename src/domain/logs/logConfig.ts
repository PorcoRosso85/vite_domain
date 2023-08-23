export const LogLevels = {
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error',
  // add other level here
} as const;

export type LogLevel = keyof typeof LogLevels;

export const logFormat = (level: LogLevel, message: string) =>
  `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;
