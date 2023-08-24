export interface ConstantsProvider {
  getConstants(key: string): number | string | undefined;
}
