import { V } from 'domain/entities/LsifDataEntities';
import { LsifDataRepository } from 'domain/repositories/LsifDataRepository';
import {
  headData,
  // serializedHeadData,
} from 'infrastructure/database/dao/mocks/datas/headLsifData';

export class LsifDataRepositoryImpl implements LsifDataRepository {
  async getDataList(): Promise<V[]> {
    return headData;
  }
}
