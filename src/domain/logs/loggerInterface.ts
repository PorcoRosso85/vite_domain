interface ILogger {
  log: (level: string, message: string, ...args: any[]) => void;
}
export default ILogger;
