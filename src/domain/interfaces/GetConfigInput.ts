export const ConfigSourceTypes = {
  APP: 'APP',
  LOCAL: 'LOCAL',
  CLOUD: 'CLOUD',
} as const;

export type ConfigSourceType =
  (typeof ConfigSourceTypes)[keyof typeof ConfigSourceTypes];

export interface GetConfigInput {
  source: ConfigSourceType; // 自動的に'ENV' | 'APP'になる
  key: string;
}
