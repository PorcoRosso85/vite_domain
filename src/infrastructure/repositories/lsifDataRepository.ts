import { V } from 'domain/entities/lsifData';
import { LsifDataRepository } from 'domain/repositories/lsifDataRepository';

export class LsifDataRepositoryImpl implements LsifDataRepository {
  async getDataList(): Promise<V[]> {
    // TODO: LsifDataリポジトリの実装
    return;
  }
}
