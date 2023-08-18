import winston from 'winston';

const logger = winston.createLogger({
  level: 'debug', // 最低レベルを'debug'に設定
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  );
}

// export default logger;

class Logger {
  // 第２引数のmetaは表示されないがmetaDataとして格納される部分
  static debug(message: string, meta?: any) {
    logger.debug(message, meta);
  }

  static info(message: string, meta?: any) {
    logger.info(message, meta);
  }

  static warn(message: string, meta?: any) {
    logger.warn(message, meta);
  }

  static error(message: string, meta?: any) {
    logger.error(message, meta);
  }
}

export default Logger;
