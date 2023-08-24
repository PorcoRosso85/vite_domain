import { V, ElementTypes } from 'domain/entities/LsifDataEntities';

export interface LsifDataRepository {
  getDataList(): Promise<V[]>;
  // other methods here
}
