import { V, ElementTypes } from 'domain/entities/lsifData';

export interface LsifDataRepository {
  getDataList(): Promise<V[]>;
  // other methods here
}
