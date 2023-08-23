export interface ConfigProvider {
  get(key: string): Promise<string | undefined>;
  getEnvPhase(): Promise<string>;
}
