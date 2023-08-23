// import { LogLevel } from 'domain/logs/logConfig';

export interface BaseLogger {
  debug: (message: string, ...args: any[]) => void;
  info: (message: string, ...args: any[]) => void;
  warn: (message: string, ...args: any[]) => void;
  error: (message: string, ...args: any[]) => void;
  // add other level-specific methods here
}

// export interface ILogger extends BaseLogger {
//   [key: string]: (message: string, ...args: any[]) => void;
// }
// export interface ILogger
// extends Partial<{
//   [key in LogLevel]: (message: string, ...args: any[]) => void;
// }> {}

// // will be replaced by before
// interface ILogger {
//   debug: (message: string, ...args: any[]) => void;
//   info: (message: string, ...args: any[]) => void;
//   warn: (message: string, ...args: any[]) => void;
//   error: (message: string, ...args: any[]) => void;
//   // 他のログレベルのメソッドもこちらに追加する
// }
