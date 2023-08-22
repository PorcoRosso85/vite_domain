export const LogLevels = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  // add other level here
} as const;

export type LogLevel = (typeof LogLevels)[keyof typeof LogLevels];

export const logFormat = (level: LogLevel, message: string) =>
  `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;
